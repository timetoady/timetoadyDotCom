# Future projects backlog

Ideas queued after the 2026-07-10 launch. Each should run as its own effort
(see `docs/working/privacy-pattern-and-launch-requirements.md` for the delivery pattern used last time).

## 1. Auto-update featured Songworks track from YouTube

When a new track is published on the timetoady Songworks channel
(`UCuK_Hk5ogRXtpDhI4zL-FJA`), the featured embed on `/songworks/` should update
without a manual edit.

- Today: hardcoded `SongworksFeaturedMedia` in `src/data/songworks.ts`, rendered as a
  youtube-nocookie embed; smoke test pins the video ID.
- Likely shape: build-time fetch of the channel's no-auth RSS feed
  (`https://www.youtube.com/feeds/videos.xml?channel_id=UCuK_Hk5ogRXtpDhI4zL-FJA`) +
  a scheduled rebuild/redeploy (GitHub Action cron running `npm run deploy` with
  `CLOUDFLARE_API_TOKEN` as a secret, or a Cloudflare deploy hook).
- Watch-outs: fallback to the last known entry when the fetch fails; the human-written
  `summary` line may stay manual; un-pin the video ID in `tests/e2e/smoke.spec.ts`.

## 2. Easy add-an-app scaffold

Adding an app should be as easy as adding a privacy policy (one markdown file).

- Today: hand-edit `src/data/apps.ts` (`AppEntry`), optionally `src/data/projects.ts`,
  plus a privacy markdown in `src/content/privacy/`.
- Likely shape: an interactive `npm run new:app` script that prompts for the AppEntry
  fields with sensible defaults (support email from `contact.ts`; privacy URL pointing at
  `/codeworks/privacy/<slug>/`), appends to `apps.ts`, optionally scaffolds the privacy
  stub and a projects entry, and reminds about the smoke-test route.
- Watch-out: generated placeholder copy must follow the CLAUDE.md "Copy voice" rules.
