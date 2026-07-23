// src/sections/Projects.tsx
import { Section } from "../components/Section";
import { SkillTiles } from "../components/skills/SkillTiles";
import { PROJECTS } from "../data/projects";
import { ProjectGrid } from "../components/projects/ProjectGrid";
import { SectionPicture } from "../components/SectionPicture";
import { InkMark } from "../components/ink/InkMark";
import { useAudition } from "../components/audition/auditionContext";
import projectsPhoto from "../assets/section-photos/wide.svg";
import "../styles/Projects.css";

const KICKER = "text-ink-soft text-xs tracking-[0.35em] uppercase";
const HEADING =
  "font-display text-ink mt-5 text-[2.1rem] leading-[1.05] font-semibold tracking-tight sm:text-[2.7rem]";

export function Projects() {
  const { active: auditing } = useAudition();

  return (
    <Section id="projects-and-skills">
      <div className="relative mx-auto max-w-6xl">
        {/* ── Skills ─────────────────────────────── */}
        <div id="skills" className="scroll-mt-24">
          <div className="max-w-3xl">
            <p className={KICKER}>Skills</p>
            <h2 className={HEADING}>Tools and Technologies I work with.</h2>
          </div>

          <div className="mt-10">
            <SkillTiles />
          </div>
        </div>

        <div className="ink-rule my-14 w-full" />

        {/* ── Projects ───────────────────────────── */}
        <div id="projects" className="scroll-mt-24">
          <div className="mb-12 grid grid-cols-12 items-start gap-y-8 md:gap-x-10">
            <div className="col-span-12 md:col-span-7">
              <p className={KICKER}>
                <InkMark type="circle" padding={7} strokeWidth={1.6} multiline={false}>
                  Projects &amp; Work
                </InkMark>
              </p>

              <h2 className={`${HEADING} md:text-[3.1rem]`}>
                Ideas turned into working software.
              </h2>

              <p className="text-ink-soft mt-6 text-base leading-relaxed sm:text-lg">
                <InkMark delay={0.2}>Interfaces</InkMark> that feel simple. <br />
                <InkMark delay={0.45}>Systems</InkMark> that aren’t. <br />I care about
                performance, clarity, and making software that actually holds up.
              </p>
            </div>

            <div className="col-span-12 sm:col-span-8 md:col-span-4 md:col-start-9">
              <SectionPicture
                src={projectsPhoto}
                alt="A moment from Vedant's work"
                treatment="sketch"
                label={auditing ? "Projects" : undefined}
              />
            </div>
          </div>

          <ProjectGrid projects={PROJECTS} />
        </div>
      </div>
    </Section>
  );
}
