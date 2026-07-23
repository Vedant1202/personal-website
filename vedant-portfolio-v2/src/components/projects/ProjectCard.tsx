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
    <motion.div
      layout="position"
      transition={{ type: "spring", stiffness: 380, damping: 34 }}
      className={[
        "group bg-paper ink-edge relative cursor-pointer overflow-hidden border-[1.5px] will-change-transform",
        isActive ? "border-accent" : "hover:border-accent/60 border-black/25",
        !isActive
          ? "transition-[transform,box-shadow,border-color] duration-200 ease-out hover:-translate-y-[2px] hover:shadow-[0_10px_28px_rgba(0,0,0,0.10)]"
          : "shadow-[0_10px_28px_rgba(0,0,0,0.08)] transition-[box-shadow,border-color] duration-200 ease-out",
        isMuted ? "scale-[0.985] opacity-40" : "opacity-100",
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
      <div className="relative aspect-video overflow-hidden border-b border-black/10 bg-black/[0.03]">
        {project.cover ? (
          <img
            src={project.cover.src}
            alt={project.cover.alt}
            loading="lazy"
            className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.02]"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <span className="font-display text-ink text-3xl font-semibold tracking-tight sm:text-4xl">
              {project.title}
              <span className="text-accent">.</span>
            </span>
          </div>
        )}
      </div>

      <div className="p-5">
        <h3 className="text-ink text-sm font-semibold">{project.title}</h3>
        <p className="text-ink-soft mt-2 text-sm">{project.tagline}</p>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          {project.tech.map((t) => {
            const label = TECH_LABELS[t];
            return (
              <span
                key={`${project.id}-${t}`}
                className="text-ink-soft hover:border-accent/40 ink-edge-sm inline-flex items-center gap-2 border border-black/18 px-3 py-2 text-xs transition"
              >
                <TechIcon k={t} />
                <span className={label ? "" : "capitalize"}>{label ?? t}</span>
              </span>
            );
          })}
        </div>

        {isActive ? (
          <div className="text-accent mt-4 text-[11px] tracking-[0.22em] uppercase">
            Viewing details below
          </div>
        ) : null}
      </div>
    </motion.div>
  );
}
