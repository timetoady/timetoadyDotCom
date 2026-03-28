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

## Bluehost deployment

### Recommended workflow

1. Run `npm run build`.
2. Verify `dist/` includes:
   - `index.html`
   - `codeworks/index.html`
   - `codeworks/apps/index.html`
   - `codeworks/apps/android-apps/index.html`
   - `codeworks/support/index.html`
   - `codeworks/privacy/index.html`
   - `songworks/index.html`
3. Back up the existing Bluehost `public_html` contents before replacing anything.
4. Upload the contents of `dist/` into `public_html`.
5. Verify the site over HTTPS on the live domain.

### SSH/SCP path

If Bluehost shell access is enabled, use a CLI flow like this:

```bash
npm run build
scp -r dist/* USER@HOST:~/public_html/
```

Recommended shell-side backup before replacing files:

```bash
ssh USER@HOST
mkdir -p ~/site-backups/timetoady-$(date +%Y%m%d-%H%M%S)
cp -a ~/public_html/. ~/site-backups/timetoady-$(date +%Y%m%d-%H%M%S)/
```

If you need a fully clean replacement, move the old site contents aside after backing them up, then copy in the new `dist/` output.

### SFTP or cPanel fallback

If shell access is unavailable:

1. Build locally with `npm run build`.
2. Upload the contents of `dist/` using cPanel File Manager or SFTP.
3. Preserve the directory structure exactly as generated.
4. Re-check support and privacy routes after upload.

## Post-deploy smoke check

Confirm these URLs load publicly:

- `https://timetoady.com/`
- `https://timetoady.com/codeworks/`
- `https://timetoady.com/codeworks/apps/`
- `https://timetoady.com/codeworks/apps/android-apps/`
- `https://timetoady.com/codeworks/support/`
- `https://timetoady.com/codeworks/privacy/`
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
- [Bluehost shell/public_html reference PDF](https://www.bluehost.com/static/downloads/blueprint-pro-guide.pdf)
