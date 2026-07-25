# Todo: Portfolio Review Fixes

Branch: `feat/review-fixes` (off `main`) — 5 commits, one per task (T2 includes the T3-forced card fix)

## Phase 1 — Foundation
- [x] T1: Branch + hero WebP + OG image + index.html meta (commit 6245793)
- [x] T2: `featured`/`cover` in projects data + optimized cover assets, drop `size` (commit 184310e)
- [x] CHECKPOINT: build green, hero verified

## Phase 2 — Core layout
- [x] T3: Featured cards (2-col, covers) + compact rows for remaining 10, kill masonry (commit 79eaa98)
- [x] T4: Skills marquee → grouped static chips, delete legacy SkillTiles, h3→h2 (commit ac646f3)
- [x] T5: Journey education band + full-width experience, gap trims (commit 57d2721)
- [x] CHECKPOINT: 7.1 screens @720px viewport (from 9.2); modals + deep links verified

## Phase 3 — A11y + verify
- [x] T6: MotionConfig reducedMotion, SVG aria, brand-button name, mobile pill backdrop (commit 1b525bb)
- [x] T7: Measurements + Browser-pane preview + before/after summary
- [x] CHECKPOINT: Lighthouse a11y 100 / BP 100 / SEO 100; awaiting user PR decision

## Results (before → after)
- Scroll @720px viewport: 9.2 → 7.1 screens (−1,543px); mobile 10 → 9.2
- Hero image: 4,364 KB PNG → 70.6 KB WebP; initial image payload −98.4%
- OG/social image: portrait 4.3MB PNG → dedicated 1200×630 JPEG (62 KB)
- Sections: skills 1.1 → 0.6 screens; projects 3.5 → 2.2; journey 2.3 → 2.05 (@1280w)
- Lighthouse accessibility: 94 → 100 (aria-hidden-focus, heading-order, svg-img-alt, label-name all fixed)
- Reduced motion: verified via matchMedia stub — transforms suppressed, opacity-only fades

## Noticed, not touched (out of scope)
- `public/vedant-archive.jpeg` (2.1 MB) + `src/assets/vedant-archive.jpeg` (1.1 MB) unreferenced — candidates for deletion
- Hero role lines still say "UI/UX Design / Virtual Reality" — positioning copy excluded from scope
- AgentPack featured card uses styled text cover — drop a screenshot into `public/project-images/agentpack/` and add a `cover:` entry to upgrade
