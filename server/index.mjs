// Icon Conveyors admin API.
// Persists products to server/data/products.json and saves uploaded
// product images into public/products so the site serves them directly.
import express from "express";
import multer from "multer";
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_FILE = path.join(__dirname, "data", "products.json");
const CONTENT_FILE = path.join(__dirname, "data", "content.json");
const UPLOAD_DIR = path.join(__dirname, "..", "public", "products");
const PORT = process.env.ADMIN_API_PORT || 5174;

// Credentials: override with env ICON_ADMIN_USER / ICON_ADMIN_PASS if desired.
const ADMIN_USER = process.env.ICON_ADMIN_USER || "iconadmin";
const ADMIN_PASS_SHA256 =
  process.env.ICON_ADMIN_PASS
    ? crypto.createHash("sha256").update(process.env.ICON_ADMIN_PASS).digest("hex")
    : "d0903cb5ce0f5ca491e6a1490b3469e38de941806bfcb2d13051c81a4940c430";

const TOKEN_TTL_MS = 12 * 60 * 60 * 1000; // 12h sessions
const tokens = new Map(); // token -> expiry epoch ms

const app = express();
app.use(express.json({ limit: "1mb" }));

// ---------- helpers ----------
function readProducts() {
  return JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
}
function writeProducts(list) {
  fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true });
  fs.writeFileSync(DATA_FILE, JSON.stringify(list, null, 2));
}
function readContent() {
  return JSON.parse(fs.readFileSync(CONTENT_FILE, "utf8"));
}
function writeContent(obj) {
  fs.mkdirSync(path.dirname(CONTENT_FILE), { recursive: true });
  fs.writeFileSync(CONTENT_FILE, JSON.stringify(obj, null, 2));
}
// Deep-merge incoming patch onto existing content. Arrays are replaced wholesale
// (so an edited list is saved exactly as sent), plain objects are merged by key.
function deepMerge(base, patch) {
  if (Array.isArray(patch)) return patch;
  if (patch && typeof patch === "object" && base && typeof base === "object" && !Array.isArray(base)) {
    const out = { ...base };
    for (const k of Object.keys(patch)) out[k] = deepMerge(base[k], patch[k]);
    return out;
  }
  return patch;
}
function slugify(s) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 60) || "product";
}
function auth(req, res, next) {
  const token = (req.headers.authorization || "").replace(/^Bearer\s+/i, "");
  const exp = tokens.get(token);
  if (!exp || exp < Date.now()) return res.status(401).json({ error: "Unauthorized" });
  next();
}
const CATEGORIES = ["Belt", "Screw", "Roller", "Chain", "Loading", "Packaging", "Specialty"];
function validateProduct(body, { partial = false } = {}) {
  const errors = [];
  const out = {};
  if (!partial || body.title !== undefined) {
    if (typeof body.title !== "string" || !body.title.trim()) errors.push("Title is required");
    else out.title = body.title.trim();
  }
  if (!partial || body.desc !== undefined) {
    if (typeof body.desc !== "string" || !body.desc.trim()) errors.push("Description is required");
    else out.desc = body.desc.trim();
  }
  if (!partial || body.category !== undefined) {
    if (!CATEGORIES.includes(body.category)) errors.push(`Category must be one of: ${CATEGORIES.join(", ")}`);
    else out.category = body.category;
  }
  if (!partial || body.img !== undefined) {
    if (typeof body.img !== "string" || !body.img.trim()) errors.push("Image is required — upload one");
    else out.img = body.img.trim();
  }
  if (body.tag !== undefined) out.tag = String(body.tag).trim() || undefined;
  if (body.video !== undefined) {
    const v = String(body.video).trim();
    if (v && !/^https?:\/\/(www\.)?(youtube\.com|youtu\.be)\//i.test(v))
      errors.push("Video must be a YouTube link (youtube.com or youtu.be)");
    else out.video = v || undefined;
  }
  return { errors, out };
}

// ---------- auth ----------
app.post("/api/login", (req, res) => {
  const { userid, password } = req.body || {};
  const hash = crypto.createHash("sha256").update(String(password ?? "")).digest("hex");
  if (userid !== ADMIN_USER || hash !== ADMIN_PASS_SHA256) {
    return res.status(401).json({ error: "Invalid user ID or password" });
  }
  const token = crypto.randomBytes(32).toString("hex");
  tokens.set(token, Date.now() + TOKEN_TTL_MS);
  res.json({ token });
});

// ---------- site content ----------
app.get("/api/content", (_req, res) => {
  res.json(readContent());
});

app.put("/api/content", auth, (req, res) => {
  if (!req.body || typeof req.body !== "object") {
    return res.status(400).json({ error: "Expected a content object" });
  }
  const merged = deepMerge(readContent(), req.body);
  writeContent(merged);
  res.json(merged);
});

// ---------- products ----------
app.get("/api/products", (_req, res) => {
  res.json(readProducts());
});

app.post("/api/products", auth, (req, res) => {
  const { errors, out } = validateProduct(req.body);
  if (errors.length) return res.status(400).json({ error: errors.join(". ") });
  const list = readProducts();
  let id = slugify(out.title);
  while (list.some((p) => p.id === id)) id += "-2";
  const product = { id, ...out };
  list.push(product);
  writeProducts(list);
  res.status(201).json(product);
});

app.put("/api/products/:id", auth, (req, res) => {
  const list = readProducts();
  const i = list.findIndex((p) => p.id === req.params.id);
  if (i === -1) return res.status(404).json({ error: "Product not found" });
  const { errors, out } = validateProduct(req.body, { partial: true });
  if (errors.length) return res.status(400).json({ error: errors.join(". ") });
  // explicit undefined removes optional fields (tag / video)
  list[i] = { ...list[i], ...out };
  if (req.body.tag === "" || req.body.tag === null) delete list[i].tag;
  if (req.body.video === "" || req.body.video === null) delete list[i].video;
  writeProducts(list);
  res.json(list[i]);
});

app.delete("/api/products/:id", auth, (req, res) => {
  const list = readProducts();
  const i = list.findIndex((p) => p.id === req.params.id);
  if (i === -1) return res.status(404).json({ error: "Product not found" });
  const [removed] = list.splice(i, 1);
  writeProducts(list);
  res.json(removed);
});

// reorder: body = array of ids in the new order
app.put("/api/products-order", auth, (req, res) => {
  const ids = req.body;
  if (!Array.isArray(ids)) return res.status(400).json({ error: "Expected an array of ids" });
  const list = readProducts();
  const byId = new Map(list.map((p) => [p.id, p]));
  const next = ids.map((id) => byId.get(id)).filter(Boolean);
  for (const p of list) if (!ids.includes(p.id)) next.push(p);
  writeProducts(next);
  res.json(next);
});

// ---------- image upload ----------
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    fs.mkdirSync(UPLOAD_DIR, { recursive: true });
    cb(null, UPLOAD_DIR);
  },
  filename: (req, file, cb) => {
    const ext = (path.extname(file.originalname) || ".jpg").toLowerCase();
    const base = slugify(req.query.name || path.basename(file.originalname, ext));
    let name = base + ext;
    let n = 2;
    while (fs.existsSync(path.join(UPLOAD_DIR, name))) name = `${base}-${n++}${ext}`;
    cb(null, name);
  },
});
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (_req, file, cb) =>
    /^image\/(jpeg|png|webp|gif|avif)$/.test(file.mimetype)
      ? cb(null, true)
      : cb(new Error("Only image files are allowed (jpg, png, webp, gif, avif)")),
});

app.post("/api/upload", auth, (req, res) => {
  upload.single("image")(req, res, (err) => {
    if (err) return res.status(400).json({ error: err.message });
    if (!req.file) return res.status(400).json({ error: "No file received" });
    res.json({ path: "/products/" + req.file.filename });
  });
});

// serve uploaded images directly too (useful if the vite server isn't fronting /products)
app.use("/products", express.static(UPLOAD_DIR));

app.listen(PORT, () => {
  console.log(`[admin-api] listening on http://localhost:${PORT}`);
});
