// src/components/ink/HobbyDoodle.tsx
import { motion, useReducedMotion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

type HobbyDoodleProps = {
  icon: LucideIcon;
  className?: string;
  /** Ink by default; one glyph per cluster can take the accent. */
  accent?: boolean;
  /** Which wobble seed (1–3) — vary across neighbours so they differ. */
  rough?: 1 | 2 | 3;
  size?: number;
  /** Small tilt in degrees, so a row of glyphs sits hand-placed. */
  tilt?: number;
};

/**
 * A hobby glyph: a ready-made Lucide icon (MIT) pushed through the ink-rough
 * filter so it reads as hand-drawn. Decorative — aria-hidden, no pointer events.
 * Appears with a light spring on scroll; static under reduced motion.
 */
export function HobbyDoodle({
  icon: Icon,
  className,
  accent = false,
  rough = 1,
  size = 44,
  tilt = 0,
}: HobbyDoodleProps) {
  const reduce = useReducedMotion();

  return (
    <motion.span
      aria-hidden
      // No display utility here on purpose — the caller owns it (e.g.
      // "hidden lg:inline-flex"). A base `inline-flex` would collide with a
      // passed `hidden`, and the glyph would leak onto mobile.
      className={`pointer-events-none ${className ?? ""}`}
      style={{
        color: accent ? "var(--brand-accent)" : "var(--brand-ink)",
        filter: `url(#ink-rough-${rough})`,
        rotate: `${tilt}deg`,
      }}
      initial={reduce ? false : { opacity: 0, scale: 0.82 }}
      whileInView={reduce ? undefined : { opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ type: "spring", stiffness: 190, damping: 15 }}
    >
      <Icon size={size} strokeWidth={1.6} absoluteStrokeWidth />
    </motion.span>
  );
}
