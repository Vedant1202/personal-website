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
    <div
      className={[
        "flex cursor-pointer items-center justify-between gap-4 rounded-xl border px-4 py-3",
        "transition-[border-color,background-color,opacity] duration-200 ease-out",
        isActive
          ? "border-accent bg-black/[0.02]"
          : "hover:border-accent/60 border-black/12 hover:bg-black/[0.02]",
        isMuted ? "opacity-40" : "opacity-100",
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
        <h3 className="text-ink shrink-0 text-sm font-semibold">{project.title}</h3>
        <p className="text-ink-soft truncate text-sm">{project.tagline}</p>
      </div>

      <div className="text-ink-soft flex shrink-0 items-center gap-2">
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
            isActive ? "text-accent rotate-90" : "text-ink-soft",
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
    </div>
  );
}
