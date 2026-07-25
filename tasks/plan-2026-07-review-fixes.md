# Implementation Plan: Portfolio Review Fixes

## Overview

Implement the five prioritized fixes from the visual review: hero image optimization (4.3 MB PNG → sized WebP + proper OG image), a featured/rest split of the 14-project grid with real screenshots, layout-density fixes (masonry dead space, Journey column imbalance, section gaps), skills compaction (marquee tiles → compact chip groups), and an accessibility pass (reduced motion, heading order, SVG labels, aria-hidden focusables). Target outcome: ~5–6 viewport-screens instead of 9–10, LCP-safe hero, Lighthouse a11y ≥ 98, no content lost (modals keep the deep write-ups).

All work happens in `vedant-portfolio-v2/` (Vite + React 19 + Tailwind 4 + Framer Motion).

## Architecture Decisions

- **Branch: `feat/review-fixes` off `main`.** A `dev` branch exists but is 10 commits behind `main` with 0 ahead, and this repo's convention is PRs into `main` (documented exemption from the global dev-first rule). Working off stale `dev` would silently drop recent commits.
- **Featured four: cPerch, AgentPack, cprof, Agentic AI Architectures.** Matches the AI-tooling positioning and the projects with public links; all but AgentPack have local screenshots. Implemented as a `featured` flag + optional `cover` field in `projects.ts`, so swapping the selection later is a one-line change per project.
- **AgentPack cover contingency:** no local image exists; try its own YouTube demo thumbnail (downloaded into `public/project-images/agentpack/`, optimized). If it looks bad in preview, AgentPack ships as a text-cover featured card — the card layout must support both.
- **Masonry goes away entirely.** `sm:auto-rows-[12px]` + `row-span-N` is the root cause of card dead space. Featured cards get natural heights in a 2-col grid; remaining 10 projects become compact list rows. The expanded panel + `#project-{id}` deep links are preserved for all 14.
- **Skills marquee → static grouped chips.** Removes the auto-motion (WCAG 2.2.2), the `aria-hidden`-with-focusable-children failures, and ~0.7 screen of height in one move. Skills get a `group` field (Languages / Frontend / Backend & Data / Tooling & Practices). Legacy unused `src/components/SkillTiles.tsx` (463 lines) is deleted.
- **Journey: education compacts to a top row, experience goes full-width.** The 5/7 two-column split leaves the education column empty for ~2 screens. Education (2 short entries) becomes a compact 2-up band above a full-width experience timeline — wider text = fewer lines = shorter section.
- **Reduced motion via `MotionConfig reducedMotion="user"`** in `App.tsx` — one wrapper covers every Framer Motion animation (CSS animations already handled).
- **Image tooling: `cwebp`** (available at /opt/homebrew/bin/cwebp) + `sips` for resize/crop. No new npm dependencies.

## Task List

### Phase 1: Foundation (branch + images + data)

## Task 1: Branch + hero image optimization + OG image

**Description:** Create `feat/review-fixes` off `main`. Convert the 2688×3097 / 4.3 MB `src/assets/vedant.png` to a ~1100px-wide WebP (≈2× the 520–575px display size); update `Home.tsx` import and add `fetchpriority="high"` + explicit dimensions. Build a 1200×630 OG image (face-safe crop, JPEG ~85) into `public/`, update `og:image` / `twitter:image` in `index.html` with `og:image:width/height` + `og:image:alt`, and remove the now-unused 4.3 MB `public/vedant.png`.

**Acceptance criteria:**
- [ ] Hero image file served by the app is ≤ 150 KB and visually indistinguishable at display size
- [ ] `index.html` OG/twitter image points at a 1200×630 asset ≤ 250 KB
- [ ] No reference to the old 4.3 MB PNG remains in src or index.html

**Verification:**
- [ ] `npm run build` succeeds; dist contains the .webp, not a multi-MB PNG
- [ ] Manual check: hero looks correct in dev server at desktop + mobile widths

**Dependencies:** None
**Files likely touched:** `src/assets/` (new webp), `src/sections/Home.tsx`, `index.html`, `public/` (og image, remove vedant.png)
**Estimated scope:** S

## Task 2: Project data — `featured` flag, `cover` field, optimized cover assets

**Description:** Add `featured?: boolean` and `cover?: { src: string; alt: string }` to the `Project` type. Mark the featured four and point covers at optimized WebP derivatives (~640–800px wide) generated from existing screenshots (`cperch/og-image.png`, `agentic-architectures/dashboard.png`, `cprof/social-card.svg` → raster if needed). Attempt AgentPack YouTube thumbnail download + optimize; skip cover if quality is poor. Remove the now-dead `size` field from the type and all entries.

**Acceptance criteria:**
- [ ] Exactly 4 projects have `featured: true`; at least 3 have covers
- [ ] Every cover asset is WebP ≤ 120 KB
- [ ] `size` field no longer exists in type or data

**Verification:**
- [ ] `npm run build` (tsc) passes
- [ ] Cover files exist in `public/project-images/**` at expected sizes (`ls -la`)

**Dependencies:** Task 1 (branch exists)
**Files likely touched:** `src/data/projects.ts`, `public/project-images/**` (new webp files)
**Estimated scope:** S

### Checkpoint: Foundation
- [ ] Build green, hero + assets in place, no visual regressions on hero

### Phase 2: Core layout changes

## Task 3: Featured/rest split in the projects grid

**Description:** Rework `ProjectGrid.tsx` + `ProjectCard.tsx`: drop masonry (`auto-rows`, `row-span`, `baseSpan`). Featured cards render in a 1-col (mobile) / 2-col (sm+) grid with cover image (`aspect-video`, `object-cover`, `loading="lazy"`), title, tagline, tech chips — natural height. Remaining 10 projects render below under a small "More projects" label as compact single-line rows (title + truncated tagline + tiny tech icons), same click-to-expand behavior. Expanded panel and `#project-{id}` deep links keep working for all 14.

**Acceptance criteria:**
- [ ] 4 featured cards with covers show above a compact list of the remaining 10
- [ ] No fixed row heights anywhere; no dead space inside cards
- [ ] Clicking any card/row (or loading a `#project-cperch` URL) opens the expanded panel

**Verification:**
- [ ] `npm run build` passes
- [ ] Manual: click featured card + compact row + deep-link URL; all open the panel
- [ ] Projects section height measured in DevTools drops from ~3.5 to ≤ 2 screens

**Dependencies:** Task 2
**Files likely touched:** `src/components/projects/ProjectGrid.tsx`, `ProjectCard.tsx` (+ a new `ProjectRow` in the same dir), `src/sections/Projects.tsx`
**Estimated scope:** M

## Task 4: Skills compaction + heading order

**Description:** Replace the 3-row marquee with static grouped chip rows: add `group` to each entry in `skills.data.tsx` (Languages / Frontend / Backend & Data / Tooling & Practices), new compact `SkillChips` rendering (small icon + label chips, tagline as `title`), delete `RowMarquee.tsx` usage, the legacy 463-line `src/components/SkillTiles.tsx`, and marquee CSS. Promote the Skills heading h3 → h2 (fixes heading-order audit). Icons become `aria-hidden` (visible text labels carry the name).

**Acceptance criteria:**
- [ ] Skills section ≤ ~0.5 screen on desktop, no auto-motion, no horizontal overflow
- [ ] All 26 skills still visible, grouped, with icons and labels
- [ ] Heading sequence in the section is h2 (no h1→h3 skip)

**Verification:**
- [ ] `npm run build` passes
- [ ] Manual: keyboard-tab through the section — no invisible focus stops
- [ ] `grep -r "RowMarquee\|skills-marquee"` returns no live references

**Dependencies:** None (parallel-safe with T3)
**Files likely touched:** `src/components/skills/*` , `src/styles/SkillTiles.css`, `src/sections/Projects.tsx`, delete `src/components/SkillTiles.tsx`
**Estimated scope:** M

## Task 5: Journey restructure + section-gap trims

**Description:** In `Journey.tsx`: education becomes a compact 2-up band (degree, school, year, 1 bullet) above a full-width experience timeline; trim `mb-20` header margins to `mb-12`. In `Projects.tsx`, reduce divider margins (`my-16` → `my-10`, trailing `mt-16` → `mt-10`). Kill the ragged empty band between the last project rows and Journey.

**Acceptance criteria:**
- [ ] No empty half-column anywhere in Journey
- [ ] Journey ≤ ~1.6 screens on desktop (from 2.3)
- [ ] All education/experience content preserved verbatim

**Verification:**
- [ ] `npm run build` passes
- [ ] DevTools: no ≥ 300px stretch of empty viewport between Projects end and Journey heading

**Dependencies:** Task 3 (shares Projects.tsx)
**Files likely touched:** `src/sections/Journey.tsx`, `src/sections/Projects.tsx`
**Estimated scope:** S

### Checkpoint: Core layout
- [ ] Full-page scroll ≤ ~6.5 screens desktop (from 9.2)
- [ ] Visual pass over every section at 1440px and 390px — no overlaps, no clipped text
- [ ] All 14 projects still reachable; modals + deep links work

### Phase 3: Accessibility + polish + verify

## Task 6: Accessibility pass + mobile header polish

**Description:** Wrap the app in `MotionConfig reducedMotion="user"` (App.tsx). Make `TechIcon`/chip SVGs `aria-hidden` where a text label exists. Fix the NavBar brand button so its accessible name matches its visible text ("Vedant Nandoskar"). Give the mobile brand pill a solid/blurred backdrop (remove the 0.75-opacity cap collision). Sanity-check no remaining `aria-hidden` wrappers contain focusables.

**Acceptance criteria:**
- [ ] With OS reduced-motion emulated, no entrance/marquee/typewriter motion plays (opacity-only OK)
- [ ] Lighthouse accessibility ≥ 98 with zero of the four previously failing audits
- [ ] Mobile header text no longer collides illegibly with card content

**Verification:**
- [ ] `npm run build` passes
- [ ] DevTools Lighthouse a11y re-run on the dev build
- [ ] Emulate reduced motion + screenshot; emulate 390px + scroll mid-page screenshot

**Dependencies:** Tasks 3, 4 (audits target final DOM)
**Files likely touched:** `src/App.tsx`, `src/components/NavBar.tsx`, `src/components/projects/TechIcon.tsx`, `src/components/skills/*`
**Estimated scope:** S

## Task 7: Final verification + preview for review

**Description:** Full measurement pass on the dev build mirroring the original review: total scroll screens (desktop + mobile), hero payload size, Lighthouse (a11y / best practices / SEO), reduced-motion spot check, all interactions. Start the dev server in the Browser pane for the user with a before/after summary. No push/PR until the user reviews the preview.

**Acceptance criteria:**
- [ ] Desktop ≤ ~6.5 screens, mobile ≤ ~7.5 screens
- [ ] Total image payload on load ≤ 300 KB
- [ ] Lighthouse: a11y ≥ 98, BP = 100, SEO = 100

**Verification:**
- [ ] Side-by-side numbers reported (before → after) in chat
- [ ] User-visible preview running in the Browser pane

**Dependencies:** Tasks 1–6
**Files likely touched:** none (verification only) + `.claude/launch.json` if missing
**Estimated scope:** S

### Checkpoint: Complete
- [ ] All acceptance criteria met, branch has one commit per task, ready for PR decision

## Risks and Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| AgentPack YouTube thumbnail looks bad as a cover | Low | Card layout supports text-only cover; decide at preview |
| cprof cover is an SVG (social-card.svg) | Low | Rasterize to WebP via sips, or render SVG directly (it's tiny) |
| Removing marquee changes section feel the user liked | Med | Chips keep the icon + hover-tagline personality; user reviews preview before any push |
| Journey restructure loses the timeline aesthetic | Med | Keep the rail/dot styling on the full-width experience column |
| Framer `layout` animations misbehave after grid changes | Low | Grid no longer needs `layout` (no reflow on expand); remove `motion.div layout` if it glitches |
| `docHidden` Browser-pane artifact makes preview look black to me | Low | Verify via DevTools Chrome; user's pane renders normally when focused |

## Open Questions

None blocking. Two judgment calls made explicit (revisit at preview): the featured-four selection (one-line flag to change), and the AgentPack cover contingency. Hero role-lines copy ("VIRTUAL REALITY") intentionally untouched — positioning copy was excluded from the approved scope.
