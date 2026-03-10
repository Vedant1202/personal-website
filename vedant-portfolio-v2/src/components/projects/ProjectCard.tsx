// src/components/projects/ProjectCard.tsx
import React from "react";
import { motion } from "framer-motion";
import type { Project } from "../../data/projects";
import { TechIcon } from "./TechIcon";

function baseSpan(size?: Project["size"]) {
  // row-span only kicks in at sm+ where the masonry grid is active
  return size === "lg"
    ? "sm:row-span-18"
    : size === "md"
      ? "sm:row-span-15"
      : "sm:row-span-13";
}

export function ProjectCard({
  project,
  isActive,
  isMuted,
  onToggle,
}: {
  project: Project;
  isActive: boolean;
  isMuted: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.article
      layout="position"
      transition={{ type: "spring", stiffness: 380, damping: 34 }}
      className={[
        "relative cursor-pointer overflow-hidden rounded-2xl border bg-white/[0.02] will-change-transform",
        isActive ? "border-blue-500/45" : "border-white/12 hover:border-blue-400/70",
        !isActive
          ? "transition-[transform,box-shadow,border-color,background-color] duration-200 ease-out hover:-translate-y-[2px] hover:scale-[1.018]"
          : "transition-[box-shadow,border-color,background-color] duration-200 ease-out",
        !isActive
          ? "hover:bg-white/[0.035] hover:shadow-[0_0_38px_rgba(59,130,246,0.20)]"
          : "bg-white/[0.03] shadow-[0_0_34px_rgba(59,130,246,0.14)]",
        isMuted ? "scale-[0.985] opacity-30 blur-[0.2px]" : "opacity-100",
        baseSpan(project.size),
      ].join(" ")}
      onClick={onToggle}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onToggle();
      }}
      aria-expanded={isActive}
    >
      <div className="h-full min-h-[9rem] p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="truncate text-sm font-semibold text-white">{project.title}</h3>
            <p className="mt-2 text-sm text-white/65">{project.tagline}</p>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          {project.tech.map((t) => (
            <span
              key={`${project.id}-${t}`}
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-xs text-white/70 transition hover:border-blue-500/25"
            >
              <TechIcon k={t} />
              <span className="capitalize">{t}</span>
            </span>
          ))}
        </div>

        {isActive ? (
          <div className="mt-4 text-[11px] tracking-[0.22em] text-white/45 uppercase">
            Viewing details below
          </div>
        ) : null}
      </div>
    </motion.article>
  );
}
