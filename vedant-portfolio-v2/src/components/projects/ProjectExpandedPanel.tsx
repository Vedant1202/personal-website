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
        "rounded-3xl border border-white/12 bg-white/[0.03]",
        "shadow-[0_0_60px_rgba(59,130,246,0.14)]",
        "overflow-hidden",
      ].join(" ")}
    >
      {/* subtle vignette */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(1200px 420px at 20% 0%, rgba(59,130,246,0.14), transparent 55%), radial-gradient(900px 420px at 85% 10%, rgba(96,165,250,0.10), transparent 60%)",
        }}
      />

      <div className="relative p-5 sm:p-7">
        <ProjectExpanded project={project} onClose={onClose} />
      </div>
    </motion.div>
  );
}
