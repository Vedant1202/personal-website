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
  size = 40,
}: {
  Icon: React.ComponentType<{ size?: number; className?: string; color?: string }>;
  color: string;
  size?: number;
}) {
  return <Icon size={size} className="skill-icon" color={color} />;
}

export function GenericIcon({ icon }: { icon: React.ReactNode }) {
  return <div className="skill-icon">{icon}</div>;
}

export type Skill = {
  key: string;
  label: string;
  tagline: string;
  icon: React.ReactNode;
};
