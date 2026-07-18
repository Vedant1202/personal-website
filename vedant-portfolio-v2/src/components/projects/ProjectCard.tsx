// src/components/projects/ProjectCard.tsx
import { motion } from "framer-motion";
import type { Project } from "../../data/projects";
import { TECH_LABELS } from "../../data/projects";
import { TechIcon } from "./TechIcon";

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
        "group relative cursor-pointer overflow-hidden rounded-2xl border bg-white/[0.02] will-change-transform",
        isActive ? "border-blue-500/45" : "border-white/12 hover:border-blue-400/70",
        !isActive
          ? "transition-[transform,box-shadow,border-color,background-color] duration-200 ease-out hover:-translate-y-[2px] hover:scale-[1.012]"
          : "transition-[box-shadow,border-color,background-color] duration-200 ease-out",
        !isActive
          ? "hover:bg-white/[0.035] hover:shadow-[0_0_38px_rgba(59,130,246,0.20)]"
          : "bg-white/[0.03] shadow-[0_0_34px_rgba(59,130,246,0.14)]",
        isMuted ? "scale-[0.985] opacity-30 blur-[0.2px]" : "opacity-100",
      ].join(" ")}
      onClick={onToggle}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onToggle();
      }}
      aria-expanded={isActive}
    >
      {/* cover — image when provided, styled wordmark otherwise */}
      <div className="relative aspect-video overflow-hidden border-b border-white/10 bg-white/[0.03]">
        {project.cover ? (
          <img
            src={project.cover.src}
            alt={project.cover.alt}
            loading="lazy"
            className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.02]"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-blue-500/[0.16] via-blue-800/[0.06] to-transparent">
            <span className="text-3xl font-semibold tracking-tight text-white/85 sm:text-4xl">
              {project.title}
              <span className="accent-punct">.</span>
            </span>
          </div>
        )}
      </div>

      <div className="p-5">
        <h3 className="text-sm font-semibold text-white">{project.title}</h3>
        <p className="mt-2 text-sm text-white/65">{project.tagline}</p>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          {project.tech.map((t) => {
            const label = TECH_LABELS[t];
            return (
              <span
                key={`${project.id}-${t}`}
                className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-xs text-white/70 transition hover:border-blue-500/25"
              >
                <TechIcon k={t} />
                <span className={label ? "" : "capitalize"}>{label ?? t}</span>
              </span>
            );
          })}
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
