// src/sections/Home.tsx
import { useInView } from "framer-motion";
import vedantImg from "../assets/profile-picture-1.webp";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { FiFileText } from "react-icons/fi";
import { useEffect, useRef } from "react";
import { HeroBlurb, HeroMeta, HeroName } from "../components/hero/HeroIntro";
import { SectionPicture } from "../components/SectionPicture";
import { InkMark } from "../components/ink/InkMark";
import { Saturn, SoccerArc } from "../components/ink/Scribbles";
import { BrushStroke } from "../components/ink/BrushStroke";
import { BackdropStroke } from "../components/ink/BackdropStroke";
import { useAudition } from "../components/audition/auditionContext";

/** Opens in a new tab — Google Drive shared resume. */
const RESUME_URL =
  "https://drive.google.com/file/d/1cSkQRiuQr2xDtOhG4atzoeOZG1ZCAuiA/view?usp=sharing";

const LINK_CLASS =
  "ink-link group flex items-center gap-2 whitespace-nowrap text-xs tracking-[0.18em] uppercase";

export function Home({
  onLinksInViewChange,
}: {
  onLinksInViewChange: (inView: boolean) => void;
}) {
  const linksRef = useRef<HTMLDivElement | null>(null);
  const linksInView = useInView(linksRef, { amount: 0.35 });
  const { active: auditing, inkDrawings } = useAudition();

  useEffect(() => {
    onLinksInViewChange(linksInView);
  }, [linksInView, onLinksInViewChange]);

  return (
    // `isolate` is load-bearing: without a stacking context the -z-10 backdrop
    // strokes below would paint behind the section's own white background.
    <section
      id="home"
      className="bg-paper text-ink relative isolate w-full overflow-hidden"
    >
      {/* Ambient backdrop — pale, behind everything, bleeding off the top corner */}
      {inkDrawings && (
        <BackdropStroke
          tone="periwinkle"
          opacity={0.75}
          className="absolute -top-20 -right-24 -z-10 w-[17rem] -rotate-12 sm:-top-16 sm:w-[26rem] md:w-[34rem]"
        />
      )}

      <div className="relative mx-auto w-full max-w-6xl px-5 pt-6 pb-24 sm:px-6 sm:pb-28">
        <HeroMeta roleLines={["Software Engineer", "UI/UX Design", "Virtual Reality"]} />

        {/* Name and portrait share this row, so they start at the same y */}
        <div className="mt-5 grid grid-cols-12 items-start gap-y-10 md:gap-x-8">
          <div className="col-span-12 md:col-span-8">
            <HeroName firstName="Vedant" lastName="Nandoskar" />

            {inkDrawings && (
              <BrushStroke variant={2} delay={0.6} className="mt-3 ml-1 w-52 sm:w-64" />
            )}

            <div className="mt-6">
              <HeroBlurb />

              <p className="text-ink mt-7 text-sm">
                <InkMark type="highlight" delay={2.3} strokeWidth={0} padding={3}>
                  Open to software engineering roles — let’s talk.
                </InkMark>
              </p>

              <div
                ref={linksRef}
                className="text-ink-soft mt-7 flex flex-wrap items-center gap-x-8 gap-y-3"
              >
                <a
                  className={LINK_CLASS}
                  href="https://github.com/Vedant1202"
                  target="_blank"
                  rel="noreferrer"
                >
                  <FaGithub className="text-[1.05rem] transition-transform duration-200 group-hover:scale-110" />
                  <span>GitHub</span>
                </a>

                <a
                  className={LINK_CLASS}
                  href="https://linkedin.com/in/vedant-nandoskar-692824169/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <FaLinkedin className="text-[1.05rem] transition-transform duration-200 group-hover:scale-110" />
                  <span>LinkedIn</span>
                </a>

                <a className={LINK_CLASS} href="mailto:vedant.nandoskar@gmail.com">
                  <HiOutlineMail className="text-[1.1rem] transition-transform duration-200 group-hover:scale-110" />
                  <span>Email</span>
                </a>

                <a
                  className={`${LINK_CLASS} ink-link--boxed ink-edge-sm border-accent/55 text-accent hover:border-accent hover:text-accent border px-3 py-1`}
                  href={RESUME_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FiFileText className="text-[1.05rem] transition-transform duration-200 group-hover:scale-110" />
                  <span>Resume</span>
                </a>
              </div>
            </div>
          </div>

          {/* Portrait — top edge lines up with the name beside it */}
          <div className="relative col-span-12 sm:col-span-7 md:col-span-4">
            {/* Peeks out from behind the snapshot */}
            {inkDrawings && (
              <BackdropStroke
                shape="zigzag"
                tone="teal"
                opacity={0.8}
                className="absolute -right-6 -bottom-10 -z-10 w-64 rotate-6"
              />
            )}
            {inkDrawings && (
              <SoccerArc className="absolute top-28 -left-44 hidden h-24 w-44 lg:block" />
            )}
            <SectionPicture
              src={vedantImg}
              alt="Vedant Nandoskar"
              treatment="snapshot"
              eager
              label={auditing ? "Hero" : undefined}
              className="max-w-[15rem] md:ml-auto"
            />
          </div>
        </div>

        {/* A quiet ringed planet in the hero's calm lower-left */}
        {inkDrawings && (
          <Saturn className="pointer-events-none absolute bottom-8 left-6 hidden h-14 w-20 sm:left-8 md:block" />
        )}
      </div>
    </section>
  );
}
