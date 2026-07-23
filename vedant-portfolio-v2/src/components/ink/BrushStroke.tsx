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
  /** Overrides the audition choice — used by the style comparison sheet. */
  style?: BrushChoice;
};

/**
 * A single confident brush swipe, painted in one of four styles. It is a shape,
 * not a stroke, so it reveals by scaling out from the left (the brush being
 * dragged) rather than a pathLength draw. Scales uniformly and is sized by width
 * alone (height follows the viewBox), so callers pass only a width utility.
 *
 * Edges are shaped by the paths themselves rather than an SVG displacement
 * filter: that filter plus preserveAspectRatio="none" failed to paint at narrow
 * widths in Chrome.
 */

/** Ragged tapered bodies, used by every style but rendered differently. */
const BODIES: Record<1 | 2, string> = {
  1: "M3 15 C 22 8 48 7 76 9 C 102 10.6 126 7.8 154 9.8 C 178 11.5 200 9.2 218 11.2 C 228 12.3 236 12.7 236 14.4 C 236 16.3 225 16.7 212 16.1 C 186 14.9 158 17.5 130 16.3 C 104 15.2 76 17.3 50 15.7 C 33 14.7 15 16 5 15 C 1 14.6 0 15.3 3 15 Z",
  2: "M3 14 C 20 8 44 6.6 72 8.4 C 100 10.2 128 7.4 156 9.2 C 180 10.7 202 8.8 220 10.6 C 230 11.6 237 12 237 13.7 C 237 15.6 226 16 212 15.4 C 184 14.2 156 16.8 128 15.6 C 102 14.5 74 16.5 48 15 C 32 14.1 14 15.3 5 14.3 C 1 13.9 0 14.3 3 14 Z",
};

/** Dry-brush bristles trailing off the lift end. */
const BRISTLES = ["M209 11 L 236 9.6", "M212 13.2 L 239 13.2", "M210 15.3 L 234 16.4"];

/** Streaks that let paper show through the middle of a dry stroke. */
const STREAKS = [
  "M28 12.4 C 70 11 118 11.4 176 12",
  "M40 15.4 C 92 16.4 140 15.6 196 15.2",
];

/** Ink splits into tines as the brush lifts. */
const TINES = [
  "M196 12.4 C 212 11.6 226 10.4 238 9.4 C 228 12 212 13 198 13.4 Z",
  "M196 14.6 C 212 15.2 226 16.2 236 17.6 C 224 17.4 210 16.6 197 15.6 Z",
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
  const body = BODIES[variant];

  return (
    <motion.svg
      aria-hidden
      viewBox="0 0 240 24"
      className={`pointer-events-none ${className ?? ""}`}
      style={{
        color: accent ? "var(--brand-accent)" : "var(--brand-ink)",
        transformOrigin: "left center",
        // Watercolor blooms softly past its own edge.
        filter: paint === "watercolor" ? "blur(0.7px)" : undefined,
      }}
      initial={reduce ? false : { scaleX: 0, opacity: 0 }}
      whileInView={reduce ? undefined : { scaleX: 1, opacity: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{
        scaleX: { duration: 0.7, delay, ease: [0.3, 0, 0.2, 1] },
        opacity: { duration: 0.2, delay },
      }}
    >
      {paint === "watercolor" ? (
        // Layered translucent washes — the pigment pools where they overlap.
        <>
          <path d={body} fill="currentColor" fillOpacity={0.34} />
          <path
            d={BODIES[variant === 1 ? 2 : 1]}
            fill="currentColor"
            fillOpacity={0.3}
            transform="translate(4 1.2) scale(0.985 0.9)"
          />
          <path
            d={body}
            fill="currentColor"
            fillOpacity={0.22}
            transform="translate(-3 2) scale(0.97 0.78)"
          />
        </>
      ) : paint === "ink" ? (
        // A loaded, opaque stroke that splits into tines at the lift.
        <>
          <path d={body} fill="currentColor" />
          <g fill="currentColor">
            {TINES.map((d) => (
              <path key={d} d={d} />
            ))}
          </g>
        </>
      ) : paint === "drybrush" ? (
        // Body scratched through with paper-coloured streaks, plus bristles.
        <>
          <path d={body} fill="currentColor" fillOpacity={0.94} />
          <g
            stroke="var(--brand-paper)"
            strokeWidth={0.9}
            strokeLinecap="round"
            fill="none"
            opacity={0.85}
          >
            {STREAKS.map((d) => (
              <path key={d} d={d} />
            ))}
          </g>
          <g
            stroke="currentColor"
            strokeWidth={1.4}
            strokeLinecap="round"
            fill="none"
            opacity={0.8}
          >
            {BRISTLES.map((d) => (
              <path key={d} d={d} />
            ))}
          </g>
        </>
      ) : (
        // gouache — flat, confident, opaque, edges left slightly uneven
        <path d={body} fill="currentColor" fillOpacity={0.92} />
      )}
    </motion.svg>
  );
}
