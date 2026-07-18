import React from "react";

export function cn(...s: Array<string | false | null | undefined>) {
  return s.filter(Boolean).join(" ");
}

/**
 * BrandIcon:
 * - keep real brand colors
 * - muted by CSS (filter/grayscale)
 * - pops on tile hover (CSS)
 */
export function BrandIcon({
  Icon,
  color,
  size = 16,
}: {
  Icon: React.ComponentType<{ size?: number; className?: string; color?: string }>;
  color: string;
  size?: number;
}) {
  return <Icon size={size} className="skill-icon" color={color} aria-hidden />;
}

export function GenericIcon({ icon }: { icon: React.ReactNode }) {
  return (
    <div aria-hidden className="skill-icon">
      {icon}
    </div>
  );
}

export type Skill = {
  key: string;
  label: string;
  tagline: string;
  icon: React.ReactNode;
};
