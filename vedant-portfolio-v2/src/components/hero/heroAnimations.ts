// src/components/hero/heroAnimations.ts
import type { Variants } from "framer-motion";

const EASE_OUT: [number, number, number, number] = [0.2, 0.8, 0.2, 1];

/*
 * Durations are deliberately short. The hero used to take 3.0s to settle, which
 * is long enough that a visitor arrives to a page still assembling itself — the
 * name wiped in over two full seconds. Entrances now finish inside ~1.5s, close
 * to the 200-500ms-per-element range that reads as responsive rather than staged.
 *
 * No blur() on entering text either: animating a filter forces a repaint of the
 * blurred layer every frame, and mid-transition the copy is unreadable, so the
 * effect costs paint time to make text worse.
 */
export const roleV: Variants = {
  hidden: { opacity: 0, y: 8 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: EASE_OUT },
  },
};

export const revealV: Variants = {
  hidden: { opacity: 0, clipPath: "inset(0 0 100% 0)" },
  show: {
    opacity: 1,
    clipPath: "inset(0 0 0% 0)",
    transition: { duration: 0.6, ease: EASE_OUT },
  },
};

export const introV: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: EASE_OUT },
  },
};
