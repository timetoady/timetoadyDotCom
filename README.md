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
- Songworks process and channels: `src/data/songworks.ts`

The current launch uses default email placeholders:

- `hello@timetoady.com`
- `support@timetoady.com`

Provision those mailboxes before publishing, or replace them in the data layer.

## Deployment quick start

1. Run `npm run build`.
2. Upload the contents of `dist/` to Bluehost `public_html`.
3. Confirm HTTPS, support, and privacy URLs load publicly.
4. Update any Play Store listings to use the live `timetoady.com` URLs.

Detailed operations steps live in [docs/operations.md](/Users/adama/git%20repos/timetoadyDotCom/docs/operations.md).

## MCP tooling

This machine now has Codex MCP entries configured globally for:

- `context7`
- `playwright`

The setup commands and maintenance notes are documented in [docs/operations.md](/Users/adama/git%20repos/timetoadyDotCom/docs/operations.md).
