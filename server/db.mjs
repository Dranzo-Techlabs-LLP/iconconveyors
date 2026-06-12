// MySQL storage layer for the Icon Conveyors admin API.
// If DB env vars are present the app uses MySQL; otherwise the caller falls
// back to the JSON files. The product/content shapes match the JSON exactly.
import mysql from "mysql2/promise";

const { DB_HOST, DB_PORT, DB_USER, DB_PASS, DB_NAME } = process.env;

export const dbEnabled = Boolean(DB_HOST && DB_USER && DB_NAME);

let pool;
export function getPool() {
  if (!pool) {
    pool = mysql.createPool({
      host: DB_HOST,
      port: Number(DB_PORT) || 3306,
      user: DB_USER,
      password: DB_PASS,
      database: DB_NAME,
      waitForConnections: true,
      connectionLimit: 5,
      charset: "utf8mb4",
    });
  }
  return pool;
}

export async function initSchema() {
  const p = getPool();
  await p.query(`CREATE TABLE IF NOT EXISTS products (
    id       VARCHAR(80)  PRIMARY KEY,
    title    VARCHAR(255) NOT NULL,
    descr    TEXT         NOT NULL,
    category VARCHAR(40)  NOT NULL,
    tag      VARCHAR(120) NULL,
    video    VARCHAR(255) NULL,
    images   JSON         NOT NULL,
    sort     INT          NOT NULL DEFAULT 0
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`);
  await p.query(`CREATE TABLE IF NOT EXISTS content (
    section  VARCHAR(40) PRIMARY KEY,
    data     JSON        NOT NULL
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`);
}

function parseJson(v) {
  return typeof v === "string" ? JSON.parse(v) : v;
}

function rowToProduct(r) {
  const images = parseJson(r.images) || [];
  const p = {
    id: r.id,
    title: r.title,
    desc: r.descr,
    img: images[0],
    images,
    category: r.category,
  };
  if (r.tag) p.tag = r.tag;
  if (r.video) p.video = r.video;
  return p;
}

export async function readProductsDB() {
  const [rows] = await getPool().query(
    "SELECT id,title,descr,category,tag,video,images,sort FROM products ORDER BY sort, id"
  );
  return rows.map(rowToProduct);
}

// Replace the whole product set (matches the JSON "write entire list" semantics).
export async function writeProductsDB(list) {
  const conn = await getPool().getConnection();
  try {
    await conn.beginTransaction();
    await conn.query("DELETE FROM products");
    let i = 0;
    for (const x of list) {
      const images = x.images && x.images.length ? x.images : [x.img];
      await conn.query(
        "INSERT INTO products (id,title,descr,category,tag,video,images,sort) VALUES (?,?,?,?,?,?,?,?)",
        [
          x.id,
          x.title,
          x.desc,
          x.category,
          x.tag || null,
          x.video || null,
          JSON.stringify(images),
          i++,
        ]
      );
    }
    await conn.commit();
  } catch (e) {
    await conn.rollback();
    throw e;
  } finally {
    conn.release();
  }
}

export async function readContentDB() {
  const [rows] = await getPool().query("SELECT section, data FROM content");
  const out = {};
  for (const r of rows) out[r.section] = parseJson(r.data);
  return out;
}

export async function writeContentDB(obj) {
  const conn = await getPool().getConnection();
  try {
    await conn.beginTransaction();
    for (const section of Object.keys(obj)) {
      await conn.query(
        "INSERT INTO content (section,data) VALUES (?,?) ON DUPLICATE KEY UPDATE data=VALUES(data)",
        [section, JSON.stringify(obj[section])]
      );
    }
    await conn.commit();
  } catch (e) {
    await conn.rollback();
    throw e;
  } finally {
    conn.release();
  }
}
