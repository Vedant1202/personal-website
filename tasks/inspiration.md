# v4 Rework: Aesthetic Direction and Inspiration

## Confirmed direction (interview, 2026-07-23)

- **Outcome:** Flip the site to strict light-only — stark white, black ink, one ocean-blue accent — with editorial serif headings over a clean sans body, plus a hand-drawn ink layer: ambient scribbles/arrows/underlines throughout and 2–3 personal hero drawings rooted in the real story (soccer, VR/HCI thesis, quantified-self).
- **User:** Founders/recruiters at early-stage AI startups clicking through from outreach. Memorable, never gimmicky.
- **Success:** Recipient remembers the site; content stays as scannable as v3; feels personal, not a costume.
- **Constraint:** Keep the v3 perf/a11y bar — inline SVG art, `prefers-reduced-motion` fallback, existing React 19 + Vite + Tailwind 4 + Framer Motion stack.
- **Out of scope:** Dark mode (removed entirely, no toggle), content rewrites, section restructuring, commissioned/AI-generated imagery. Line art is authored as SVG in code.
- **Motion:** Subtle draw-on reveals — strokes sketch themselves in once on scroll into view; static after settling; instant static art under reduced motion.

## Round-2 decisions (interview, 2026-07-23, confirmed)

Reference weighting: **clarafois + roughnotation + wattenberger** are primary; nan.fyi and maggieappleton stay as secondary pattern sources.

- **Hero:** type-led — massive serif name (Wattenberger scale); photo demoted to a small element.
- **Section pictures (new layer):** every section gets a personal photo/painting/memory slot. Placeholders for this iteration; component must be size/aspect-ratio agnostic; placements either beside content or behind/overlapping section text (behind variant needs a legibility treatment).
- **Photo treatment audition:** all four treatments ship in the demo, one per section, visibly labeled, user picks the winner in situ: (1) snapshot/print border + rotation, (2) rough sketch-framed border, (3) untreated natural + shadow, (4) washed ink-blue duotone.
- **Doodle color rule:** two-tone notebook — depictive drawings in black ink; rough-notation text marks (underlines, circles, highlights) in ocean blue.
- **Personal ink drawings:** hero soccer-ball flight arc + Journey hand-drawn winding path, built toggleable; demo shows with/without so the user chooses.
- **Audition principle:** aesthetic micro-choices (photo treatment, drawings on/off, serif candidate, blue token) are presented as labeled variants in the running demo, not decided in advance; a follow-up pass locks selections.
- **Constraint amendment:** image files are allowed for the personal-photo layer (optimized, lazy-loaded, alt-texted). The SVG-authored-in-code rule applies to drawings/scribbles only.

## Primary references (visually verified 2026-07-23)

1. **[Not a Number — nan.fyi](https://www.nan.fyi)** — closest single match. White ground, editorial serif display titles over sans body, black-ink doodle spot illustrations per entry (sketched book, path grid, key), dashed borders with small x-marks at corners ("blueprint sketch" framing). Built on the same React + Framer Motion stack. Steal: serif/sans pairing ratio, spot-illustration-per-item pattern for project cards, dashed sketch framing, his Interactive SVG Animations course for draw-on technique.
2. **[Amelia Wattenberger](https://wattenberger.com)** — white ground, massive near-black serif display name, italic serif emphasis inline in the intro sentence, single playful blue badge/sticker element. Steal: hero type scale and confidence, italic-emphasis-in-prose, the "one blue object as personality anchor" move.
3. **[Maggie Appleton](https://maggieappleton.com)** (light mode) — off-white, editorial serif display, tiny recurring accent-color glyph motif (her teal sprouts) used as list bullets/markers. Steal: a small repeated ocean-blue glyph as a site-wide signature mark; illustration integrated into content rather than floating decoration.
4. **[Clara Fois](https://www.clarafois.com)** — white ground, huge black display type, hand-drawn creatures rendered entirely in the single accent color (her red; ours would be ocean blue). Steal: the doodles-in-accent-color variant — ambient scribbles can be blue strokes, not only black ink.
5. **[Rough Notation](https://roughnotation.com)** — the ambient-scribble mechanic as a working demo: sketchy underlines, circles, boxes, highlight swipes that draw themselves on. 3.8 kb gzipped, animation can be disabled (reduced-motion story). The homepage itself is the aesthetic proof.

Checked and dropped: cassie.codes (site retired, farewell page), frankchimero.com (now a bare dark index), robinrendle.com (pivoted to an IDE-skin concept), lynnandtonic.com (vintage-print lane — though her dotted-leader table-of-contents is a nice print-object detail), jvns.ca (doodle spirit lives in the zines, not the site layout), minimal.gallery/httpster grids (slick agency-dark territory, low hit rate for this lane).

## Design files: Figma community doodle packs (SVG, free)

Use as vocabulary references or trace/adapt sources for ambient scribbles (arrows, underlines, stars, squiggles). Check each file's license before direct use; dddoodle is CC.

- [dddoodle — 120+ SVG doodles, CC license](https://www.figma.com/community/file/1041751080500149586)
- [100+ Hand Drawn Doodle Pack](https://www.figma.com/community/file/1344937765395362211/free-100-hand-drawn-doodle-pack)
- [200+ Hand-Drawn Doodles & Scribbles (icons, arrows, numbers)](https://www.figma.com/community/file/1507368914684515837/free-200-hand-drawn-doodles-scribbles-icons-illustrations-arrows-numbers)
- [250+ hand drawn vector scribbles and sprinkles](https://www.figma.com/community/file/1272082449365461954/free-250-hand-drawn-vector-scribbles-sprinkles-and-doodless)
- [65 Free Scribbles & Doodles](https://www.figma.com/community/file/1224325685466204842/65-free-scribbles-doodles)
- Browse more: [figma.com/community/tag/doodles](https://www.figma.com/community/tag/doodles/files)

## Implementation techniques

- **Draw-on strokes with the existing stack:** Framer Motion `motion.path` animating `pathLength` 0 → 1 on `whileInView` — no new dependency for the core effect.
- **[rough-notation](https://roughnotation.com)** (+ `react-rough-notation`) for sketchy underlines/circles/highlights on real text elements.
- **[Rough.js](https://roughjs.com)** if any shape (boxes, section dividers) should look hand-drawn rather than geometric.
- Background reading: [CSS-Tricks: Scroll Drawing](https://css-tricks.com/scroll-drawing/), [Codrops: Animate SVG Shapes on Scroll](https://tympanus.net/codrops/2022/06/08/how-to-animate-svg-shapes-on-scroll/).

## Type and color shortlist (proposal, pick during implementation)

**Editorial serif (headings, Google Fonts):**
- Fraunces — chunky, characterful, variable optical sizes; closest to the Wattenberger/Appleton weight.
- Instrument Serif — lighter, elegant, very current; pairs with Instrument Sans.
- Newsreader — true editorial serif with excellent italics (for inline emphasis).

**Sans (body):** keep current sans or move to Instrument Sans / Inter — must stay invisible and scannable.

**Handwritten (inside drawings/annotations only):** Caveat (pen), Shantell Sans (marker), or Excalidraw's Virgil (OFL) for label text baked into SVGs.

**Palette tokens:**
- Ground: `#FFFFFF` (stark white, per interview — not cream)
- Ink: `#111111`-ish near-black
- Ocean blue accent, one of: `#0369A1` (balanced), `#075985` (deeper), `#0E7490` (teal-lean). One accent only, used for links, scribble highlights, and accent-color doodles.

## Per-section drawing concepts (mix: mostly ambient, 2–3 personal heroes)

- **Home/hero:** 1 personal hero drawing — e.g., ink soccer-ball flight path curving into the page that doubles as a section divider, or a small VR headset sketch beside the name. Plus rough-notation underline on one phrase of the intro.
- **Projects:** ambient only — sketchy arrows between featured cards, a scribbled circle on the "featured" label, dashed sketch-frame borders (nan.fyi style). Small ink spot-glyphs per featured project are a stretch goal.
- **Journey:** personal hero candidate #2 — the timeline as a hand-drawn winding path with small ink milestones (ball, headset, chart).
- **Education:** ambient — margin-note underlines, a small star or asterisk doodle.
- **Contact:** ambient + possible mini-hero — hand-drawn arrow pointing at the email CTA, scribble highlight on availability line.
- Site-wide: one recurring ocean-blue signature glyph (Appleton pattern) as bullets/markers.

## Next steps

1. Spec pass: turn this into tasks/plan.md for v4 (design tokens, font loading strategy, SVG doodle component API, reduced-motion behavior).
2. Prototype one section (hero) with palette + serif + one draw-on doodle to validate the look before rolling out.
3. Rebuild remaining sections; strip dark styles; a11y/perf verify against the v3 bar.
