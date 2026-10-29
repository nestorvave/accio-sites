# accio-sites — contexto para Claude Code

Lee `docs/ESTADO.md` antes de hacer nada: ahí está el estado del proyecto, los prospectos y las reglas. Actualízalo al terminar cada tarea.

## Qué es esto
Páginas de una sola hoja por giro para prospectos de ACCIO (micro-negocios de Cuernavaca y Guadalajara). Astro 5 estático, sin frameworks de UI. Cada negocio es un JSON en `sites/`; la plantilla la decide `giro`.

## Comandos
- `npm run dev` · `npm run build` (sale en `dist/`) · `npm run shots [slug]` (capturas móvil/escritorio en `shots/`, requiere Playwright)
- `npm run new -- --slug x --giro spa|restaurante|consultorio|fitness --nombre "X" --tel "777 000 0000"` crea el JSON base
- `python3 scripts/paleta.py public/logos/x.jpg <giro>` propone `colores` a partir del logo (Pillow)

## Reglas de diseño (no negociables)
- Una plantilla por giro con mundo visual propio; el prospecto solo cambia el JSON. No se hacen páginas a mano por prospecto.
- Tipografías de Google Fonts, fallback real. Nada de emoji como icono: `src/components/Icon.astro`.
- La acción principal de cada plantilla es un formulario que abre WhatsApp con el mensaje armado. Cuando el booker esté en producción, `reserva.url` apunta a `/r/<slug>`.
- Estilos de plantilla van en `<style>` scoped; `:global(body)` y `:global(:root)` para lo global. Los iconos de otros componentes se seleccionan con `:global(svg)`.
- Colores siempre por tokens (`--fondo --tinta --marca --papel`); `textoSobre()` decide el texto del botón.
- Nada inventado que se presente como real: servicios/precios ilustrativos solo mientras `demo: true`.

## Datos de prospectos
- Teléfono/dirección/horario: Google Maps. Instagram: foto de perfil como logo en `public/logos/<slug>.jpg`, `instagram` sin @.
- `notas` guarda la debilidad detectada y el grupo: `ENVIAR YA` (su dolor es la página) o `ESPERAR BOOKER` (citas/reservas; se ofrece página + agenda juntas).
