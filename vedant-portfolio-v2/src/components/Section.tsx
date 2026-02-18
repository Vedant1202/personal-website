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
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="mx-auto max-w-5xl px-6 py-24"
    >
      {title && <h2 className="mb-10 text-2xl font-semibold tracking-tight">{title}</h2>}
      {children}
    </motion.section>
  );
}
