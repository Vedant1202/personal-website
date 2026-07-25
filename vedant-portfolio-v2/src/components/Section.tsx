// src/components/Section.tsx
import { motion } from "framer-motion";
import type { PropsWithChildren } from "react";

type SectionProps = PropsWithChildren<{
  id: string;
  title?: string;
}>;

export function Section({ id, title, children }: SectionProps) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.05 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="bg-paper text-ink"
    >
      <div className="page-shell section-pad">
        {title && (
          <h2 className="font-display mb-10 text-3xl font-semibold tracking-tight">
            {title}
          </h2>
        )}
        {children}
      </div>
    </motion.section>
  );
}
