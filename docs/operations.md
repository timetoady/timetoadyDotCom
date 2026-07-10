# Operations Guide

## Local development

Install and run the site:

```bash
npm install
npm run dev
```

Create the production build:

```bash
npm run build
```

The output folder is `dist/`.

## Playwright testing

Install the browser runtime once:

```bash
npx playwright install chromium
```

Run smoke tests:

```bash
npm run test:e2e
```

Current smoke coverage checks:

- top-level routes render
- support and privacy actions exist
- homepage navigation works across desktop, tablet, and mobile viewport presets

## Codex MCP setup

This machine now has the following global Codex MCP entries enabled:

```bash
codex mcp list
```

Configured servers:

- `context7` via `npx.cmd -y @upstash/context7-mcp`
- `playwright` via `npx.cmd -y @playwright/mcp`

Recreate them manually if needed:

```bash
codex mcp add context7 -- npx.cmd -y @upstash/context7-mcp
codex mcp add playwright -- npx.cmd -y @playwright/mcp
```

Notes:

- These are user-level Codex settings, not repo files.
- No API secrets were committed into this repository.
- If `codex mcp add` fails because `config.toml` is locked, retry sequentially instead of in parallel.

## Cloudflare Pages deployment

The site ships as static output to Cloudflare Pages. Config lives in `wrangler.jsonc`
(`pages_build_output_dir: dist`); response headers live in `public/_headers`.

### One-time setup

1. Authenticate Wrangler: `npx wrangler login` (opens a browser OAuth flow).
2. Confirm the session: `npm run cf:whoami`.

### Recommended workflow (Wrangler CLI)

1. Verify `dist/` includes the expected routes after a build (`npm run build`):
   - `index.html`
   - `codeworks/index.html`
   - `codeworks/apps/index.html`
   - `codeworks/apps/android-apps/index.html`
   - `codeworks/support/index.html`
   - `codeworks/privacy/index.html`
   - `codeworks/privacy/indigo-blast/index.html`
   - `songworks/index.html`
2. Deploy with `npm run deploy` (runs `npm run build`, then `wrangler pages deploy`).
   The first deploy creates the `timetoady` Pages project.
3. Verify the site over HTTPS on the preview URL, then on the live domain.

### Git-connected alternative

Instead of the CLI, the repo can be connected in the Cloudflare Pages dashboard with
build command `npm run build` and output directory `dist`; pushes then deploy automatically.

## Adding an app privacy policy

One markdown file: `src/content/privacy/<slug>.md` auto-builds at `/codeworks/privacy/<slug>/`
and auto-lists on `/codeworks/privacy/`. Frontmatter schema, body conventions, and verification
steps are documented in [CLAUDE.md](../CLAUDE.md) ("Adding an app privacy policy"); the Indigo
Blast file is the working reference. Source policies are authored in each app's own repo
(`docs/privacy/privacy-policy.md`) and copied here when the app is ready.

## Post-deploy smoke check

Confirm these URLs load publicly:

- `https://timetoady.com/`
- `https://timetoady.com/codeworks/`
- `https://timetoady.com/codeworks/apps/`
- `https://timetoady.com/codeworks/apps/android-apps/`
- `https://timetoady.com/codeworks/support/`
- `https://timetoady.com/codeworks/privacy/`
- `https://timetoady.com/codeworks/privacy/indigo-blast/`
- `https://timetoady.com/songworks/`

Also verify:

- SSL is active
- favicon loads
- sitemap exists
- support email links open correctly
- any Play Store links are updated once real app listings exist

## References

- [Astro deploy docs](https://docs.astro.build/en/guides/deploy/)
- [Play Console developer account details](https://support.google.com/googleplay/android-developer/answer/139626/manage-your-developer-account-information?hl=en-GB)
- [Google Play privacy policy requirement](https://support.google.com/googleplay/android-developer/answer/16944162?hl=en)
- [Cloudflare Pages deploy docs](https://developers.cloudflare.com/pages/)
- [Wrangler CLI docs](https://developers.cloudflare.com/workers/wrangler/)
