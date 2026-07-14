import mysql from "mysql2/promise";
import { readFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let pool = null;

export function getPool() {
  if (!pool) {
    pool = mysql.createPool({
      host: process.env.DB_HOST || "localhost",
      user: process.env.DB_USER || "root",
      password: process.env.DB_PASSWORD || "",
      database: process.env.DB_NAME || "vythienhungblog",
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });
  }
  return pool;
}

export async function initDatabase() {
  try {
    const db = getPool();

    // Create site_data table if not exists
    await db.execute(`
      CREATE TABLE IF NOT EXISTS site_data (
        id INT PRIMARY KEY DEFAULT 1,
        data LONGTEXT NOT NULL,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    // Auto-seed if table is empty
    const [rows] = await db.execute("SELECT COUNT(*) as cnt FROM site_data");
    if (rows[0].cnt === 0) {
      const defaultDataPath = path.join(__dirname, "defaultData.json");
      const defaultData = readFileSync(defaultDataPath, "utf-8");
      await db.execute("INSERT INTO site_data (id, data) VALUES (1, ?)", [defaultData]);
      console.log("✅ Default data seeded into MySQL");
    }

    console.log("✅ MySQL connected & site_data table ready");
    return true;
  } catch (err) {
    console.error("❌ MySQL connection failed:", err.message);
    return false;
  }
}

export async function getSiteData() {
  const db = getPool();
  const [rows] = await db.execute("SELECT data FROM site_data WHERE id = 1");
  if (rows.length > 0) {
    return JSON.parse(rows[0].data);
  }
  return null;
}

export async function saveSiteData(data) {
  const db = getPool();
  const json = JSON.stringify(data);
  await db.execute(
    `INSERT INTO site_data (id, data) VALUES (1, ?)
     ON DUPLICATE KEY UPDATE data = ?, updated_at = CURRENT_TIMESTAMP`,
    [json, json]
  );
}
