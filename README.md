# accio-sites

Páginas de una sola hoja por giro para prospectos de ACCIO. Cada negocio es un JSON en `sites/`; la plantilla la decide el campo `giro`. Sale un sitio estático (Astro) que se publica en Netlify.

## Flujo por prospecto

```bash
npm install
npm run new -- --slug maya-spa --giro spa --nombre "Maya Spa Center" --tel "777 256 1613"
#   → edita sites/maya-spa.json (servicios, horario, logo, Instagram, descripción)
npm run build            # dist/maya-spa/index.html
npm run shots maya-spa   # shots/maya-spa-movil.png y -escritorio.png para mandar por DM / WhatsApp
```

El logo va en `public/logos/<slug>.png` y en el JSON como `"logo": "/logos/<slug>.png"`. Si no hay logo todavía, la página dibuja un monograma con las iniciales.

`"demo": true` pinta una etiqueta "Demostración · ACCIO" y pone `noindex`. Quítalo cuando el negocio ya sea cliente.

## Plantillas

| Giro | Archivo | Mundo visual | Acción principal |
|---|---|---|---|
| `spa` | `src/templates/Spa.astro` | Jardín en penumbra: verde eucalipto, latón, Cormorant + Manrope | Elegir ritual → WhatsApp con el mensaje listo |
| `restaurante` | `src/templates/Restaurante.astro` | La carta sobre el mantel: papel, tinta, vino, Fraunces + Instrument Sans | Personas + día + hora → WhatsApp |

Cada plantilla tiene colores por defecto; el JSON puede sobrescribirlos con `colores: { fondo, tinta, marca, papel }` para acercarse a la marca del negocio.

Para agregar un giro (barbería, pilates, dental): copia una plantilla a `src/templates/<Giro>.astro`, decide su mundo visual (fuentes, colores, composición) y regístralo en `src/pages/[slug].astro` y en el tipo `Giro` de `src/lib/sites.ts`.

## Esquema del JSON

Ver `src/lib/sites.ts` (interfaz `Site`). Campos clave: `nombre`, `tagline`, `descripcion`, `telefono` (de ahí sale el WhatsApp), `instagram`, `direccion`, `mapa`, `horario[]`, `secciones[].items[]` (`nombre`, `descripcion`, `precio`, `duracion`, `destacado`).

## Publicar

Netlify: build `npm run build`, publish `dist`. Variable `SITE_URL=https://demo.accio.mx` para que las etiquetas `og:` lleven URL absoluta y el link se vea bien al compartir.

Cuando el booker esté en producción, el botón de reserva puede apuntar a `/r/<slug>` con `reserva: { label: "Agendar en línea", url: "https://accio.mx/r/<slug>" }`.
