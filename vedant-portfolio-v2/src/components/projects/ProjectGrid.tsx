// src/components/projects/ProjectGrid.tsx
import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import type { Project } from "../../data/projects";
import { ProjectCard } from "./ProjectCard";
import { ProjectRow } from "./ProjectRow";
import { ProjectExpandedPanel } from "./ProjectExpandedPanel";

export function ProjectGrid({ projects }: { projects: Project[] }) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);

  // Open the correct project if the URL hash is #project-{id} on first render
  useEffect(() => {
    const hash = window.location.hash.slice(1); // strip '#'
    if (!hash.startsWith("project-")) return;
    const projectId = hash.slice("project-".length);
    if (!projects.find((p) => p.id === projectId)) return;
    setActiveId(projectId);
    // Give the panel time to mount before scrolling
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
      <p className="mt-10 mb-4 text-xs tracking-[0.3em] text-white/45 uppercase">
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
