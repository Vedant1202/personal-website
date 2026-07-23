// src/components/hero/heroAnimations.ts
import type { Variants } from "framer-motion";

const EASE_OUT: [number, number, number, number] = [0.2, 0.8, 0.2, 1];

export const roleV: Variants = {
  hidden: { opacity: 0, y: 12, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 1, ease: EASE_OUT },
  },
};

export const revealV: Variants = {
  hidden: { opacity: 0, clipPath: "inset(0 0 100% 0)" },
  show: {
    opacity: 1,
    clipPath: "inset(0 0 0% 0)",
    transition: { duration: 2, ease: EASE_OUT },
  },
};

export const introV: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: EASE_OUT },
  },
};
