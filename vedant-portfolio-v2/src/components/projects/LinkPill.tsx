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
          ? "border-slate-200 bg-white text-slate-900 hover:border-slate-300 hover:bg-slate-50"
          : "border-white/12 bg-white/[0.04] text-white/80 hover:border-blue-500/30 hover:bg-white/[0.06]",
      ].join(" ")}
    >
      <span className={isLight ? "text-slate-700" : "text-white/70"}>{icon}</span>
      {label}
    </a>
  );
}
