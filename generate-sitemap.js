import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Fix __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to your JSON folder
const dataFolder = path.join(__dirname, "public", "clientData");

// Read all json files
const files = fs.readdirSync(dataFolder).filter(file => file.endsWith(".json"));

const baseUrl = "https://www.webiquecard.in";

const urls = files.map(file => {
    const slug = file.replace(".json", "");
    return `
  <url>
    <loc>${baseUrl}/${slug}</loc>
  </url>`;
}).join("");

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

// Output to dist folder
const distPath = path.join(__dirname, "dist");

if (!fs.existsSync(distPath)) {
    fs.mkdirSync(distPath);
}

fs.writeFileSync(path.join(distPath, "sitemap.xml"), sitemap);

console.log("✅ Sitemap generated successfully!");