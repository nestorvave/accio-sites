// Mobile and desktop screenshots of every built site, for review or for sending as a preview.
// Usage: npm run build && npm run shots [slug]   →  shots/<slug>-mobile.png, shots/<slug>-desktop.png
import { chromium } from "playwright";
import { createServer } from "node:http";
import { readFile, readdir, mkdir } from "node:fs/promises";
import { join, extname } from "node:path";

const dist = new URL("../dist/", import.meta.url).pathname;
const out = new URL("../shots/", import.meta.url).pathname;
const only = process.argv[2];
const types = { ".html": "text/html", ".css": "text/css", ".js": "text/javascript", ".png": "image/png", ".jpg": "image/jpeg", ".svg": "image/svg+xml", ".webp": "image/webp" };

const server = createServer(async (req, res) => {
  let p = decodeURIComponent(req.url.split("?")[0]);
  if (p.endsWith("/")) p += "index.html";
  try {
    const body = await readFile(join(dist, p));
    res.writeHead(200, { "content-type": types[extname(p)] ?? "application/octet-stream" });
    res.end(body);
  } catch {
    res.writeHead(404); res.end();
  }
}).listen(0);
const port = server.address().port;

await mkdir(out, { recursive: true });
const slugs = (await readdir(dist, { withFileTypes: true })).filter((d) => d.isDirectory() && d.name !== "_astro").map((d) => d.name).filter((s) => !only || s === only);
const browser = await chromium.launch();
for (const slug of slugs) {
  for (const [name, vp, mobile] of [["mobile", { width: 390, height: 844 }, true], ["desktop", { width: 1280, height: 800 }, false]]) {
    const ctx = await browser.newContext({ viewport: vp, deviceScaleFactor: 2, isMobile: mobile, hasTouch: mobile, locale: "es-MX" });
    const page = await ctx.newPage();
    await page.goto(`http://localhost:${port}/${slug}/`, { waitUntil: "networkidle" });
    await page.waitForTimeout(900); // let the entrance animation finish
    await page.addStyleTag({ content: ".bar,.demo-tag{display:none!important}" }); // fixed elements do not belong in a full-page capture
    await page.screenshot({ path: join(out, `${slug}-${name}.png`), fullPage: true });
    await ctx.close();
    console.log(`✓ ${slug} ${name}`);
  }
}
await browser.close();
server.close();
