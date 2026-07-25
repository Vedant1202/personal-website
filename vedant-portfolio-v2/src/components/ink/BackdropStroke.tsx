// src/components/ink/BackdropStroke.tsx
import { motion, useReducedMotion } from "framer-motion";

/** Desaturated shades of the accent and its neighbours — quiet, never focal. */
type Tone = "blue" | "teal" | "periwinkle";
const TONE: Record<Tone, string> = {
  blue: "#d7e2ec",
  teal: "#d2e0df",
  periwinkle: "#dcdaee",
};

type Shape = "swash" | "zigzag" | "curve" | "ribbon" | "streak";

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

/** A wide arc, as if swept with the whole side of the brush. */
const CURVE =
  "M12 146 C 44 62, 126 12, 232 16 C 274 18, 308 30, 318 50 C 300 38, 266 31, 232 33 C 142 38, 70 84, 40 150 C 34 161, 16 158, 12 146 Z";

/** An S-curve ribbon, the brush changing direction mid-sweep. */
const RIBBON =
  "M6 52 C 52 14, 110 94, 180 72 C 240 52, 280 18, 314 32 C 302 52, 264 78, 202 98 C 132 120, 74 58, 40 88 C 24 101, 8 76, 6 52 Z";

/** A long, low sweep that tapers away — the brush lifting over distance. */
const STREAK =
  "M4 58 C 62 30, 154 14, 252 17 C 302 19, 342 26, 358 38 C 330 35, 292 33, 252 35 C 152 40, 66 58, 16 72 C 6 75, 0 66, 4 58 Z";

const VIEWBOX: Record<Shape, string> = {
  swash: "0 0 324 130",
  zigzag: "0 0 302 84",
  curve: "0 0 324 166",
  ribbon: "0 0 320 124",
  streak: "0 0 362 84",
};

const FILLED: Record<Shape, string> = {
  swash: SWASH,
  zigzag: "",
  curve: CURVE,
  ribbon: RIBBON,
  streak: STREAK,
};

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
      viewBox={VIEWBOX[shape]}
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
        <path d={FILLED[shape]} fill="currentColor" />
      )}
    </motion.svg>
  );
}
