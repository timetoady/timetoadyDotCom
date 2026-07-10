# timetoady.com

Static Astro site for `timetoady.com`, covering both timetoady Codeworks and timetoady Songworks.

## What ships in v1

- `/` Codeworks-first landing page for the overall TimeToady brand
- `/codeworks/` developer-facing studio page
- `/codeworks/apps/` app support index
- `/codeworks/apps/android-apps/` launch umbrella support page for Android apps
- `/codeworks/support/` email-first support page
- `/codeworks/privacy/` HTML privacy policy page
- `/songworks/` music venture overview and channel links

## Stack

- Astro static site generation
- Plain Astro components and CSS custom properties
- Astro image optimization for local brand assets
- Playwright smoke tests for route, link, and responsive verification

## Local setup

```bash
npm install
npm run dev
```

Build the production output:

```bash
npm run build
```

Run smoke tests:

```bash
npx playwright install chromium
npm run test:e2e
```

## Content editing

- Site-wide metadata and navigation: `src/data/site.ts`
- Contact defaults: `src/data/contact.ts`
- Codeworks venture copy: `src/data/ventures.ts`
- App support entries: `src/data/apps.ts`
- Per-app privacy policies: `src/content/privacy/<slug>.md` (auto-builds at `/codeworks/privacy/<slug>/` and lists on the privacy index)
- Songworks process and channels: `src/data/songworks.ts`

Contact addresses (both provisioned and working):

- `hello@timetoady.com` (general/business)
- `support@timetoady.com` (app support)

For the full guide to adding an app privacy policy, see [CLAUDE.md](CLAUDE.md).

## Deployment quick start

The site deploys to Cloudflare Pages as static output.

1. First-time setup: `npx wrangler login`, then confirm with `npm run cf:whoami`.
2. Run `npm run deploy` (runs `npm run build`, then `wrangler pages deploy`).
3. Confirm HTTPS, support, and privacy URLs load publicly.
4. Update any Play Store listings to use the live `timetoady.com` URLs.

Cloudflare Pages config lives in `wrangler.jsonc`; response headers are in `public/_headers`.
Detailed operations steps live in [docs/operations.md](docs/operations.md).

## MCP tooling

This machine now has Codex MCP entries configured globally for:

- `context7`
- `playwright`

The setup commands and maintenance notes are documented in [docs/operations.md](docs/operations.md).
