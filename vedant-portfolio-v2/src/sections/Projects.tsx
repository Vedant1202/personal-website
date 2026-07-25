// src/sections/Projects.tsx
import { Section } from "../components/Section";
import { PROJECTS } from "../data/projects";
import { ProjectGrid } from "../components/projects/ProjectGrid";
import { Polaroid } from "../components/Polaroid";
import { Pencil } from "lucide-react";
import { InkMark } from "../components/ink/InkMark";
import { HobbyDoodle } from "../components/ink/HobbyDoodle";
import { BackdropStroke } from "../components/ink/BackdropStroke";
import { BrushStroke } from "../components/ink/BrushStroke";
import { PROJECT_PHOTOS } from "../data/photos";
import "../styles/Projects.css";

const [DESK, WALL] = PROJECT_PHOTOS;

const KICKER = "text-ink-soft text-xs tracking-[0.35em] uppercase";
const HEADING = "font-display text-ink text-h2 mt-5 font-semibold tracking-tight";

/** First section after the hero — the work carries the page, so it leads. */
export function Projects() {
  return (
    <Section id="projects-section">
      <div id="projects" className="scroll-anchor relative isolate">
        {/* Long low sweep running behind the project grid */}
        <BackdropStroke
          shape="streak"
          tone="periwinkle"
          opacity={0.55}
          className="absolute top-[22rem] -right-20 -z-10 hidden w-[32rem] -rotate-3 sm:block md:w-[46rem]"
        />
        <div className="mb-12 grid grid-cols-12 items-start gap-y-8 md:gap-x-10">
          <div className="col-span-12 md:col-span-7">
            <p className={KICKER}>
              <InkMark type="circle" strokeWidth={1.6} multiline={false}>
                Projects &amp; Work
              </InkMark>
            </p>

            <h2 className={HEADING}>Ideas turned into working software.</h2>
            <BrushStroke delay={0.1} className="mt-2 ml-1 w-56 sm:w-72" />

            <p className="text-ink-soft mt-6 text-lg leading-relaxed">
              <InkMark delay={0.2}>Interfaces</InkMark> that feel simple. <br />
              <InkMark delay={0.45}>Systems</InkMark> that aren’t. <br />I care about
              performance, clarity, and making software that actually holds up.
            </p>

            <HobbyDoodle
              icon={Pencil}
              size={46}
              rough={2}
              tilt={6}
              className="mt-8 ml-1 hidden sm:inline-flex"
            />
          </div>

          <div className="relative col-span-12 sm:col-span-8 md:col-span-5 md:col-start-8">
            <BackdropStroke
              shape="ribbon"
              tone="teal"
              opacity={0.7}
              className="absolute -top-10 -left-16 -z-10 w-[22rem] rotate-6"
            />
            {/* Desk and a favourite wall as a hand-placed pair: set side by side
                and staggered, overlapping only at a corner so each keeps its own
                caption clear. */}
            <div className="relative mx-auto w-full max-w-[29rem]">
              <Polaroid
                src={DESK.src}
                alt={DESK.alt}
                caption={DESK.caption}
                tilt={DESK.tilt}
                ratio="4 / 3"
                captionAlign="left"
                bw
                className="w-[62%]"
              />
              <Polaroid
                src={WALL.src}
                alt={WALL.alt}
                caption={WALL.caption}
                tilt={WALL.tilt}
                ratio="4 / 3"
                captionAlign="right"
                bw
                className="relative z-10 -mt-[24%] ml-auto w-[58%]"
              />
            </div>
          </div>
        </div>

        <ProjectGrid projects={PROJECTS} />
      </div>
    </Section>
  );
}
