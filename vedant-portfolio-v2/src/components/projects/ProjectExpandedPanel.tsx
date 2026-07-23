// src/components/projects/ProjectExpandedPanel.tsx
import { motion } from "framer-motion";
import type { Project } from "../../data/projects";
import { ProjectExpanded } from "./ProjectExpanded";

export function ProjectExpandedPanel({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10, filter: "blur(6px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      exit={{ opacity: 0, y: 10, filter: "blur(6px)" }}
      transition={{ duration: 0.22, ease: "easeOut" }}
      className={[
        "relative mt-8",
        "bg-paper ink-edge border-[1.5px] border-black/25",
        "shadow-[0_12px_40px_rgba(0,0,0,0.10)]",
        "overflow-hidden",
      ].join(" ")}
    >
      <div className="relative p-5 sm:p-7">
        <ProjectExpanded project={project} onClose={onClose} />
      </div>
    </motion.div>
  );
}
