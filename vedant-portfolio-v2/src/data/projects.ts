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
  | { type: "video"; src: string; poster?: string } // local mp4/webm
  | { type: "embed"; src: string; title?: string }; // youtube/drive embed url

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
    // links: { demo: "#", github: "#" },
    longer:
      "Built a context-aware help system for gesture-driven VR that adapts to what the user is trying to do, instead of dumping a tutorial upfront. The goal was faster onboarding without breaking flow, and it held up in a 24-participant study with clear learning curves for guided conditions.",
    bullets: [
      "Adaptive prompts based on user context, not a fixed checklist.",
      "Designed for low-interruption guidance inside immersive tasks.",
      "Study-driven iteration, measured learning effort + time-to-completion.",
    ],
    media: [
      // { type: "image", src: "/projects/gesturetips/1.jpg", alt: "GestureTips UI" },
      // { type: "image", src: "/projects/gesturetips/2.jpg", alt: "In-VR prompt" },
      {
        type: "embed",
        src: "https://drive.google.com/file/d/1yaF33bGgk7dqBCAIvNhxkxaXUksvCJY8/preview",
        title: "Global access point",
      },
      {
        type: "embed",
        src: "https://drive.google.com/file/d/18nJ6RmcYLvvwn7WyuBcBKskqPxcgiHEc/preview",
        title: "Localized context-aware access point",
      },
    ],
  },
  {
    id: "grant-system",
    title: "Grant Management System",
    tagline: "Role-based workflows across divisions, with real automation.",
    tech: ["node", "mongodb", "react", "ts"],
    size: "md",
    links: { live: "https://gpms.dom.uic.edu/" },
    longer:
      "A workflow platform for managing grant proposals end-to-end: roles, deadlines, reminders, and reporting. Built for clarity: clean API contracts, audit-friendly state changes, and UX that makes it obvious what’s next for each stakeholder.",
    bullets: [
      "Role-based access with clean status transitions.",
      "Automation for reminders/forms to reduce admin drag.",
      "Designed to scale across divisions without becoming a mess.",
    ],
    media: [
      {
        type: "image",
        src: "./project-images/grant-management/dashboard.png",
        alt: "Grant dashboard",
      },
      {
        type: "image",
        src: "./project-images/grant-management/intake-form-1.png",
        alt: "Intake form 1",
      },
      {
        type: "image",
        src: "./project-images/grant-management/intake-form-2.png",
        alt: "Intake form 2",
      },
      {
        type: "image",
        src: "./project-images/grant-management/timeline.png",
        alt: "Timeline",
      },
    ],
  },
  {
    id: "lights-camera-run",
    title: "Lights, Camera, Run!",
    tagline: "Third-person stealth adventure, outrun paparazzi before midnight.",
    tech: ["unity", "js"],
    size: "sm",
    links: { github: "#" },
    longer:
      "A third-person stealth-adventure game where you play a rising celebrity navigating a busy city to reach auditions before midnight, while avoiding aggressive paparazzi. Players can use teleportation taxis, disguise at clothing stores, and choose alleys or main roads to survive the chaos of fame.",
    bullets: [
      "Unity physics: tuned movement, jumping, collisions, and city interactions like hitting cars.",
      "AI systems: A* traffic cars, flocking fans that follow the player, and a Bayesian network that drives paparazzi chase decisions (street type, fame, time of day).",
      "Audio layering: footsteps, camera flashes, fan cheers, countdown urgency, and music that ramps up during chases.",
      "Shaders for clear feedback: taxi windows glow green or red, danger bar flashes when paparazzi is close, player glow after successful auditions.",
    ],
    media: [
      {
        type: "embed",
        // replace VIDEO_ID with your YouTube id
        src: "https://drive.google.com/file/d/1Q4seQA0QNOa4oM8JihSiIhuHwKJbVILW/preview",
        title: "Lights, Camera, Run! — Gameplay Demo",
      },
    ],
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
    links: { github: "https://github.com/camicroscope/caMicroscope" },
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
];
