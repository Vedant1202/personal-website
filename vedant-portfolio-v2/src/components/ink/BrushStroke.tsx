// src/components/ink/BrushStroke.tsx
import { motion, useReducedMotion } from "framer-motion";

type BrushStrokeProps = {
  className?: string;
  /** Ocean-blue paint by default; ink for a darker swipe. */
  accent?: boolean;
  variant?: 1 | 2;
  delay?: number;
};

/**
 * A single gouache brush swipe — flat, opaque, evenly loaded. Three other paints
 * (drybrush, watercolor, ink) were auditioned and removed once gouache was
 * chosen; the differences lived in silhouette rather than texture, because at
 * the size these render fine texture is invisible.
 *
 * It is a shape rather than a stroke, so it reveals by scaling out from the left
 * (the brush being dragged) rather than a pathLength draw. Scales uniformly and
 * is sized by width alone; callers pass only a width utility.
 */
const BODIES: Record<1 | 2, string> = {
  1: "M4 19 C 30 9 66 7 104 10 C 140 13 174 9 206 13 C 223 15 237 16 237 20 C 237 24.5 222 26.5 206 25.5 C 172 23 138 28 104 25 C 68 22 32 27 6 22.5 C 1 21.5 0 20 4 19 Z",
  2: "M4 21 C 28 11 62 9 98 12 C 134 15 170 10 202 14 C 220 16 236 17 236 21 C 236 25.5 220 27 202 26 C 168 23.5 134 29 98 26 C 62 23 30 28 6 24 C 1 23 0 22 4 21 Z",
};

export function BrushStroke({
  className,
  accent = true,
  variant = 1,
  delay = 0,
}: BrushStrokeProps) {
  const reduce = useReducedMotion();

  return (
    <motion.svg
      aria-hidden
      viewBox="0 0 240 34"
      className={`pointer-events-none ${className ?? ""}`}
      style={{
        color: accent ? "var(--brand-accent)" : "var(--brand-ink)",
        transformOrigin: "left center",
      }}
      initial={reduce ? false : { scaleX: 0, opacity: 0 }}
      whileInView={reduce ? undefined : { scaleX: 1, opacity: 1 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{
        scaleX: { duration: 0.7, delay, ease: [0.3, 0, 0.2, 1] },
        opacity: { duration: 0.2, delay },
      }}
    >
      <path d={BODIES[variant]} fill="currentColor" fillOpacity={0.93} />
    </motion.svg>
  );
}
