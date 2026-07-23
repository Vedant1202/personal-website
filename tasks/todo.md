# Todo: v4 Light Rework

Branch: `feat/v4-light-rework` (off `main`, PR into `main`) — see [plan.md](plan.md); intent + references in [inspiration.md](inspiration.md)

## Phase 1 — Foundation
- [x] T1: Branch + `@theme` tokens + Fontsource fonts (Fraunces / Instrument Serif / Caveat) + rough-notation
- [x] T2: Ink primitives (`InkMark`, `InkDrawing`, `Scribbles`) + audition provider/panel (`?audition=1`, `serif`, `blue`, `ink`)
- [x] T3: `SectionPicture` (4 treatments, beside/behind, labels) + 4 ratio-diverse placeholders

## Phase 2 — Section slices (light flip + ink + photo per section; shell stays dark until T8)
- [x] T4: Hero — type-led serif name, snapshot photo (labeled), soccer-arc drawing (toggleable), blue marks in intro
- [x] CHECKPOINT A: slice screenshots @1280/768/375, build green
- [x] T5: Projects surface — grid/cards/rows/chips flip, sketch-framed photo, circled "Featured", arrow scribble
- [x] T6: Projects overlays — expanded panel, media strip, lightbox, icons/pills
- [x] T7: Journey — winding-path timeline (toggleable), washed photo behind text, education margin scribbles
- [x] T8: Contact (natural photo, CTA arrow, availability highlight) + NavBar + shell flip + dead-code deletion
- [x] CHECKPOINT B: full light walkthrough, 3 viewports, all audition params work

## Phase 3 — Verify + handoff
- [x] T9: A11y/perf pass — Lighthouse a11y 100, perf ≥ v3, reduced-motion + contrast + keyboard audits
- [x] T10: OG image (light), theme-color, docs with audition guide
- [ ] CHECKPOINT C: PR into `main` + BLOCKED ON USER — pick photo treatment, ink on/off, serif, blue
- [ ] T11: Lock-in pass — apply picks, strip audition machinery, drop losing font, final Lighthouse, merge

## Results (T9 measured, production build)
- Lighthouse desktop: a11y 100 / best practices 100 / SEO 100 / agentic browsing 100, 0 failed audits
- LCP 472 ms, CLS 0.00 (self-hosted fonts added with no layout shift)
- Contrast: ink 18.9:1, ink-soft 7.7:1, blues 5.4–7.6:1; washed-photo worst case 5.4:1
- Reduced motion: no path mid-draw, no annotation animating, nothing left transparent
- Lint: 0 errors (5 pre-existing errors fixed along the way, incl. a real rules-of-hooks bug)
- Mobile: scrollWidth == viewport at 390px (12-col grid gap overflow fixed)

## User selections (confirmed)
- Photo treatment winner: **sketch frame** (hero + contact gallery; journey keeps washed-behind-text, which is functional)
- Serif: **Fraunces**
- Blue token: **#0369A1**
- Brush style: **gouache**
- Ink drawings (hero arc / journey path): still open — assumed ON

## Remaining
- T11 lock-in: strip the audition provider/panel/params, drop Instrument Serif from the bundle, remove the losing photo treatments, final Lighthouse
