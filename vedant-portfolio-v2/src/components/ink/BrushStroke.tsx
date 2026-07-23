// src/components/ink/BrushStroke.tsx
import { motion, useReducedMotion } from "framer-motion";
import { useAudition } from "../audition/auditionContext";
import type { BrushChoice } from "../audition/auditionContext";

type BrushStrokeProps = {
  className?: string;
  /** Ocean-blue paint by default; ink for a darker swipe. */
  accent?: boolean;
  variant?: 1 | 2;
  delay?: number;
  /** Overrides the audition choice — used by the comparison sheet. */
  style?: BrushChoice;
};

/**
 * A single brush swipe. The four styles differ in silhouette, not in fine
 * texture: at the size these render (~30px tall) streaks and bristles are
 * invisible, so each style is built as a distinct shape — solid, broken,
 * pooled, or tapered — which is what actually reads.
 *
 * It is a shape rather than a stroke, so it reveals by scaling out from the
 * left (the brush being dragged) rather than a pathLength draw. Scales
 * uniformly and is sized by width alone; callers pass only a width utility.
 */

/** gouache — one confident, opaque, evenly loaded swipe. */
const GOUACHE: Record<1 | 2, string> = {
  1: "M4 19 C 30 9 66 7 104 10 C 140 13 174 9 206 13 C 223 15 237 16 237 20 C 237 24.5 222 26.5 206 25.5 C 172 23 138 28 104 25 C 68 22 32 27 6 22.5 C 1 21.5 0 20 4 19 Z",
  2: "M4 21 C 28 11 62 9 98 12 C 134 15 170 10 202 14 C 220 16 236 17 236 21 C 236 25.5 220 27 202 26 C 168 23.5 134 29 98 26 C 62 23 30 28 6 24 C 1 23 0 22 4 21 Z",
};

/** drybrush — the load runs out; the swipe breaks into separate chunks. */
const DRYBRUSH_CHUNKS = [
  "M4 19 C 20 11 42 9 64 12 C 73 13.4 75 17 72 20.5 C 68 25 48 27 28 25 C 12 23.4 1 21.5 4 19 Z",
  "M86 14.5 C 104 11.5 124 10.6 142 13.6 C 149 14.8 150 18.4 146 21.6 C 141 25.6 120 26.6 100 23.6 C 88 21.8 81 16.6 86 14.5 Z",
  "M160 14 C 176 12 190 12.4 202 15.4 C 208 16.8 208 19.8 203 21.8 C 197 24.4 178 25 164 22 C 155 20 155 15.4 160 14 Z",
  "M214 16.4 C 222 15.4 230 15.6 235 17.6 C 238 18.8 238 20.6 234 21.6 C 227 23.2 218 22.4 213 20.6 C 210 19.6 211 16.8 214 16.4 Z",
];
const DRYBRUSH_BRISTLES = ["M76 18 L 84 17.6", "M150 18.4 L 158 18", "M206 19 L 213 19"];

/** watercolor — pale washes that pool darker where they overlap. */
const WATERCOLOR = [
  "M6 18 C 32 8 70 6 108 10 C 146 14 178 8 210 13 C 228 16 238 18 236 22 C 233 27 216 29 196 27 C 160 24 126 30 92 26 C 58 22 26 28 8 23 C 2 21.5 1 19 6 18 Z",
  "M18 22 C 44 15 82 14 118 17 C 152 20 186 16 214 20 C 226 22 232 24 228 27 C 222 30.5 196 31 168 29 C 132 26.5 100 32 68 29 C 42 26.5 16 27 18 22 Z",
  "M40 12 C 74 7 112 8 148 12 C 176 15 202 12 220 15 C 228 16.4 230 18 226 19.6 C 218 22 190 21 162 19 C 126 16.4 92 20 62 18 C 44 16.8 34 14 40 12 Z",
];

/** ink — loaded and blunt at the touch-down, tapering to a split point. */
const INK_BODY =
  "M5 13 C 26 8 56 7 90 10.5 C 124 14 158 12 188 16 C 206 18.4 222 21 234 24 C 220 25.4 200 25 182 23.6 C 148 21 116 26 84 24 C 54 22 26 26 6 22 C 1 21 0 15 5 13 Z";
const INK_TINES = [
  "M196 19 C 212 19.6 226 21 238 23.4 C 226 23.6 210 22.6 195 21 Z",
  "M192 22.6 C 208 24 222 26 232 28.6 C 220 28 204 26.4 190 24.4 Z",
];

export function BrushStroke({
  className,
  accent = true,
  variant = 1,
  delay = 0,
  style,
}: BrushStrokeProps) {
  const reduce = useReducedMotion();
  const { brush } = useAudition();
  const paint = style ?? brush;

  return (
    <motion.svg
      aria-hidden
      viewBox="0 0 240 34"
      className={`pointer-events-none ${className ?? ""}`}
      style={{
        color: accent ? "var(--brand-accent)" : "var(--brand-ink)",
        transformOrigin: "left center",
        filter: paint === "watercolor" ? "blur(1.4px)" : undefined,
      }}
      initial={reduce ? false : { scaleX: 0, opacity: 0 }}
      whileInView={reduce ? undefined : { scaleX: 1, opacity: 1 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{
        scaleX: { duration: 0.7, delay, ease: [0.3, 0, 0.2, 1] },
        opacity: { duration: 0.2, delay },
      }}
    >
      {paint === "watercolor" ? (
        <g fill="currentColor">
          {WATERCOLOR.map((d, i) => (
            <path key={d} d={d} fillOpacity={[0.3, 0.26, 0.22][i]} />
          ))}
        </g>
      ) : paint === "ink" ? (
        <g fill="currentColor">
          <path d={INK_BODY} />
          {INK_TINES.map((d) => (
            <path key={d} d={d} />
          ))}
        </g>
      ) : paint === "drybrush" ? (
        <>
          <g fill="currentColor" fillOpacity={0.95}>
            {DRYBRUSH_CHUNKS.map((d) => (
              <path key={d} d={d} />
            ))}
          </g>
          <g
            stroke="currentColor"
            strokeWidth={1.6}
            strokeLinecap="round"
            fill="none"
            opacity={0.7}
          >
            {DRYBRUSH_BRISTLES.map((d) => (
              <path key={d} d={d} />
            ))}
          </g>
        </>
      ) : (
        <path d={GOUACHE[variant]} fill="currentColor" fillOpacity={0.93} />
      )}
    </motion.svg>
  );
}
