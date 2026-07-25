// src/components/projects/ProjectGrid.tsx
import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import type { Project } from "../../data/projects";
import { ProjectCard } from "./ProjectCard";
import { ProjectRow } from "./ProjectRow";
import { ProjectExpandedPanel } from "./ProjectExpandedPanel";

/** Reads #project-{id} so a shared deep link opens that project on first paint. */
function activeIdFromHash(projects: Project[]): string | null {
  const hash = window.location.hash.slice(1); // strip '#'
  if (!hash.startsWith("project-")) return null;
  const projectId = hash.slice("project-".length);
  return projects.some((p) => p.id === projectId) ? projectId : null;
}

export function ProjectGrid({ projects }: { projects: Project[] }) {
  const [activeId, setActiveId] = useState<string | null>(() =>
    activeIdFromHash(projects),
  );
  const panelRef = useRef<HTMLDivElement | null>(null);

  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  // The archive starts closed, but a deep link into an archived project has to
  // win over that default — otherwise a shared link lands on a collapsed list.
  const [archiveOpen, setArchiveOpen] = useState(() => {
    const linked = activeIdFromHash(projects);
    return linked !== null && rest.some((p) => p.id === linked);
  });

  // Deep-linked project is already open; just bring the panel into view once mounted.
  useEffect(() => {
    if (!activeIdFromHash(projects)) return;
    const t = setTimeout(() => {
      panelRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 400);
    return () => clearTimeout(t);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const activeProject = useMemo(
    () => projects.find((p) => p.id === activeId) ?? null,
    [projects, activeId],
  );

  const toggle = (id: string) => {
    const next = activeId === id ? null : id;
    setActiveId(next);

    // Keep URL in sync so the link is shareable
    window.history.replaceState(null, "", next ? `#project-${next}` : "#projects");

    // scroll after DOM commits the panel
    if (next) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          panelRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        });
      });
    }
  };

  const close = () => {
    setActiveId(null);
    window.history.replaceState(null, "", "#projects");
  };

  // The panel is an expanded region rather than a modal, so it does not trap
  // focus — but Escape is the dismissal a keyboard user reaches for regardless,
  // and without it the only way out is to tab back up to the card that opened it.
  useEffect(() => {
    if (activeId === null) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      // Escape dismisses the topmost layer only. The lightbox opens from inside
      // this panel and listens on window too, so without this check one press
      // would close both.
      if (document.querySelector('[role="dialog"][aria-modal="true"]')) return;
      setActiveId(null);
      window.history.replaceState(null, "", "#projects");
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeId]);

  return (
    <div className="space-tight">
      {/* featured cards — natural height, covers on top */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {featured.map((p) => (
          <ProjectCard
            key={p.id}
            project={p}
            isActive={p.id === activeId}
            isMuted={activeId !== null && p.id !== activeId}
            onToggle={() => toggle(p.id)}
          />
        ))}
      </div>

      {/* the rest — an archive, collapsed so curation carries the section */}
      <div className="space-block">
        <button
          type="button"
          onClick={() => setArchiveOpen((v) => !v)}
          aria-expanded={archiveOpen}
          aria-controls="project-archive"
          className="ink-link text-ink-soft hover:text-ink group inline-flex items-center gap-2 text-xs tracking-[0.3em] uppercase"
        >
          <span>{archiveOpen ? "Fewer projects" : `${rest.length} more projects`}</span>
          <svg
            aria-hidden
            viewBox="0 0 24 24"
            fill="none"
            className={`h-3.5 w-3.5 transition-transform duration-200 ${
              archiveOpen ? "rotate-180" : ""
            }`}
          >
            <path
              d="M6 9l6 6 6-6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {archiveOpen && (
          <div
            id="project-archive"
            className="mt-6 grid grid-cols-1 gap-2 sm:grid-cols-2"
          >
            {rest.map((p) => (
              <ProjectRow
                key={p.id}
                project={p}
                isActive={p.id === activeId}
                isMuted={activeId !== null && p.id !== activeId}
                onToggle={() => toggle(p.id)}
              />
            ))}
          </div>
        )}
      </div>

      {/* expanded panel below */}
      <div ref={panelRef} className="scroll-anchor">
        <AnimatePresence>
          {activeProject ? (
            <ProjectExpandedPanel
              key={activeProject.id}
              project={activeProject}
              onClose={close}
            />
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  );
}
