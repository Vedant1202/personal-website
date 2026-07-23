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
        "inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-xs font-semibold transition",
        isLight
          ? "bg-paper text-ink hover:border-accent border-black/15"
          : "text-ink-soft hover:border-accent hover:text-ink border-black/15",
      ].join(" ")}
    >
      <span className="text-ink-soft">{icon}</span>
      {label}
    </a>
  );
}
