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
  | "docker"
  | "swift"
  | "macos";

// Display labels for tech keys whose correct casing differs from a plain
// capitalize() of the key (e.g. "macos" -> "macOS"). Keys not listed here fall
// back to the default capitalized rendering.
export const TECH_LABELS: Partial<Record<TechKey, string>> = {
  macos: "macOS",
};

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
    doi?: string;
    demo?: string;
    npmjs?: string;
    docs?: string;
  };
  /** Featured projects render as large visual cards; the rest as compact rows. */
  featured?: boolean;
  /** Card cover image for featured projects; omit for a styled text cover. */
  cover?: { src: string; alt: string };
  longer: string;
  bullets?: string[];
  media?: Media[];
};

export const PROJECTS: Project[] = [
  {
    id: "cperch",
    title: "cPerch",
    tagline:
      "Native macOS menu-bar app that surfaces every running Claude Code session — across terminals and the desktop app — and jumps you to the one that needs you.",
    tech: ["swift", "macos"],
    featured: true,
    cover: {
      src: "./project-images/cperch/og-image.png",
      alt: "cPerch menu-bar session list",
    },
    links: {
      github: "https://github.com/Vedant1202/cPerch",
      live: "https://vedant1202.github.io/cPerch/",
    },
    longer:
      "cPerch is a native macOS menu-bar app that watches your running Claude Code sessions — across terminal windows and the Claude desktop app — and surfaces them in one place. A glance at the menu bar tells you which agent is waiting on you, which is still working, and which has finished; one click jumps to the exact existing window. Detection is privacy-focused and fully local: it reads only your local ~/.claude directory and never makes a network request. It's built to solve a specific annoyance — when you're babysitting several agents at once, \"which window was that one in again?\" — without making you switch apps.",
    bullets: [
      "Every session in one place — terminal (claude) and Claude desktop sessions listed together, the ones needing you first, each with its latest message shown inline.",
      "Status at a glance — every session is shape- and color-coded (needs-input, running, concluded), so state stays clear in grayscale or with color-vision deficiency.",
      "One-click Jump — raises and focuses the existing host window (the exact terminal tab, or the desktop app) instead of ever spawning a duplicate.",
      "Calm, opt-in notifications by kind (needs-input, error, completion), Focus/Do-Not-Disturb aware, plus a global hotkey (⌘⌥`) and optional launch-at-login.",
      "Private by design — reads only ~/.claude, never writes to it, needs no Accessibility or Input-Monitoring permission, and sends nothing over the network.",
      "Built in Swift (AppKit + SwiftUI) on a pure, Foundation-only detection core (CPerchCore, 143 passing tests) that merges process-scan, session-registry, and transcript signals.",
    ],
    media: [
      {
        type: "image",
        src: "./project-images/cperch/og-image.png",
        alt: "cPerch brand banner — the cPerch bird-on-a-terminal logo with the tagline 'A perch for your Claude sessions' and needs-input, running, and concluded status dots",
      },
      {
        type: "image",
        src: "./project-images/cperch/session-list.png",
        alt: "cPerch menu-bar dropdown listing running Claude Code sessions grouped as Needs you / Working / Done, each with a shape- and color-coded status indicator, latest message, and a one-click Jump button",
      },
      {
        type: "image",
        src: "./project-images/cperch/settings-general.png",
        alt: "cPerch Settings — General tab: appearance (System/Light/Dark), session-list grouping, how long finished sessions linger, launch at login, and the global shortcut",
      },
      {
        type: "image",
        src: "./project-images/cperch/settings-notifications.png",
        alt: "cPerch Settings — Notifications tab: opt-in alerts for needs-input, error, and completion, with Focus/Do-Not-Disturb behavior and banner persistence",
      },
      {
        type: "image",
        src: "./project-images/cperch/settings-accessibility.png",
        alt: "cPerch Settings — Accessibility tab: a shape-coded status toggle with a triangle/half-circle/checkmark legend, plus Follow-System controls for high contrast, reduce motion, and reduce transparency",
      },
    ],
  },
  {
    id: "cprof",
    title: "cprof",
    tagline:
      "Snapshot, scrub, and migrate your Claude Code setup as a redacted, portable profile.",
    tech: ["ts", "node"],
    featured: true,
    cover: {
      src: "./project-images/cprof/social-card.svg",
      alt: "cprof — snapshot, scrub, and migrate Claude Code profiles",
    },
    links: {
      github: "https://github.com/Vedant1202/claude-prof",
      npmjs: "https://www.npmjs.com/package/@cprof/cli",
      docs: "https://vedant1202.github.io/claude-prof/",
    },
    longer:
      "cprof turns your scattered Claude Code setup — settings.json, MCP servers, CLAUDE.md memory, rules, skills, commands, and agents — into a portable, secret-redacted profile you can carry, diff, and re-apply anywhere. It snapshots your project or global config into a deterministic, schema-valid claude-profile.json, scrubs anything that looks like a secret into ${env:NAME} placeholders, and migrates a trusted profile onto another machine with a non-destructive deep merge. It is local-first, runs fully offline, and never executes hook or plugin code.",
    bullets: [
      "Snapshot — capture a project or global (~/.claude) setup into a deterministic, schema-valid claude-profile.json that diffs cleanly between machines.",
      "Scrub — layered offline redaction (secretlint, secret-like key names, JWTs and high-entropy values) rewrites secrets to ${env:NAME}, and the manifest is re-scanned before write as a final leak gate.",
      "Migrate — apply a trusted profile with a non-destructive deep merge: JSON config merges, permission lists union, asset files are backed up before overwrite, with --dry-run previews and a strict rollback.",
      "Captures the whole setup — settings and permissions, local and remote MCP servers, CLAUDE.md memory and rules, and skills/commands/agents, plus a recorded (never executed) hook and plugin inventory.",
      "Ships as @cprof/cli (Node 22+) from a pnpm + TypeScript monorepo (core, schema, CLI), with the core paths tested across Linux, macOS, and Windows.",
    ],
    media: [
      {
        type: "image",
        src: "./project-images/cprof/social-card.svg",
        alt: "cprof social card — the cprof wordmark over the tagline 'Snapshot, scrub, and migrate your Claude Code setup as a redacted, portable profile' and the install command npm i -g @cprof/cli@alpha",
      },
    ],
  },
  {
    id: "agentpack",
    title: "AgentPack",
    tagline:
      "Offline document-to-agent-context compiler that reduces context bloat for LLMs.",
    tech: ["python", "node", "ts"],
    featured: true,
    links: {
      github: "https://github.com/Vedant1202/agentpack",
      npmjs: "https://www.npmjs.com/package/agent-context-packager",
    },
    longer:
      "AgentPack improves the context pipeline for document-grounded agents. It acts as an offline document-to-agent-context compiler that turns unstructured knowledge bases (PDFs, CSVs, Markdown, text) into clean semantic chunks with citations. It includes a built-in hybrid search engine (SQLite FTS5 + FastEmbed vector search) to retrieve the right evidence, and an interactive WebGL Corpus Explorer UI for visually debugging chunks.",
    bullets: [
      "Reduces context token usage significantly (up to 161x reduction) compared to raw document stuffing, resulting in cost savings and preventing the 'Lost in the Middle' phenomenon.",
      "Parses and semantically extracts text from TXT (paragraph-aware), Markdown (heading-aware), CSV (Markdown tables), and PDFs (PyMuPDF).",
      "Hybrid search engine using SQLite FTS5 and FastEmbed vector search to retrieve high-signal context.",
      "Corpus Explorer UI: Local WebGL-powered 2D physics visualization to debug chunk semantic similarities and search trajectories.",
    ],
    media: [
      {
        type: "embed",
        src: "https://www.youtube.com/embed/4_Vak-a--Jg",
        title: "AgentPack — Launch Video",
      },
    ],
  },
  {
    id: "daily-work-summarizer",
    title: "Daily Work Summarizer",
    tagline:
      "A TypeScript CLI and web UI that transforms your local Git history into automated daily stand-up summaries using Gemini AI.",
    tech: ["ts", "node", "react"],
    links: {
      github: "https://github.com/Vedant1202/daily-work-summarizer",
      npmjs: "https://www.npmjs.com/package/daily-commit-summarizer",
      docs: "https://vedant1202.github.io/daily-work-summarizer/",
    },
    longer:
      "Daily Work Summarizer is a TypeScript CLI and local web UI that turns local Git history into polished daily stand-up summaries. It scans commits for a configurable time window, filters out noise like lock files or build outputs, and categorizes the work. It enriches the reports with Linear issue metadata and detects commits needing documentation follow-up using Google's Gemini AI.",
    bullets: [
      "Scans commits for a configurable window and generates a stand-up-ready summary categorized by feature, fix, refactor, and more.",
      "Intelligently filters out noise (lock files, binaries) and enriches reports with Linear issue metadata when referenced in commits.",
      "Detects commits requiring documentation updates and polls/summarizes Mintlify documentation deployments.",
      "Includes a local web UI to view exported Markdown/HTML reports, run controls, and manage configuration.",
    ],
  },
  {
    id: "dionysys",
    title: "Dionysys",
    tagline:
      "Adaptive UI experimentation framework — interfaces that evolve with the user via deterministic or MCP-guided decisioning.",
    tech: ["react", "ts", "node", "mongodb"],
    featured: true,
    links: {
      github: "https://github.com/Vedant1202/Dionysys",
      live: "https://dionysys-frontend.vercel.app/",
      demo: "https://www.youtube.com/watch?v=U45lPx95GfU",
      report:
        "https://mewing-tuck-66c.notion.site/Dionysys-Adaptive-User-Interface-framework-36283d3a8f1d805d8bf0d4f31e3dcaa1",
    },
    longer:
      "Dionysys is an adaptive UI experimentation framework that builds interfaces which evolve based on user behavior, persona signals, and runtime decisions. Rather than serving the same static layout to every user, Dionysys observes interaction patterns and applies structured, inspectable adaptations along two axes — Modality (draw-heavy vs. text-heavy) and Expertise (novice vs. power user). Decisions are queued and applied on next-refresh to avoid UI churn during active work, keeping the core decision logic reusable across products.",
    bullets: [
      "Two-axis adaptive model: adapts UI simultaneously along Modality (draw vs. text) and Expertise (novice vs. power user) for nuanced, composable variants.",
      "Dual decision paths: Deterministic mode scores behavior directly; MCP mode uses LLMs to summarize sessions, score resources, and make bounded model-guided choices.",
      "Next-refresh architecture queues adaptation decisions to avoid interrupting active work — changes apply only on remount, eliminating UI churn.",
      "Developed reusable @dionysys/core and @dionysys/react workspace packages with a session-aware telemetry backend (Node/Express, MongoDB) and decision APIs.",
      "In-memory runtime admin console for live inspection and tuning of inference weights, personality resources, and active mode — no database writes required.",
      "Beta Feedback Loop: A LangGraph-powered workflow that evaluates passive behavioral metrics and explicit user feedback, using a Thompson-sampling bandit and cross-session priors to continually optimize UI variant selection for returning users.",
    ],
    media: [
      {
        type: "embed",
        src: "https://www.youtube.com/embed/U45lPx95GfU",
        title: "Meet Dionysys — Adaptive UI Experimentation",
      },
    ],
  },
  {
    id: "agentic-architectures",
    title: "Agentic AI Architectures",
    tagline:
      "Interactive multi-agent benchmarking dashboard to compare and visualize single, hybrid, and dynamic swarm patterns in real-time.",
    tech: ["react", "ts", "node"],
    // cover kept for whenever this gets re-featured
    cover: {
      src: "./project-images/agentic-architectures/cover.webp",
      alt: "Agentic AI Architectures benchmarking dashboard",
    },
    links: {
      github: "https://github.com/Vedant1202/agentic-ai-architectures",
      live: "https://agentic-ai-architectures-web.vercel.app/",
    },
    longer:
      "An interactive benchmarking and visualization dashboard designed to compare multi-agent architectures (single-agent, centralized, hybrid, decentralized, and dynamic swarm) in real-time. Inspired by Google's 'Science of Scaling Agent Systems' research, the platform evaluates coordination tradeoffs across output quality, system latency, token consumption, and execution costs. The frontend uses dynamic flow visualizations and performance charts to make active agent decisions, graphs, and intermediate thinking traces fully transparent and inspectable.",
    bullets: [
      "Real-time multi-agent execution: Runs or replays benchmark tasks across single-agent, centralized, hybrid, decentralized, and dynamic swarm architectures using a LangGraph + Gemini orchestration runner.",
      "Live execution streaming: Streams real-time progress, intermediate thoughts, and agent handoffs from the Express backend to the client via Server-Sent Events (SSE).",
      "Dynamic flow visualization: Renders active agent coordination, graph states, and run metrics dynamically using @xyflow/react (React Flow) and Framer Motion.",
      "Comprehensive metrics dashboard: Compares system latency, token usage, and model orchestration costs with interactive performance charts built on Recharts.",
      "Dual execution modes: Operates as a live LLM execution sandbox or a high-fidelity visual replay tool using persisted JSON run history.",
    ],
    media: [
      {
        type: "embed",
        src: "https://www.youtube.com/watch?v=uZfRaBMX8JU",
        title:
          "Agentic AI Architectures — A Multi-Agent Systems Benchmarking & Visualization Platform",
      },
      {
        type: "image",
        src: "./project-images/agentic-architectures/dashboard.png",
        alt: "Agentic AI Architectures main dashboard view showing benchmarking configuration and model details",
      },
      {
        type: "image",
        src: "./project-images/agentic-architectures/running.png",
        alt: "Live benchmark execution running concurrently across three multi-agent patterns",
      },
      {
        type: "image",
        src: "./project-images/agentic-architectures/results.png",
        alt: "Comparative results showing runtime, token counts, and Judge quality ratings",
      },
      {
        type: "image",
        src: "./project-images/agentic-architectures/dark-mode.png",
        alt: "Premium dark mode theme showing visual telemetry of agent handoffs",
      },
    ],
  },
  {
    id: "gesturetips",
    title: "GestureTips",
    tagline:
      "Context-aware VR help system — Master's thesis (Unity, C#, Microsoft HoloLens).",
    tech: ["unity", "hololens"],
    links: {
      doi: "https://doi.org/10.25417/uic.32991932",
    },
    longer:
      "GestureTips is a context-aware VR assistance system built in Unity/C# for Microsoft HoloLens. It delivers object-anchored, just-in-time guidance using gaze, proximity, and user action signals — so learners get help in place without leaving the task. This work was my Master's thesis: multimodal interaction design focused on reducing gesture learning effort in immersive environments.",
    bullets: [
      "Reduced gesture learning effort by 30%, validated through a 24-participant user study, by shipping context-aware assistance that ties guidance to what the user is looking at, how close they are, and what they just did.",
      "Global and local help modes with gaze-triggered and proximity-aware cues; animated gesture demonstrations inside the HoloLens scene.",
      "Findings support hybrid onboarding: structured introduction plus in-context reinforcement for mid-air gestures.",
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
    title: "AI-Assisted Grant Management System",
    tagline:
      "HIPAA-compliant enterprise grant platform at UIC featuring an intelligent RAG pipeline and semantic policy search across nine divisions.",
    tech: ["node", "postgres", "mongodb", "python", "django", "react", "ts"],
    links: { live: "https://gpms.dom.uic.edu/" },
    longer:
      "An end-to-end grant workflow platform for the University of Illinois Department of Medicine, extended with an AI-assisted layer: semantic indexing (Pinecone) and RAG pipelines surface relevant policies and context as PIs and grant managers work. The system spans nine divisions with HIPAA-compliant access controls, from intake through review, timelines, and coordinated execution — replacing ad hoc email and spreadsheets with auditable, structured workflows.",
    bullets: [
      "Shipped the platform across nine divisions — cutting form completion time by 40% by implementing a RAG-based AI layer using Pinecone semantic indexing to surface relevant policies in context, with HIPAA-compliant access controls throughout.",
      "Architected a distributed, event-driven knowledge layer backed by Pinecone to index grant documentation at scale, designed for reliable query performance and extensible integration with future AI-assisted healthcare workflows.",
      "Full lifecycle: PI submission, grant manager review, modification loops, acceptance, and dynamic timelines + tasklists with role-based access for PIs, GMs, and admins.",
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
        title: "CaMicroscope - Real-time Collaboration Demo",
      },
    ],
  },
  {
    id: "garuda-clickjacking",
    title: "Garuda - AI Clickjacking Threat Blocker",
    tagline: "LLM-driven detection of visual deception on the web.",
    tech: ["js", "node", "docker"],
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
