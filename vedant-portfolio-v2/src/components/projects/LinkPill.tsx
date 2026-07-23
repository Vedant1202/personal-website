import React from "react";

export function LinkPill({
  href,
  label,
  icon,
  variant,
}: {
  href: string;
  label: string;
  icon: React.ReactNode;
  variant?: "dark" | "light";
}) {
  const isLight = variant === "light";

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={[
        "ink-edge-sm inline-flex items-center gap-2 border px-3 py-2 text-xs font-semibold transition",
        isLight
          ? "bg-paper text-ink hover:border-accent border-black/25"
          : "text-ink-soft hover:border-accent hover:text-ink border-black/25",
      ].join(" ")}
    >
      <span className="text-ink-soft">{icon}</span>
      {label}
    </a>
  );
}
