// One-time setup: create the MySQL tables and import the current JSON data.
// Run with: npm run db:setup   (requires .env with DB_* values)
import "dotenv/config";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  dbEnabled,
  getPool,
  initSchema,
  writeProductsDB,
  writeContentDB,
} from "./db.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

if (!dbEnabled) {
  console.error(
    "No database configured. Create a .env with DB_HOST/DB_USER/DB_PASS/DB_NAME first."
  );
  process.exit(1);
}

const products = JSON.parse(
  fs.readFileSync(path.join(__dirname, "data", "products.json"), "utf8")
);
const content = JSON.parse(
  fs.readFileSync(path.join(__dirname, "data", "content.json"), "utf8")
);

try {
  console.log("Creating tables (if needed)…");
  await initSchema();
  console.log("Importing products…");
  await writeProductsDB(products);
  console.log("Importing content…");
  await writeContentDB(content);
  console.log(
    `✓ Done — ${products.length} products and ${Object.keys(content).length} content sections are now in MySQL.`
  );
  await getPool().end();
  process.exit(0);
} catch (e) {
  console.error("✗ Setup failed:", e.code || "", e.message);
  process.exit(1);
}
