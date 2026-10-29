# accio-sites — context for Claude Code

Read `docs/STATE.md` before doing anything: it holds the project state, the site list and the rules. Update it when you finish a task.

## What this is
One-page sites per business category for small businesses (Cuernavaca and Guadalajara). Astro 5, static, no UI framework. Each business is a JSON file in `sites/`; `category` picks the template.

## Language
Code, identifiers, CSS, file names, comments, docs and commit messages are in English. Only the copy the visitor reads (JSON content strings, UI labels, WhatsApp messages) is in Spanish.
Commit messages describe the change in neutral terms ("Add clinic template", "Update site data"); they never mention sales, prospects or clients.

## Commands
- `npm run dev` · `npm run build` (outputs to `dist/`) · `npm run shots [slug]` (mobile/desktop screenshots into `shots/`, needs Playwright)
- `npm run new -- --slug x --category spa|restaurant|clinic|fitness [--subcategory dental|aesthetic|veterinary|medical|firm] --name "X" --phone "777 000 0000"` scaffolds the JSON
- `python3 scripts/palette.py public/logos/x.jpg <category>` proposes `colors` from the logo (Pillow)
- Deploy: Netlify builds from GitHub using `netlify.toml` (`npm run build` → `dist`, domain `demo.accio.mx`). Pushing to `main` publishes.

## Two kinds of pages
- **Template pages** (`src/templates/`): one visual world per category; the business only changes its JSON. Used for quick demos.
- **Custom pages** (`src/custom/<slug>.astro`): a redesign built on the business's own identity — their logo colors, their photos (in `public/photos/<slug>/`, WebP), their product names and their own copy from their site/Instagram. `[slug].astro` uses the custom page when it exists. Preferred for prospects that already have a site or a strong Instagram.
- Never invent claims, prices, policies or reviews. Prices only when the business publishes them; Google rating/count copied from Maps into `rating`.
- Avoid photos where customers' or staff faces are the subject.

## Design rules (non-negotiable)
- Fonts are self-hosted with Fontsource (`import "@fontsource-variable/<font>"` in the page; family name ends in " Variable"). No Google Fonts links. No emoji as icons: `src/components/Icon.astro`.
- The primary action of every template is a form that opens WhatsApp with the message prefilled. Once the booking app is in production, `booking.url` points to `/r/<slug>`.
- All pages share one CSS bundle, so page-level globals must be scoped: pass `theme="<name>"` to `Base` (sets `html[data-theme]`) and write `:global(html[data-theme="<name>"])` / `:global(html[data-theme="<name>"] body)` instead of `:root` / `body`. Icons from other components are selected with `:global(svg)`.
- Colors always through tokens (`--bg --ink --brand --paper`, plus `--on-brand` from `textOn()`).
- Nothing invented presented as real: illustrative services/prices only while `demo: true`.

## Site data
- Phone/address/hours: Google Maps. Instagram: profile picture as logo in `public/logos/<slug>.jpg`, `instagram` without @.
- `notes` holds internal findings and the status: `READY` (the site itself is the pain point) or `AFTER BOOKING` (appointment-based business; site + booking are offered together).
