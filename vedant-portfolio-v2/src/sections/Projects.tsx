// src/sections/Projects.tsx
import { Section } from "../components/Section";
import { SkillTiles } from "../components/skills/SkillTiles";
import { PROJECTS } from "../data/projects";
import { ProjectGrid } from "../components/projects/ProjectGrid";
import "../styles/Projects.css";

export function Projects() {
  return (
    <Section id="projects-and-skills">
      <div className="relative mx-auto max-w-6xl">
        {/* ── Skills ─────────────────────────────── */}
        <div id="skills">
          <div className="max-w-3xl">
            <p className="text-xs tracking-[0.35em] text-white/50 uppercase">Skills</p>
            <h3 className="mt-6 text-[2.1rem] leading-[1.05] font-semibold tracking-tight text-white sm:text-[2.7rem]">
              Tools and Technologies I work with
              <span className="accent-punct">.</span>{" "}
            </h3>
            <div className="mt-8 h-px w-16 bg-blue-500/70 shadow-[0_0_16px_rgba(59,130,246,0.4)]" />
          </div>

          {/* Full-bleed marquee — uses overflow-clip to avoid horizontal scrollbar */}
          <div className="relative mt-10 overflow-x-clip">
            <div className="relative left-1/2 w-screen -translate-x-1/2">
              <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-10">
                <SkillTiles />
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="my-16 h-px w-full bg-white/10" />

        {/* ── Projects ───────────────────────────── */}
        <div className="mb-14 max-w-3xl">
          <p className="text-xs tracking-[0.35em] text-white/50 uppercase">
            Projects & Work
          </p>

          <h2 className="mt-6 text-[2.1rem] leading-[1.05] font-semibold tracking-tight text-white sm:text-[2.7rem] md:text-[3.1rem]">
            Ideas turned into working software<span className="accent-punct">.</span>
          </h2>

          <p className="mt-6 text-base leading-relaxed text-white/65 sm:text-lg">
            <span className="relative inline-block">
              <span className="relative z-10">Interfaces</span>
              <span
                aria-hidden
                className="absolute bottom-[0.08em] left-0 z-0 h-[40%] w-full rounded-[0.25em] bg-blue-500/28 shadow-[0_0_16px_rgba(59,130,246,0.22)]"
              />
            </span>{" "}
            that feel simple. <br />
            <span className="relative inline-block">
              <span className="relative z-10">Systems</span>
              <span
                aria-hidden
                className="absolute bottom-[0.08em] left-0 z-0 h-[20%] w-full rounded-[0.25em] bg-blue-500/28 shadow-[0_0_16px_rgba(59,130,246,0.22)]"
              />
            </span>{" "}
            that aren’t. <br />I care about{" "}
            <span className="relative inline-block">
              <span className="relative z-10">performance</span>
              <span
                aria-hidden
                className="absolute bottom-[0.08em] left-0 z-0 h-[20%] w-full rounded-[0.25em] bg-blue-500/28 shadow-[0_0_16px_rgba(59,130,246,0.22)]"
              />
            </span>
            , clarity, and making software that{" "}
            <span className="relative inline-block">
              <span className="relative z-10">actually holds up</span>
              <span
                aria-hidden
                className="absolute bottom-[0.08em] left-0 z-0 h-[20%] w-full rounded-[0.25em] bg-blue-500/28 shadow-[0_0_16px_rgba(59,130,246,0.22)]"
              />
            </span>
            .
          </p>

          <div className="mt-8 h-px w-16 bg-blue-500/70 shadow-[0_0_16px_rgba(59,130,246,0.4)]" />
        </div>

        {/* Pinterest-ish projects grid */}
        <ProjectGrid projects={PROJECTS} />
        <div className="mt-16 mb-0 h-px w-full bg-white/10" />
      </div>
    </Section>
  );
}
