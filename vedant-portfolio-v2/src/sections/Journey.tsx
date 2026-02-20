// src/sections/Journey.tsx
import { Section } from "../components/Section";

function U({ children }: { children: React.ReactNode }) {
  return (
    <span className="border-b border-blue-500/60 pb-[2px] text-white">{children}</span>
  );
}

function Block({
  org,
  title,
  metaLeft,
  metaRight,
  bullets,
}: {
  org: string;
  title: string;
  metaLeft: string;
  metaRight: string;
  bullets: React.ReactNode[];
}) {
  return (
    <div className="group relative pl-8">
      {/* rail */}
      <div className="absolute top-2 left-0 h-full w-px bg-white/10" />
      <div className="absolute top-2 left-[-2px] h-3 w-3 rounded-full bg-blue-500 shadow-[0_0_12px_rgba(59,130,246,0.5)]" />

      <div className="transition duration-300 group-hover:translate-x-1">
        <div className="flex flex-col gap-1 text-sm text-white/55 sm:flex-row sm:items-baseline sm:justify-between">
          <span className="text-white/70">{org}</span>
          <span className="text-white/45">
            {metaLeft} · {metaRight}
          </span>
        </div>

        <p className="mt-2 text-base font-semibold text-white">{title}</p>

        <ul className="mt-4 space-y-2 text-sm text-white/70">
          {bullets.map((b, i) => (
            <li key={i} className="leading-relaxed">
              {b}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function Journey() {
  return (
    <Section id="journey">
      <div className="relative mx-auto max-w-6xl px-0">
        {/* header */}
        <div className="mb-20 max-w-3xl">
          <p className="text-xs tracking-[0.35em] text-white/50 uppercase">Journey</p>

          <h2 className="mt-6 text-[2.2rem] leading-[1.05] font-semibold tracking-tight text-white sm:text-[2.8rem] md:text-[3.2rem]">
            Education <span className="accent-punct italic">&</span>
            <br />
            Experience<span className="accent-punct">.</span>
          </h2>

          <p className="mt-6 text-base leading-relaxed text-white/65 sm:text-lg">
            I built{" "}
            <span className="relative inline-block">
              <span className="relative z-10">strong conceptual foundations</span>
              <span
                aria-hidden
                className="absolute bottom-[0.08em] left-0 z-0 h-[40%] w-full rounded-[0.25em] bg-blue-500/28 shadow-[0_0_16px_rgba(59,130,246,0.22)]"
              />
            </span>{" "}
            in graduate school, and refined them through{" "}
            <span className="relative inline-block">
              <span className="relative z-10">real-world engineering</span>
              <span
                aria-hidden
                className="absolute bottom-[0.08em] left-0 z-0 h-[40%] w-full rounded-[0.25em] bg-blue-500/28 shadow-[0_0_16px_rgba(59,130,246,0.22)]"
              />
            </span>{" "}
            where{" "}
            <span className="relative inline-block">
              <span className="relative z-10">scale and reliability</span>
              <span
                aria-hidden
                className="absolute bottom-[0.08em] left-0 z-0 h-[40%] w-full rounded-[0.25em] bg-blue-500/28 shadow-[0_0_16px_rgba(59,130,246,0.22)]"
              />
            </span>{" "}
            matter.
          </p>

          <div className="mt-8 h-px w-16 bg-blue-500/70 shadow-[0_0_16px_rgba(59,130,246,0.4)]" />
        </div>

        {/* two-column layout */}
        <div className="grid grid-cols-12 gap-y-16 md:gap-x-14">
          {/* EDUCATION */}
          <div className="col-span-12 md:col-span-5">
            <p className="mb-10 text-sm tracking-[0.28em] text-white/60 uppercase">
              Education
            </p>

            <div className="space-y-12">
              <Block
                org="University of Illinois"
                title="M.S. Computer Science"
                metaLeft="Class of 2025"
                metaRight="Chicago"
                bullets={[
                  <>
                    Thesis on VR help systems, improving onboarding with{" "}
                    <U>context-aware guidance</U>.
                  </>,
                  <>
                    Built data-heavy dashboards and pipelines for <U>clinical research</U>
                    .
                  </>,
                ]}
              />

              <Block
                org="University of Mumbai"
                title="B.E. Information Technology"
                metaLeft="Class of 2021"
                metaRight="Mumbai"
                bullets={[
                  <>
                    Strong base in <U>systems</U>, networking, and software engineering.
                  </>,
                  <>
                    Shipped full-stack projects with an emphasis on <U>performance</U>.
                  </>,
                ]}
              />
            </div>
          </div>

          {/* EXPERIENCE */}
          <div className="col-span-12 md:col-span-7">
            <p className="mb-10 text-sm tracking-[0.28em] text-white/60 uppercase">
              Experience
            </p>

            <div className="space-y-12">
              <Block
                org="University of Illinois"
                title="Software Research Engineer"
                metaLeft="2024–Now"
                metaRight="~2 yrs"
                bullets={[
                  <>
                    Built HIPAA-safe pipelines over <U>500K+ PHI</U> records across
                    multi-site collaborators.
                  </>,
                  <>
                    Automated reporting workflows with <U>Django</U>, <U>MongoDB</U>, and
                    validation tooling.
                  </>,
                  <>
                    Cut manual ops with expense tracking automation for <U>$10M+</U>{" "}
                    research budgets.
                  </>,
                ]}
              />

              <Block
                org="CleverTap"
                title="Senior Software Engineer"
                metaLeft="2023"
                metaRight="~1 yr"
                bullets={[
                  <>
                    Led dashboard revamp, reducing creation time by <U>~50%</U>.
                  </>,
                  <>
                    Improved load + throughput via clustering and better data access
                    patterns.
                  </>,
                ]}
              />

              <Block
                org="CleverTap"
                title="Software Engineer"
                metaLeft="2021–2022"
                metaRight="~2 yrs"
                bullets={[
                  <>
                    Built a reusable component system adopted across teams, boosting{" "}
                    <U>delivery speed</U>.
                  </>,
                  <>
                    Strengthened CI with automated testing, lowering{" "}
                    <U>release regressions</U>.
                  </>,
                ]}
              />
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
