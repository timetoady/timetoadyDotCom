# timeToady.com — UX Backlog (P2 / deferred)

Deferred items from the UX review (see `timetoady-ux-improvements-requirements.md` for full evidence
and the P0/P1 scope being delivered now). These are not part of the current MVP; promote individually
when capacity allows.

| ID | Issue | Sev | Effort | Location | Proposed fix |
|----|-------|-----|--------|----------|--------------|
| ~~A4~~ | ~~Mobile menu doesn't move focus into the panel.~~ **Done (review wave 1)** — `openMenu` now focuses the first link (`preventScroll`). A full Tab focus-trap is still optional/deferred. | 2 | S | `SiteHeader.astro` | Optional: trap Tab within the drawer while open. |
| **U5** | Hero `h1` `max-width: 11ch` causes a 5-line wrap with orphaned "one" at desktop. | 2 | S | `global.css:453-456` | Loosen to ~14–16ch or use `text-wrap: balance`. |
| **U6** | Mobile hero: full-width stacked buttons + signal cards bury the visual; primary CTA partly clipped at first viewport. | 2 | S | `global.css` ≤640px button/hero padding | Cap button width / reduce hero vertical padding ≤640px. |
| ~~U7~~ | ~~Songworks follow buttons are three identical secondaries.~~ **Done (review wave 1)** — `.channel-actions` now leads with a full-width "Watch on YouTube" and pairs the two "Follow" buttons. Platform icons still optional. | 2 | S | `songworks/index.astro`, `global.css` `.channel-actions` | Optional: add platform glyphs. |
| **N3** | Home/venture CTAs are all `button--secondary` (parity achieved) → reads visually flat; nothing draws the eye to a next step. | 2 | S | `index.astro` hero + venture cards; `global.css` button variants | Give each venture pairing one accent-filled CTA (per-venture accent) so parity survives with call-to-action emphasis. _(From independent critique.)_ |
| **N4** | `/codeworks` hero uses primary+ghost while home uses two secondaries — same "Get app support" action styled differently across pages. | 1 | S | `codeworks/index.astro` hero vs `index.astro` | Pick one consistent treatment for the same action across pages. _(From independent critique.)_ |
| **X3** | App-support `mailto:` not prefilled — non-technical user must assemble a structured bug report. | 2 | S | support page / app page mailto links | Prefill subject + device/Android-version checklist in the `mailto:` body. |
| **X4** | No About/bio destination for "who is this person?" visitors (name only in a codeworks side panel). | 2 | M | new route | Add a short About page or a prominent bio block. (New page — larger than the rest.) |
| **A5** | Hero legend facts live inside the `aria-hidden` subtree. | 2 | S | `HomeHeroVisual.astro:25-38` | Mostly mirrored by `.hero-signals`; expose the legend text if not fully duplicated. |
| **U8** | Theme toggle reads as a status ("light") not an action; accent dot can look like a notification. | 1 | S | `SiteHeader.astro` toggle, `global.css:298-338` | Use a sun/moon affordance depicting the action/target state. |
| **C1** | "Our Fortress — out now" has no freshness cue near the title (date buried in caption). | 1 | S | `songworks/index.astro:21,46` | Surface release date / "Latest single" in the hero. |

_Note: P2 polish items U5/U6 and A4 may be cheap to fold into the P0/P1 changes that touch the same
files — if so they'll be picked up opportunistically and moved out of this list._
