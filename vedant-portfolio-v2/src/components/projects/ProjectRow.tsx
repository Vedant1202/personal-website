// src/components/projects/ProjectRow.tsx
import type { Project } from "../../data/projects";
import { TechIcon } from "./TechIcon";

export function ProjectRow({
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
    <article
      className={[
        "flex cursor-pointer items-center justify-between gap-4 rounded-xl border px-4 py-3",
        "transition-[border-color,background-color,opacity] duration-200 ease-out",
        isActive
          ? "border-blue-500/45 bg-white/[0.03]"
          : "border-white/10 bg-white/[0.02] hover:border-blue-400/60 hover:bg-white/[0.035]",
        isMuted ? "opacity-30" : "opacity-100",
      ].join(" ")}
      onClick={onToggle}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onToggle();
      }}
      aria-expanded={isActive}
    >
      <div className="flex min-w-0 items-baseline gap-3">
        <h3 className="shrink-0 text-sm font-semibold text-white">{project.title}</h3>
        <p className="truncate text-sm text-white/55">{project.tagline}</p>
      </div>

      <div className="flex shrink-0 items-center gap-2 text-white/55">
        {project.tech.slice(0, 3).map((t) => (
          <TechIcon key={`${project.id}-row-${t}`} k={t} />
        ))}
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden
          className={[
            "transition-transform duration-200",
            isActive ? "rotate-90 text-blue-300" : "text-white/40",
          ].join(" ")}
        >
          <path
            d="M9 6l6 6-6 6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </article>
  );
}
