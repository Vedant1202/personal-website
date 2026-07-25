# Implementation Plan: v4 Light Rework (white / ink / ocean blue)

## Overview

Flip the site to strict light-only per the confirmed intent in [inspiration.md](inspiration.md): stark white ground, near-black ink, one ocean-blue accent; type-led serif hero with the photo demoted; a two-tone sketch layer (black-ink drawings via Framer Motion `pathLength` draw-on + ocean-blue rough-notation text marks); a ratio-agnostic personal-photo slot per section with all four treatments shipped as labeled auditions; toggleable hero soccer-arc and Journey winding-path drawings. The demo is a fitting room — aesthetic micro-choices (photo treatment per section, ink drawings on/off, serif candidate, blue token) are presented as labeled/param-switchable variants, and a final lock-in pass applies the user's selections. v3 perf/a11y bar (Lighthouse a11y 100, reduced-motion support) is maintained.

All work happens in `vedant-portfolio-v2/` (React 19 + Vite + Tailwind 4 CSS-first + Framer Motion 12). No test infra exists; verification is `npm run build` (includes tsc), `npm run lint`, Lighthouse, and DevTools-MCP visual checks — consistent with the v3 effort.

## Architecture Decisions

- **Branch: `feat/v4-light-rework` off `main`, PR into `main`** (repo is exempt from the global PR-into-dev rule).
- **Tokens in `@theme` (index.css), no tailwind.config:** `--color-paper #FFFFFF`, `--color-ink #111111`, `--color-ink-soft` (secondary text), `--color-accent` (default `#0369A1`). Audition overrides via `html[data-blue="deep"] → #075985` and `html[data-blue="teal"] → #0E7490`; serif via `--font-display` switched by `html[data-serif]`. Components use semantic utilities (`bg-paper`, `text-ink`, `text-accent`) so the palette stays swappable.
- **Fonts self-hosted via Fontsource** (no external requests, gh-pages friendly): `@fontsource-variable/fraunces` (display default), `@fontsource/instrument-serif` (audition alternate, 400 only), `@fontsource-variable/caveat` (handwritten — audition labels and in-drawing lettering only). `font-display: swap`. Today the site uses a pure system stack, so this is additive.
- **Sketch layer = three primitives in `src/components/ink/`:**
  - `InkMark` — thin wrapper around `rough-notation` (3.8 kb): underline/circle/box/highlight/bracket in accent blue, fires once on inView, `animate: false` under reduced motion. Own wrapper instead of `react-rough-notation` to control reduced-motion and stay swappable.
  - `InkDrawing` — inline-SVG wrapper animating `motion.path` `pathLength` 0→1 `whileInView` once; explicit `useReducedMotion()` check renders the final stroke statically (do not rely on `MotionConfig reducedMotion="user"` covering `pathLength`).
  - `Scribbles` — small set of hand-authored black-ink paths (arrow, loop underline, star, scratch circle) consumed through `InkDrawing`. Color rule: drawings black ink, text marks ocean blue.
- **`SectionPicture` component** — props: `src, alt, treatment: snapshot | sketch | natural | washed, placement: beside | behind, label?, caption?`. Ratio-agnostic by construction: natural aspect (`h-auto`, max-width/max-height constraints, no fixed `aspect-*` crops). Sketch border uses the CSS hand-drawn border-radius technique (`255px 15px 225px 15px / 15px 225px 15px 255px`) — zero-dependency and ratio-agnostic. `behind` placement renders washed (lifted whites / low opacity) beneath text with a legibility backdrop on the text block. Audition `label` renders as a small Caveat tag naming the treatment.
- **Placeholders:** 4 local SVG placeholder images in `public/section-photos/` at deliberately different ratios (3:4, 16:9, 1:1, 21:9) so ratio-agnosticism is actually exercised before real photos exist.
- **Audition mechanism = URL params + data-attributes:** `AuditionProvider` reads `?audition=1&serif=…&blue=…&ink=off` once, stamps `data-serif`/`data-blue` on `<html>`, exposes `{ inkDrawingsOn }` via context. `AuditionPanel` (floating sketch-styled card, rendered only with `?audition=1`) links between variants. Photo treatments are not toggled — they are spread one-per-section with labels: Hero = snapshot (real photo, small), Projects = sketch-framed, Journey = washed duotone behind text, Contact = natural.
- **Theme-flip order that keeps every commit renderable:** the dark shell (`bg-black` wrapper, NavBar, body CSS) flips LAST. Until then, each converted section declares its own `bg-paper text-ink` and reads fine inside the dark shell. Flipping the shell first would turn every unconverted `text-white/…` section white-on-white.
- **Dead code leaves with the shell flip:** unused `src/sections/Education.tsx` (education band actually lives in Journey.tsx), `hero-bg` animated grid CSS, dark glow/accent CSS superseded by the ink system.
- **Strict light signals:** `color-scheme: light` on `:root` plus light `<meta name="theme-color">` so form controls/scrollbars/UA chrome follow.

## Dependency Graph

```
T1 tokens + fonts + branch
    ├── T2 ink primitives + audition params
    └── T3 SectionPicture + placeholders
            │
            ├── T4 Hero slice  ──────────── CHECKPOINT A
            ├── T5 Projects surface ─ T6 Projects overlays
            ├── T7 Journey slice
            └── T8 Contact + NavBar + shell flip (needs T4–T7 done) ── CHECKPOINT B
                        │
                        ├── T9 a11y/perf pass
                        └── T10 meta/OG + docs ── CHECKPOINT C (PR + user picks)
                                    │
                                    └── T11 lock-in pass (blocked on user selections)
```

T5, T6, T7 are mutually independent after T4 and could be parallelized; they share only `index.css` tokens (read-only) — coordinate any `App.css` edits.

## Task List

### Phase 1: Foundation

## Task 1: Branch + tokens + fonts

**Description:** Create `feat/v4-light-rework` off `main`. Add `@theme` tokens (paper/ink/ink-soft/accent + audition override attribute selectors, `--font-display`/`--font-hand` variables). Install and import `@fontsource-variable/fraunces`, `@fontsource/instrument-serif`, `@fontsource-variable/caveat`, `rough-notation`. Purely additive — the dark site renders unchanged.

**Acceptance criteria:**
- [ ] Build and lint green; site visually unchanged (still dark)
- [ ] Fonts served from own origin (network tab: hashed woff2, zero external font requests)
- [ ] `data-serif` / `data-blue` attribute overrides switch the CSS variables (devtools spot check)

**Verification:** `npm run build && npm run lint`; DevTools network + computed-style check.
**Dependencies:** None. **Files:** `package.json`, `src/index.css`, `src/main.tsx`. **Scope:** S

## Task 2: Ink primitives + audition scaffolding

**Description:** Build `src/components/ink/`: `InkMark.tsx`, `InkDrawing.tsx`, `Scribbles.tsx` (arrow, loop underline, star, scratch circle), plus `AuditionProvider.tsx` (URL params → context + `<html>` data attrs) and `AuditionPanel.tsx` (floating variant-switcher card shown only with `?audition=1`). Reduced motion: `InkMark` passes `animate: false`; `InkDrawing` renders full stroke statically.

**Acceptance criteria:**
- [ ] With `?audition=1`, panel renders and its links switch serif/blue/ink params (attrs update)
- [ ] Under emulated `prefers-reduced-motion: reduce`, no stroke animates yet marks/drawings appear complete
- [ ] Build and lint green; components unused elsewhere yet (no visual change)

**Verification:** `npm run build && npm run lint`; DevTools rendering-emulation check on a temporary mount (removed before commit) or verified in T4.
**Dependencies:** T1. **Files:** 5 new under `src/components/ink/`. **Scope:** M

## Task 3: SectionPicture + placeholder assets

**Description:** Build `src/components/SectionPicture.tsx` implementing the four treatments (snapshot print border + slight rotation + tape corners; sketch hand-drawn border; natural + soft shadow; washed ink-blue duotone), `beside`/`behind` placement, Caveat audition `label`, optional caption. Add 4 ratio-diverse SVG placeholders to `public/section-photos/`. Lazy-load by default (`loading="lazy"`, explicit dimensions from natural size).

**Acceptance criteria:**
- [ ] Each treatment renders correctly with each of the 4 placeholder ratios — no crop, no overflow, no layout shift (temporary test grid, removed before commit)
- [ ] `behind` variant keeps overlaid text readable (backdrop rule works)
- [ ] Build and lint green

**Verification:** temporary 4×4 test grid in dev + screenshots at 1280/375; `npm run build`.
**Dependencies:** T1. **Files:** 1 new component + 4 assets. **Scope:** M

### Phase 2: Section slices (each: light flip + ink layer + photo slot, self-contained `bg-paper`)

## Task 4: Hero — type-led serif + snapshot photo + soccer arc

**Description:** Rebuild Home/HeroIntro: massive display-serif name (clamp up to ~9rem, ink on paper), role/location lines restyled, intro sentence with 2–3 blue `InkMark`s replacing `HighlightWord`, links row in ink/blue (kill glow/gradient classes), real photo demoted to small `SectionPicture` (snapshot treatment, labeled), black-ink soccer-ball flight-arc `InkDrawing` across hero whitespace (hidden when `?ink=off`), remove `hero-bg` grid/vignette usage from this section. Keep the links-in-view dock logic intact.

**Acceptance criteria:**
- [ ] Hero fully light at 1280/768/375 — serif name dominates, photo small with visible "snapshot" label, arc draws once on load/scroll
- [ ] `?ink=off` removes the arc; reduced-motion shows everything static; links dock behavior unchanged
- [ ] Build and lint green; no dark-mode classes left inside Home/HeroIntro (`text-white`, `bg-black`, glow shadows)

**Verification:** `npm run build && npm run lint`; DevTools screenshots 3 viewports × {default, ?ink=off, reduced-motion}.
**Dependencies:** T2, T3. **Files:** `Home.tsx`, `hero/HeroIntro.tsx`, `hero/heroAnimations.ts`, `hero/HighlightWord.tsx` (delete or rework), `App.css` (scoped removals). **Scope:** M

### Checkpoint A (after T4)
- [ ] Foundation proven in one real slice; screenshots shared; build green

## Task 5: Projects surface — grid, cards, skills chips

**Description:** Light-flip `Projects.tsx` (including the skills-chips block), `ProjectGrid`, `ProjectCard`, `ProjectRow`, `Projects.css` (retune tech-icon grayscale filter for white). Add sketch-framed `SectionPicture` (labeled) beside the section intro; ambient ink: blue `InkMark` circle on the "Featured" kicker, one black scribble arrow from heading toward the first card.

**Acceptance criteria:**
- [ ] Cards/rows/chips AA-readable on white; hover states visible without glows
- [ ] `#project-{id}` deep links and expand behavior still work
- [ ] Build and lint green

**Verification:** build + lint; deep-link smoke test in browser; contrast spot checks.
**Dependencies:** T4 (theme patterns established). **Files:** 5. **Scope:** M

## Task 6: Projects overlays — expanded panel, media, lightbox

**Description:** Light-flip `ProjectExpanded`, `ProjectExpandedPanel`, `MediaStrip`, `Lightbox`, `TechIcon`, `LinkPill` — class swaps to token utilities; ensure focus rings visible on white.

**Acceptance criteria:**
- [ ] Expanded panel + lightbox fully light; esc/close/focus behavior intact
- [ ] Build and lint green

**Verification:** build + lint; open/close/keyboard smoke test.
**Dependencies:** T5. **Files:** 6 (small class swaps). **Scope:** M

## Task 7: Journey — winding path + washed behind-photo

**Description:** Light-flip `Journey.tsx` (education band included). Replace the timeline spine with a hand-drawn winding `InkDrawing` path with milestone ticks (hidden when `?ink=off`, straight minimal rule as fallback). Washed-duotone `SectionPicture` placed `behind` the experience text (labeled), margin star/underline scribbles on education entries.

**Acceptance criteria:**
- [ ] Path draws on scroll once; `?ink=off` yields clean minimal timeline; reduced-motion static
- [ ] Text over the behind-photo passes AA contrast (backdrop verified)
- [ ] Build and lint green

**Verification:** build + lint; contrast check on overlaid text; scroll/reduced-motion screenshots.
**Dependencies:** T4. **Files:** `Journey.tsx` + ink components usage. **Scope:** M

## Task 8: Contact + NavBar + shell flip

**Description:** Light-flip `Contact.tsx` (natural-treatment labeled `SectionPicture`, black arrow scribble at the email CTA, blue highlight `InkMark` on the availability line). Then flip the shell: `App.tsx` wrapper to `bg-paper text-ink`, NavBar + social dock light restyle, `index.css`/`App.css` body colors, add `color-scheme: light` + light `theme-color` meta, delete `hero-bg` CSS, unused dark utilities, and dead `src/sections/Education.tsx`. Split trigger: if NavBar exceeds its slot, land Contact first and NavBar/shell as a follow-up commit within the task.

**Acceptance criteria:**
- [ ] `grep -rn "bg-black\|#050816\|text-white" src/` returns no live-code hits (comments excluded)
- [ ] Nav/dock readable and functional on white at all breakpoints; whole app strict light end to end
- [ ] Build and lint green

**Verification:** build + lint + grep sweep; full-page scroll-through screenshots at 3 viewports.
**Dependencies:** T4–T7. **Files:** `Contact.tsx`, `NavBar.tsx`, `App.tsx`, `App.css`, `index.css`, `index.html`, deletion of `Education.tsx`. **Scope:** M–L

### Checkpoint B (after T8)
- [ ] Full light walkthrough: all sections, 3 viewports, all audition params functional; screenshots shared

### Phase 3: Verification and handoff

## Task 9: A11y + perf pass

**Description:** Lighthouse runs (target: a11y 100, BP/SEO 100, perf ≥ v3 baseline — record numbers). Decorative ink SVGs `aria-hidden` + `pointer-events: none`; annotation SVGs must not intercept clicks on links; keyboard pass including audition panel; reduced-motion audit via matchMedia stub; contrast audit (ink-soft and accent text ≥ 4.5:1 — `#0369A1` on white ≈ 5:1, verify all three blue candidates as used for text).

**Acceptance criteria:**
- [ ] Lighthouse a11y = 100; perf within noise of v3 baseline; scores recorded in todo.md
- [ ] No ink element focusable or click-blocking; reduced-motion verified

**Verification:** Lighthouse in DevTools MCP; keyboard walkthrough; matchMedia stub check.
**Dependencies:** T8. **Scope:** S–M

## Task 10: Meta/OG + docs

**Description:** Rebuild `og-image.jpg` from the new light hero (1200×630 JPEG ≤ 250 KB via sips/cwebp), light `theme-color` confirmed, README + tasks docs updated with audition instructions (`?audition=1`, params, what each label means), todo statuses current.

**Acceptance criteria:**
- [ ] OG image reflects the light brand, correct dimensions/size
- [ ] Docs explain exactly how to review and select variants

**Verification:** file size/dimension check; doc read-through.
**Dependencies:** T8 (hero final enough to screenshot). **Scope:** S

### Checkpoint C (after T10)
- [ ] Branch pushed, PR opened into `main` with before/after screenshots and audition guide
- [ ] BLOCKED ON USER: review audition demo (`npm run dev` locally or PR preview) and record selections: photo treatment winner, ink drawings on/off, serif, blue token

## Task 11: Lock-in pass (after user selections)

**Description:** Apply the picks: winning photo treatment applied to all sections, losing treatment code removed, audition labels and `AuditionPanel`/params deleted, serif and blue fixed as tokens (losing font dependency uninstalled), ink drawings kept or removed per choice. Re-run Lighthouse; final grep for audition remnants; merge.

**Acceptance criteria:**
- [ ] No audition code/params/labels remain; bundle drops the losing font
- [ ] Lighthouse re-run recorded; PR merged into `main`

**Verification:** grep sweep (`audition`, `data-serif`, `data-blue`); build + Lighthouse.
**Dependencies:** User selections at Checkpoint C. **Scope:** S–M

## Risks and Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| Behind-text photo hurts legibility | High | Washed treatment + text backdrop rule; AA contrast check is an explicit AC (T3, T7) |
| Font swap flash / LCP regression (site gains web fonts for the first time) | Med | Self-hosted variable woff2, `font-display: swap`, hero text stays LCP; Lighthouse before/after in T9 |
| `pathLength` still animating under reduced motion | Med | Explicit `useReducedMotion()` in both primitives; emulation check is an AC (T2, T4) |
| Sketch layer reads as childish/gimmicky | Med | Restraint budget: ≤ 2 ambient marks per section; black/blue two-tone rule; user reviews at every checkpoint |
| NavBar restyle balloons (423 lines) | Med | Split trigger documented in T8 |
| White-on-white mid-migration states | Med | Shell flips last; every converted section self-declares `bg-paper text-ink` |
| Audition machinery leaks to production | Low | T11 deletes provider/panel/params; grep sweep is an AC |
| `rough-notation` staleness | Low | Isolated behind `InkMark`; API surface tiny; swappable |

## Open Questions (non-blocking)

- Real personal photos (paintings/memories) arrive later — placeholders ship now; captions wording TBD when real images land.
- OG image may deserve a re-shot after lock-in if the hero changes (cheap to redo).
