// src/sections/Contact.tsx
import { motion, useInView } from "framer-motion";
import { Section } from "../components/Section";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { useEffect, useRef } from "react";
import { SectionPicture } from "../components/SectionPicture";
import { InkMark } from "../components/ink/InkMark";
import { Palette, Dumbbell } from "lucide-react";
import { ArrowScribble } from "../components/ink/Scribbles";
import { HobbyDoodle } from "../components/ink/HobbyDoodle";
import { useAudition } from "../components/audition/auditionContext";
import contactPhoto from "../assets/section-photos/square.svg";

const wrapV = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.06 },
  },
};

const itemV = {
  hidden: { opacity: 0, y: 10, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.55, ease: "easeOut" as const },
  },
};

export function Contact({
  onLinksInViewChange,
}: {
  onLinksInViewChange: (inView: boolean) => void;
}) {
  const contactRef = useRef<HTMLDivElement | null>(null);
  const contactInView = useInView(contactRef, { amount: 0.35 });
  const { active: auditing, inkDrawings } = useAudition();

  useEffect(() => {
    onLinksInViewChange(contactInView);
  }, [contactInView, onLinksInViewChange]);

  return (
    <Section id="contact">
      <div ref={contactRef} className="relative scroll-mt-24">
        {inkDrawings && (
          <HobbyDoodle
            icon={Palette}
            size={56}
            tilt={7}
            className="absolute -top-2 right-4 hidden sm:right-10 md:inline-flex"
          />
        )}
        <p className="text-ink-soft text-xs tracking-[0.35em] uppercase">Contact</p>

        <h2 className="font-display text-ink mt-5 mb-6 text-[2.1rem] leading-[1.05] font-semibold tracking-tight sm:text-[2.7rem] md:text-[3.1rem]">
          Let's talk.
        </h2>

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
            className="text-ink-soft mb-6 text-base leading-relaxed sm:text-[1.05rem]"
          >
            I’m open to software engineering roles, especially work around{" "}
            <InkMark delay={0.2}>scalable systems</InkMark>, frontend architecture, and
            data-heavy platforms.
          </motion.p>

          {/* Divider */}
          <motion.div variants={itemV} className="ink-rule mt-8 w-16" />

          {/* Links */}
          <motion.div
            variants={itemV}
            className="text-ink-soft relative mt-8 flex flex-col gap-3"
          >
            {inkDrawings && (
              <ArrowScribble className="absolute -top-9 left-[26rem] hidden h-16 w-24 -scale-x-100 sm:block" />
            )}
            <a
              href="mailto:vedant.nandoskar@gmail.com"
              className="group inline-flex w-fit items-center gap-3"
            >
              <HiOutlineMail className="text-ink-soft group-hover:text-accent text-[1.2rem] transition-colors duration-200" />
              <span className="ink-link text-xs tracking-[0.18em] uppercase">Email</span>
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
              <FaLinkedin className="text-ink-soft text-[1.12rem] transition-colors duration-200 group-hover:text-[#0A66C2]" />
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
              <FaGithub className="text-ink-soft group-hover:text-ink text-[1.12rem] transition-colors duration-200" />
              <span className="ink-link text-xs tracking-[0.18em] uppercase">GitHub</span>
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

        <div className="mt-12 max-w-xs">
          <SectionPicture
            src={contactPhoto}
            alt="A moment worth remembering"
            treatment="natural"
            label={auditing ? "Contact" : undefined}
          />
        </div>

        {inkDrawings && (
          <HobbyDoodle
            icon={Dumbbell}
            size={50}
            rough={3}
            tilt={-6}
            className="absolute right-10 bottom-24 hidden lg:inline-flex"
          />
        )}
      </div>
    </Section>
  );
}
