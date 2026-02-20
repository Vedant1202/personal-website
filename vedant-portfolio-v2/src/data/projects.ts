// src/data/projects.ts
export type TechKey =
  | "react"
  | "ts"
  | "js"
  | "node"
  | "python"
  | "django"
  | "mongodb"
  | "postgres"
  | "redis"
  | "aws"
  | "gcp"
  | "unity"
  | "hololens"
  | "vue"
  | "graphql"
  | "docker";

export type Media =
  | { type: "image"; src: string; alt?: string }
  | { type: "video"; src: string; poster?: string };

export type Project = {
  id: string;
  title: string;
  tagline: string;
  tech: TechKey[];
  links?: { github?: string; live?: string; paper?: string; demo?: string };
  size?: "sm" | "md" | "lg";
  longer: string;
  bullets?: string[];
  media?: Media[];
};

export const PROJECTS: Project[] = [
  {
    id: "gesturetips",
    title: "GestureTips",
    tagline: "Context-aware VR help, not static tutorials.",
    tech: ["unity", "hololens", "ts"],
    size: "lg",
    links: { demo: "#", github: "#" },
    longer:
      "Built a context-aware help system for gesture-driven VR that adapts to what the user is trying to do, instead of dumping a tutorial upfront. The goal was faster onboarding without breaking flow, and it held up in a 24-participant study with clear learning curves for guided conditions.",
    bullets: [
      "Adaptive prompts based on user context, not a fixed checklist.",
      "Designed for low-interruption guidance inside immersive tasks.",
      "Study-driven iteration, measured learning effort + time-to-completion.",
    ],
    media: [
      { type: "image", src: "/projects/gesturetips/1.jpg", alt: "GestureTips UI" },
      { type: "image", src: "/projects/gesturetips/2.jpg", alt: "In-VR prompt" },
      {
        type: "video",
        src: "/projects/gesturetips/demo.mp4",
        poster: "/projects/gesturetips/poster.jpg",
      },
    ],
  },
  {
    id: "grant-system",
    title: "Grant Management System",
    tagline: "Role-based workflows across divisions, with real automation.",
    tech: ["node", "mongodb", "react", "ts"],
    size: "md",
    links: { github: "#", live: "#" },
    longer:
      "A workflow platform for managing grant proposals end-to-end: roles, deadlines, reminders, and reporting. Built for clarity: clean API contracts, audit-friendly state changes, and UX that makes it obvious what’s next for each stakeholder.",
    bullets: [
      "Role-based access with clean status transitions.",
      "Automation for reminders/forms to reduce admin drag.",
      "Designed to scale across divisions without becoming a mess.",
    ],
    media: [{ type: "image", src: "/projects/grants/1.jpg", alt: "Grant dashboard" }],
  },
  {
    id: "ignite-reporting",
    title: "IGNITE Reporting Dashboards",
    tagline: "Data-heavy clinical dashboards that stay fast.",
    tech: ["python", "django", "postgres", "redis", "docker"],
    size: "lg",
    links: { demo: "#", github: "#" },
    longer:
      "Built and maintained HIPAA-aware reporting dashboards over large clinical research datasets. Focus was reliability and speed: ingestion, validation checks, and UX that makes messy data feel navigable. The work covered both the backend pipeline and the front-end delivery.",
    bullets: [
      "Validated daily reporting to reduce silent data drift.",
      "Performance-focused UI for dense tables and filters.",
      "Cross-institution workflows that don’t break under scale.",
    ],
  },
  {
    id: "camicroscope",
    title: "CaMicroscope (GSoC)",
    tagline: "Real-time collaborative pathology viewing.",
    tech: ["js", "node", "redis", "docker"],
    size: "md",
    links: { github: "#", paper: "#" },
    longer:
      "Worked on real-time collaboration features for digital pathology workflows. The core challenge was keeping collaboration responsive at scale, using caching and concurrency tuning to reduce latency while maintaining correctness.",
  },
  {
    id: "cave2-language",
    title: "CAVE2 Language Barrier Experience",
    tagline: "Immersive environment that turns confusion into clarity.",
    tech: ["unity", "js"],
    size: "sm",
    links: { demo: "#" },
    longer:
      "Designed an immersive experience representing language barriers faced by immigrants. The space starts noisy and unreadable, then gradually resolves as the user progresses, to convey the moment when a place finally starts making sense.",
  },
  {
    id: "voice-latency",
    title: "Voice Latency Benchmark Harness",
    tagline: "Measure end-to-end voice agent latency, reproducibly.",
    tech: ["python", "ts", "react"],
    size: "sm",
    links: { github: "#" },
    longer:
      "A small harness to benchmark voice pipelines step-by-step, with logging that avoids model guessing ahead by pinning responses to a current script step. Built for fast iteration and consistent measurement.",
  },
];
