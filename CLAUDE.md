# CLAUDE.md

Operational guide for this repository. The design-system narrative lives in
[vedant-portfolio-v2/README.md](vedant-portfolio-v2/README.md); this file is the
layout, commands, conventions, and the gotchas worth not rediscovering.

## Project layout

A personal portfolio — a single-page React site. **The app is the
`vedant-portfolio-v2/` subdirectory, not the repo root**, so every `npm` command
runs from there:

```bash
cd vedant-portfolio-v2
```

- `src/sections/` — one file per page section: `Home`, `Projects`, `Journey`, `Skills`, `Contact`.
- `src/components/` — shared UI. `ink/` is the hand-drawn doodle layer; `projects/` the work grid; `currently/` the hero "right now" note.
- `src/index.css` — design tokens (`:root` + `@theme inline`) and every `ink-*` utility.
- `src/data/` — content (`projects.ts`, `photos.ts`). Change copy and imagery here, not in the components.
- `src/assets/my-images/` — optimized `.webp` photos the app imports.

## Commands

```bash
npm run dev       # vite dev server → http://localhost:5173/personal-website/
npm run build     # prettier + tsc -b + vite build — the real gate; run before every commit
npm run lint      # eslint
npm run preview   # serve the production build
```

Node ≥ 24. Prettier runs automatically inside `dev` and `build`. Finish a change by
running `npm run build` (it type-checks) and `npm run lint` before committing.

## Stack

React 19 · Vite 7 (`base: "/personal-website/"`) · TypeScript · Tailwind CSS 4 ·
Framer Motion 12 · `rough-notation` (text annotations) · `lucide-react` + `react-icons`.

## Design system

Light only — no dark mode, no theme toggle. Palette is white paper / near-black ink
/ ocean-blue accent; Fraunces (display serif) for headings, system sans for body,
Caveat (hand) only inside drawings and photo captions. The token table and ink-layer
rules are in the [README](vedant-portfolio-v2/README.md#design-system-v4).

### Conventions that aren't obvious

- **`ink-*` utilities are the vocabulary.** Chrome, rules, rails, links and photo
  filters all come from shared classes in `index.css` (`ink-edge`, `ink-rule`,
  `ink-rail`, `ink-link`, `ink-duotone`, `ink-bw`) so every hand-drawn boundary is
  cut from the same pen. Reach for an existing `ink-*` class before writing new CSS.
- **Photos sit black-and-white and bloom to colour on hover** (`.ink-bw` for a
  straight desaturation, `.ink-duotone` for the covers; both need a `group`
  ancestor). The reveal is gated behind `@media (hover: hover) and (pointer: fine)`
  so touch devices stay B&W by design and never hit a sticky-tap state. Keep that
  gate if you touch the photo filters.
- **`SectionPicture` vs `Polaroid`.** `SectionPicture` is the ink-framed in-flow
  photo — a hand-drawn circle (hero) or a sketch frame (graduation). `Polaroid` is
  the white photo-card used where prints cluster as a scrapbook (the Projects
  desk/wall pair, the Contact prints). Don't cross them.
- **Global typography lives in `@layer base`, not unlayered rules.** `text-wrap`
  and `white-space` share the `text-wrap-mode` longhand, so an unlayered
  `p { text-wrap: pretty }` silently overrides Tailwind's `truncate`. Keep the
  element defaults inside `@layer base` so utilities win.
- **`InkMark` can't measure inside doubly-nested `whileInView` + stagger
  containers** — `rough-notation` gets a degenerate box and draws over the wrong
  text. If a mark misdraws, unwrap it (keep the words) rather than fighting timing.
- **Ambient marks: at most two per section.** More reads as decoration.

## Information architecture

Section order is **Home → Projects → Journey → Skills → Contact**, on purpose: the
work sits in the highest-attention slot right after the hero, and Skills — a claim —
follows the evidence rather than leading it. Don't reorder without a reason.

## Assets

Add a photo by optimizing the original to `.webp` into `src/assets/my-images/`, then
wiring it through `src/data/photos.ts`. Never reference a raw image out of `public/`.

```bash
cwebp -quiet -q 80 -resize <width> 0 original.jpg -o src/assets/my-images/name.webp
```

Raw originals under `public/my-images/` are git-ignored: served from `public/` they
would ship unoptimized, and they are only a staging area for the conversion above.

## The bar to hold

- Lighthouse 100 on accessibility, best-practices, SEO and agentic browsing — verify
  with the Chrome DevTools MCP, not by eye.
- Zero horizontal overflow at 375 px.
- Every decorative SVG is `aria-hidden` and non-interactive; annotations never
  intercept clicks; reduced motion renders all art statically.

## Repo etiquette

- **Commit locally during iteration; do not push until asked.** Deploys run from
  `main` via GitHub Actions — the `gh-pages` deploy script is vestigial.
- Pull requests target **`main`** for this repo (there is no `dev` branch).
- Conventional-commit subjects, matching the existing `feat(v4): …` history.
- Identifiers stay literal and industry-standard; save evocative names for the
  brand and UI copy, never for code symbols.
- No emoji in docs unless asked.
