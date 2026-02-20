// src/components/hero/HighlightWord.tsx
import { motion } from "framer-motion";
import { highlightV } from "./heroAnimations";

type HighlightWordProps = {
  children: React.ReactNode;
  delay?: number; // seconds from page load
  className?: string;
};

export function HighlightWord({ children, delay = 0, className }: HighlightWordProps) {
  return (
    <span className={`relative inline-block ${className ?? ""}`}>
      <span className="relative z-10">{children}</span>

      {/* Highlighter swipe */}
      <motion.span
        aria-hidden
        className="absolute bottom-[0.08em] left-0 z-0 h-[40%] w-full origin-left rounded-[0.25em] bg-blue-500/28 shadow-[0_0_16px_rgba(59,130,246,0.22)]"
        variants={highlightV}
        initial="off"
        animate="on"
        transition={{ delay }}
      />
    </span>
  );
}
