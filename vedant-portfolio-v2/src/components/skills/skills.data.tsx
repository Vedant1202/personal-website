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
import { BrandIcon, GenericIcon, type Skill } from "./icons";

export const SKILLS: Skill[] = [
  {
    key: "python",
    label: "Python",
    tagline: "automation, data, backend glue.",
    icon: <BrandIcon Icon={SiPython} color="#3776AB" />,
  },
  {
    key: "typescript",
    label: "TypeScript",
    tagline: "safer JS for real apps.",
    icon: <BrandIcon Icon={SiTypescript} color="#3178C6" />,
  },
  {
    key: "javascript",
    label: "JavaScript",
    tagline: "the web’s default language.",
    icon: <BrandIcon Icon={SiJavascript} color="#F7DF1E" />,
  },
  {
    key: "cpp",
    label: "C++",
    tagline: "performance, systems, low-level work.",
    icon: <BrandIcon Icon={SiCplusplus} color="#00599C" />,
  },
  {
    key: "csharp",
    label: "C#",
    tagline: "services, apps, game dev.",
    icon: <BrandIcon Icon={SiSharp} color="#512BD4" />,
  },
  {
    key: "shell",
    label: "Shell",
    tagline: "fast scripting, faster debugging.",
    icon: <BrandIcon Icon={SiGnubash} color="#4EAA25" />,
  },

  {
    key: "linux",
    label: "Linux",
    tagline: "where servers actually live.",
    icon: <BrandIcon Icon={SiLinux} color="#FCC624" />,
  },
  {
    key: "docker",
    label: "Docker",
    tagline: "ship once, run anywhere.",
    icon: <BrandIcon Icon={SiDocker} color="#2496ED" />,
  },
  {
    key: "cicd",
    label: "CI/CD",
    tagline: "build, test, deploy, repeat.",
    icon: <BrandIcon Icon={SiGithubactions} color="#2088FF" />,
  },
  {
    key: "lb",
    label: "Load Balancing",
    tagline: "stable under real traffic.",
    icon: <GenericIcon icon={<Network size={40} className="text-white/80" />} />,
  },
  {
    key: "micro",
    label: "Microservices",
    tagline: "scale parts, not everything.",
    icon: <GenericIcon icon={<Boxes size={40} className="text-white/80" />} />,
  },

  {
    key: "aws",
    label: "AWS",
    tagline: "cloud for production workloads.",
    icon: <BrandIcon Icon={SiAmazon} color="#FF9900" />,
  },
  {
    key: "gcp",
    label: "Google Cloud",
    tagline: "cloud tools for apps + data.",
    icon: <BrandIcon Icon={SiGooglecloud} color="#4285F4" />,
  },

  {
    key: "postgres",
    label: "PostgreSQL",
    tagline: "structured data, done right.",
    icon: <BrandIcon Icon={SiPostgresql} color="#4169E1" />,
  },
  {
    key: "mysql",
    label: "MySQL",
    tagline: "classic SQL for web stacks.",
    icon: <BrandIcon Icon={SiMysql} color="#4479A1" />,
  },
  {
    key: "mongo",
    label: "MongoDB",
    tagline: "flexible docs, fast iteration.",
    icon: <BrandIcon Icon={SiMongodb} color="#47A248" />,
  },
  {
    key: "redis",
    label: "Redis",
    tagline: "cache and queues, super fast.",
    icon: <BrandIcon Icon={SiRedis} color="#DC382D" />,
  },

  {
    key: "node",
    label: "Node.js",
    tagline: "APIs, realtime, servers in JS.",
    icon: <BrandIcon Icon={SiNodedotjs} color="#339933" />,
  },
  {
    key: "vue",
    label: "Vue.js",
    tagline: "clean UI, quick shipping.",
    icon: <BrandIcon Icon={SiVuedotjs} color="#4FC08D" />,
  },
  {
    key: "react",
    label: "React",
    tagline: "dynamic, fast web apps.",
    icon: <BrandIcon Icon={SiReact} color="#61DAFB" />,
  },
  {
    key: "flask",
    label: "Flask",
    tagline: "small Python APIs, flexible.",
    icon: <BrandIcon Icon={SiFlask} color="#FFFFFF" />,
  },
  {
    key: "django",
    label: "Django",
    tagline: "batteries-included Python backend.",
    icon: <BrandIcon Icon={SiDjango} color="#092E20" />,
  },

  {
    key: "rest",
    label: "REST",
    tagline: "simple contracts, predictable APIs.",
    icon: <GenericIcon icon={<Waypoints size={40} className="text-white/80" />} />,
  },
  {
    key: "graphql",
    label: "GraphQL",
    tagline: "query exactly what the UI needs.",
    icon: <BrandIcon Icon={SiGraphql} color="#E10098" />,
  },
  {
    key: "pytest",
    label: "PyTest",
    tagline: "tests that keep you honest.",
    icon: <GenericIcon icon={<TestTube2 size={40} className="text-white/80" />} />,
  },
  {
    key: "jest",
    label: "Jest",
    tagline: "frontend tests without pain.",
    icon: <BrandIcon Icon={SiJest} color="#C21325" />,
  },
  {
    key: "junit",
    label: "JUnit",
    tagline: "solid testing for Java.",
    icon: <BrandIcon Icon={SiJunit5} color="#25A162" />,
  },
  {
    key: "tdd",
    label: "TDD",
    tagline: "write the test, then ship.",
    icon: <GenericIcon icon={<TestTube2 size={40} className="text-white/80" />} />,
  },

  {
    key: "llm",
    label: "LLMs",
    tagline: "chat, tools, and automation.",
    icon: <GenericIcon icon={<Bot size={40} className="text-white/80" />} />,
  },
  {
    key: "rag",
    label: "RAG",
    tagline: "answers grounded in real data.",
    icon: <GenericIcon icon={<DatabaseZap size={40} className="text-white/80" />} />,
  },
  {
    key: "tf",
    label: "TensorFlow",
    tagline: "ML training and inference pipelines.",
    icon: <BrandIcon Icon={SiTensorflow} color="#FF6F00" />,
  },
  {
    key: "pandas",
    label: "Pandas",
    tagline: "data wrangling and analysis.",
    icon: <BrandIcon Icon={SiPandas} color="#150458" />,
  },
];
