// src/components/ink/Scribbles.tsx
import { FaFutbol } from "react-icons/fa";
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

/*
 * Flight path plus two trailing motion lines.
 *
 * The previous single stroke was nominally a cubic but its control points sat
 * almost exactly on the chord, so it drew as a straight line — a ball on a
 * ruler rather than a ball in flight. These control points sit well above the
 * chord, giving a real ballistic climb: steep off the boot, flattening as it
 * nears the apex where the ball is. The two shorter strokes echo the same curve
 * just behind it and come in slightly later, which is what reads as speed.
 */
const KICK_ARC: InkStroke[] = [
  { d: "M6 92 C 52 62, 116 32, 196 26", width: 2.4, duration: 1.1 },
  { d: "M128 60 C 156 48, 180 42, 197 39", width: 1.5, delay: 0.45, duration: 0.45 },
  { d: "M148 75 C 170 66, 189 60, 202 57", width: 1.3, delay: 0.6, duration: 0.4 },
];

/**
 * A real soccer ball mid-flight: the recognizable ball glyph sits at the end of
 * a hand-drawn arc, so the ink layer still owns the motion but the ball reads as
 * a ball. The drawn version never did — a lone facet on a circle looked like a bolt.
 *
 * The ball is the only depictive object here on purpose. A boot or cleat at the
 * kick end was the obvious alternative, but it puts a second subject in a 208px
 * box and the eye then has to choose between them; the motion lines carry the
 * same "this was struck" idea without competing for attention.
 */
export function SoccerBall({ className }: ScribbleProps) {
  return (
    <div
      className={`pointer-events-none relative select-none ${className ?? ""}`}
      aria-hidden
    >
      <InkDrawing viewBox="0 0 240 100" strokes={KICK_ARC} className="h-full w-full" />
      <FaFutbol className="text-ink absolute top-0 right-0 h-9 w-9 -rotate-6" />
    </div>
  );
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

/* ── Astronomy ────────────────────────────────────────────────────────────
   A quiet celestial motif — a planet, a solar system, a galaxy. Kept sparse
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

/** Small open circle — a planet disc, a sun, a galaxy core. */
function dot(cx: number, cy: number, r: number): string {
  return (
    `M${cx - r} ${cy} A ${r} ${r} 0 1 0 ${cx + r} ${cy}` +
    ` A ${r} ${r} 0 1 0 ${cx - r} ${cy}`
  );
}

const SATURN: InkStroke[] = [
  // planet
  { d: dot(45, 36, 16), width: 2, duration: 0.9 },
  // ring — a tilted ellipse crossing the disc
  {
    d: "M79 26 A 36 11 -16 1 1 11 46 A 36 11 -16 1 1 79 26",
    width: 1.8,
    delay: 0.5,
    duration: 1.1,
  },
  // a small companion, the one accent note
  {
    d: sparkle(82, 12, 5),
    width: 1.5,
    delay: 1.2,
    duration: 0.4,
    stroke: "var(--brand-accent)",
  },
];

/** A ringed planet — the astronomy note in the hero. */
export function Saturn({ className }: ScribbleProps) {
  return <InkDrawing viewBox="0 0 98 62" strokes={SATURN} className={className} />;
}

const SMILEY: InkStroke[] = [
  { d: dot(23, 23, 18), width: 2, duration: 0.8 },
  // eyes — small arcs rather than dots, so they read as drawn
  { d: "M15 18 C 15.8 16.2 17.2 16.2 18 18", width: 2, delay: 0.6, duration: 0.25 },
  { d: "M28 18 C 28.8 16.2 30.2 16.2 31 18", width: 2, delay: 0.72, duration: 0.25 },
  { d: "M14 26 C 18 31.5 28 31.5 32 25.5", width: 2, delay: 0.85, duration: 0.45 },
];

/** A little drawn smiley, for signing off a caption. */
export function Smiley({ className }: ScribbleProps) {
  return <InkDrawing viewBox="0 0 46 46" strokes={SMILEY} className={className} />;
}
