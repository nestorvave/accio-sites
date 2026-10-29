import { defineConfig } from "astro/config";

// Static site. Each business is emitted as /<slug>/index.html.
// Set SITE_URL in production so og: tags carry absolute URLs.
export default defineConfig({
  site: process.env.SITE_URL || "https://demo.accio.mx",
  output: "static",
  trailingSlash: "ignore",
  build: { format: "directory" },
});
