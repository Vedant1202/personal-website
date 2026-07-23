# Todo: v4 Light Rework

Branch: `feat/v4-light-rework` (off `main`, PR into `main`) — see [plan.md](plan.md); intent + references in [inspiration.md](inspiration.md)

## Phase 1 — Foundation
- [ ] T1: Branch + `@theme` tokens + Fontsource fonts (Fraunces / Instrument Serif / Caveat) + rough-notation
- [ ] T2: Ink primitives (`InkMark`, `InkDrawing`, `Scribbles`) + audition provider/panel (`?audition=1`, `serif`, `blue`, `ink`)
- [ ] T3: `SectionPicture` (4 treatments, beside/behind, labels) + 4 ratio-diverse placeholders

## Phase 2 — Section slices (light flip + ink + photo per section; shell stays dark until T8)
- [ ] T4: Hero — type-led serif name, snapshot photo (labeled), soccer-arc drawing (toggleable), blue marks in intro
- [ ] CHECKPOINT A: slice screenshots @1280/768/375, build green
- [ ] T5: Projects surface — grid/cards/rows/chips flip, sketch-framed photo, circled "Featured", arrow scribble
- [ ] T6: Projects overlays — expanded panel, media strip, lightbox, icons/pills
- [ ] T7: Journey — winding-path timeline (toggleable), washed photo behind text, education margin scribbles
- [ ] T8: Contact (natural photo, CTA arrow, availability highlight) + NavBar + shell flip + dead-code deletion
- [ ] CHECKPOINT B: full light walkthrough, 3 viewports, all audition params work

## Phase 3 — Verify + handoff
- [ ] T9: A11y/perf pass — Lighthouse a11y 100, perf ≥ v3, reduced-motion + contrast + keyboard audits
- [ ] T10: OG image (light), theme-color, docs with audition guide
- [ ] CHECKPOINT C: PR into `main` + BLOCKED ON USER — pick photo treatment, ink on/off, serif, blue
- [ ] T11: Lock-in pass — apply picks, strip audition machinery, drop losing font, final Lighthouse, merge

## User selections (fill at Checkpoint C)
- Photo treatment winner: _
- Ink drawings (hero arc / journey path): _
- Serif: Fraunces / Instrument Serif: _
- Blue token: #0369A1 / #075985 / #0E7490: _
