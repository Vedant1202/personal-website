// src/components/ink/BackdropStroke.tsx
import { motion, useReducedMotion } from "framer-motion";

/** Desaturated shades of the accent and its neighbours — quiet, never focal. */
type Tone = "blue" | "teal" | "periwinkle";
const TONE: Record<Tone, string> = {
  blue: "#d7e2ec",
  teal: "#d2e0df",
  periwinkle: "#dcdaee",
};

type Shape = "swash" | "zigzag";

type BackdropStrokeProps = {
  shape?: Shape;
  tone?: Tone;
  className?: string;
  /** Final opacity of the (already pale) shape — kept low so it never grabs. */
  opacity?: number;
};

const SWASH =
  "M14 78 C 70 34, 168 22, 250 38 C 292 46, 318 66, 310 90 C 302 112, 256 118, 196 108 C 120 96, 66 112, 30 100 C 10 93, 2 86, 14 78 Z";
const ZIGZAG = "M6 64 L 50 20 L 94 64 L 138 20 L 182 64 L 226 20 L 270 64 L 296 40";

/**
 * A large, pale brush shape (loose swash or zigzag) that lives *behind* content
 * as ambient texture — bleeding off a corner, peeking out from behind a photo.
 * Decorative and inert (aria-hidden, no pointer events); fades in once and is
 * static under reduced motion. Callers place it with -z-10 inside a clipped
 * parent so its bleed never adds scroll.
 */
export function BackdropStroke({
  shape = "swash",
  tone = "blue",
  className,
  opacity = 0.7,
}: BackdropStrokeProps) {
  const reduce = useReducedMotion();

  return (
    <motion.svg
      aria-hidden
      viewBox={shape === "zigzag" ? "0 0 302 84" : "0 0 324 130"}
      className={`pointer-events-none ${className ?? ""}`}
      style={{
        color: TONE[tone],
        // Under reduced motion nothing animates, so the muted level has to come
        // from style — otherwise the shape would sit at full opacity.
        opacity: reduce ? opacity : undefined,
        // Feathers the shape out at its own edges. Without this a backdrop that
        // bleeds past a clipped parent ends in a hard razor line, which reads as
        // a cut rectangle rather than paint.
        maskImage:
          "radial-gradient(120% 130% at 35% 45%, #000 42%, rgba(0,0,0,0.65) 68%, transparent 92%)",
        WebkitMaskImage:
          "radial-gradient(120% 130% at 35% 45%, #000 42%, rgba(0,0,0,0.65) 68%, transparent 92%)",
      }}
      initial={reduce ? false : { opacity: 0 }}
      whileInView={reduce ? undefined : { opacity }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
    >
      {shape === "zigzag" ? (
        <path
          d={ZIGZAG}
          fill="none"
          stroke="currentColor"
          strokeWidth={14}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ) : (
        <path d={SWASH} fill="currentColor" />
      )}
    </motion.svg>
  );
}
