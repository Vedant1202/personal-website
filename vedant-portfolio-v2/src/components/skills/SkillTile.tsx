import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn, type Skill } from "./icons";

export function SkillTile({ s, index }: { s: Skill; index: number }) {
  const [hovered, setHovered] = React.useState(false);
  const [tick, setTick] = React.useState(0);

  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.35,
        ease: "easeOut",
        delay: Math.min(index * 0.01, 0.12),
      }}
      onMouseEnter={() => {
        setHovered(true);
        setTick((t) => t + 1);
      }}
      onMouseLeave={() => setHovered(false)}
      className={cn(
        "skill-tile group relative aspect-square shrink-0 overflow-hidden text-left",
        "rounded-2xl border border-white/10 bg-white/[0.02]",
        "transition-all duration-300",
        "hover:border-blue-500/35 hover:bg-white/[0.05]",
        "hover:shadow-[0_0_30px_rgba(59,130,246,0.14)]",
        "hover:-translate-y-[2px] hover:scale-[1.03] active:scale-[1.01]",
      )}
    >
      {/* glass shine sweep */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-y-[-20%] left-[-60%] w-[45%] rotate-[18deg] bg-gradient-to-r from-transparent via-white/14 to-transparent opacity-0 transition duration-700 group-hover:translate-x-[220%] group-hover:opacity-100"
      />

      <div className="relative flex h-full flex-col justify-between p-5">
        <div className="transition duration-300">{s.icon}</div>

        <div className="space-y-2">
          <p className="text-sm font-semibold tracking-tight text-white/90 transition-colors duration-300 group-hover:text-white">
            {s.label}
          </p>

          <AnimatePresence mode="wait">
            {hovered ? (
              <motion.div
                key={tick}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
                className="tagline-slot text-xs leading-snug text-white/65"
              >
                <span className="typewriter-wrap clamp-2">{s.tagline}</span>
              </motion.div>
            ) : (
              <div className="tagline-slot" aria-hidden />
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.button>
  );
}
