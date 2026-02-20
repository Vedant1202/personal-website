// src/components/projects/ProjectGrid.tsx
import { useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Project } from "../../data/projects";
import { ProjectCard } from "./ProjectCard";
import { ProjectExpandedPanel } from "./ProjectExpandedPanel";

export function ProjectGrid({ projects }: { projects: Project[] }) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);

  const activeProject = useMemo(
    () => projects.find((p) => p.id === activeId) ?? null,
    [projects, activeId],
  );

  const toggle = (id: string) => {
    setActiveId((prev) => (prev === id ? null : id));

    // scroll after DOM commits the panel
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        panelRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });
  };

  const close = () => setActiveId(null);

  return (
    <div className="mt-10">
      {/* grid */}
      <motion.div
        layout
        className={[
          "grid gap-4",
          // keep your current pinterest-ish setup
          "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
          // only keep this if you're using row-span sizing
          "auto-rows-[12px]",
        ].join(" ")}
      >
        {projects.map((p) => (
          <ProjectCard
            key={p.id}
            project={p}
            isActive={p.id === activeId}
            isMuted={activeId !== null && p.id !== activeId}
            onToggle={() => toggle(p.id)}
          />
        ))}
      </motion.div>

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
