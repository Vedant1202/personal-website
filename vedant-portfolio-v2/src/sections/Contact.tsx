// src/sections/Contact.tsx
import { motion, useInView } from "framer-motion";
import { Section } from "../components/Section";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { useEffect, useRef } from "react";
import { Polaroid } from "../components/Polaroid";
import { Palette } from "lucide-react";
import { HobbyDoodle } from "../components/ink/HobbyDoodle";
import { BrushStroke } from "../components/ink/BrushStroke";
import { BackdropStroke } from "../components/ink/BackdropStroke";
// The photo wall's images and captions live in one editable file.
import { GALLERY } from "../data/photos";

const wrapV = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.06 },
  },
};

const itemV = {
  hidden: { opacity: 0, y: 10 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" as const },
  },
};

export function Contact({
  onLinksInViewChange,
}: {
  onLinksInViewChange: (inView: boolean) => void;
}) {
  const contactRef = useRef<HTMLDivElement | null>(null);
  const contactInView = useInView(contactRef, { amount: 0.35 });

  useEffect(() => {
    onLinksInViewChange(contactInView);
  }, [contactInView, onLinksInViewChange]);

  return (
    <Section id="contact">
      <div ref={contactRef} className="scroll-anchor relative isolate">
        {/* Ambient backdrop near the page's end. Kept inside the container
            rather than bled past a clip: a clip cuts it at the container edge —
            mid-page — which reads as a sliced rectangle instead of paint. Its
            own feathered mask softens all four edges. */}
        <BackdropStroke
          tone="blue"
          opacity={0.75}
          className="absolute right-0 bottom-2 -z-10 w-[22rem] rotate-6 md:w-[30rem]"
        />

        <HobbyDoodle
          icon={Palette}
          size={56}
          tilt={7}
          className="absolute -top-2 right-4 hidden sm:right-10 md:inline-flex"
        />
        <p className="text-ink-soft text-xs tracking-[0.35em] uppercase">Contact</p>

        <h2 className="font-display text-ink text-h2 mt-5 font-semibold tracking-tight">
          Let's talk.
        </h2>
        <BrushStroke delay={0.15} className="mt-2 mb-6 ml-1 w-52 sm:w-64" />

        {/* Copy on the left, a small scrapbook of prints beside it on the right —
            side by side rather than a full-width wall below, so the photos add
            personality without adding a screen of scroll. */}
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_27rem] lg:items-start lg:gap-16">
          <motion.div
            variants={wrapV}
            initial="hidden"
            whileInView="show"
            viewport={{ amount: 0.35, once: true }}
            className="max-w-2xl"
          >
            {/* Copy */}
            <motion.p
              variants={itemV}
              className="text-ink-soft mb-6 text-lg leading-relaxed"
            >
              I’m open to software engineering roles, especially work around scalable
              systems, frontend architecture, and data-heavy platforms.
            </motion.p>

            {/* Divider */}
            <motion.div variants={itemV} className="ink-rule mt-8 w-16" />

            {/* Links */}
            <motion.div
              variants={itemV}
              className="text-ink-soft mt-8 flex flex-col gap-3"
            >
              <a
                href="mailto:vedant.nandoskar@gmail.com"
                className="group inline-flex w-fit items-center gap-3"
              >
                <HiOutlineMail className="text-ink-soft group-hover:text-accent text-xl transition-colors duration-200" />
                <span className="ink-link text-xs tracking-[0.18em] uppercase">
                  Email
                </span>
                <span className="text-ink-soft group-hover:text-ink text-xs italic transition-colors duration-200">
                  vedant.nandoskar@gmail.com
                </span>
              </a>

              <a
                href="https://linkedin.com/in/vedant-nandoskar-692824169/"
                target="_blank"
                rel="noreferrer"
                className="group inline-flex w-fit items-center gap-3"
              >
                <FaLinkedin className="text-ink-soft text-xl transition-colors duration-200 group-hover:text-[#0A66C2]" />
                <span className="ink-link text-xs tracking-[0.18em] uppercase">
                  LinkedIn
                </span>
                <span className="text-ink-soft group-hover:text-ink text-xs italic transition-colors duration-200">
                  let’s connect
                </span>
              </a>

              <a
                href="https://github.com/Vedant1202"
                target="_blank"
                rel="noreferrer"
                className="group inline-flex w-fit items-center gap-3"
              >
                <FaGithub className="text-ink-soft group-hover:text-ink text-xl transition-colors duration-200" />
                <span className="ink-link text-xs tracking-[0.18em] uppercase">
                  GitHub
                </span>
                <span className="text-ink-soft group-hover:text-ink text-xs italic transition-colors duration-200">
                  my projects
                </span>
              </a>
            </motion.div>

            {/* Footer microcopy */}
            <motion.div variants={itemV} className="mt-10 flex items-center gap-5">
              <span className="text-ink-soft text-[11px] tracking-[0.22em] uppercase">
                based in chicago, open to relocation and remote opportunities
              </span>
              <span
                aria-hidden
                className="from-accent h-px flex-1 bg-gradient-to-r to-transparent"
              />
            </motion.div>
          </motion.div>

          {/* Scrapbook — the prints hand-placed as a pair: one down-left, one
              up-right, overlapping only at a corner so each caption stays clear.
              A compact block that fills the column beside the copy without
              running past it into more scroll. */}
          <div className="relative mx-auto w-full max-w-[26rem] py-2">
            <BackdropStroke
              shape="streak"
              tone="teal"
              opacity={0.45}
              className="absolute -top-8 -left-10 -z-10 w-[22rem] -rotate-6"
            />
            <Polaroid
              src={GALLERY[0].src}
              alt={GALLERY[0].alt}
              caption={GALLERY[0].caption}
              tilt={GALLERY[0].tilt}
              captionAlign="left"
              bw
              className="w-[52%]"
            />
            <Polaroid
              src={GALLERY[1].src}
              alt={GALLERY[1].alt}
              caption={GALLERY[1].caption}
              tilt={GALLERY[1].tilt}
              captionAlign="right"
              bw
              className="relative z-10 -mt-[42%] ml-auto w-[54%]"
            />
          </div>
        </div>
      </div>
    </Section>
  );
}
