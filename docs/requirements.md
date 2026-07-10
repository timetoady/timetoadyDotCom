# timetoady.com Requirements

## Goals

- Present timetoady as a solo studio with two public ventures: Codeworks and Songworks.
- Give Play Store visitors a credible developer destination with support and privacy coverage.
- Keep launch architecture static and host-agnostic (deployed via Cloudflare Pages).
- Preserve a clean path to later data-backed expansion, including Supabase.

## In-scope v1 deliverables

- [x] Astro static site scaffolded in this repo
- [x] Shared brand shell and custom light-theme design system
- [x] Home page with Codeworks-first positioning
- [x] Codeworks overview page
- [x] App support index page
- [x] Launch app support detail page at `/codeworks/apps/android-apps/`
- [x] Support page at `/codeworks/support/`
- [x] Privacy page at `/codeworks/privacy/`
- [x] Songworks overview page
- [x] Build-time image optimization and basic metadata
- [x] Robots and sitemap generation
- [x] README, requirements doc, and operations runbook
- [x] Playwright smoke tests
- [x] Codex MCP entries added globally for Context7 and Playwright

## Launch assumptions currently implemented

- [x] Site structure uses one main domain with venture subpaths
- [x] Launch stack is Astro with static output
- [x] Brand posture is solo-business, not personal resume
- [x] Support flow is email-first
- [x] Songworks launches as overview plus outbound links
- [x] App support launches with an umbrella Android support page

## Content defaults that still need owner confirmation

- [x] Confirm final support mailbox to publish on the live site (`support@timetoady.com` — confirmed working 2026-07-10)
- [x] Confirm final general/business mailbox to publish on the live site (`hello@timetoady.com` — confirmed working 2026-07-10)
- [ ] Replace the umbrella app support entry with real app-specific listings once they exist
- [ ] Add live Play Store URLs when public app listings are available
- [ ] Expand privacy disclosures before launching any app that uses analytics, accounts, ads, or remote storage

## Cloudflare Pages launch checklist

- [ ] Confirm domain DNS for `timetoady.com` points at Cloudflare
- [ ] Confirm SSL/TLS is active in Cloudflare
- [ ] Authenticate Wrangler (`npx wrangler login`; verify with `npm run cf:whoami`)
- [ ] Deploy a fresh build with `npm run deploy`
- [ ] Smoke-test homepage, Codeworks, support, privacy, Songworks, and app support routes
- [ ] Update Play Store developer profile and any app listings with live support/privacy URLs

## Future-ready follow-ons

- [ ] Add per-app data entries and generated pages as releases go live
- [ ] Add a Songworks release catalog if maintaining one becomes worthwhile
- [ ] Introduce Supabase only when there is a concrete data or admin need
- [ ] Add a form or backend support workflow only if email-first becomes limiting
