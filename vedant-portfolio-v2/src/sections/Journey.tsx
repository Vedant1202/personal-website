// src/sections/Journey.tsx
import { Section } from "../components/Section";
import { InkMark } from "../components/ink/InkMark";
import { BookOpen } from "lucide-react";
import { StarScribble } from "../components/ink/Scribbles";
import { HobbyDoodle } from "../components/ink/HobbyDoodle";
import { BackdropStroke } from "../components/ink/BackdropStroke";
import { BrushStroke } from "../components/ink/BrushStroke";
import { SectionPicture } from "../components/SectionPicture";
import gradImg from "../assets/my-images/grad.webp";

// Metrics and tech in the bullets earn emphasis, but ~20 blue underlines across
// the section drowned the two that matter (the intro marks). Bold, near-black
// text carries the same "scan me" weight — like a resume bolding its numbers —
// without adding color, keeping the accent rare and meaningful.
function U({ children }: { children: React.ReactNode }) {
  return <span className="text-ink font-semibold">{children}</span>;
}

function A({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="text-accent decoration-accent/50 hover:decoration-accent underline underline-offset-2 transition-colors"
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
  rail = true,
}: {
  org: string;
  title: string;
  metaLeft: string;
  metaRight: string;
  bullets: React.ReactNode[];
  /** False when a drawn path supplies the spine for the whole list instead. */
  rail?: boolean;
}) {
  return (
    <div className="group relative pl-8">
      {rail && <div className="ink-rail absolute top-2 left-[13px] h-full" />}
      <div className="bg-accent absolute top-2 left-[11px] h-2.5 w-2.5 rounded-full" />

      <div className="transition duration-300 group-hover:translate-x-1">
        <div className="text-ink-soft flex flex-col gap-1 text-sm sm:flex-row sm:items-baseline sm:justify-between">
          <span className="text-ink font-medium">{org}</span>
          <span>
            {metaLeft} · {metaRight}
          </span>
        </div>

        <p className="text-ink mt-2 text-base font-semibold">{title}</p>

        <ul className="text-ink-soft mt-4 space-y-2 text-base">
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
      <div className="relative isolate">
        {/* A soft sweep tucked behind the heading's left — kept pale and short so
            it reads as texture under the title, not a smudge trailing across the
            intro copy (which is where the larger, stronger version landed). */}
        <BackdropStroke
          shape="ribbon"
          tone="blue"
          opacity={0.3}
          className="absolute -top-6 -left-28 -z-10 hidden w-[24rem] sm:block md:w-[32rem]"
        />
        <HobbyDoodle
          icon={BookOpen}
          size={54}
          tilt={-5}
          className="absolute top-0 right-2 hidden lg:inline-flex"
        />
        {/* header */}
        <div className="max-w-3xl">
          <p className="text-ink-soft text-xs tracking-[0.35em] uppercase">Journey</p>

          <h2 className="font-display text-ink text-h2 mt-5 font-semibold tracking-tight">
            {/* No manual <br>: text-wrap balance decides the break, so this
                heading stays right at every width instead of only at the one
                the break was hand-tuned for. */}
            Education <span className="italic">&</span> Experience.
          </h2>
          <BrushStroke variant={2} delay={0.1} className="mt-2 ml-1 w-56 sm:w-72" />

          <p className="text-ink-soft mt-6 text-lg leading-relaxed">
            I built <InkMark delay={0.2}>strong conceptual foundations</InkMark> in
            graduate school, and refined them through{" "}
            <InkMark delay={0.5}>real-world engineering</InkMark> where scale and
            reliability matter.
          </p>
        </div>

        {/* education — the two colleges on the left, a graduation photo alongside */}
        <div className="space-block">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_15rem] lg:items-start lg:gap-14">
            <div>
              <p className="text-ink-soft relative mb-6 text-sm tracking-[0.28em] uppercase">
                Education
                <StarScribble className="absolute -top-3 left-[6.5rem] hidden h-5 w-5 sm:block" />
              </p>

              <div className="space-y-9">
                <Block
                  org="University of Illinois Chicago"
                  title="M.S. Computer Science"
                  metaLeft="Class of 2025"
                  metaRight="Chicago, IL"
                  bullets={[
                    <>
                      Thesis on VR help systems, improving onboarding with{" "}
                      <U>context-aware guidance</U> —{" "}
                      <A href="https://doi.org/10.25417/uic.32991932">published thesis</A>
                      .
                    </>,
                    <>
                      Built data-heavy dashboards and pipelines for{" "}
                      <U>clinical research</U>.
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

            {/* Graduation photo — sketch-framed, sitting beside the two colleges. */}
            <SectionPicture
              src={gradImg}
              alt="Vedant at his UIC graduation"
              treatment="sketch"
              tone="bw"
              tilt={2}
              caption="Thank you UIC <3"
              className="mx-auto mt-2 w-full max-w-[15rem] lg:mt-1"
            />
          </div>
        </div>

        {/* experience — full-width timeline */}
        <div className="space-block relative isolate">
          <p className="text-ink-soft mb-6 text-sm tracking-[0.28em] uppercase">
            Experience
          </p>

          <div className="relative space-y-10">
            {/* A soft curve behind the lower entries. Sits inside the content now
                (feathered edges, no bleed) rather than off the right margin, which
                the old full-width layout no longer has — so nothing gets clipped. */}
            <BackdropStroke
              shape="curve"
              tone="teal"
              opacity={0.45}
              className="absolute top-[26rem] right-0 -z-10 hidden w-[26rem] rotate-[8deg] sm:block md:w-[32rem]"
            />
            {/* Straight sketched spine aligned to the dots (left-[11px]), matching
                the Education rails — the old winding path drifted off the dots. */}
            <div className="ink-rail absolute top-2 left-[13px] -z-10 h-[calc(100%-1rem)]" />
            <Block
              rail={false}
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
              rail={false}
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
              rail={false}
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
