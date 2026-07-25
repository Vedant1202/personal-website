# Vedant Nandoskar — portfolio

React 19 + Vite + Tailwind 4 + Framer Motion. Deployed to GitHub Pages from `main`.

```bash
npm run dev      # dev server at http://localhost:5173/personal-website/
npm run build    # prettier + tsc + vite build
npm run lint     # eslint
npm run preview  # serve the production build
```

## Design system (v4)

Strict light only — there is no dark mode and no theme toggle. Tokens live in
`src/index.css`: raw values on `:root`, republished through `@theme inline` so the
Tailwind utilities follow runtime overrides.

| Token | Utility | Value |
|---|---|---|
| `--brand-paper` | `bg-paper` | `#FFFFFF` |
| `--brand-ink` | `text-ink` | `#111111` |
| `--brand-ink-soft` | `text-ink-soft` | `#52525B` |
| `--brand-accent` | `text-accent` | `#0369A1` |
| `--brand-display` | `font-display` | Fraunces |
| `--brand-hand` | `font-hand` | Caveat |

Display serif for headings, system sans for body, handwriting only inside drawings
and photo captions. Fonts are self-hosted via Fontsource — no external requests.

### The ink layer

Two tones, and the split is the rule that keeps it from looking like clip art:
**black ink for drawings, accent blue for marks on text.**

- `BrushStroke` / `BackdropStroke` — inline SVGs that draw themselves once on scroll
  into view. Reduced motion is handled explicitly, because
  `MotionConfig reducedMotion="user"` only damps transforms and would still tween a
  path.
- `InkMark` — wraps `rough-notation` for underlines, circles and highlights over
  real text. Waits for stable layout and `document.fonts.ready` so it measures final
  text metrics.
- `Scribbles` / `HobbyDoodle` — the hand-authored glyphs (arrow, star, the hero
  soccer arc, the smiley) and the filtered Lucide hobby doodles.

Budget: at most two ambient marks per section. Past that it reads as decoration.

### Section photos

Real photos live in `src/assets/my-images/` as optimized `.webp`, wired through
`src/data/photos.ts`. Two components render them:

- `SectionPicture` — an ink-framed in-flow photo: a hand-drawn circle (hero) or a
  sketch frame (graduation). Aspect-ratio agnostic by design, so any snapshot drops
  in without retuning the layout.
- `Polaroid` — a white photo-card for scrapbook clusters: the Projects desk/wall
  pair and the Contact prints.

Every photo sits black-and-white at rest and blooms to full colour on hover
(`.ink-bw`). The reveal is gated behind `@media (hover: hover) and (pointer: fine)`,
so touch devices stay monochrome by design rather than snagging on a sticky-tap
state.

## Bar to hold

Lighthouse desktop: accessibility, best practices, SEO and agentic browsing all
100, zero failed audits. LCP ~470 ms, CLS 0.00. Every decorative SVG is
`aria-hidden` and inert; annotations never intercept clicks. Reduced motion
renders all art statically.
