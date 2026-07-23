// src/components/ink/BrushStroke.tsx
import { motion, useReducedMotion } from "framer-motion";

type BrushStrokeProps = {
  className?: string;
  /** Ocean-blue paint by default; ink for a darker swipe. */
  accent?: boolean;
  variant?: 1 | 2 | 3;
  delay?: number;
};

/**
 * A filled, tapered swash — a single confident brush swipe. It is a shape, not a
 * stroke, so it reveals by scaling out from the left (the brush being dragged)
 * rather than a pathLength draw.
 *
 * The bristled edge is baked into the path (wavy top and bottom, tapered ends)
 * rather than applied with an SVG displacement filter: that filter combined with
 * preserveAspectRatio="none" failed to paint at narrow widths in Chrome. The svg
 * scales uniformly and is sized by width alone (height follows the viewBox), so
 * callers pass only a width utility.
 */
const PATHS: Record<1 | 2 | 3, string> = {
  1: "M2 12 C 28 6 58 5 90 8 C 108 9.4 126 6.6 148 8.6 C 170 10.6 196 8.2 220 10.6 C 230 11.6 239 12 239 13.2 C 239 14.8 228 15.4 214 14.8 C 188 13.8 164 16.6 138 15.2 C 110 13.7 82 16.6 54 14.7 C 34 13.4 15 15 4 13.8 C 1 13.4 0 12.6 2 12 Z",
  2: "M2 11 C 24 5.5 52 5 82 7.5 C 104 9 124 6.5 146 8.5 C 168 10.5 190 8 210 10 C 222 11 233 11.5 233 12.8 C 233 14.6 221 15 208 14.4 C 184 13.4 160 16 134 14.6 C 108 13.2 82 15.8 56 14 C 38 12.8 18 14.4 5 13.2 C 1 12.8 0 11.8 2 11 Z",
  3: "M2 12.5 C 30 7 62 6.5 96 9 C 116 10.3 136 7.6 158 9.4 C 178 11 198 8.8 216 10.8 C 226 11.7 234 12.2 234 13.4 C 234 15 223 15.2 210 14.8 C 182 13.9 156 16 128 14.8 C 104 13.8 78 15.9 52 14.2 C 34 13 16 14.4 4 13.4 C 1 13 0 12.9 2 12.5 Z",
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
      viewBox="0 0 240 20"
      className={`pointer-events-none ${className ?? ""}`}
      style={{
        color: accent ? "var(--brand-accent)" : "var(--brand-ink)",
        transformOrigin: "left center",
      }}
      initial={reduce ? false : { scaleX: 0, opacity: 0 }}
      whileInView={reduce ? undefined : { scaleX: 1, opacity: 1 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{
        scaleX: { duration: 0.7, delay, ease: [0.3, 0, 0.2, 1] },
        opacity: { duration: 0.2, delay },
      }}
    >
      <path d={PATHS[variant]} fill="currentColor" fillOpacity={0.88} />
    </motion.svg>
  );
}
