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

  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <div className="mt-10">
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

      {/* the rest — compact rows */}
      <p className="text-ink-soft mt-10 mb-4 text-xs tracking-[0.3em] uppercase">
        More projects
      </p>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
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

      {/* expanded panel below */}
      <div ref={panelRef} className="scroll-mt-28">
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
