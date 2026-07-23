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
and audition labels. Fonts are self-hosted via Fontsource — no external requests.

### The ink layer

Two tones, and the split is the rule that keeps it from looking like clip art:
**black ink for drawings, accent blue for marks on text.**

- `InkDrawing` — inline SVG that draws itself once on scroll into view. Reduced
  motion is handled explicitly, because `MotionConfig reducedMotion="user"` only
  damps transforms and would still tween a path.
- `InkMark` — wraps `rough-notation` for underlines, circles and highlights over
  real text. Waits on `document.fonts.ready` so it measures final text metrics.
- `Scribbles` — the hand-authored paths: arrow, underline, star, scratch circle,
  plus the two depictive drawings (hero soccer arc, journey timeline path).

Budget: at most two ambient marks per section. Past that it reads as decoration.

### Section photos

`SectionPicture` holds one personal photo per section and is aspect-ratio agnostic
by design — drop in any painting or snapshot without retuning the layout. In flow
the photo is the subject and is never cropped; behind text it is texture and fills
its box. For `placement="behind"`, give the parent `relative isolate` and pass no
position class of your own.

Placeholders currently live in `src/assets/section-photos/`. Replace them with real
images and update the `alt` text; no layout changes needed.

## Auditioning the design

Aesthetic choices are still open, and each ships as a labelled variant you pick in
the browser rather than a decision baked into the code. Add `?audition=1` for the
switcher panel:

```
http://localhost:5173/personal-website/?audition=1
```

| Param | Values | Effect |
|---|---|---|
| `audition` | `1` | Shows the variant panel and the photo-treatment labels |
| `serif` | `instrument` | Swaps Fraunces for Instrument Serif |
| `blue` | `deep`, `teal` | `#075985` or `#0E7490` instead of `#0369A1` |
| `ink` | `off` | Drops the hero arc and the journey path |

Photo treatments are not switches — one is applied per section so they can be
judged in place:

| Section | Treatment |
|---|---|
| Hero | snapshot — print border, tape, slight rotation |
| Projects | sketch — hand-drawn frame |
| Journey | washed duotone, behind the text |
| Contact | natural — soft shadow only |

Once the picks are made, the lock-in pass applies them everywhere, deletes the
audition machinery, and drops the losing font from the bundle. All four blues and
both serifs pass AA as text, so the choice is aesthetic, not a11y-constrained.

## Bar to hold

Lighthouse desktop: accessibility, best practices, SEO and agentic browsing all
100, zero failed audits. LCP ~470 ms, CLS 0.00. Every decorative SVG is
`aria-hidden` and inert; annotations never intercept clicks. Reduced motion
renders all art statically.
