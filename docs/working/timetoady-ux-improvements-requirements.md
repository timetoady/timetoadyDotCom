# timeToady.com — UX Improvements Requirements

> Working source of truth for the agent-driven UX review and the implementation that follows.
> Created during the **requirement-delivery-workflow**. Code edits are gated on developer approval
> of this document.

## Phase Status

- Intake and grounding: **complete**
- Requirements document creation: **complete (this file)**
- MVP delivery: **complete** — P0 + P1 implemented and verified by re-measurement + e2e
- Senior-dev pass: **complete** — risk-hardening + DRY sweep (see below)
- Independent critique and persona review: **complete** — fresh reviewer, verdict **PASS** (overall 8/10); see Quality-Gate Score History + Critique findings
- Quality-gate loop: **complete** — iteration 2 closed N1 + N2; N3/N4 accepted to backlog
- PR creation: **next**
- Review handling: not started
- Closeout: not started

## Summary

- Requirement source(s): developer request (chat) + agent-driven Playwright screenshot/measurement
  sweep + 4 persona reviews (UX expert, accessibility specialist, responsive/QA engineer, first-time visitor).
- Requirement doc path: `docs/working/timetoady-ux-improvements-requirements.md`
- Objective: Document, quantify, and propose fixes for the UX problems on timeToady.com, then
  implement the agreed fixes in priority order.
- User/developer problem: The site has several visible defects — the mobile menu shoves page content
  down, the hero-tech visual breaks at narrow widths, and the /codeworks "feature-split" renders a
  giant empty panel — plus systemic accessibility and information-architecture gaps that undercut a
  solo studio's credibility at exactly the moments real users arrive (mobile, app-support landing).
- Success criteria: every issue at severity ≥4 is fixed and verified by re-measurement; no AA
  contrast/motion blockers remain; the known three bugs are gone (measured, not just described);
  existing Playwright smoke tests still pass and new regression checks cover the headline fixes.

## Current State

- **Stack:** Astro 6.1.1, no UI-framework islands, single token-based stylesheet
  `src/styles/global.css` (~1480 lines), breakpoints at 1100 / 899 / 640px. Light + dark themes via
  `data-theme`; per-venture accents (Codeworks cyan `#44d6ff`, Songworks coral `#ff8a6c`).
- **Routes in scope:** `/`, `/codeworks/`, `/codeworks/apps/android-apps/`, `/songworks/`
  (privacy / 404 / apps-index reviewed lightly).
- **Testing:** Playwright already installed/configured (`playwright.config.ts`, `tests/e2e/smoke.spec.ts`)
  with Desktop 1440 / Tablet 1024 / Mobile 412 projects.
- **Evidence artifacts (this review, not committed):**
  `tests/e2e/ux-review/capture.mjs`, `tests/e2e/ux-review/measurements.json`,
  `tests/e2e/ux-review/shots/*.png` (20 full-page shots + menu-open variants across 1440/1024/412/360/320).
- **Known constraints:** static Bluehost hosting (no SSR), email-first support (no forms), minimal-JS
  ethos — fixes should stay CSS-first and reuse existing tokens where possible.

### Quantified evidence (measured)
- **Mobile menu:** opening it adds **+347px** to body height and shifts `<main>` top by **+347.28px**
  on every page at ≤899px (`measurements.json` → `menu.mainTopShiftPx`).
- **Hero-tech chips:** "codeworks"+"songworks" chips overlap by **3816–3922 px²** at 412/360/320 on
  home; 0 overlap at ≥1024.
- **/codeworks banner:** `.banner-frame--wide img` renders **2304px tall at every width**
  (fill ratio 0.25 → 0.12), i.e. a near-empty slab. `aspect-ratio: 16/9` is silently ignored.
- **No horizontal overflow** anywhere down to 320px (`docOverflowPx: 0`) — width handling is sound;
  the defects are vertical / overlap / interaction / contrast.
- **Contrast (computed, light theme):** accent eyebrow text cyan **1.53:1**, coral **2.07:1** vs the
  4.5:1 AA requirement; accent state glyph ≈ **1.6:1** vs 3:1.
- **No `prefers-reduced-motion`** handling exists for the perpetual hero ring-pulse + scanline.

## Scope and Defaults

- **In scope:** layout/interaction fixes (mobile menu, banner, hero-tech), AA accessibility blockers
  (accent contrast, non-text contrast, reduced motion), CTA/IA clarity, breakpoint consistency, and
  the content/discoverability adjustments below — across the four in-scope routes and shared
  components/global CSS.
- **Out of scope (unless promoted):** new pages (e.g. a dedicated About page — captured as a backlog
  item), rewriting site copy wholesale, redesigning the visual system, adding a support form/CMS,
  Play-Store URL wiring (separate launch task), 404/privacy deep polish.
- **Assumptions/defaults:** CSS-first fixes reusing existing tokens; no new dependencies; keep the
  existing minimal inline-JS menu approach (enhance, don't rewrite); preserve dark-theme contrast
  (already passing) while fixing light theme.

## Findings — Issue Register (severity × effort)

Severity: user impact 1–5 (5 = looks broken / blocks a real user). Effort: S (≤30min CSS), M (component-level), L (cross-cutting / content).
IDs are stable references for implementation and acceptance.

### P0 — Quick wins, highest impact (do first)

| ID | Issue | Sev | Effort | Location | Proposed fix | Acceptance |
|----|-------|-----|--------|----------|--------------|------------|
| **U1** | **/codeworks banner renders 2304px-tall empty slab.** `aspect-ratio:16/9` ignored because global `img` has no `height:auto` and `--wide` sets `max-height:none`; Astro emits intrinsic 4096×2304. | 5 | S | `global.css:94-98` (global img), `:1063-1066` (`.banner-frame--wide img`) | Add `height: auto` to the global `img` rule **and** replace `.banner-frame--wide img { max-height:none }` with a bounded `max-height` (reuse base `26rem`) + `object-fit:cover`, so the declared 16/9 actually applies. | Banner height ≤ ~26rem at all widths; measured ratio ≈ 1.78 (16/9), not 0.12–0.25; no empty void in `codeworks` shots. |
| **U2** | **Mobile menu pushes page content down +347px** (in-flow, no overlay/scrim/scroll-lock). | 5 | M | `SiteHeader.astro:67-91`, JS `:124-167`; `global.css:355-368` | Position `.site-mobile-menu` as an overlay anchored under the sticky header (`position:absolute; left/right:0; top:100%; z-index:29` — header is `z-index:30`), add `--shadow-md`, a backdrop scrim, body scroll-lock while open, and close on scrim/outside click. Drive via the existing `data-open` hook; keep current ARIA + Escape handling. | On open at 412/360/320, `mainTopShiftPx ≈ 0`; hero stays in place; scrim click + Escape close the menu; body doesn't scroll behind. |
| **A1** | **Accent eyebrow/label text fails AA contrast (1.4.3)** sitewide in light theme (cyan 1.53:1, coral 2.07:1). | 5 | S | `global.css:10-11` (tokens), `:476-485` (`.eyebrow/.pill/.section-label`) | Add light-theme `--section-accent-text` (and per-venture text variants) at ≥4.5:1 (e.g. cyan ≈ `#08607a`, coral ≈ `#9a3d27`); apply to text labels. Keep bright hues for large graphics/borders. | Eyebrow/label text ≥4.5:1 in light theme on home + codeworks + songworks; dark theme unchanged. |
| **A2** | **Accent non-text UI fails 1.4.11** (theme-toggle state glyph ≈1.6:1; accent badges/borders) in light theme. | 3 | S | `global.css:317-324` (toggle glyph), accent badges `:1174/:1208/:1299`, active border `:386-389` | Use the darker `--section-accent-text` for state-bearing glyphs/borders in light theme, or add a contrasting ring so they meet 3:1. | Toggle glyph + accent UI elements ≥3:1 in light theme. |
| **A3** | **No `prefers-reduced-motion` support** — perpetual hero ring-pulse + scanline + smooth-scroll. | 3 | S | `global.css:16` (smooth scroll), `@keyframes heroPulse/heroScan` `:1309/:1322`, applied `:725/:732/:741` | Add `@media (prefers-reduced-motion: reduce)` to disable hero animations/transitions and smooth scroll. | With reduce set, hero animations and smooth scroll are off; no layout change. |
| **U3** | **Hero-tech chips overlap at ≤412px** (~3800 px²); both venture chips land on the same `8.6rem` band. | 3 | S | `HomeHeroVisual.astro:12-14`; `global.css:678-686`, `:1386-1389`, `:1460-1466` | Either separate the two chips' vertical bands at ≤899px, or `display:none` the two venture chips below 640px (frame is `aria-hidden` decoration — no info lost; the legend/hero-signals already state the same facts). | 0 chip overlap at 412/360/320 in re-measurement; hero visual reads clean. |

### P1 — Clarity / IA / consistency (do next)

| ID | Issue | Sev | Effort | Location | Proposed fix | Acceptance |
|----|-------|-----|--------|----------|--------------|------------|
| **X1** | **App-support discoverability for a stressed user.** "Codeworks" jargon + music-led hero bury the support path; the app (RomajiOverlay) isn't named until the 3rd page. | 4 | M | `src/data/site.ts:12-17` (nav), `src/pages/index.astro:16-37` (hero), `src/pages/codeworks/index.astro:17-45` | Add a plainly-labeled support entry point reachable from home/nav (e.g. nav hint "Codeworks · Apps" / a "Installed an app? Get support" link); lead `/codeworks` with the existing "If you installed one of my apps, start here" message instead of burying it. | A first-time mobile user can reach the RomajiOverlay support email in ≤2 taps from home without decoding "Codeworks". |
| **U4** | **CTA hierarchy contradicts the "two equal ventures" framing** (home hero + venture cards rank Codeworks primary, Songworks secondary). | 3 | S | `index.astro:20-23`, `:53-64`; `global.css` button variants | Make the paired venture CTAs equal weight, differentiating by accent color (`--codeworks-accent`/`--songworks-accent`) rather than fill rank. | Home hero + venture cards present the two ventures as visual equals. |
| **X2** | **/codeworks is framed for support-seekers, not browsers**; the "What I've shipped" showcase competes with policy/support copy and reads administrative. | 3 | M | `src/pages/codeworks/index.astro` | Re-order: short "need app help? → Support" banner at top, then lead with the shipped-work showcase; demote developer-identity/policy copy. (Copy-level; coordinate with U1 which sits in the same block.) | Codeworks page leads with work/showcase; support path still one click away. |
| **R1** | **Breakpoint inconsistency:** `.proof-points` / `.hero-tech__legend` collapse at 1100px while everything else collapses at 899px → proof cards go narrow ~200px early. | 2 | S | `global.css:1335-1344` vs `:1346-1367` | Move the proof-points/legend collapse into the 899px block for one consistent column-collapse tier (or document 1100 as an intentional tier applied consistently). | Column collapses happen at one consistent breakpoint; no premature narrowing 900–1100px. |
| **D1** | **Footer inconsistency:** home shows full 3-col footer with nav; inner pages collapse to a thin compact bar (less navigation when deeper in the site). | 2 | S | `global.css:1007-1018`; footer component/`SiteFooter.astro` | Ensure inner-page footers expose Support + Privacy + the other venture (mid-weight footer site-wide). | Inner pages expose the key escape-hatch links in the footer. |

### P2 — Polish / backlog (batch or defer)

| ID | Issue | Sev | Effort | Notes |
|----|-------|-----|--------|-------|
| **A4** | Mobile menu doesn't move focus into the panel / no focus trap (non-modal, so not a hard A failure). | 2 | S | On open, focus first link; optionally trap Tab. Pairs with U2. |
| **U5** | Hero `h1` `max-width: 11ch` causes 5-line wrap + orphaned "one" at desktop (`global.css:453-456`). | 2 | S | Loosen to ~14–16ch or `text-wrap: balance`. |
| **U6** | Mobile hero: full-width stacked buttons + signal cards bury the visual; primary CTA partly clipped at first viewport. | 2 | S | Cap button width / reduce hero padding ≤640px. |
| **U7** | Songworks follow buttons are three identical secondaries (watch vs follow not distinguished). | 2 | S | Add platform icons / separate the one "watch" action. `songworks/index.astro:55-60`. |
| **X3** | App-support `mailto:` not prefilled — non-technical user must assemble a structured bug report. | 2 | S | Prefill subject + device/version checklist body. |
| **X4** | No About/bio destination for "who is this person?" visitors (name only in a codeworks side panel). | 2 | M | Backlog — likely a new page (out of current scope). |
| **A5** | Hero legend facts ("apps & games / original music / one developer") live inside the `aria-hidden` subtree. | 2 | S | Mostly mirrored by `.hero-signals`; expose if not duplicated. |
| **U8** | Theme toggle reads as a status ("light") not an action; accent dot can look like a notification. | 1 | S | Use sun/moon action affordance. |
| **C1** | "Our Fortress — out now" has no freshness cue near the title (date buried in caption; today 2026-06-12). | 1 | S | Surface release date / "Latest single". |

## Implementation Plan

- **Approach:** CSS-first, token-reusing fixes in `global.css` for U1, A1, A2, A3, U3, U4, R1, D1;
  component-level changes for U2 (SiteHeader markup + small JS for scrim/scroll-lock/focus) and the
  content/IA items X1/X2 (Astro pages + `site.ts`). Sequence: **P0 first** (each independently
  shippable), then P1, then batch P2 as capacity allows.
- **Behavior changes:** mobile menu becomes an overlay drawer (scrim + scroll-lock + outside-click
  close + focus-in); light-theme accent text/UI darkens; reduced-motion disables hero animation.
- **Risks/edge cases:** (1) `height:auto` on the global `img` rule could affect other images — verify
  every banner/logo/embed after the change (re-run the capture). (2) Overlay menu must keep working
  Escape/aria-current/auto-close-on-resize already present. (3) Darkening accents must not regress the
  already-passing dark theme — scope changes to light theme. (4) Re-ordering codeworks content (X2)
  overlaps the U1 block — do U1 first, then X2.

## Quality Rubric

Scored 1-10 by an agent that did not produce the work. Initial scores are the discovery-review baseline.

| Dimension | Baseline (as-is) | Target |
|-----------|------------------|--------|
| Correctness (fixes resolve the measured defects) | — | ≥8 |
| Scope-fit | — | ≥8 |
| Simplicity/DRY (CSS-first, token reuse) | — | ≥8 |
| Test coverage (regression checks for headline fixes) | — | ≥7 |
| UX/DX | 5 | ≥8 |
| Accessibility (tracked as its own dimension here) | 6 | ≥8 (no AA blockers) |
| Docs clarity | — | ≥8 |

- **Passing bar:** every dimension ≥7 and overall ≥8; **plus** a hard gate that all severity-5 issues
  (U1, U2, A1) are resolved and re-measured, and no AA contrast/motion blocker remains.
- Baseline per-persona scores: UX 5/10, Accessibility 6/10, Responsive 6/10, First-time visitor 6/10.

## Checkable TODOs

- [x] Create the requirements document file
- [x] Confirm current behavior and linked context (Playwright sweep + 4 persona reviews)
- [x] **Approve this document** → begin MVP
- [x] MVP P0: U1 banner height, U2 menu overlay, A1 accent text contrast, A2 non-text contrast, A3 reduced-motion, U3 chip overlap
- [x] MVP P1: X1 support discoverability, U4 CTA parity, X2 codeworks ordering, R1 breakpoint consistency, D1 footer
- [x] P2 backlog documented in `docs/working/timetoady-ux-backlog.md` (A4 folded into U2)
- [x] Add/extend Playwright regression checks — `tests/e2e/ux-regression.spec.ts` (U1 banner ratio, U2 menu no-shift, U3 chips hidden); stale smoke assertions corrected
- [x] Re-run the capture script and confirm measurements meet acceptance criteria
- [ ] Run senior-dev pass (risk-hardening + DRY sweep)
- [ ] Run independent critique + persona re-review
- [ ] Clear the quality bar via the quality-gate loop
- [ ] Create PR(s)
- [ ] Handle review comments
- [ ] Post closeout summary with PR links and QA notes

## Review wave 1 (developer feedback on MVP)

After reviewing the MVP the developer flagged five items; all fixed and re-verified (still pre-PR):
- **Menu scroll-jump (bug in the U2 overlay):** the drawer was `absolute` under a `sticky` header, so
  it anchored to the document top and opening it while scrolled jumped the page (compounded by
  `focus()` scrolling). Fixed by moving the drawer out of the header to a viewport-`fixed` overlay
  offset by a JS-measured `--header-height`, plus `focus({ preventScroll: true })`. Probe: scroll 600
  → open → still 600, drawer at viewport top.
- **Sticky header vanished on open (follow-up to the above):** the `overflow:hidden` scroll-lock
  removes the scroll container, which un-sticks `position:sticky` — the header dropped to its
  document-flow position and scrolled out of view. Fixed by pinning the header `position:fixed` while
  the menu is open and padding the body by `--header-height` so nothing shifts behind the scrim. Probe:
  header now at top:0/visible, `scrollHeight` unchanged. Covered by an added assertion in the U2
  follow-up regression test.
- **Hero-tech on mobile:** simplified to just the brand mark (chips + legend hidden ≤899px; the
  hero-signal cards already carry the info). Removes the cramped overlap.
- **Desktop banner "chin":** banner now fills its stretched column (`object-fit: cover`) on desktop and
  holds 16/9 only when stacked. Ratios: desktop 1.38 / tablet 1.15 / mobile 1.79 (no slab, no gap).
- **Featured Listen buttons:** `.channel-actions` grid — full-width "Watch on YouTube", then the two
  "Follow" buttons paired — replaces the ragged 2+1 flex-wrap on desktop. (Backlog U7.)
- **Button meta-text contrast:** `.button__meta` now derives from the button's own text colour instead
  of the panel `--muted` gray, fixing low contrast on the bright primary buttons. (Backlog A4 focus-in
  also folded into U2.)

## Senior-dev pass

**Risk / regression hardening:**
- Audited the global `img { height: auto }` change against every image on the site: all are brand
  icons with explicit CSS `width`/`height` (override it) or the banner (explicitly handled); `AppCard`
  has no image and the YouTube `iframe` is excluded. No risk.
- Confirmed the menu scroll-lock cleans up on close and on the mobile→desktop breakpoint change
  (`is-menu-open` removed → `overflow`/`padding-top` reverted, scroll position preserved).
- Added a reduced-motion regression test (A3 had shipped without coverage) — emulates
  `prefers-reduced-motion` and asserts the hero ring animation is neutralised.
- Verified A1 token wiring resolves to the dark inks in light theme (computed: home/codeworks
  `rgb(11,108,135)`, songworks `rgb(154,61,39)`); `.button__meta` now inherits the button's own text
  colour at 0.78 alpha. (Full contrast-ratio audit deferred to the independent critique.)

**DRY / minimal-code sweep:**
- Defined `--header-height` once as an `html` token (with JS overriding the live value on open) and
  dropped the three repeated `5.2rem` fallback literals in the drawer rules.
- No other duplication introduced; the new `.channel-actions` / scrim / drawer rules are single-purpose.

## Test and QA

- **Automated checks (after quality-gate iteration 2):** `npx playwright test` (now self-contained via a
  `webServer` block) → **31 passed, 8 skipped** (mobile-only tests skip on desktop/tablet) against the
  production build. `tests/e2e/ux-regression.spec.ts` covers U1 (banner not a slab), U2 (no shift on open
  + no scroll-jump when scrolled + header stays pinned), U3 (chips hidden), A3 (reduced-motion), A1
  (light-theme accent label luminance guard). Stale
  smoke assertions (home/codeworks/songworks headings, "Visit Songworks" link) were corrected to current
  copy — they had drifted from the earlier copy rewrite, independent of this work.
- **Re-measurement (MVP result, via `capture.mjs`):**
  - U2 menu shift: **347px → 0px** on every ≤899px page.
  - U3 hero chip overlap: **3816–3922 px² → 0** at 412/360/320.
  - U1 codeworks banner: **2304px tall (ratio 0.25) → 321px (ratio 1.78 = 16/9)**.
  - Horizontal overflow: still **0px** everywhere (no regression).
- **Manual QA:** re-run `node tests/e2e/ux-review/capture.mjs` (needs a server on :4321) and diff
  `measurements.json`; visual spot-checks confirmed the banner, menu overlay+scrim, darker eyebrows,
  and equal-weight CTAs.
- **Still to verify in senior-dev/critique:** light-theme contrast ratios re-measured against the new
  ink tokens; reduced-motion behaviour with the media emulated.

## PR and Review Tracking

- Repo and branch coverage: `timetoadyDotCom` — current branch `copy/visitor-facing-rewrite` (confirm
  target branch at PR time).
- PR links: _TBD_
- Reviewer automation status: _TBD (check repo for Copilot/CodeRabbit)_
- Review status: _TBD_
- Closeout status: _TBD_

## Critique findings (independent reviewer, post-MVP)

All 11 acceptance criteria (U1–U4, A1–A3, X1, X2, R1, D1) verified **met** with measured evidence;
all severity-5 issues resolved; no AA contrast/motion blocker (contrast pixel-sampled: light
5.06–6.52:1 text / 5.89:1 glyph, dark 6.9–11:1). New items found:

- **N1 (sev 3, DX):** `playwright.config.ts` baseURL is `127.0.0.1:4321`, but `astro dev` binds IPv6
  `localhost` only — so `npx playwright test` against the dev server fails with ERR_CONNECTION_REFUSED.
  `npm run test:e2e` still passes (it serves a `preview` build on 127.0.0.1), but standalone DX is brittle.
  Fix: add a Playwright `webServer` (or bind dev/baseURL consistently).
- **N2 (sev 3, test):** the severity-5 A1/A2 contrast fix has no regression test — a token tweak could
  silently reintroduce the blocker. Add a contrast assertion.
- **N3 (sev 2, UX):** home/venture CTAs are all `button--secondary` (parity achieved) → reads visually
  flat; consider one accent-filled CTA per pairing to restore call-to-action emphasis.
- **N4 (sev 1):** /codeworks hero uses primary+ghost while home uses two secondaries — same "Get app
  support" action styled differently across pages. Minor inconsistency.

## Quality-Gate Score History

- Iteration 0 (discovery baseline): UX 5, Accessibility 6, Responsive 6, First-time visitor 6.
- Iteration 1 (post-MVP + refinements + senior-dev pass; independent reviewer): Correctness 9,
  Scope-fit 9, Simplicity/DRY 8, Test coverage 7, UX/DX 7, Accessibility 9, Docs clarity 8 →
  **overall 8/10. PASS** (every dimension ≥7, overall ≥8, all sev-5 resolved, no AA blocker).
- Iteration 2 (quality-gate, N1 + N2 closed): added a Playwright `webServer` (so `npx playwright test`
  is self-contained on 127.0.0.1) and a deterministic A1 contrast regression test (luminance guard).
  `npx playwright test` standalone → **31 passed**. Test coverage 7 → **8**; DX improved.
- **Final scores:** Correctness 9, Scope-fit 9, Simplicity/DRY 8, Test coverage 8, UX/DX 7,
  Accessibility 9, Docs clarity 8 → **overall 8/10. PASS.**
- Accepted residual gaps (→ backlog): **N3** (flat all-secondary CTAs — visual emphasis), **N4**
  (CTA treatment differs home vs /codeworks). Both UX-polish, neither below the bar.

## Evidence appendix

- Screenshots: `tests/e2e/ux-review/shots/` (20 full-page + menu-open variants, 1440/1024/412/360/320).
- Measurements: `tests/e2e/ux-review/measurements.json`.
- Capture script: `tests/e2e/ux-review/capture.mjs` (throwaway / not part of the committed suite).
- Full per-persona critiques (UX expert, accessibility specialist, responsive/QA, first-time visitor)
  were produced during discovery and are summarized in the issue register above.
