# Estado del proyecto · ACCIO prospección Cuernavaca

Última actualización: 28/10/2026, 22:00. Mantén este archivo al día al terminar cada tarea.

## Contexto
- ACCIO (Néstor) vende micro-apps, agenda en línea (booker) y páginas web a micro-negocios. El booker (`~/Documents/Accio/accio-booker` + `booker-api`) **aún no está en producción**; falta hosting, R2 para uploads, Resend con dominio, og por negocio, y el bot de WhatsApp (Meta).
- Decisión: no prometer agenda hasta que el booker esté arriba. A negocios de citas se les ofrece página + reservas juntas cuando exista; a los demás se les vende la página ya.
- Meta de Néstor: $5–10k MXN/mes de inicio con mantenimiento/páginas; luego escalar con el booker.
- Prospección por Instagram sigue la guía ACCIO (30 follows/día, 15 DMs por bloque, previa y autorización antes de enviar, un seguimiento a los 4–5 días). Registro: el CRM de leads del booker (`/app/accio`) cuando esté en producción; mientras, `notas` en cada JSON.

## Hecho
- 4 plantillas: `spa` (jardín en penumbra, Cormorant + Manrope), `restaurante` (carta sobre mantel, Fraunces + Instrument Sans), `consultorio` (tarjeta de cita; subgiros dental/estetica/veterinaria/medico/despacho; DM Serif + Figtree), `fitness` (cartel + pizarrón de horarios; Big Shoulders + Archivo).
- 18 demos en `sites/` con datos reales de Google Maps. Logos de Instagram en 5: casa-manzano, el-madrigal, maya-spa, spa-room, arts-pilates. El resto con monograma.
- Página de envíos (artefacto en claude.ai: https://claude.ai/artifact/W4unGViLXxysorR39sZdve) con debilidad, WhatsApp, captura y mensaje por prospecto.
- Cada demo publicada además como artefacto propio (links en la tabla). Son privados: sirven para revisar, no para mandar al prospecto; al prospecto va `demo.accio.mx/<slug>` cuando esté en Netlify.
- Auditoría de 13 sitios existentes (28/10): casamanzano.mx secuestrado; elmadrigal.shop caído; ihcuernavaca.com © 2012; felixreyescontadorescuernavaca.com con imágenes rotas; rolandosamper.com sin forma de pedir cita; animals.com.mx portada en negro.

## Prospectos
| slug | grupo | giro | WhatsApp | debilidad | demo (claude.ai, privada) |
|---|---|---|---|---|---|
| casa-manzano | ENVIAR YA | restaurante | 5217775369510 | dominio secuestrado (apuestas) · 2,629 reseñas · IG 24K | [demo](https://claude.ai/artifact/2EaNcnNZiZ1kezsknvcek2) |
| el-madrigal | ENVIAR YA | restaurante | 527771007700 | sitio caído · 3,605 reseñas | [demo](https://claude.ai/artifact/HGUCMVYZco6AjuiEtGYniG) |
| animals-hospital | ENVIAR YA | consultorio/veterinaria | 527773115913 | carrusel en negro, sin IG | [demo](https://claude.ai/artifact/YV5kzGa6Fiy1MzxBNeBi8g) |
| dr-samper | ENVIAR YA | consultorio/estetica | 527772569930 | sin cita en la página, portada pesada · 662 reseñas | [demo](https://claude.ai/artifact/EyaVbZkgWP7Ph2D4pHsNPT) |
| felix-reyes | ENVIAR YA | consultorio/despacho | 527773124048 | plantilla con imágenes rotas, sin WhatsApp | [demo](https://claude.ai/artifact/SmpEr5VmJPZ3ccamkY1CPa) |
| royal-vet | ENVIAR YA | consultorio/veterinaria | 527779316320 | 24 h sin página | [demo](https://claude.ai/artifact/WhnYNn3wJF32zD4vngpyui) |
| maya-spa | ESPERAR BOOKER | spa | 527772561613 | link = linktr.ee · IG 4.9K | [demo](https://claude.ai/artifact/DaaKtxNnPxSfC7aF3J8afj) |
| spa-room | ESPERAR BOOKER | spa | 527774516890 | sin página · IG 4.7K | [demo](https://claude.ai/artifact/6Gs5yqoyDWfEfdA4nxVVZe) |
| spa-alory | ESPERAR BOOKER | spa | 527772231309 | ya usa AgendaPro: ofrecer página que lleve ahí | [demo](https://claude.ai/artifact/U6yfxWNZTHee1v836a7V7v) |
| ar-aesthetic | ESPERAR BOOKER | consultorio/estetica | 527775597675 | sin página | [demo](https://claude.ai/artifact/2syYaDkW1YYtJq4u2kieMF) |
| samanta-olea | ESPERAR BOOKER | consultorio/estetica | 527772098273 | sin página · trato de usted | [demo](https://claude.ai/artifact/JYzRTdkW1f8JoaEdPwcSLM) |
| sunrie | ESPERAR BOOKER | consultorio/estetica | 527773670778 | sin página · trato de usted | [demo](https://claude.ai/artifact/PFgbeSrc1Aac5mxzZvMJnE) |
| arts-pilates | ESPERAR BOOKER | fitness | 527774601200 | reservan por DM · IG 949 | [demo](https://claude.ai/artifact/4NM5b9VawUCiqqULFZR776) |
| formae | ESPERAR BOOKER | fitness | 527773521686 | link = IG · máx 3 por clase | [demo](https://claude.ai/artifact/V3ztAo5i35wEwHFtQFQMYF) |
| luna-studio | ESPERAR BOOKER | fitness | 527773073467 | sin página · IG sin confirmar | [demo](https://claude.ai/artifact/479hVQhogF4LxjHqUsqRfm) |
| serena-studio | ESPERAR BOOKER | fitness | 527775236954 | link = IG | [demo](https://claude.ai/artifact/CVyKnvTfKCLRkkTMPjnqtC) |
| atman | ESPERAR BOOKER | fitness | 527772166558 | sin página | [demo](https://claude.ai/artifact/CsdWpgb6ZrVh6crphCrVJj) |
| wild-cuernavaca | ESPERAR BOOKER | fitness | 527773701367 | "sitio" = IG | [demo](https://claude.ai/artifact/Mc36zMzoocbjV5caJGWaqC) |

Sin demo (no hay plantilla): International House (escuela; © 2012), Corcon y Smile (sitios aceptables: solo mantenimiento).

## Pendiente
1. Publicar en Netlify (`npm run build` → `dist`) y apuntar `demo.accio.mx`; los mensajes ya traen `demo.accio.mx/<slug>`.
2. Enviar grupo ENVIAR YA (Casa Manzano y El Madrigal por llamada). Registrar fecha y respuesta en `notas`.
3. Conseguir logos de Instagram faltantes (13) y correr `scripts/paleta.py` para sus colores.
4. Plantillas que faltan para GDL: barbería, uñas/pestañas, escuela.
5. Booker a producción (ver `booker-api/docs/PENDIENTES-PRODUCCION.md`), luego enviar grupo ESPERAR BOOKER con página + agenda.
6. Seguimiento a los 4–5 días a quien no responda (una sola vez).

## Problemas y soluciones
- Astro mezcla el CSS global de todas las plantillas en un solo archivo → usar `<style>` scoped con `:global(body)` / `:global(:root)`, y `:global(svg)` para iconos de otros componentes.
- `define:vars` pone las variables en los elementos raíz del componente, no en `:root` → las variables de color las emite `Base.astro` en un `<style is:inline>`.
- Instagram (sin sesión) permite leer `og:image` y bio; la foto de perfil se baja con `fetch` desde la página (CORS abierto) a 100–150 px.
- Las capturas de página completa muestran la barra fija a media página → el script la oculta antes de capturar.
- En un artefacto multiarchivo los links a `<slug>/index.html` con `target=_blank` no abren (el visor bloquea la pestaña nueva) → cada demo se publica como artefacto independiente (HTML autocontenido con CSS y logo incrustados: `scratchpad/inline-demo.py`).
