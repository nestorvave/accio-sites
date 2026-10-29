import { defineConfig } from "astro/config";

// Sitio estático. Cada negocio sale como /<slug>/index.html.
// Para producción pon el dominio real (ej. https://demo.accio.mx) para que las etiquetas og: lleven URL absoluta.
export default defineConfig({
  site: process.env.SITE_URL || "https://demo.accio.mx",
  output: "static",
  trailingSlash: "ignore",
  build: { format: "directory" },
});
