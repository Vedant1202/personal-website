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
import { Saturn, SoccerBall, Smiley } from "../components/ink/Scribbles";
import { BrushStroke } from "../components/ink/BrushStroke";
import { BackdropStroke } from "../components/ink/BackdropStroke";
import { CurrentlyNow } from "../components/currently/CurrentlyNow";

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
      <BackdropStroke
        tone="periwinkle"
        opacity={0.75}
        className="absolute -top-20 -right-24 -z-10 w-[17rem] -rotate-12 sm:-top-16 sm:w-[26rem] md:w-[34rem]"
      />

      <div className="page-shell relative pt-6 pb-24 sm:pb-28">
        <HeroMeta
          roleLines={[
            "Software Engineer",
            "UI/UX Design",
            "Agentic AI",
            "Virtual Reality",
          ]}
        />

        {/* Name and portrait share this row, so they start at the same y */}
        <div className="mt-5 grid grid-cols-12 items-start gap-y-10 md:gap-x-8">
          <div className="col-span-12 md:col-span-8">
            <HeroName firstName="Vedant" lastName="Nandoskar" />

            <BrushStroke variant={2} delay={0.35} className="mt-3 ml-1 w-60 sm:w-80" />

            <div className="mt-6">
              <HeroBlurb />

              <p className="text-ink mt-7 text-base sm:text-lg">
                <InkMark type="highlight" delay={0.85} strokeWidth={0} padding={4}>
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
                  <FaGithub className="text-lg transition-transform duration-200 group-hover:scale-110" />
                  <span>GitHub</span>
                </a>

                <a
                  className={LINK_CLASS}
                  href="https://linkedin.com/in/vedant-nandoskar"
                  target="_blank"
                  rel="noreferrer"
                >
                  <FaLinkedin className="text-lg transition-transform duration-200 group-hover:scale-110" />
                  <span>LinkedIn</span>
                </a>

                <a className={LINK_CLASS} href="mailto:vedant.nandoskar@gmail.com">
                  <HiOutlineMail className="text-lg transition-transform duration-200 group-hover:scale-110" />
                  <span>Email</span>
                </a>

                <a
                  className={`${LINK_CLASS} ink-link--boxed ink-edge-sm border-accent/55 text-accent hover:border-accent hover:text-accent border px-3 py-1`}
                  href={RESUME_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FiFileText className="text-lg transition-transform duration-200 group-hover:scale-110" />
                  <span>Resume</span>
                </a>
              </div>
            </div>
          </div>

          {/* Portrait — a round photo, centred against the height of the name and
              blurb beside it rather than pinned to the top. */}
          <div className="relative col-span-12 sm:col-span-8 md:col-span-4 md:self-center">
            {/* Peeks out from behind the portrait — a smooth low sweep, not the
                old sharp zigzag, so it reads as a soft brush pass behind the photo. */}
            <BackdropStroke
              shape="streak"
              tone="teal"
              opacity={0.8}
              className="absolute -right-6 -bottom-10 -z-10 w-72 rotate-6"
            />
            <SectionPicture
              src={vedantImg}
              alt="Vedant Nandoskar"
              treatment="circle"
              tone="bw"
              // The hero portrait stays black-and-white — no colour-on-hover reveal.
              revealOnHover={false}
              eager
              captionAlign="center"
              caption={
                <>
                  Hi! Welcome to my website, it’s great to have you here!
                  {/* Sized in em, not rem: the caption scales with the picture,
                      and a fixed-px smiley would drift out of proportion with it. */}
                  <Smiley className="ml-1 inline-block h-[1.2em] w-[1.2em] translate-y-[0.15em]" />
                </>
              }
              className="mx-auto max-w-[24rem]"
            />
          </div>
        </div>

        {/* A "right now" note closes the hero — what I'm reading/learning/watching,
            with the titles linking out. Full width, under the blurb's size. */}
        <div className="relative mt-14 border-t border-black/10 pt-8">
          <CurrentlyNow />
        </div>

        {/* A quiet ringed planet in the hero's calm lower-left */}
        <Saturn className="pointer-events-none absolute bottom-8 left-6 hidden h-14 w-20 sm:left-8 md:block" />

        {/* Kicked ball in the open band below the note — the note's second line is
            short, and the section's bottom padding leaves clear whitespace there,
            so the ball flies through it without touching any text. Positioned on
            the hero container (a wrapper, since SoccerBall's own root is relative). */}
        <div className="pointer-events-none absolute bottom-6 left-[45%] hidden h-16 w-44 lg:block">
          <SoccerBall className="h-full w-full" />
        </div>
      </div>
    </section>
  );
}
