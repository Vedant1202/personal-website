// src/components/ink/Scribbles.tsx
import { InkDrawing, type InkStroke } from "./InkDrawing";

/**
 * Hand-authored black-ink marks. Paths are deliberately a little irregular —
 * true-geometric curves read as clip art rather than pen strokes.
 */

type ScribbleProps = { className?: string };

const ARROW: InkStroke[] = [
  { d: "M4 10 C 32 2, 66 12, 88 36", width: 2, duration: 0.8 },
  { d: "M72 30 L90 38 L78 22", width: 2, delay: 0.55, duration: 0.35 },
];

/** Curved arrow, points down-right. Pairs well with a CTA to its lower right. */
export function ArrowScribble({ className }: ScribbleProps) {
  return <InkDrawing viewBox="0 0 100 46" strokes={ARROW} className={className} />;
}

const LOOP_UNDERLINE: InkStroke[] = [
  { d: "M4 13 C 44 3, 76 21, 114 11 C 152 1, 178 17, 196 12", width: 2.5 },
];

/** Loose underline squiggle for sitting beneath a heading. */
export function UnderlineScribble({ className }: ScribbleProps) {
  return (
    <InkDrawing viewBox="0 0 200 24" strokes={LOOP_UNDERLINE} className={className} />
  );
}

const STAR: InkStroke[] = [
  {
    d: "M20 4 C 21.5 14, 26 18.5, 36 20 C 26 21.5, 21.5 26, 20 36 C 18.5 26, 14 21.5, 4 20 C 14 18.5, 18.5 14, 20 4",
    width: 2,
    duration: 0.9,
  },
];

/** Four-point sparkle for margins and list markers. */
export function StarScribble({ className }: ScribbleProps) {
  return <InkDrawing viewBox="0 0 40 40" strokes={STAR} className={className} />;
}

const SCRATCH_CIRCLE: InkStroke[] = [
  {
    d: "M86 12 C 52 2, 14 14, 9 35 C 4 57, 46 67, 76 62 C 105 57, 116 39, 107 26 C 100 15, 82 9, 64 9",
    width: 2,
    duration: 1.2,
  },
];

/** Rough circle for ringing a word or a small label. */
export function CircleScribble({ className }: ScribbleProps) {
  return (
    <InkDrawing viewBox="0 0 124 72" strokes={SCRATCH_CIRCLE} className={className} />
  );
}

const SOCCER_ARC: InkStroke[] = [
  // flight path
  { d: "M6 150 C 54 48, 160 16, 262 44", width: 2.6, duration: 1.4 },
  // ball — sized to still read as a ball when the drawing is only ~200px wide
  {
    d: "M292 18 A 22 22 0 1 0 292 62 A 22 22 0 1 0 292 18",
    width: 2.6,
    delay: 1.25,
    duration: 0.5,
  },
  // pentagon facet
  {
    d: "M292 28 L301 35 L297 45 L287 45 L283 35 Z",
    width: 2,
    delay: 1.6,
    duration: 0.45,
  },
];

/** Hero signature: a ball's flight path arcing across the whitespace. */
export function SoccerArc({ className }: ScribbleProps) {
  return <InkDrawing viewBox="0 0 320 170" strokes={SOCCER_ARC} className={className} />;
}

const JOURNEY_PATH: InkStroke[] = [
  {
    d: "M60 6 C 18 62, 102 118, 60 178 C 18 238, 102 294, 60 354 C 18 414, 102 470, 60 530 C 46 554, 58 574, 60 594",
    width: 2.5,
    duration: 2.4,
  },
];

/** Journey spine: a winding hand-drawn path in place of a ruled timeline. */
export function JourneyPath({ className }: ScribbleProps) {
  return (
    <InkDrawing
      viewBox="0 0 120 600"
      strokes={JOURNEY_PATH}
      className={className}
      preserveAspect={false}
    />
  );
}

/* ── Stargazing ──────────────────────────────────────────────────────────
   A quiet night-sky motif, tied to the Stars Explorer VR work. Kept sparse
   and drawn in the same pen as the rest of the ink layer. */

/** Concave four-point sparkle centred at (cx,cy), matching the STAR proportions. */
function sparkle(cx: number, cy: number, r: number): string {
  const k = r * 0.094; // inner pinch — how concave the points are
  const m = r * 0.375; // mid control — how fat the arms are
  const t = cy - r;
  const b = cy + r;
  const l = cx - r;
  const rt = cx + r;
  return (
    `M${cx} ${t} C ${cx + k} ${cy - m}, ${cx + m} ${cy - k}, ${rt} ${cy}` +
    ` C ${cx + m} ${cy + k}, ${cx + k} ${cy + m}, ${cx} ${b}` +
    ` C ${cx - k} ${cy + m}, ${cx - m} ${cy + k}, ${l} ${cy}` +
    ` C ${cx - m} ${cy - k}, ${cx - k} ${cy - m}, ${cx} ${t}`
  );
}

/** Small open circle, for the fainter stars in a constellation. */
function dot(cx: number, cy: number, r: number): string {
  return (
    `M${cx - r} ${cy} A ${r} ${r} 0 1 0 ${cx + r} ${cy}` +
    ` A ${r} ${r} 0 1 0 ${cx - r} ${cy}`
  );
}

const CONSTELLATION: InkStroke[] = [
  // faint joining lines, drawn first
  { d: "M14 84 L48 52 L86 66 L118 30 L152 48", width: 1.1, duration: 1.3 },
  // fainter stars as open dots
  { d: dot(14, 84, 2.6), width: 1.5, delay: 1.0, duration: 0.3 },
  { d: dot(48, 52, 2.3), width: 1.5, delay: 1.12, duration: 0.3 },
  { d: dot(86, 66, 2.8), width: 1.5, delay: 1.24, duration: 0.3 },
  { d: dot(152, 48, 2.3), width: 1.5, delay: 1.36, duration: 0.3 },
  // brightest star, the one accent note
  {
    d: sparkle(118, 30, 9),
    width: 1.6,
    delay: 1.5,
    duration: 0.5,
    stroke: "var(--brand-accent)",
  },
];

/** A loose star map — five stars joined, the brightest picked out in accent. */
export function Constellation({ className }: ScribbleProps) {
  return (
    <InkDrawing viewBox="0 0 166 100" strokes={CONSTELLATION} className={className} />
  );
}

const SHOOTING_STAR: InkStroke[] = [
  // brushstroke trail — three tapered passes read as a comet tail
  { d: "M6 80 Q 54 60, 100 34", width: 3.4, duration: 0.7 },
  { d: "M13 84 Q 58 65, 104 38", width: 2, delay: 0.1, duration: 0.65 },
  { d: "M4 73 Q 48 55, 96 31", width: 1.2, delay: 0.18, duration: 0.6 },
  // the star, arriving after the trail
  { d: sparkle(117, 24, 12), width: 2, delay: 0.72, duration: 0.5 },
];

/** A shooting star: a sparkle with a brushed trail sweeping up behind it. */
export function ShootingStar({ className }: ScribbleProps) {
  return (
    <InkDrawing viewBox="0 0 150 92" strokes={SHOOTING_STAR} className={className} />
  );
}

const TWINKLES: InkStroke[] = [
  { d: sparkle(16, 22, 9), width: 1.8, duration: 0.55 },
  {
    d: sparkle(48, 12, 6),
    width: 1.6,
    delay: 0.25,
    duration: 0.45,
    stroke: "var(--brand-accent)",
  },
  { d: sparkle(54, 38, 4.5), width: 1.4, delay: 0.5, duration: 0.4 },
];

/** Three stray sparkles of varying size — a whisper of night sky. */
export function Twinkles({ className }: ScribbleProps) {
  return <InkDrawing viewBox="0 0 72 52" strokes={TWINKLES} className={className} />;
}
