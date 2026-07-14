import "dotenv/config";
import express from "express";
import cors from "cors";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { initDatabase, getSiteData, saveSiteData } from "./db.js";
import multer from "multer";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 45455;

app.use(cors());
app.use(express.json({ limit: "50mb" }));

// --- Ensure uploads directory exists ---
const uploadsDir = path.join(__dirname, "uploads", "pdfs");
fs.mkdirSync(uploadsDir, { recursive: true });

// --- Multer config for PDF uploads ---
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsDir),
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  },
});
const upload = multer({
  storage,
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "application/pdf") cb(null, true);
    else cb(new Error("Only PDF files are allowed"));
  },
});

// --- Site Data API ---
app.get("/api/site-data", async (req, res, next) => {
  try {
    console.log("[API] GET /api/site-data");
    const data = await getSiteData();
    console.log("[API] site-data loaded, size:", data ? JSON.stringify(data).length : 0);
    res.json(data || null);
  } catch (error) {
    console.error("[API] Failed to load site data:", error);
    res.status(500).json({ error: "Failed to load site data", details: error.message });
  }
});

app.put("/api/site-data", async (req, res, next) => {
  try {
    console.log("[API] PUT /api/site-data");
    const data = req.body;
    if (!data || typeof data !== "object") {
      return res.status(400).json({ error: "Invalid data" });
    }
    data.lastUpdated = new Date().toISOString();
    await saveSiteData(data);
    res.json({ success: true, lastUpdated: data.lastUpdated });
  } catch (error) {
    console.error("[API] Failed to save site data:", error);
    res.status(500).json({ error: "Failed to save site data", details: error.message });
  }
});

// --- PDF Upload API ---
app.post("/api/upload-pdf", upload.single("pdf"), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No PDF file uploaded" });
    }
    const fileUrl = `/uploads/pdfs/${req.file.filename}`;
    res.json({ success: true, url: fileUrl, filename: req.file.filename, originalName: req.file.originalname });
  } catch (error) {
    console.error("PDF upload error:", error.message);
    res.status(500).json({ error: "Failed to upload PDF" });
  }
});

app.delete("/api/upload-pdf/:filename", (req, res) => {
  try {
    const filePath = path.join(uploadsDir, req.params.filename);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      res.json({ success: true });
    } else {
      res.status(404).json({ error: "File not found" });
    }
  } catch (error) {
    console.error("PDF delete error:", error.message);
    res.status(500).json({ error: "Failed to delete PDF" });
  }
});

// --- Health check ---
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// --- Serve uploaded PDFs with Content-Disposition: attachment (for mobile download) ---
app.use("/uploads/pdfs", (req, res, next) => {
  console.log("[PDF-MW] path:", req.path, "method:", req.method);
  const filePath = path.join(__dirname, "uploads", "pdfs", path.basename(req.path));
  if (fs.existsSync(filePath) && req.path.endsWith(".pdf")) {
    res.set("Content-Type", "application/pdf");
    res.set("Content-Disposition", "attachment; filename=\"" + encodeURIComponent(path.basename(req.path)) + "\"");
    return res.sendFile(filePath);
  }
  next();
});

// --- Serve other uploaded files ---
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// --- Serve static files from dist (but NOT index.html — handled by SPA fallback with SEO injection) ---
app.use(express.static(path.join(__dirname, "dist"), { index: false }));

// --- Global error handler (must be before SPA fallback) ---
app.use((err, req, res, next) => {
  console.error("[ERROR]", err.stack || err.message || err);
  res.status(500).json({ error: "Internal server error", details: err.message });
});

// --- SPA fallback: serve index.html with dynamic SEO meta tags ---
app.use(async (req, res, next) => {
  // Don't serve index.html for API or upload requests
  if (req.path.startsWith("/api/") || req.path.startsWith("/uploads/")) {
    return res.status(404).json({ error: "Not found" });
  }

  try {
    let html = fs.readFileSync(path.join(__dirname, "dist", "index.html"), "utf-8");

    // Build base URL from request for absolute OG URLs
    const protocol = req.headers["x-forwarded-proto"] || req.protocol || "https";
    const host = req.headers["x-forwarded-host"] || req.headers.host;
    const baseUrl = `${protocol}://${host}`;
    const fullUrl = `${baseUrl}${req.originalUrl}`;

    // Helper: ensure image URL is absolute
    const toAbsoluteUrl = (url) => {
      if (!url) return `${baseUrl}/vythienhung-avatar.jpg`;
      if (url.startsWith("http://") || url.startsWith("https://")) return url;
      return `${baseUrl}${url.startsWith("/") ? url : "/" + url}`;
    };

    // Inject SEO meta tags from database
    const data = await getSiteData();
    const seo = data?.seo || {};
    const title = seo.siteTitle || "Vy Thiên Hùng — Founder & CEO @ MERCY TECH GLOBAL";
    const desc = seo.metaDescription || "Trang cá nhân của Vy Thiên Hùng — Nhà sáng lập Mercy Tech Global, chuyên gia AI & Công nghệ.";
    const ogImage = toAbsoluteUrl(seo.ogImage || "/vythienhung-avatar.jpg");

    html = html
      .replace(/<title>[^<]*<\/title>/, `<title>${title}</title>`)
      .replace(/<meta name="description" content="[^"]*"/, `<meta name="description" content="${desc}"`)
      .replace(/<meta property="og:url" content="[^"]*"/, `<meta property="og:url" content="${fullUrl}"`)
      .replace(/<meta property="og:title" content="[^"]*"/, `<meta property="og:title" content="${title}"`)
      .replace(/<meta property="og:description" content="[^"]*"/, `<meta property="og:description" content="${desc}"`)
      .replace(/<meta property="og:image" content="[^"]*"/, `<meta property="og:image" content="${ogImage}"`)
      .replace(/<meta name="twitter:title" content="[^"]*"/, `<meta name="twitter:title" content="${title}"`)
      .replace(/<meta name="twitter:description" content="[^"]*"/, `<meta name="twitter:description" content="${desc}"`)
      .replace(/<meta name="twitter:image" content="[^"]*"/, `<meta name="twitter:image" content="${ogImage}"`);

    res.setHeader("Content-Type", "text/html");
    res.send(html);
  } catch (err) {
    console.error("[SEO] Failed to inject meta tags:", err.message);
    res.sendFile(path.join(__dirname, "dist", "index.html"));
  }
});

// --- Start server ---
(async () => {
  await initDatabase();
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📁 Serving static files from: ${path.join(__dirname, "dist")}`);
  });
})();
