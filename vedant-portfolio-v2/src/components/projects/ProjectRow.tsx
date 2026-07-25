// src/components/projects/ProjectRow.tsx
import type { Project } from "../../data/projects";
import { TechIcon } from "./TechIcon";

/**
 * A compact archive row: title over a one-line tagline, with the tech and a
 * chevron trailing. Both text lines truncate to a single line, so every row is
 * the same height no matter how long the title or tagline is — the old inline
 * "title · tagline" layout let a long title (e.g. the grant platform) crowd the
 * tagline into a sliver that wrapped to a dozen lines, blowing up the grid row.
 * This is the standard title/subtitle list item (Gmail, Linear, GitHub repos).
 */
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
        "ink-edge-sm group flex h-full cursor-pointer items-center gap-4 border px-4 py-3",
        "transition-[border-color,background-color,opacity] duration-200 ease-out",
        isActive
          ? "border-accent bg-black/[0.02]"
          : "hover:border-accent/60 border-black/22 hover:bg-black/[0.02]",
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
      {/* min-w-0 + flex-1 lets both lines truncate instead of pushing the row wide */}
      <div className="min-w-0 flex-1">
        <h3 className="font-display text-ink truncate text-base leading-tight font-semibold">
          {project.title}
        </h3>
        <p className="text-ink-soft mt-1 truncate text-sm leading-tight">
          {project.tagline}
        </p>
      </div>

      <div className="flex shrink-0 items-center gap-2">
        {/* Tech icons follow the same ink discipline as the rest: muted at rest,
            full colour when the row is hovered. */}
        <span className="text-ink-soft flex items-center gap-2 [&_svg]:opacity-70 [&_svg]:grayscale [&_svg]:transition group-hover:[&_svg]:opacity-100 group-hover:[&_svg]:grayscale-0">
          {project.tech.slice(0, 3).map((t) => (
            <TechIcon key={`${project.id}-row-${t}`} k={t} />
          ))}
        </span>
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden
          className={[
            "shrink-0 transition-transform duration-200",
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
