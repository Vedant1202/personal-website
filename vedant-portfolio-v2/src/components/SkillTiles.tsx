import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import "../styles/SkillTiles.css";

import {
  SiPython,
  SiTypescript,
  SiJavascript,
  SiCplusplus,
  SiSharp,
  SiGnubash,
  SiLinux,
  SiDocker,
  SiGithubactions,
  SiAmazon,
  SiGooglecloud,
  SiPostgresql,
  SiMysql,
  SiMongodb,
  SiRedis,
  SiNodedotjs,
  SiVuedotjs,
  SiReact,
  SiFlask,
  SiDjango,
  SiGraphql,
  SiJest,
  SiJunit5,
  SiTensorflow,
  SiPandas,
} from "react-icons/si";

import { Network, Boxes, Waypoints, TestTube2, Bot, DatabaseZap } from "lucide-react";

type Skill = {
  key: string;
  label: string;
  tagline: string;
  icon: React.ReactNode;
};

function cn(...s: Array<string | false | null | undefined>) {
  return s.filter(Boolean).join(" ");
}

/**
 * BrandIcon:
 * - We keep the real brand color set always
 * - We visually "mute" it with CSS (grayscale/filter) by default
 * - On tile hover, we remove the filter so it pops in original color
 */
function BrandIcon({
  Icon,
  color,
}: {
  Icon: React.ComponentType<{ size?: number; className?: string; color?: string }>;
  color: string;
}) {
  return <Icon size={40} className="skill-icon" color={color} />;
}

/**
 * Generic icon (lucide) behaves similarly:
 * - muted by default via CSS
 * - bright on hover via CSS
 */
function GenericIcon({ icon }: { icon: React.ReactNode }) {
  return <div className="skill-icon">{icon}</div>;
}

function SkillTile({ s, index }: { s: Skill; index: number }) {
  const [hovered, setHovered] = React.useState(false);
  const [tick, setTick] = React.useState(0);

  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.35,
        ease: "easeOut",
        delay: Math.min(index * 0.01, 0.12),
      }}
      onMouseEnter={() => {
        setHovered(true);
        setTick((t) => t + 1);
      }}
      onMouseLeave={() => setHovered(false)}
      className={cn(
        "skill-tile group relative aspect-square shrink-0 overflow-hidden text-left",
        "rounded-2xl border border-white/10 bg-white/[0.02]",
        "transition-all duration-300",
        "hover:border-blue-500/35 hover:bg-white/[0.05]",
        "hover:shadow-[0_0_30px_rgba(59,130,246,0.14)]",
        "hover:-translate-y-[2px] hover:scale-[1.03] active:scale-[1.01]",
      )}
    >
      {/* top-right dot */}
      {/* <span
        aria-hidden
        className="absolute top-4 right-4 h-2.5 w-2.5 rounded-full bg-white/20 ring-1 ring-white/10 transition group-hover:bg-blue-400/55 group-hover:ring-blue-500/35"
      /> */}

      {/* glass shine sweep */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-y-[-20%] left-[-60%] w-[45%] rotate-[18deg] bg-gradient-to-r from-transparent via-white/14 to-transparent opacity-0 transition duration-700 group-hover:translate-x-[220%] group-hover:opacity-100"
      />

      <div className="relative flex h-full flex-col justify-between p-5">
        {/* icon */}
        <div className="transition duration-300">{s.icon}</div>

        {/* label + tagline */}
        <div className="space-y-2">
          <p className="text-sm font-semibold tracking-tight text-white/90 transition-colors duration-300 group-hover:text-white">
            {s.label}
          </p>

          <AnimatePresence mode="wait">
            {hovered ? (
              <motion.div
                key={tick}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
                className="tagline-slot text-xs leading-snug text-white/65"
              >
                <span className="typewriter-wrap clamp-2">{s.tagline}</span>
              </motion.div>
            ) : (
              <div className="tagline-slot" aria-hidden />
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.button>
  );
}

function splitIntoRows(skills: Skill[], rows = 3) {
  const out: Skill[][] = Array.from({ length: rows }, () => []);
  skills.forEach((s, idx) => out[idx % rows].push(s));
  return out;
}

function RowMarquee({
  rowSkills,
  rowIndex,
  speedSeconds,
}: {
  rowSkills: Skill[];
  rowIndex: number;
  speedSeconds: number;
}) {
  const rowRef = React.useRef<HTMLDivElement | null>(null);
  const groupRef = React.useRef<HTMLDivElement | null>(null);

  React.useLayoutEffect(() => {
    const rowEl = rowRef.current;
    const groupEl = groupRef.current;
    if (!rowEl || !groupEl) return;

    const set = () => {
      const w = groupEl.getBoundingClientRect().width;
      rowEl.style.setProperty("--groupW", `${w}px`);
    };

    set();
    const ro = new ResizeObserver(set);
    ro.observe(groupEl);
    return () => ro.disconnect();
  }, []);

  const offset =
    rowIndex === 0
      ? "0px"
      : rowIndex === 1
        ? "calc(var(--tileW) / -3)"
        : "calc(var(--tileW) * -2 / 3)";

  const setPaused = (paused: boolean) => {
    const rowEl = rowRef.current;
    if (!rowEl) return;
    rowEl.toggleAttribute("data-paused", paused);
  };

  return (
    <div
      ref={rowRef}
      className="skills-row"
      style={
        {
          ["--rowOffset" as any]: offset,
          ["--dur" as any]: `${speedSeconds}s`,
        } as React.CSSProperties
      }
      onPointerOver={(e) => {
        const isTile = (e.target as HTMLElement)?.closest?.(".skill-tile");
        if (isTile) setPaused(true);
      }}
      onPointerOut={(e) => {
        const rowEl = rowRef.current;
        if (!rowEl) return;

        const to = e.relatedTarget as HTMLElement | null;
        const stillInsideThisRow = to ? rowEl.contains(to) : false;
        const stillOnATile = to?.closest?.(".skill-tile");

        if (!stillInsideThisRow || !stillOnATile) setPaused(false);
      }}
      onFocusCapture={(e) => {
        const isTile = (e.target as HTMLElement)?.closest?.(".skill-tile");
        if (isTile) setPaused(true);
      }}
      onBlurCapture={(e) => {
        const rowEl = rowRef.current;
        if (!rowEl) return;

        const to = e.relatedTarget as HTMLElement | null;
        const stillInsideThisRow = to ? rowEl.contains(to) : false;
        const stillOnATile = to?.closest?.(".skill-tile");

        if (!stillInsideThisRow || !stillOnATile) setPaused(false);
      }}
    >
      <div className="skills-row-clip">
        <div className="skills-track">
          <div className="skills-group" ref={groupRef}>
            {rowSkills.map((s, i) => (
              <SkillTile key={`a-${rowIndex}-${s.key}`} s={s} index={i} />
            ))}
          </div>

          <div className="skills-group" aria-hidden>
            {rowSkills.map((s, i) => (
              <SkillTile key={`b-${rowIndex}-${s.key}`} s={s} index={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function SkillTiles() {
  // brand colors (official-ish simple hexes)
  const skills: Skill[] = [
    {
      key: "python",
      label: "Python",
      tagline: "general-purpose language, automation and data.",
      icon: <BrandIcon Icon={SiPython} color="#3776AB" />,
    },
    {
      key: "typescript",
      label: "TypeScript",
      tagline: "stricter JavaScript for web apps.",
      icon: <BrandIcon Icon={SiTypescript} color="#3178C6" />,
    },
    {
      key: "javascript",
      label: "JavaScript",
      tagline: "programming language for the web.",
      icon: <BrandIcon Icon={SiJavascript} color="#F7DF1E" />,
    },
    {
      key: "cpp",
      label: "C++",
      tagline: "systems and performance-heavy code.",
      icon: <BrandIcon Icon={SiCplusplus} color="#00599C" />,
    },
    {
      key: "csharp",
      label: "C#",
      tagline: "apps, services, and game dev.",
      icon: <BrandIcon Icon={SiSharp} color="#512BD4" />,
    },
    {
      key: "shell",
      label: "Shell",
      tagline: "command-line scripting for systems.",
      icon: <BrandIcon Icon={SiGnubash} color="#4EAA25" />,
    },

    {
      key: "linux",
      label: "Linux",
      tagline: "operating system used on most servers.",
      icon: <BrandIcon Icon={SiLinux} color="#FCC624" />,
    },
    {
      key: "docker",
      label: "Docker",
      tagline: "packages apps so they run anywhere.",
      icon: <BrandIcon Icon={SiDocker} color="#2496ED" />,
    },
    {
      key: "cicd",
      label: "CI/CD",
      tagline: "automated testing and deployment.",
      icon: <BrandIcon Icon={SiGithubactions} color="#2088FF" />,
    },
    {
      key: "lb",
      label: "Load Balancing",
      tagline: "keeps apps stable under traffic.",
      icon: <GenericIcon icon={<Network size={40} className="text-white/80" />} />,
    },
    {
      key: "micro",
      label: "Microservices",
      tagline: "smaller services that scale independently.",
      icon: <GenericIcon icon={<Boxes size={40} className="text-white/80" />} />,
    },

    {
      key: "aws",
      label: "AWS",
      tagline: "cloud platform for hosting products.",
      icon: <BrandIcon Icon={SiAmazon} color="#FF9900" />,
    },
    {
      key: "gcp",
      label: "Google Cloud",
      tagline: "cloud tools for apps and data.",
      icon: <BrandIcon Icon={SiGooglecloud} color="#4285F4" />,
    },

    {
      key: "postgres",
      label: "PostgreSQL",
      tagline: "SQL database for structured data.",
      icon: <BrandIcon Icon={SiPostgresql} color="#4169E1" />,
    },
    {
      key: "mysql",
      label: "MySQL",
      tagline: "popular SQL database for web apps.",
      icon: <BrandIcon Icon={SiMysql} color="#4479A1" />,
    },
    {
      key: "mongo",
      label: "MongoDB",
      tagline: "document database for flexible data.",
      icon: <BrandIcon Icon={SiMongodb} color="#47A248" />,
    },
    {
      key: "redis",
      label: "Redis",
      tagline: "in-memory cache for speed.",
      icon: <BrandIcon Icon={SiRedis} color="#DC382D" />,
    },

    {
      key: "node",
      label: "Node.js",
      tagline: "JavaScript runtime for backend APIs.",
      icon: <BrandIcon Icon={SiNodedotjs} color="#339933" />,
    },
    {
      key: "vue",
      label: "Vue.js",
      tagline: "frontend framework for web UI.",
      icon: <BrandIcon Icon={SiVuedotjs} color="#4FC08D" />,
    },
    {
      key: "react",
      label: "React",
      tagline: "frontend library for modern UIs.",
      icon: <BrandIcon Icon={SiReact} color="#61DAFB" />,
    },
    {
      key: "flask",
      label: "Flask",
      tagline: "lightweight Python backend framework.",
      icon: <BrandIcon Icon={SiFlask} color="#FFFFFF" />,
    },
    {
      key: "django",
      label: "Django",
      tagline: "full Python framework for web backends.",
      icon: <BrandIcon Icon={SiDjango} color="#092E20" />,
    },

    {
      key: "rest",
      label: "REST",
      tagline: "standard way apps talk to APIs.",
      icon: <GenericIcon icon={<Waypoints size={40} className="text-white/80" />} />,
    },
    {
      key: "graphql",
      label: "GraphQL",
      tagline: "API queries tailored to each screen.",
      icon: <BrandIcon Icon={SiGraphql} color="#E10098" />,
    },
    {
      key: "pytest",
      label: "PyTest",
      tagline: "testing tool for Python backends.",
      icon: <GenericIcon icon={<TestTube2 size={40} className="text-white/80" />} />,
    },
    {
      key: "jest",
      label: "Jest",
      tagline: "testing tool for JavaScript apps.",
      icon: <BrandIcon Icon={SiJest} color="#C21325" />,
    },
    {
      key: "junit",
      label: "JUnit",
      tagline: "testing tool for Java systems.",
      icon: <BrandIcon Icon={SiJunit5} color="#25A162" />,
    },
    {
      key: "tdd",
      label: "TDD",
      tagline: "write tests first, then build.",
      icon: <GenericIcon icon={<TestTube2 size={40} className="text-white/80" />} />,
    },

    {
      key: "llm",
      label: "LLMs",
      tagline: "AI models used for chat and tools.",
      icon: <GenericIcon icon={<Bot size={40} className="text-white/80" />} />,
    },
    {
      key: "rag",
      label: "RAG",
      tagline: "AI answers grounded in your data.",
      icon: <GenericIcon icon={<DatabaseZap size={40} className="text-white/80" />} />,
    },
    {
      key: "tf",
      label: "TensorFlow",
      tagline: "toolkit for machine learning models.",
      icon: <BrandIcon Icon={SiTensorflow} color="#FF6F00" />,
    },
    {
      key: "pandas",
      label: "Pandas",
      tagline: "data tables and analysis in Python.",
      icon: <BrandIcon Icon={SiPandas} color="#150458" />,
    },
  ];

  const [row1, row2, row3] = React.useMemo(() => splitIntoRows(skills, 3), [skills]);

  return (
    <div className="skills-marquee relative w-full">
      <div className="skills-rows">
        <RowMarquee rowSkills={row1} rowIndex={0} speedSeconds={26} />
        <RowMarquee rowSkills={row2} rowIndex={1} speedSeconds={30} />
        <RowMarquee rowSkills={row3} rowIndex={2} speedSeconds={28} />
      </div>
    </div>
  );
}
