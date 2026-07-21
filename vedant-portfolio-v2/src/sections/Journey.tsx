// src/sections/Journey.tsx
import { Section } from "../components/Section";

function U({ children }: { children: React.ReactNode }) {
  return (
    <span className="border-b border-blue-500/60 pb-[2px] text-white">{children}</span>
  );
}

function A({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="text-blue-300/90 underline decoration-blue-500/50 underline-offset-2 transition-colors hover:text-blue-200 hover:decoration-blue-400"
    >
      {children}
    </a>
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
        <div className="mb-12 max-w-3xl">
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

        {/* education — compact two-up band */}
        <div className="mb-14">
          <p className="mb-6 text-sm tracking-[0.28em] text-white/60 uppercase">
            Education
          </p>

          <div className="grid gap-10 sm:grid-cols-2">
            <Block
              org="University of Illinois Chicago"
              title="M.S. Computer Science"
              metaLeft="Class of 2025"
              metaRight="Chicago, IL"
              bullets={[
                <>
                  Thesis on VR help systems, improving onboarding with{" "}
                  <U>context-aware guidance</U> —{" "}
                  <A href="https://doi.org/10.25417/uic.32991932">published thesis</A>.
                </>,
                <>
                  Built data-heavy dashboards and pipelines for <U>clinical research</U>.
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

        {/* experience — full-width timeline */}
        <div>
          <p className="mb-6 text-sm tracking-[0.28em] text-white/60 uppercase">
            Experience
          </p>

          <div className="max-w-4xl space-y-10">
            <Block
              org="University of Illinois Chicago"
              title="Software Engineer"
              metaLeft="Jul 2024 – Present"
              metaRight="Chicago, IL"
              bullets={[
                <>
                  Cut manual reporting <U>70%</U> across <U>$10M+</U> in grant funding by
                  building a financial operations platform that automated budgeting,
                  expense reporting, and <U>EDI X12 837/834</U> (claims and enrollment)
                  compliance.
                </>,
                <>
                  Increased reporting throughput <U>40%</U> by rebuilding analytics
                  dashboards for research teams at Stanford, UWash, and UIC, adding faster
                  filtering, drill-down views, and data-heavy table workflows across{" "}
                  <U>500K+</U> records.
                </>,
                <>
                  Built an AI-assisted healthcare screening workflow with <U>Twilio</U>,{" "}
                  <U>OpenAI</U>, <U>LangChain</U>, and <U>REDCap</U>, converting
                  recruitment and eligibility calls into structured records with branching
                  logic, transcripts, and human-review paths.
                </>,
              ]}
            />

            <Block
              org="CleverTap"
              title="Senior Software Engineer"
              metaLeft="Jan 2023 – Jul 2023"
              metaRight="Mumbai, India"
              bullets={[
                <>
                  Cut campaign creation time <U>50%</U> and increased enterprise feature
                  adoption <U>22%</U>, validated through A/B testing, by leading a full{" "}
                  <U>React</U> dashboard revamp of customer-facing campaign workflows.
                </>,
                <>
                  Reduced backend latency <U>80%</U> across services processing millions
                  of daily events by re-architecting toward modular dependencies,
                  clustering, and load balancing on a high-availability distributed
                  system.
                </>,
                <>
                  Led triage of high-severity production defects during an enterprise beta
                  rollout, partnering cross-functionally with product and QA to protect
                  reliability under tight release timelines.
                </>,
              ]}
            />

            <Block
              org="CleverTap"
              title="Software Engineer"
              metaLeft="Jun 2021 – Dec 2022"
              metaRight="Mumbai, India"
              bullets={[
                <>
                  Accelerated feature delivery org-wide by designing and shipping a
                  reusable <U>React</U> component system that standardized UI patterns and
                  eliminated duplicated code across engineering teams.
                </>,
                <>
                  Reduced post-release defects <U>70%</U> by integrating end-to-end{" "}
                  <U>TestCafe</U> automation into the CI/CD pipeline, establishing
                  automated regression coverage as a team quality standard.
                </>,
              ]}
            />
          </div>
        </div>
      </div>
    </Section>
  );
}
