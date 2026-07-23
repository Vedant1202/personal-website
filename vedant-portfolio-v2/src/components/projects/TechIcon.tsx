// src/components/projects/TechIcon.tsx
import React from "react";
import type { TechKey } from "../../data/projects";

import {
  SiReact,
  SiTypescript,
  SiJavascript,
  SiNodedotjs,
  SiPython,
  SiDjango,
  SiMongodb,
  SiPostgresql,
  SiRedis,
  SiAmazon,
  SiGooglecloud,
  SiUnity,
  SiDocker,
  SiVuedotjs,
  SiGraphql,
  SiSwift,
  SiApple,
} from "react-icons/si";

import { Glasses } from "lucide-react"; // for hololens (closest clean lucide icon)

// same behavior as your SkillTiles:
// - icon renders in brand color
// - CSS mutes it by default, hover removes filter
function BrandIcon({
  Icon,
  color,
}: {
  Icon: React.ComponentType<{ size?: number; className?: string; color?: string }>;
  color: string;
}) {
  return <Icon size={16} color={color} className="proj-tech-icon" aria-hidden />;
}

function GenericIcon({ children }: { children: React.ReactNode }) {
  return (
    <span className="proj-tech-icon" aria-hidden>
      {children}
    </span>
  );
}

export function TechIcon({ k }: { k: TechKey }) {
  switch (k) {
    case "react":
      return <BrandIcon Icon={SiReact} color="#61DAFB" />;
    case "ts":
      return <BrandIcon Icon={SiTypescript} color="#3178C6" />;
    case "js":
      return <BrandIcon Icon={SiJavascript} color="#F7DF1E" />;
    case "node":
      return <BrandIcon Icon={SiNodedotjs} color="#339933" />;
    case "python":
      return <BrandIcon Icon={SiPython} color="#3776AB" />;
    case "django":
      return <BrandIcon Icon={SiDjango} color="#092E20" />;
    case "mongodb":
      return <BrandIcon Icon={SiMongodb} color="#47A248" />;
    case "postgres":
      return <BrandIcon Icon={SiPostgresql} color="#4169E1" />;
    case "redis":
      return <BrandIcon Icon={SiRedis} color="#DC382D" />;
    case "aws":
      return <BrandIcon Icon={SiAmazon} color="#FF9900" />;
    case "gcp":
      return <BrandIcon Icon={SiGooglecloud} color="#4285F4" />;
    case "unity":
      return <BrandIcon Icon={SiUnity} color="#111111" />;
    case "swift":
      return <BrandIcon Icon={SiSwift} color="#F05138" />;
    case "macos":
      return <BrandIcon Icon={SiApple} color="#111111" />;
    case "docker":
      return <BrandIcon Icon={SiDocker} color="#2496ED" />;
    case "vue":
      return <BrandIcon Icon={SiVuedotjs} color="#4FC08D" />;
    case "graphql":
      return <BrandIcon Icon={SiGraphql} color="#E10098" />;
    case "hololens":
      return (
        <GenericIcon>
          <Glasses size={16} className="text-ink-soft" />
        </GenericIcon>
      );
    default:
      return null;
  }
}
