# Requirements: Scalable App Privacy Policies + Cloudflare Launch Readiness

> Working source of truth for this effort. Delivered via the requirement-delivery-workflow
> (gated phases, live tracker, independent critique, quality-gate loop).

## Phase Status

- Intake and grounding: **complete**
- Requirements document creation: **complete**
- MVP delivery: **complete** (build green, 37 e2e tests pass, 8 mobile-only skips)
- Senior-dev pass: **complete** (fixed date TZ off-by-one + regression test; DRY sweep clean)
- Independent critique and persona review: **complete** (independent reviewer 9/10 overall, all dims >=8; browser persona pass clean)
- Quality-gate loop: **complete** (closed cheap gaps; above bar)
- PR creation: **complete** (PR #2)
- Review handling: **skipped by developer decision** (solo repo, no Copilot reviewer available; independent agent review + green tests stand in)
- Closeout: **complete** (2026-07-10)

## Summary

- **Requirement source(s):** Developer request (chat) + `/requirement-delivery-workflow` invocation; approved plan at `~/.claude/plans/we-are-prepping-this-playful-whale.md`.
- **Requirement doc path:** `docs/working/privacy-pattern-and-launch-requirements.md`
- **Objective:** Give `timetoady.com` a scalable, data/markdown-driven pattern for hosting per-app privacy policies (seeded with a real Indigo Blast policy), make the repo Cloudflare-deploy-ready via the wrangler CLI, and complete a launch-readiness sweep removing stale/contradictory content.
- **User/developer problem:** Privacy is one hand-written page that can't scale to multiple apps; the repo is documented for Bluehost but is meant to publish via Cloudflare (no config, no authed CLI). The site needs to be launch-ready.
- **Success criteria:**
  1. Adding a new app policy = drop one markdown file (+ frontmatter); page auto-builds at `/codeworks/privacy/<slug>/` and auto-lists on the privacy index. No new component/route needed.
  2. Indigo Blast policy renders correctly at `/codeworks/privacy/indigo-blast/` and is linked from the index.
  3. Repo is Cloudflare Pages ready: `wrangler` installed (global + local pin), `wrangler.jsonc` + `_headers` present, deploy script works; `wrangler whoami` succeeds (DONE — Account API Token via `CLOUDFLARE_API_TOKEN`, Pages access confirmed).
  4. No contradictory Bluehost references remain in shipped copy/docs.
  5. `npm run build` and `npm run test:e2e` pass, including new privacy-route coverage.

## Current State

- **What exists already:** Astro 6 static site (`dist/` output, `trailingSlash: 'always'`, plain global CSS, data modules in `src/data/*.ts`). Single privacy page at `src/pages/codeworks/privacy/index.astro` (site policy + hardcoded RomajiOverlay disclosure, `Last updated` hardcoded). `AppEntry.privacyPolicyUrl` is a plain string all pointing at `/codeworks/privacy/`. No content collections (`src/content.config.ts` absent). Playwright smoke tests in `tests/e2e/smoke.spec.ts`.
- **Relevant repos/workspaces:** `timetoadyDotCom` (this repo). Source policy: `../indigoBlast/docs/privacy/privacy-policy.md` (authored locally, **uncommitted**, not on GitHub).
- **Known constraints:** Static SSG (no server). `trailingSlash: 'always'`. Node >= 22.12. `wrangler` not installed / not authenticated on this machine. Site may go live before apps ship; no nav link to policies required yet.
- **Supplemental context used:** README, `docs/operations.md`, `docs/requirements.md`, three Explore-agent surveys of the site, app repos, and Cloudflare/stale-copy state.

## Scope and Defaults

- **In scope:**
  - Astro content collection `privacy` + Zod schema (`src/content.config.ts`).
  - Seed `src/content/privacy/indigo-blast.md` (verbatim body from app repo; TODOs resolved; date in frontmatter).
  - Dynamic route `src/pages/codeworks/privacy/[slug].astro`.
  - Privacy index (`.../privacy/index.astro`) gains an "App privacy policies" listing; stays the site/general policy.
  - `.policy-prose` CSS for rendered-markdown styling.
  - Cloudflare: `wrangler` devDep, `wrangler.jsonc`, `public/_headers`, deploy npm scripts.
  - Sweep: reconcile Bluehost→Cloudflare in README/docs + live privacy copy; fix README's absolute-path doc links.
  - Tests: smoke coverage for the new route + index listing.
- **Out of scope:**
  - Authoring the other apps' policies (FoodStorageLite, Break Battle, Morse/Aldis) — that's per-app repo work.
  - Adding Indigo Blast to `apps[]` or `projects[]` (unreleased game).
  - Nav links to per-app policies.
  - Actually running `wrangler login` / deploying (developer performs auth; deploy is a checkpoint).
  - Committing/pushing changes in the `indigoBlast` repo.
- **Assumptions/defaults chosen:**
  - Policy URL: `/codeworks/privacy/<slug>/` (locked with developer).
  - Cloudflare **Pages** (static), CLI setup now (locked).
  - Seed Indigo Blast now (locked); page live pre-release is acceptable (locked).
  - Slug = markdown filename; support email defaults to `contact.supportEmail`.
  - RomajiOverlay stays covered by the site policy for now (no `apps.ts` change).

## Implementation Plan

- **Approach:** See approved plan. Content-collection + dynamic-route pattern mirrors the existing `apps.ts` + `[slug].astro` idiom; reuse `BaseLayout`, `PageHero` (`variant="document"`), and `.policy-*` styles.
- **Public interface / behavior changes:** New routes `/codeworks/privacy/<slug>/`; privacy index gains a policies list; new `deploy`/`wrangler` npm scripts; new Cloudflare config files.
- **Important internal changes:** First content collection in the repo; small CSS addition; doc/copy edits.
- **Risks / edge cases:**
  - `index.astro` + `[slug].astro` co-location — verify no route collision and index isn't shadowed.
  - Rendered markdown must be styled (headings/lists/links/`code`) to match hand-authored sections.
  - `_headers` must not over-cache HTML (only hash-named assets).
  - Sitemap should include the new pages.
  - Resolve the app policy's two TODO placeholders (email + hosted URL) when seeding.

## Quality Rubric

Dimensions scored 1-10. **Passing bar: every dimension >= 7 and overall >= 8.**

- Correctness: builds, routes render, tests pass, markdown styled.
- Scope-fit: matches locked decisions; nothing out-of-scope added.
- Simplicity/DRY: reuses existing layout/CSS; minimal new surface.
- Test coverage: new route + index listing covered by Playwright; build verified.
- UX/DX: policy pages readable and navigable; "add a policy" is genuinely one-file easy (DX).
- Docs clarity: README/docs consistent (Cloudflare), "how to add a policy" documented.

## Checkable TODOs

- [x] Create the requirements document file
- [x] Confirm current behavior and linked context
- [x] Add `src/content.config.ts` (privacy collection + schema)
- [x] Seed `src/content/privacy/indigo-blast.md`
- [x] Add `src/pages/codeworks/privacy/[slug].astro`
- [x] Update `src/pages/codeworks/privacy/index.astro` (policies listing + Cloudflare copy)
- [x] Add `.policy-prose` styles to `src/styles/global.css`
- [x] Add `wrangler` devDep + `wrangler.jsonc` + `public/_headers` + deploy scripts
- [x] Reconcile Bluehost→Cloudflare in README/docs; fix README doc links
- [x] Add Playwright smoke coverage; run `npm run build` + `npm run test:e2e`
- [x] Run senior-dev pass (date TZ fix + regression test; CSP intentionally deferred)
- [x] Run independent critique and persona/UX review (9/10, above bar)
- [x] Clear the quality bar via the quality-gate loop (final overall 9)
- [x] Copy review board (3 parallel reviewers) + apply approved de-AI-smell edits: cut Support-promise section, "Coming soon" panel, "Room to grow"/"Made to grow"/"Future additions" roadmap copy, methodology FAQ; rewrote support/privacy/apps heroes, footer taglines, Songworks process intro + at-a-glance, ventures bullets, homeHighlights, 404; updated smoke-test heading assertion
- [x] Create PR (#2)
- [x] Handle review comments (skipped by developer decision — solo repo)
- [x] Post closeout summary with PR and QA notes

## Open items for developer (external facts / actions)

- [x] `hello@timetoady.com` / `support@timetoady.com` mailboxes confirmed working (2026-07-10).
- [ ] Is RomajiOverlay's Play Store listing live? If so, provide URL for `apps.ts` `playStoreUrl`.
- [ ] Keep or cut the "Coming soon" apps panel at launch?
- [x] Wrangler auth configured (global install; `CLOUDFLARE_API_TOKEN` Account API Token; Pages access confirmed via `wrangler pages project list`).
- [ ] At deploy time: first `wrangler pages deploy` creates the `timetoady` Pages project; then map the `timetoady.com` apex custom domain to it (account already hosts `auth.timetoady.com`).
- [ ] Cross-repo follow-up: commit/push `indigoBlast` policy and set its "Hosted at" URL to `/codeworks/privacy/indigo-blast/`.

## PR and Review Tracking

- Repo and branch coverage: `timetoadyDotCom` — `feature/app-privacy-policies-and-cloudflare` (2 commits: privacy pattern + Cloudflare `92eb05d`; copy cleanup `8bbd27d`).
- PR links: https://github.com/timetoady/timetoadyDotCom/pull/2
- Reviewer automation status: none configured (no branch protection; PR #1 merged with zero reviews). Copilot review can be requested manually from the PR's Reviewers panel if desired.
- Review status: skipped by developer decision; PR #2 merged to `main` 2026-07-10.
- Closeout status: complete — see Delivery Summary below.

## Delivery Summary (Closeout)

PRs merged:

- https://github.com/timetoady/timetoadyDotCom/pull/2 — markdown-driven per-app privacy policies (seeded with Indigo Blast), Cloudflare Pages readiness (wrangler + `_headers` + deploy scripts), Bluehost→Cloudflare doc reconciliation, and a site-wide copy cleanup driven by a three-reviewer audit.

Validation completed:

- `npm run build` green; `/codeworks/privacy/indigo-blast/` generated, in sitemap; `_headers` shipped.
- `npm run test:e2e`: 37 passed / 8 mobile-only skips, including new coverage for the policy route, index listing, back link, support mailto, and a timezone regression assertion on the rendered date.
- Manual browser persona pass (desktop + mobile): hub → policy → back-link flow, no console errors.
- Quality gate: final scores Correctness 9, Scope-fit 9, Simplicity/DRY 9, Test coverage 9, UX/DX 9, Docs 9 (bar: all >=7, overall >=8). Accepted residual gaps: no CSP; markdown links same-tab; HSTS without includeSubDomains; empty-collection path untested.
- Review feedback: skipped by developer decision (solo repo).

QA smoke (post-deploy):

1. `https://timetoady.com/codeworks/privacy/` — lists "Indigo Blast privacy policy"; Cloudflare wording in Website-data section.
2. `https://timetoady.com/codeworks/privacy/indigo-blast/` — full policy, "Last updated: July 10, 2026", working mailto + back link.
3. Spot-check `/`, `/codeworks/`, `/codeworks/apps/`, `/codeworks/support/`, `/songworks/` for the trimmed copy.
4. `curl -sI` the homepage: confirm `Strict-Transport-Security` and `X-Content-Type-Options` headers arrive from Pages.

How to add the next app policy:

- Drop `src/content/privacy/<slug>.md` with frontmatter (`app`, `lastUpdated`, `summary`, optional `appHref`/`supportEmail`); build + deploy. Page appears at `/codeworks/privacy/<slug>/` and on the index automatically.

Remaining pre-launch items (owner):

- ~~Provision/confirm mailboxes~~ — confirmed working 2026-07-10.
- RomajiOverlay Play Store URL for `apps.ts` when live.
- ~~Deploy~~ — DONE 2026-07-10: `timetoady` Pages project created; deployed and verified at https://timetoady.pages.dev/ (200s on privacy routes, security headers live). Remaining: map the `timetoady.com` apex domain to the Pages project.
- Cross-repo: commit/push the policy in `indigoBlast` and set its "Hosted at" to `https://timetoady.com/codeworks/privacy/indigo-blast/`.

## Test and QA

- **Automated checks:** `npm run build`; `npm run test:e2e` (Playwright). New: route heading for `/codeworks/privacy/indigo-blast/`; index lists/links the policy.
- **Manual QA:** `npm run dev`, drive the privacy index + Indigo Blast page in-browser; confirm styling, links, last-updated, back link.
- **Smoke-test scenarios:** visit index → click through to Indigo Blast policy → back link returns; confirm `dist/codeworks/privacy/indigo-blast/index.html` and sitemap entry.

## Quality-Gate Score History

- **Iteration 0** (independent reviewer, post senior-dev pass): Correctness 9, Scope-fit 9, Simplicity/DRY 9, Test coverage 8, UX/DX 8, Docs clarity 9 — **overall 9**. Already above the bar. Named gaps: HSTS missing (should-fix); markdown external-link rel, meta length, CSP, test gaps, possible double-spacing (nice-to-have).
- **Iteration 1** (closed cheap gaps): fixed double-spacing (dropped redundant `.policy-document` on slug page), added HSTS header, trimmed Indigo Blast summary to 145 chars (meta length), added "Email support" mailto test assertion. Build green; 37 e2e pass. → Test coverage 8->9, UX/DX 8->9 (each tied to a real diff).
- **Final scores:** Correctness 9, Scope-fit 9, Simplicity/DRY 9, Test coverage 9, UX/DX 9, Docs clarity 9 — **overall 9**. Passing bar (every dim >=7, overall >=8) cleared.
- **Accepted residual gaps (non-blockers, deliberately deferred):**
  - No CSP — would require nonces/hashes for Astro's inline theme-bootstrap script; a report-only CSP is a reasonable future add.
  - Markdown external links open in the same tab (unlike hero `target=_blank`) — deliberately kept for accessibility and to avoid a rehype dependency.
  - HSTS has no `includeSubDomains`/`preload` — conservative for launch; can strengthen at the Cloudflare edge later.
  - Empty-collection index path not unit-tested (guard verified by reading; hard to test without removing content).
