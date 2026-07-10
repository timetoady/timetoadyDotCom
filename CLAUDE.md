# timetoady.com

Static Astro 6 site for timetoady — Adam Andreason's solo studio. Two faces: **Codeworks**
(developer/apps, `/codeworks/`) and **Songworks** (music, `/songworks/`). Deploys to
**Cloudflare Pages**. All routes use trailing slashes (`trailingSlash: 'always'`).

## Commands

- `npm run dev` — dev server
- `npm run build` — static build to `dist/`
- `npm run test:e2e` — build + preview + Playwright (desktop/tablet/mobile projects)
- `npm run deploy` — build + `wrangler pages deploy` (auth: `CLOUDFLARE_API_TOKEN` env var; verify with `npm run cf:whoami`)

## Adding an app privacy policy (the common task)

Each published app hosts its privacy policy on this site. **One markdown file is the whole job:**

1. Create `src/content/privacy/<slug>.md` — the filename becomes the URL:
   `/codeworks/privacy/<slug>/` (e.g. `indigo-blast.md` → `/codeworks/privacy/indigo-blast/`).
2. Frontmatter (validated by the Zod schema in `src/content.config.ts`):

   ```yaml
   ---
   app: Food Storage Lite            # display name
   lastUpdated: 2026-08-01           # ISO date; shown on the page (rendered in UTC)
   summary: >-                       # one line; hero intro + meta description — keep under ~160 chars
     How Food Storage Lite handles your data...
   appHref: https://...              # optional store/site link (adds a "View app" button)
   supportEmail: foo@timetoady.com   # optional; defaults to contact.supportEmail
   ---
   ```

3. Body = the policy itself in plain markdown, starting at `##` headings (the page supplies the `<h1>`).
   Source policies live in each app's own repo (convention: `docs/privacy/privacy-policy.md`) — copy the
   body verbatim, strip the H1 title and `_Last updated_` line (both come from frontmatter), and resolve
   any `TODO(developer)` comments. Indigo Blast (`src/content/privacy/indigo-blast.md`) is the reference.
4. Done. The page auto-builds and auto-lists on `/codeworks/privacy/` — no route, component, or nav changes.
5. Verify: `npm run build`, check `dist/codeworks/privacy/<slug>/index.html` exists; ideally add the new
   route to the `routes` array in `tests/e2e/smoke.spec.ts`. Update the app's Play Store listing with the
   live URL after deploy.

Apps expected to land here as they ship: FoodStorageLite, Break Battle, Morse/Aldis (each app repo
authors its own policy; this site just hosts it).

## Content editing map

All visitor-facing copy lives in data modules and page files — there is no CMS:

- `src/data/site.ts` — site meta, top nav, home highlights
- `src/data/contact.ts` — emails (hello@/support@timetoady.com — both provisioned and live), location, links
- `src/data/apps.ts` — app support entries (drives `/codeworks/apps/<slug>/` pages)
- `src/data/projects.ts` — public-projects showcase on `/codeworks/`
- `src/data/ventures.ts`, `src/data/songworks.ts` — venture cards, music page content
- `src/content/privacy/*.md` — per-app privacy policies (see above)

## Copy voice (owner standard)

Copy must read like a person wrote it — specific and plainspoken. Do NOT add prose that narrates the
site's own structure or roadmap ("each app gets its own page as it ships"), justifies design choices
("intentionally simple"), or hedges defensively. When in doubt, cut rather than explain.

## Conventions

- Plain global CSS (`src/styles/global.css`) with custom properties; BEM-ish names; no Tailwind.
- Reuse `BaseLayout.astro` + `PageHero.astro`; policy pages use `.policy-*` / `.policy-prose` styles.
- Cloudflare config: `wrangler.jsonc` (Pages, `dist`); response headers in `public/_headers`.
- Working docs for multi-phase efforts go in `docs/working/`; ops runbook is `docs/operations.md`.
