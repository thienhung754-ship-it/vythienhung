import mysql from "mysql2/promise";
import { readFileSync, writeFileSync, existsSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let pool = null;
// Flag: true if registrations table exists in MySQL, false = use JSON file fallback
let registrationsInMySQL = false;
const REGISTRATIONS_FILE = path.join(__dirname, "registrations.json");

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

    // Create registrations table if not exists
    try {
      await db.execute(`
        CREATE TABLE IF NOT EXISTS registrations (
          id VARCHAR(64) PRIMARY KEY,
          order_id VARCHAR(32) UNIQUE NOT NULL,
          name VARCHAR(255) NOT NULL,
          phone VARCHAR(32),
          email VARCHAR(255),
          time_slot VARCHAR(64),
          workshop_slug VARCHAR(128),
          workshop_title VARCHAR(255),
          status VARCHAR(16) DEFAULT 'pending',
          registered_at DATETIME NOT NULL,
          paid_at DATETIME NULL,
          amount INT DEFAULT 0,
          INDEX idx_status (status),
          INDEX idx_order_id (order_id)
        )
      `);
      registrationsInMySQL = true;
    } catch (tableErr) {
      console.warn("⚠️  Could not create registrations table (disk full?), using file fallback:", tableErr.message);
      registrationsInMySQL = false;
    }

    // Auto-seed if table is empty
    const [rows] = await db.execute("SELECT COUNT(*) as cnt FROM site_data");
    if (rows[0].cnt === 0) {
      const defaultDataPath = path.join(__dirname, "defaultData.json");
      const defaultData = readFileSync(defaultDataPath, "utf-8");
      await db.execute("INSERT INTO site_data (id, data) VALUES (1, ?)", [defaultData]);
      console.log("✅ Default data seeded into MySQL");
    }

    console.log("✅ MySQL connected & site_data + registrations tables ready");
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

// --- Registrations CRUD (MySQL when available, JSON file fallback) ---

function readFileRegs() {
  if (!existsSync(REGISTRATIONS_FILE)) return [];
  try { return JSON.parse(readFileSync(REGISTRATIONS_FILE, "utf-8")); }
  catch { return []; }
}

function writeFileRegs(regs) {
  writeFileSync(REGISTRATIONS_FILE, JSON.stringify(regs, null, 2), "utf-8");
}

export async function getAllRegistrations() {
  if (!registrationsInMySQL) return readFileRegs();
  const db = getPool();
  const [rows] = await db.execute("SELECT * FROM registrations ORDER BY registered_at DESC");
  return rows.map((r) => ({
    id: r.id, orderId: r.order_id, name: r.name, phone: r.phone,
    email: r.email, timeSlot: r.time_slot, workshopSlug: r.workshop_slug,
    workshopTitle: r.workshop_title, status: r.status,
    registeredAt: r.registered_at, paidAt: r.paid_at, amount: r.amount,
  }));
}

export async function saveRegistrationToDB(reg) {
  if (!registrationsInMySQL) {
    const regs = readFileRegs();
    const idx = regs.findIndex((r) => r.id === reg.id);
    if (idx >= 0) regs[idx] = { ...regs[idx], ...reg };
    else regs.unshift(reg);
    writeFileRegs(regs);
    return;
  }
  const db = getPool();
  await db.execute(
    `INSERT INTO registrations
      (id, order_id, name, phone, email, time_slot, workshop_slug, workshop_title, status, registered_at, amount)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE status = VALUES(status)`,
    [
      reg.id, reg.orderId, reg.name, reg.phone, reg.email,
      reg.timeSlot ?? null, reg.workshopSlug, reg.workshopTitle,
      reg.status ?? "pending", new Date(reg.registeredAt), reg.amount ?? 0,
    ]
  );
}

export async function updateRegistrationStatusInDB(id, status) {
  if (!registrationsInMySQL) {
    const regs = readFileRegs().map((r) =>
      r.id === id ? { ...r, status, ...(status === "paid" ? { paidAt: new Date().toISOString() } : {}) } : r
    );
    writeFileRegs(regs);
    return;
  }
  const db = getPool();
  const paidAt = status === "paid" ? new Date() : null;
  await db.execute("UPDATE registrations SET status = ?, paid_at = ? WHERE id = ?", [status, paidAt, id]);
}

export async function getPendingRegistrations() {
  if (!registrationsInMySQL) {
    return readFileRegs().filter((r) => r.status === "pending").map((r) => ({
      id: r.id, orderId: r.orderId, amount: r.amount ?? 0,
    }));
  }
  const db = getPool();
  const [rows] = await db.execute("SELECT id, order_id, amount FROM registrations WHERE status = 'pending'");
  return rows.map((r) => ({ id: r.id, orderId: r.order_id, amount: r.amount }));
}

// For the status endpoint in server.js
export async function getRegistrationByOrderId(orderId) {
  if (!registrationsInMySQL) {
    return readFileRegs().find((r) => r.orderId === orderId) ?? null;
  }
  const db = getPool();
  const [rows] = await db.execute(
    "SELECT id, status, paid_at FROM registrations WHERE order_id = ? LIMIT 1",
    [orderId]
  );
  if (rows.length === 0) return null;
  return { id: rows[0].id, status: rows[0].status, paidAt: rows[0].paid_at };
}
