# Project state · accio-sites

Last update: 2026-10-29, 12:00. Keep this file current at the end of every task.

## Context
- ACCIO (Néstor) sells micro-apps, online booking (the "booker": `~/Documents/Accio/accio-booker` + `booker-api`) and web pages to small businesses. The booker is **not in production yet**; missing: hosting, R2 for uploads, Resend with a domain, og tags per business, and the WhatsApp bot (Meta).
- Decision: do not promise online booking until the booker is live. Appointment-based businesses get page + booking together when it exists; the rest get the page now.
- Goal: MXN 5–10k/month at first from pages and maintenance; then scale with the booker.
- Instagram outreach follows the ACCIO guide (30 follows/day, 15 DMs per block, preview and explicit approval before sending, one follow-up after 4–5 days). Registry: the booker's leads CRM (`/app/accio`) once in production; meanwhile, `notes` in each JSON.
- Language rule: code, docs and commits in English; only visitor-facing copy in Spanish. Commit messages stay neutral (no mention of sales or outreach).

## Done
- 4 templates: `spa` (garden at dusk, Cormorant + Manrope), `restaurant` (menu on the tablecloth, Fraunces + Instrument Sans), `clinic` (appointment card; subcategories dental/aesthetic/veterinary/medical/firm; DM Serif + Figtree), `fitness` (poster + schedule board; Big Shoulders + Archivo).
- 18 sites in `sites/` with real data from Google Maps. Instagram logos for 5: casa-manzano, el-madrigal, maya-spa, spa-room, arts-pilates. The rest use a monogram.
- Outreach page (claude.ai artifact: https://claude.ai/artifact/W4unGViLXxysorR39sZdve) with finding, WhatsApp, screenshot and message per business.
- Each demo also published as its own artifact (links in the table). They are private: for review only, not for sending; the business gets `demo.accio.mx/<slug>` once Netlify is up.
- Audit of 13 existing sites (2026-10-28): casamanzano.mx hijacked; elmadrigal.shop down; ihcuernavaca.com © 2012; felixreyescontadorescuernavaca.com with broken images; rolandosamper.com with no way to book; animals.com.mx black home carousel.
- Fixed 2026-10-29: every template rendered with the Fitness display font because all page CSS shares one bundle; globals are now scoped under `html[data-theme]`, and fonts are self-hosted (Fontsource).
- Repo: github.com/nestorvave/accio-sites (private). Netlify project `accio-sites` (team nestorvave) builds from `main`; live at https://accio-sites.netlify.app. Badge off, no visitor protection.
- Outreach 2026-10-29: messages rewritten (ACCIO intro → findings → proposal link → invitation to talk; no call-to-action keyword). Sent via WhatsApp Web in Chrome: dr-samper (10:26), royal-vet (10:29). animals-hospital and felix-reyes have landlines without WhatsApp → phone calls, along with casa-manzano and el-madrigal. Codebase translated to English on 2026-10-28 (JSON keys, CSS tokens, templates, scripts).

## Custom pages (2026-10-29)
Small, single-location businesses whose own site has visible problems and whose WhatsApp was verified (chat opened in WhatsApp Web, nothing sent). Each page is built from their own photos, copy and colors (`src/custom/<slug>.astro`, photos in `public/photos/<slug>/`). Live at https://accio-sites.netlify.app/<slug>.

| slug | WhatsApp | finding on their site | material used |
|---|---|---|---|
| agora-bakery | 5215539608774 | Wix site with stock photos, no WhatsApp link, broken IG link | IG @agora_bakery photos and captions (owner Liz) |
| decomuebles | 527771674143 | Shopify: all 60 products show $0.00, hero text unreadable | their product photos, names, descriptions |
| banquetes-dai | 5217775638083 | table layout, not mobile friendly, 'Promociones' 404, address differs from Maps | their dish/event photos, services, values |
| flores-del-rosedal | 527771351209 | Maps links to http (no SSL), page named 'escriba-el-nombre-de-la-pagina-nueva', no WhatsApp link | their catalog photos with codes and prices |
| floreria-de-liz | 527773414229 | WordPress © 2019, May 2023 Mother's Day banner still on home, 1 broken image | their arrangement photos (small, ~250 px) |

Discarded as too big (owner unlikely to answer): Pan del Sol (6 branches), Jardín La Estancia (Grupo Paraíso), KOFFI (2 branches, 19K IG). Event venues' Maps numbers are landlines.

## Sites (template demos)
| slug | status | category | WhatsApp | finding | demo (claude.ai, private) |
|---|---|---|---|---|---|
| casa-manzano | READY | restaurant | 5217775369510 | domain hijacked (gambling) · 2,629 reviews · IG 24K | [demo](https://claude.ai/artifact/2EaNcnNZiZ1kezsknvcek2) |
| el-madrigal | READY | restaurant | 527771007700 | site down · 3,605 reviews | [demo](https://claude.ai/artifact/HGUCMVYZco6AjuiEtGYniG) |
| animals-hospital | READY | clinic/veterinary | 527773115913 | black carousel, no IG | [demo](https://claude.ai/artifact/YV5kzGa6Fiy1MzxBNeBi8g) |
| dr-samper | READY | clinic/aesthetic | 527772569930 | no booking on the page, heavy home · 662 reviews | [demo](https://claude.ai/artifact/EyaVbZkgWP7Ph2D4pHsNPT) |
| felix-reyes | READY | clinic/firm | 527773124048 | template with broken images, no WhatsApp | [demo](https://claude.ai/artifact/SmpEr5VmJPZ3ccamkY1CPa) |
| royal-vet | READY | clinic/veterinary | 527779316320 | 24 h, no website | [demo](https://claude.ai/artifact/WhnYNn3wJF32zD4vngpyui) |
| maya-spa | AFTER BOOKING | spa | 527772561613 | link = linktr.ee · IG 4.9K | [demo](https://claude.ai/artifact/DaaKtxNnPxSfC7aF3J8afj) |
| spa-room | AFTER BOOKING | spa | 527774516890 | no website · IG 4.7K | [demo](https://claude.ai/artifact/6Gs5yqoyDWfEfdA4nxVVZe) |
| spa-alory | AFTER BOOKING | spa | 527772231309 | already on AgendaPro: offer a page that links there | [demo](https://claude.ai/artifact/U6yfxWNZTHee1v836a7V7v) |
| ar-aesthetic | AFTER BOOKING | clinic/aesthetic | 527775597675 | no website | [demo](https://claude.ai/artifact/2syYaDkW1YYtJq4u2kieMF) |
| samanta-olea | AFTER BOOKING | clinic/aesthetic | 527772098273 | no website · formal "usted" | [demo](https://claude.ai/artifact/JYzRTdkW1f8JoaEdPwcSLM) |
| sunrie | AFTER BOOKING | clinic/aesthetic | 527773670778 | no website · formal "usted" | [demo](https://claude.ai/artifact/PFgbeSrc1Aac5mxzZvMJnE) |
| arts-pilates | AFTER BOOKING | fitness | 527774601200 | books via DM · IG 949 | [demo](https://claude.ai/artifact/4NM5b9VawUCiqqULFZR776) |
| formae | AFTER BOOKING | fitness | 527773521686 | link = IG · max 3 per class | [demo](https://claude.ai/artifact/V3ztAo5i35wEwHFtQFQMYF) |
| luna-studio | AFTER BOOKING | fitness | 527773073467 | no website · IG unconfirmed | [demo](https://claude.ai/artifact/479hVQhogF4LxjHqUsqRfm) |
| serena-studio | AFTER BOOKING | fitness | 527775236954 | link = IG | [demo](https://claude.ai/artifact/CVyKnvTfKCLRkkTMPjnqtC) |
| atman | AFTER BOOKING | fitness | 527772166558 | no website | [demo](https://claude.ai/artifact/CsdWpgb6ZrVh6crphCrVJj) |
| wild-cuernavaca | AFTER BOOKING | fitness | 527773701367 | "website" = IG | [demo](https://claude.ai/artifact/Mc36zMzoocbjV5caJGWaqC) |

No demo (no template yet): International House (school; © 2012), Corcon and Smile (acceptable sites: maintenance only).

## Pending
1. Domain: add `demo.accio.mx` in Netlify (CNAME `demo` → `accio-sites.netlify.app`). Messages currently use `https://accio-sites.netlify.app/<slug>`.
2. Phone calls: casa-manzano, el-madrigal, animals-hospital, felix-reyes. Record date and reply in `notes`. Follow up dr-samper and royal-vet on 2026-11-03 if no reply.
3. Get the 13 missing Instagram logos and run `scripts/palette.py` for their colors.
4. Missing templates for GDL: barbershop, nails/lashes, school.
5. Booker to production (see `booker-api/docs/PENDIENTES-PRODUCCION.md`), then send the AFTER BOOKING group with page + booking.
6. One follow-up after 4–5 days to whoever does not reply (once only).

## Problems and solutions
- Downloading images from the browser: Chrome allows one automatic download per tab, so each business is bundled in the page (images as data URLs + text) into a single `accio-<slug>.json`, downloaded from a fresh tab to ~/Downloads, staged and unpacked (`scratchpad/unbundle.py`). Instagram needs the ACCIO session for 1080 px images.
- Screenshots: the script scrolls the page and forces lazy images to load; fonts load locally because they are self-hosted.
- Astro bundles the global CSS of every template into one file → use scoped `<style>` with `:global(body)` / `:global(:root)`, and `:global(svg)` for icons from other components.
- `define:vars` puts variables on the component's root elements, not on `:root` → color variables are emitted by `Base.astro` in a `<style is:inline>`.
- Instagram (logged out) exposes `og:image` and the bio; the profile picture downloads with `fetch` from the page (open CORS) at 100–150 px.
- Full-page screenshots show the fixed bar mid-page → the script hides it before capturing.
- In a multi-file artifact, links to `<slug>/index.html` with `target=_blank` do not open (the viewer blocks the new tab) → each demo is published as its own artifact (self-contained HTML with CSS and logo inlined).
