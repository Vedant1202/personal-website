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
  links?: {
    report?: string;
    github?: string;
    live?: string;
    paper?: string;
    demo?: string;
  };
  size?: "sm" | "md" | "lg";
  longer: string;
  bullets?: string[];
  media?: Media[];
};

export const PROJECTS: Project[] = [
  {
    id: "gesturetips",
    title: "GestureTips",
    tagline: "LLM-powered, in-VR voice assistance for gesture discoverability.",
    tech: ["unity", "hololens", "ts"],
    size: "sm",
    longer:
      "GestureTips is an AI-powered, voice-based, in-app help system for VR that provides just-in-time gesture guidance without breaking immersion. Built on HoloLens 2 using Unity, it integrates speech-to-text (OpenAI Whisper) and LLM-based intent recognition (GPT-4) to interpret user queries and trigger animated gesture demonstrations inside the VR environment. Instead of relying on static manuals, GestureTips acts like a contextual 'tooltip' for mid-air gestures, delivering assistance exactly when and where users need it.",
    bullets: [
      "Voice → STT (Whisper) → LLM intent recognition → animated gesture feedback pipeline inside VR.",
      "Implemented both Global and Local help modes, including gaze-triggered contextual assistance.",
      "Evaluated in a 24-participant within-subjects study across three conditions (NGT, GGT, LGT).",
      "Filtered hard-to-detect gestures to reveal stronger learning slopes for AI-assisted conditions.",
      "Findings support a hybrid onboarding model: manual introduction + AI in-context reinforcement.",
    ],
    media: [
      {
        type: "embed",
        src: "https://drive.google.com/file/d/1yaF33bGgk7dqBCAIvNhxkxaXUksvCJY8/preview",
        title: "Global GestureTips Demo",
      },
      {
        type: "embed",
        src: "https://drive.google.com/file/d/18nJ6RmcYLvvwn7WyuBcBKskqPxcgiHEc/preview",
        title: "Localized GestureTips Demo",
      },
    ],
  },
  {
    id: "grant-system",
    title: "Grant Management System",
    tagline: "End-to-end proposal lifecycle tracking with structured workflows.",
    tech: ["node", "mongodb", "react", "ts"],
    size: "md",
    links: { live: "https://gpms.dom.uic.edu/" },
    longer:
      "A centralized proposal lifecycle platform built for the Department of Medicine to manage grants from initial PI submission through review, timeline planning, task execution, and submission. The system formalizes the real institutional workflow: PI submits proposal → Grant Manager reviews and accepts or requests revisions → structured tasklists and timelines are generated → collaborative execution begins. Designed to replace email chains and spreadsheets with auditable state transitions, role-based access, and structured coordination.",
    bullets: [
      "Full proposal lifecycle modeling: submission, GM review, modification loop, acceptance, timeline + tasklist coordination.",
      "Role-based access control for PIs, Grant Managers, and Admin users with clear status transitions.",
      "Dynamic timeline + tasklist system with dependency tracking and progress visibility.",
      "Structured proposal details view with sponsor data, funding mechanisms, deadlines, and attachments.",
      "Designed for institutional scalability across divisions with centralized reporting capabilities.",
    ],
    media: [
      {
        type: "image",
        src: "./project-images/grant-management/dashboard.png",
        alt: "Grant dashboard showing proposal statuses and review actions",
      },
      {
        type: "image",
        src: "./project-images/grant-management/intake-form-1.png",
        alt: "New grant proposal submission form",
      },
      {
        type: "image",
        src: "./project-images/grant-management/intake-form-2.png",
        alt: "Detailed proposal intake form with funding and sponsor information",
      },
      {
        type: "image",
        src: "./project-images/grant-management/timeline.png",
        alt: "Interactive timeline and tasklist coordination view",
      },
    ],
  },
  {
    id: "lights-camera-run",
    title: "Lights, Camera, Run!",
    tagline: "Third-person stealth adventure, outrun paparazzi before midnight.",
    tech: ["unity", "js"],
    size: "sm",
    links: { github: "https://github.com/Vedant1202/Lights-camera-run" },
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
    id: "stars-explorer",
    title: "Stars Explorer",
    tagline: "Immersive VR constellation exploration with time controls.",
    tech: ["unity"],
    size: "md",
    links: {
      live: "https://vedant1202.github.io/CS528-vedant-project/index.html",
      github: "https://github.com/Vedant1202/CS528-vedant-project",
      demo: "https://www.youtube.com/watch?v=Y0MrxhFOvuU",
    },
    longer:
      "Stars Explorer is an interactive VR experience for exploring stars and constellations in 3D space. Users can navigate freely, toggle forward or reverse time to observe stellar movement, switch between cultural constellation sets, and analyze star populations based on exoplanet counts. The system uses dynamic rendering optimizations and a custom 3D billboard shader to keep performance smooth while visualizing large star datasets.",
    bullets: [
      "Time controls: start, stop, or reverse stellar movement to visualize long-term motion.",
      "Multiple constellation collections: Modern, Maya, Norse, Chinese, Egyptian, and Aztec.",
      "Dual color schemes: OBAFGKM stellar classification and exoplanet-based heat mapping.",
      "Performance optimizations: distance-based dynamic rendering and hierarchical constellation construction.",
      "Custom 3D billboard shader to render stars efficiently without manual orientation logic.",
    ],
    media: [
      {
        type: "embed",
        src: "https://www.youtube.com/embed/Y0MrxhFOvuU",
        title: "Stars Explorer — Demo",
      },
    ],
  },
  {
    id: "camicroscope",
    title: "CaMicroscope (GSoC)",
    tagline: "Real-time collaborative pathology viewing.",
    tech: ["js", "node", "redis", "docker"],
    size: "sm",
    links: {
      github: "https://github.com/camicroscope/caMicroscope",
      demo: "https://www.youtube.com/watch?v=Ae9sb6g64eQ",
    },
    longer:
      "Worked on real-time collaboration features for digital pathology workflows. The core challenge was keeping collaboration responsive at scale, using caching and concurrency tuning to reduce latency while maintaining correctness.",
    media: [
      {
        type: "embed",
        src: "https://www.youtube.com/embed/Ae9sb6g64eQ",
        title: "TreeMap — Demo",
      },
    ],
  },
  {
    id: "garuda-clickjacking",
    title: "Garuda – AI Clickjacking Threat Blocker",
    tagline: "LLM-driven detection of visual deception on the web.",
    tech: ["js", "node", "docker"],
    size: "md",
    links: { github: "https://github.com/Vedant1202/Garuda" },
    longer:
      "Garuda is an AI-assisted Chrome extension that detects and mitigates clickjacking attacks by combining DOM-level heuristics with probabilistic reasoning from a large language model. Instead of relying purely on static filter lists, Garuda analyzes overlays, embedded third-party content, deceptive UI structures, and contextual signals in real time. Suspicious elements are scored for malicious intent using a structured prompt pipeline, and elements exceeding a defined probability threshold are dynamically suppressed to protect users.",
    bullets: [
      "MutationObserver-based detector identifies high z-index overlays, full-viewport elements, suspicious iframes, autoplay muted media, and deceptive navigation patterns.",
      "Structured feature extraction layer captures origin, CSS properties, redirection chains, CSP data, script associations, and contextual signals.",
      "Custom LLM prompt maps extracted DOM features to clickjacking principles and returns a probability score with concise reasoning.",
      "Policy engine suppresses elements when malicious probability ≥ 0.75 and logs explainable security reports.",
      "Evaluated across ~50 real-world websites to measure detection coverage, false positives, and site breakage behavior.",
    ],
    media: [
      {
        type: "image",
        src: "./project-images/garuda/sys-diag.png",
        alt: "Garuda system diagram showing the flow from DOM observation to LLM analysis and mitigation actions",
      },
      {
        type: "image",
        src: "./project-images/garuda/results.png",
        alt: "Garuda in action - removing malicious overlay elements from a phishing test site",
      },
    ],
  },
  {
    id: "content-shield",
    title: "Content Shield",
    tagline: "Parent-controlled web filtering with explainable blocking + insights.",
    tech: ["js", "node", "react", "ts"],
    size: "md",
    links: {
      demo: "https://www.youtube.com/watch?v=WF9hAoSbt_w",
      report:
        "https://docs.google.com/document/d/e/2PACX-1vRafpcwcAaNyShfmi2_f7qTQgEiAHr8NK_TVW5NlqbK3l2u68UCYCqIo9LgDQ_2GXsZRywi8sb9gkK6/pub",
    },
    longer:
      "A Chrome extension that helps parents reduce kids’ exposure to sensitive online content while keeping the experience educational, not just restrictive. Content is blurred (not removed) to preserve page layout, each block includes an explanation and category label, and kids can respond with agree or disagree feedback. Parents get an analysis dashboard that summarizes what was blocked over time and where kids pushed back, making it easier to have real conversations instead of silent policing.",
    bullets: [
      "Multi-category filtering (Adult, Violence, Racy, Medical, Spoof) with adjustable strictness and content-type controls.",
      "Blurs text and images in-page to maintain layout consistency, adds explainable labels and feedback actions on blocked elements.",
      "Child feedback loop (agree/disagree) captured per block to support parent-child discussion and reduce over-blocking frustration.",
      "Parent analytics view (React SPA) visualizes access patterns, category trends, and disagreement rates using stored extension history.",
      "User research with 5 parents informed requirements (education, history visibility, images beyond keywords); most interviewees preferred this approach qualitatively over keyword-only blockers.",
    ],
    media: [
      {
        type: "embed",
        src: "https://www.youtube.com/embed/bCMRRvrQvDI",
        title: "Content Shield — Demo",
      },
      {
        type: "embed",
        src: "https://docs.google.com/document/d/e/2PACX-1vRafpcwcAaNyShfmi2_f7qTQgEiAHr8NK_TVW5NlqbK3l2u68UCYCqIo9LgDQ_2GXsZRywi8sb9gkK6/pub?embedded=true",
        title: "Content Shield — Report",
      },
    ],
  },
  {
    id: "treemap",
    title: "TreeMap",
    tagline: "Discover, log, and map trees around you.",
    tech: ["react", "js", "node", "mongodb"],
    size: "md",
    links: {
      github: "https://github.com/vedant1202/treemap",
      demo: "https://www.youtube.com/watch?v=2omqNPIuvk0",
    },
    longer:
      "TreeMap is a web app for discovering plant species nearby and building a community-driven map of local trees. Users can search a large species catalog via the Trefle API, explore locations using Mapbox, and contribute new tree sightings by logging them with geolocation. The backend is structured like a production service: authentication, validation, centralized error handling, API docs, tests, and security hardening.",
    bullets: [
      "Auth + sessions with Passport, plus role-ready API patterns (JWT refresh flow, permissions-friendly middleware).",
      "Search and species discovery powered by the Trefle API, with map-based exploration using Mapbox.",
      "Create and view geo-tagged tree entries, enabling community-sourced mapping by locality.",
      "Backend engineered for reliability: Joi validation, centralized error handler, Swagger API docs, Winston/Morgan logging, Jest unit/integration tests.",
      "Security and ops: Helmet headers, CORS, XSS/query sanitization, gzip compression, Docker support, and production process management with PM2.",
    ],
    media: [
      {
        type: "embed",
        src: "https://www.youtube.com/embed/2omqNPIuvk0",
        title: "TreeMap — Demo",
      },
    ],
  },
];
