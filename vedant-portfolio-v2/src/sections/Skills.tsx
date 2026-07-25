// src/sections/Skills.tsx
import { Section } from "../components/Section";
import { SkillTiles } from "../components/skills/SkillTiles";
import { Guitar } from "lucide-react";
import { HobbyDoodle } from "../components/ink/HobbyDoodle";
import { BackdropStroke } from "../components/ink/BackdropStroke";
import { BrushStroke } from "../components/ink/BrushStroke";

/**
 * Sits late in the page on purpose. A stack list is a claim, and the projects
 * above it are the proof of that same claim — each card already names the tech
 * it was built with, in context. Leading with the logo wall spent the page's
 * highest-attention slot on its least differentiating content, so this reads as
 * a reference appendix now: the thing you check once the work has your interest.
 */
export function Skills() {
  return (
    <Section id="skills-section">
      <div id="skills" className="scroll-anchor relative isolate">
        {/* Large sweep behind the whole skills block */}
        <BackdropStroke
          shape="curve"
          tone="blue"
          opacity={0.6}
          className="absolute -top-10 -left-16 -z-10 hidden w-[30rem] sm:block md:w-[44rem]"
        />
        <HobbyDoodle
          icon={Guitar}
          size={52}
          tilt={-8}
          className="absolute top-1 right-2 hidden lg:inline-flex"
        />
        <div className="max-w-3xl">
          <p className="text-ink-soft text-xs tracking-[0.35em] uppercase">Skills</p>
          <h2 className="font-display text-ink text-h2 mt-5 font-semibold tracking-tight">
            Tools and Technologies I work with.
          </h2>
          <BrushStroke variant={2} delay={0.1} className="mt-2 ml-1 w-52 sm:w-64" />
        </div>

        <div className="space-tight">
          <SkillTiles />
        </div>
      </div>
    </Section>
  );
}
