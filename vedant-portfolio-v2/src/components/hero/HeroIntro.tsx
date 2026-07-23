// src/components/hero/HeroIntro.tsx
import { motion } from "framer-motion";
import { introV, revealV, roleV } from "./heroAnimations";
import { InkMark } from "../ink/InkMark";

type HeroIntroProps = {
  location?: string;
  roleLines?: string[];
  firstName: string;
  lastName: string;
};

export function HeroIntro({
  location = "Chicago, IL",
  roleLines = ["Software Engineer", "UI/UX Design", "Virtual Reality"],
  firstName,
  lastName,
}: HeroIntroProps) {
  return (
    <>
      {/* Meta row — location left, disciplines right */}
      <motion.div
        variants={roleV}
        initial="hidden"
        animate="show"
        className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1"
      >
        <p className="text-ink-soft text-xs tracking-[0.22em] uppercase">{location}</p>
        <p className="text-ink-soft text-xs tracking-[0.22em] uppercase">
          {roleLines.join(" · ")}
        </p>
      </motion.div>
      <div aria-hidden className="ink-rule mt-3 w-full" />

      {/* Name — the hero is carried by type, not by the photo */}
      <h1 className="mt-5 mb-0">
        <span className="sr-only">
          {firstName} {lastName}
        </span>
        <span aria-hidden className="block">
          <motion.span
            variants={revealV}
            initial="hidden"
            animate="show"
            transition={{ delay: 0.1 }}
            className="font-display text-ink block text-[clamp(3.2rem,13.5vw,10rem)] leading-[0.84] font-semibold tracking-[-0.02em]"
          >
            {firstName}
          </motion.span>
          <motion.span
            variants={revealV}
            initial="hidden"
            animate="show"
            transition={{ delay: 0.24 }}
            className="font-display text-ink block text-[clamp(3.2rem,13.5vw,10rem)] leading-[0.84] font-semibold tracking-[-0.02em]"
          >
            {lastName}
          </motion.span>
        </span>
      </h1>
    </>
  );
}

/** The blurb sits beside the photo rather than under the name, keeping the hero compact. */
export function HeroBlurb() {
  return (
    <motion.p
      variants={introV}
      initial="hidden"
      animate="show"
      transition={{ delay: 0.5 }}
      className="text-ink max-w-xl text-lg leading-relaxed sm:text-xl"
    >
      I design <InkMark delay={1.2}>interfaces</InkMark> with people in mind, and engineer{" "}
      <InkMark delay={1.5}>systems</InkMark> that stay efficient as they scale, so the
      software I build{" "}
      <InkMark
        type="circle"
        delay={1.9}
        padding={6}
        strokeWidth={1.8}
        multiline={false}
        className="inline-block whitespace-nowrap"
      >
        makes an impact
      </InkMark>
      .
    </motion.p>
  );
}
