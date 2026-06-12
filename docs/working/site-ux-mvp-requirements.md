# Requirements — timetoady.com UX MVP (P0 + P1)

- **Status:** Phase 9 (closeout) complete — shipped to branch `copy/visitor-facing-rewrite`; PR deferred per owner
- **Date:** 2026-06-11
- **Repo / branch:** `timetoadyDotCom` / `copy/visitor-facing-rewrite`
- **Primary source:** `sandbox/site-review.md` (consolidated 5-persona user review), §5 MVP scope
- **Dev server:** http://localhost:4321/ (running)

## Objective
Make timetoady.com less talky, easier to scan, and more trustworthy by executing the review's **P0 + P1** fixes — primarily **deleting** self-referential/meta copy, **reordering** so proof leads, **naming** RomajiOverlay on support/privacy, and an **accessibility baseline**. Keep one cohesive, software-first site; surface music more clearly without demoting the developer story. **No visual redesign.**

## Decisions (owner-confirmed)
- **Nav → 4 items:** Home · Codeworks · Songworks · Support. Apps + Privacy leave the top nav, stay reachable via footer + Codeworks page. (Also fixes the double-active bug.)
- **Home:** software-first; clearer music path (heavier Songworks card + "Listen to Our Fortress" hero action). Not co-equal.
- **PR:** deferred — do not open until owner says so.

## Scope
**In:** P0 (1–4) + P1 (5–8), plus low-risk adjacent a11y polish (aria-current, descriptive link labels, footer `<h2>` demote, decorative `alt=""`).
**Out (next phase / not MVP):** dedicated UX-flow agent review; visual restyle; per-card release/demo badges & external integrations (P2-11); per-app dedicated pages beyond a single RomajiOverlay block.

## Work items (checkable)

### A. Copy cut — text only (P0-1, P1-8)
- [ ] A1 `pages/codeworks/apps/index.astro:30` → "Android support hub — covers RomajiOverlay and future timetoady Android apps."
- [ ] A2 `apps/index.astro:73-77` "Why it's here" panel → delete.
- [ ] A3 `apps/index.astro:45-52` "Coming soon" panel → trim to one plain line.
- [ ] A4 `pages/songworks/index.astro:50-56` featured-listen → drop "wall of embeds" framing (refocus in G).
- [ ] A5 `data/songworks.ts:52-53` summary → "Our Fortress is the latest release — press play. The full catalog lives on the channel."
- [ ] A6 `pages/index.astro:18-22` hero lede → one sentence: "I build Android apps and games under Codeworks, and write and release music under Songworks."
- [ ] A7 `index.astro:78-123` "two reasons" → drop preamble; collapse to two audience cards (rebalanced per G).
- [ ] A8 `pages/codeworks/index.astro:84-87` → heading "What I've shipped"; subhead "Public projects — code and downloads, all live now."
- [ ] A9 Dedupe "a real person reads the inbox" → keep in one place only.

### B. Reorder Codeworks page (P0-2)
- [ ] B1 Move the projects grid section to first under `PageHero`, above the banner feature-split and the Android hub.

### C. Name RomajiOverlay + privacy (P0-3, P1-7)
- [ ] C1 `data/apps.ts`: surface RomajiOverlay on the android-apps hub (name, GitHub link, on-device privacy one-liner, support email) — within existing structure, no new page.
- [ ] C2 `pages/codeworks/privacy/index.astro:86-90`: replace TODO bullets with present-tense RomajiOverlay statement; remove internal checklist.

### D. Accessibility baseline + adjacent polish (P0-4, P2-12/13, P3-14/16)
- [ ] D1 `layouts/BaseLayout.astro`: skip-link as first `<body>` child + `id="main-content"` on `<main>`.
- [ ] D2 `styles/global.css`: add `.skip-link` + `.sr-only`; add `:focus-visible { outline: 2px solid var(--text); outline-offset: 2px; }` for links/buttons/nav.
- [ ] D3 `components/SiteHeader.astro:28-31,64-67`: fix active logic (exact/longest match) → single active item; add `aria-current="page"`.
- [ ] D4 `components/SiteFooter.astro:48`: demote home `<h2>` → `<p class="footer-tagline">`.
- [ ] D5 `pages/codeworks/index.astro`: descriptive `aria-label` per project GitHub link; decorative banner `alt=""`.

### E. Nav restructure (P1-5)
- [ ] E1 `data/site.ts` `navItems` → `[Home, Codeworks, Songworks, Support]`.
- [ ] E2 Ensure Apps + Privacy reachable from footer (add to `SiteFooter.astro` if missing); Codeworks page already links both.

### F. Claim AI/MCP identity (P2-9)
- [ ] F1 Codeworks identity block + home hero-signal → "Software engineer (front-end roots) building apps, games, and AI tooling — MCP servers, agent workflows, and Android apps." + one framing line on the shipped-work intro.

### G. Surface music without demoting dev (P1-6 + home balance)
- [ ] G1 `pages/songworks/index.astro` hero: name "Our Fortress" + Listen CTA; promote Spotify/YouTube/iHeartRadio to a button row; move process section lower.
- [ ] G2 `pages/index.astro` hero: add "Listen to Our Fortress" ghost button; give the Songworks/listener card more visual weight (software still leads).

## Acceptance criteria
- All cut-list strings gone (grep clean): "small on purpose", "Rather than pad out", "not a placeholder", "wall of embeds", "current public listening anchor", "two reasons"/"Both are one click away", "actually shipped", privacy TODO bullets.
- Top nav renders exactly **4** items; exactly **one** `aria-current="page"` per page (incl. `/codeworks/apps/`).
- Skip-link present (first focusable), targets `#main-content`; visible focus ring on keyboard focus for links/buttons/nav.
- Codeworks: projects grid is the **first** section under the hero; heading is "What I've shipped".
- RomajiOverlay named on **both** the apps hub and the privacy page (present tense).
- Songworks hero names "Our Fortress" with a follow-button row; home hero has a Listen action.
- Apps + Privacy reachable from the footer.
- Single `<h1>` per page preserved; no new contrast/landmark regressions.

## Test / QA expectations
- `npm run build` green (8 pages) after each chunk and at the end.
- DOM/preview assertions at localhost:4321 for each acceptance criterion (nav count, aria-current count, skip-link, section order, named app, hero CTAs).
- `grep` repo for the cut-list strings → zero hits.
- Optional `npm run test:e2e` (Playwright smoke) for routes/links/responsive.

## Quality rubric (passing bar: every dimension ≥ 7, overall ≥ 8)
| Dimension | Bar | Evidence |
|---|---|---|
| Correctness | ≥7 | build green; acceptance criteria met; DOM assertions pass |
| Scope-fit | ≥7 | only P0+P1 (+noted polish); nothing out-of-scope touched |
| Simplicity/DRY | ≥7 | minimal diff; reuse existing classes/components; no dup copy |
| Test coverage | ≥7 | build + DOM checks; optional Playwright smoke |
| UX/DX | ≥7 | persona review confirms less-talky, scannable, music findable |
| Docs clarity | ≥7 | this doc + closeout current and accurate |
Scored by an agent that did **not** write the work.

## Phase tracking
| Phase | Status |
|---|---|
| 1 Intake & grounding | done |
| 2 Requirements doc | done |
| 3 MVP delivery | done |
| 4 Senior-dev pass | done |
| 5 Independent critique + persona | done — 8.2/10 PASS |
| 6 Quality-gate loop | **done — 8.7/10 PASS** |
| 7 PR creation | deferred (owner) |
| 8 Review handling | deferred (with PR) |
| 9 Closeout | pending |

## MVP delivery results (Phase 3)
All items A–G implemented on `copy/visitor-facing-rewrite`. Verified:
- `npm run build` green (8 pages); cut-list grep returns **no matches**.
- DOM assertions (live dev server): nav = 4 items with exactly one `aria-current`; skip-link + `main#main-content` present; Codeworks first section = "What I've shipped."; 5 project links have descriptive `aria-label`s; banner `alt=""`; `/codeworks/apps/` shows a single active item (double-active fixed); RomajiOverlay named on apps hub + privacy; privacy TODO bullets gone; Songworks hero "Our Fortress — out now." with Watch YouTube / Follow Spotify / Follow iHeartRadio; home hero "Listen to Our Fortress"; footer `<h2>` demoted; Apps + Privacy present in footer.
- Note: also removed a second "Rather than pad out a fake catalog" line on the Codeworks app-hub section (a duplicate of the apps-page copy) — not in the original cut list but same issue class.
- Not yet committed (await senior-dev pass + critique before committing the batch).

## Senior-dev pass results (Phase 4)
- **Risk fix:** removed `border-radius: 4px` from the global `:focus-visible` rule — it would change each element's own corner radius on focus (shape-shift), a regression. Outline follows native radius without it.
- **DRY:** removed the redundant Songworks "Channels" section (the same 3 platforms were already promoted as follow buttons by the featured song); Contact panel now names the platforms once in text. Removed the CSS this orphaned: `.channel-list`, `.channel-list a`, `.split-emphasis__aside`, `.kicker-line`.
- **Reviewed, no change:** active-state logic (single correct active item across all routes); nav/footer link integrity; `songworksChannels` button mapping. The duplicated desktop/mobile nav `map` blocks share one `activeHref` now — remaining duplication is presentational only; extracting judged not worth the added indirection.
- Build green (8 pages) after cleanup.

## Independent critique results (Phase 5)
Fresh reviewer (did not write the code) + persona walkthroughs + live a11y checks. **All 5 personas can complete their goal; a11y baseline verified live** (skip-link reveals on focus, focus ring present, single `aria-current`).

Rubric: Correctness 9 · Scope-fit 9 · Simplicity/DRY 7 · Test coverage 7 · UX/DX 8 · Docs clarity 9 → **Overall 8.2 — PASS** (bar = each ≥7, overall ≥8).

Above-bar gaps worth closing (all cheap, on the "less talky/DRY" goal):
1. **Home restates the apps/music split twice** — the "One name, two things I make" venture-grid and the "For app users / For listeners" spotlight grid are redundant (index.astro). Fix: merge to one (keep the spotlight grid with the better CTAs).
2. **"A human reads your email" stated ~2× per page** — home (lede + homeHighlights) and Codeworks (hero aside + feature-split). Fix: once per page.
3. **Ops-copy "Where links should point" / "Store listings should point…"** on `/codeworks/apps/` aside and `/codeworks/` "Linking guidance" panel — developer-ops talk, not user help. Fix: delete from user-facing pages.
4. **Dead code** — `trustSignals` export (self-flagged unused) + `siteConfig.description` still says "front-end developer" (unrendered but stale). Fix: delete trustSignals; update description to the AI/MCP identity.
5. (Fast-follow, not MVP) `/codeworks/support/` never names RomajiOverlay — add a one-line pointer to the android-apps hub.

Independent scorer agent id for re-scoring after fixes: a40f7a768d2623bcf.

## Quality-gate loop results (Phase 6)
One bounded iteration closed gaps 1–4 (independent re-scorer, not the author):
- Home: removed the duplicate "One name, two things I make" section (dropped unused `ventures` import).
- Deduped "a human reads your email" to once per page (home + Codeworks).
- Deleted dev-ops panels ("Where links should point" on apps; "Linking guidance" on Codeworks); apps directory now single-column.
- Removed dead `trustSignals` export; updated `siteConfig.description` to the software-engineer/AI identity.

**Score history:** 8.2 → **8.7** (PASS). Correctness 9 · Scope-fit 9 · Simplicity/DRY 7→**9** · Test coverage 7 · UX/DX 8→**9** · Docs clarity 9. Loop stopped: bar cleared, remaining sub-9 (test coverage, 7) is automated-test scope, out of cycle. Build green (8 pages); removed-string grep clean.

## Closeout (Phase 9)
**Delivered:** the review's P0+P1 UX MVP — global talky/meta copy cut; Codeworks reordered so "What I've shipped" leads; RomajiOverlay named on the apps hub + present-tense privacy; a11y baseline (skip-link, focus ring, single `aria-current`, descriptive link labels, demoted footer `<h2>`, decorative `alt=""`); nav trimmed to 4 (Apps/Privacy → footer); AI/MCP identity claimed; music surfaced (Songworks hero leads with "Our Fortress" + follow buttons; home Listen action + rebalanced audience grid) while keeping software-first.

**Quality:** independent critique 8.2 → quality-gate re-score **8.7/10 PASS** (each dimension ≥7, overall ≥8).

**Verification:** `npm run build` green (8 pages); cut-list + removed-string greps clean; live DOM/preview assertions across all pages; skip-link reveal + focus-ring confirmed live.

**QA guidance (manual smoke):** load `/`, `/codeworks/`, `/codeworks/apps/`, `/codeworks/support/`, `/codeworks/privacy/`, `/songworks/`; confirm 4-item nav with one active item per page; Tab from page top reveals "Skip to content"; Codeworks leads with the projects grid; Songworks plays "Our Fortress" and the follow buttons work; footer exposes Apps + Privacy. Optional: `npm run test:e2e` (Playwright smoke). 

**Shipped to:** branch `copy/visitor-facing-rewrite` (committed + pushed). **PR: deferred per owner — not opened.**

## Fast-follow backlog (post-MVP, not this cycle)
- **Songworks services / commissions** — emphasize offering custom song tracks & jingles (collaboration-for-hire). New scope, not a review fix; warrants its own mini-intake (services scope, inquiry-only vs. pricing, on-brand with dev-first lean), a **new "prospective client" persona review**, and a Songworks rearrangement (a "Work with me / Commissions" block or page + clear CTA). Seed already exists in the Songworks Contact panel ("collaborate, license a track…"). Owner decision 2026-06-11: file as dedicated fast-follow after this MVP.
- **UX-flow agent review** — dedicated persona review focused on end-to-end UX flow (already deferred at project kickoff).

## Risks / open items
- Removing Apps/Privacy from top nav must not orphan them — verify footer links (E2).
- Reordering Codeworks sections must not break the banner/image layout — build + visual check.
- "Listen to Our Fortress" + follow buttons reuse existing `.button` classes — no new styles needed.
