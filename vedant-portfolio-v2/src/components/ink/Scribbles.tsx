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
  { d: "M6 150 C 58 44, 178 14, 286 40", width: 2, duration: 1.4 },
  // ball
  {
    d: "M300 30 A 13 13 0 1 0 300 56 A 13 13 0 1 0 300 30",
    width: 2,
    delay: 1.25,
    duration: 0.5,
  },
  // pentagon facets
  {
    d: "M300 36 L305 41 L303 47 L297 47 L295 41 Z",
    width: 1.4,
    delay: 1.6,
    duration: 0.4,
  },
  { d: "M305 41 L311 40 M303 47 L305 53 M295 41 L289 40", width: 1.2, delay: 1.8 },
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
