// src/components/hero/HeroIntro.tsx
import { motion } from "framer-motion";
import { introV, revealV, roleV } from "./heroAnimations";
import { HighlightWord } from "./HighlightWord";

type HeroIntroProps = {
  location?: string;
  roleLines?: string[];
  firstName: string;
  lastName: string;
};

export function HeroIntro({
  location = "Chicago, IL",
  roleLines = ["Software Engineer", "UI/UX", "Virtual Reality"],
  firstName,
  lastName,
}: HeroIntroProps) {
  return (
    <>
      <div className="flex w-full flex-col items-end text-right md:pl-6">
        <p className="text-right text-sm text-white/55">{location}</p>
        <div className="mt-2 mb-3 h-px w-8 bg-blue-500/70 shadow-[0_0_16px_rgba(59,130,246,0.4)]" />

        {/* Role stack */}
        <motion.p
          variants={roleV}
          initial="hidden"
          animate="show"
          className="text-md text-right tracking-[0.35em] text-white/70 uppercase"
        >
          {roleLines.map((line, idx) => (
            <span key={line}>
              {line}
              {idx < roleLines.length - 1 ? <br /> : null}
            </span>
          ))}
        </motion.p>
      </div>

      {/* <div className="mt-6 h-px w-10 bg-white/20" /> */}

      {/* Name reveal */}
      <motion.h1 className="mt-8 tracking-tight">
        <span className="relative inline-block">
          <motion.span
            variants={revealV}
            initial="hidden"
            animate="show"
            transition={{ delay: 0.15 }}
            className="block text-[2.55rem] leading-[0.98] font-semibold text-white sm:text-[3.35rem] lg:text-[4.8rem]"
          >
            {firstName}
          </motion.span>

          <span className="relative mt-2 block">
            <motion.span
              variants={revealV}
              initial="hidden"
              animate="show"
              transition={{ delay: 0.28 }}
              className="block bg-gradient-to-r from-white via-cyan-200 to-blue-400 bg-clip-text text-[2.55rem] leading-[0.98] font-semibold text-transparent sm:text-[3.35rem] lg:text-[4.8rem]"
            >
              {lastName}
            </motion.span>
          </span>

          {/* overlap tint patch */}
          <span
            aria-hidden
            className="absolute top-[1.08em] left-[6.6ch] h-[0.55em] w-[1.25em] rounded-[0.2em] bg-blue-500/12 mix-blend-screen blur-[0.5px]"
          />
        </span>
      </motion.h1>

      {/* Intro + delayed highlighter */}
      <motion.p
        variants={introV}
        initial="hidden"
        animate="show"
        transition={{ delay: 0.45 }}
        className="mt-12 max-w-lg text-xl leading-relaxed text-white/70 sm:mt-6 md:mt-12"
      >
        I design <HighlightWord delay={1.25}>interfaces</HighlightWord> with people in
        mind,
        <br />
        and engineer <HighlightWord delay={1.45}>systems</HighlightWord> that stay
        efficient as they scale,
        <br />
        so the software I build{" "}
        <HighlightWord delay={1.65}>makes an impact</HighlightWord>.
      </motion.p>
    </>
  );
}
