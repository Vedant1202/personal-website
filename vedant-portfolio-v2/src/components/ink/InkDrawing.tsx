// src/components/ink/InkDrawing.tsx
import { motion, useReducedMotion } from "framer-motion";

export type InkStroke = {
  d: string;
  /** Stroke width in viewBox units. */
  width?: number;
  /** Seconds to wait before this stroke starts drawing. */
  delay?: number;
  /** Seconds the stroke takes to draw. */
  duration?: number;
  /** Overrides the drawing's ink color — used for the odd blue accent stroke. */
  stroke?: string;
};

type InkDrawingProps = {
  viewBox: string;
  strokes: InkStroke[];
  className?: string;
  /** Any CSS color; defaults to black ink. Blue is for InkMark, not drawings. */
  color?: string;
  /** Drawings are decoration — they never announce themselves or take clicks. */
  title?: string;
  /**
   * False lets the drawing stretch to its container (e.g. a timeline spine that
   * must match section height). Strokes keep their width via non-scaling-stroke.
   */
  preserveAspect?: boolean;
};

/**
 * Inline SVG line art that draws itself once when scrolled into view.
 *
 * Reduced motion is handled explicitly rather than via MotionConfig: that only
 * reduces transforms, and a pathLength tween would still animate under it.
 */
export function InkDrawing({
  viewBox,
  strokes,
  className,
  color = "var(--brand-ink)",
  title,
  preserveAspect = true,
}: InkDrawingProps) {
  const reduceMotion = useReducedMotion();

  return (
    <svg
      viewBox={viewBox}
      fill="none"
      preserveAspectRatio={preserveAspect ? undefined : "none"}
      aria-hidden={title ? undefined : true}
      role={title ? "img" : undefined}
      aria-label={title}
      className={`pointer-events-none select-none ${className ?? ""}`}
    >
      {strokes.map((stroke, i) => (
        <motion.path
          key={`${stroke.d.slice(0, 24)}-${i}`}
          d={stroke.d}
          stroke={stroke.stroke ?? color}
          strokeWidth={stroke.width ?? 2}
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect={preserveAspect ? undefined : "non-scaling-stroke"}
          initial={reduceMotion ? false : { pathLength: 0, opacity: 0 }}
          whileInView={reduceMotion ? undefined : { pathLength: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{
            pathLength: {
              duration: stroke.duration ?? 1.1,
              delay: stroke.delay ?? 0,
              ease: "easeInOut",
            },
            opacity: { duration: 0.15, delay: stroke.delay ?? 0 },
          }}
        />
      ))}
    </svg>
  );
}
