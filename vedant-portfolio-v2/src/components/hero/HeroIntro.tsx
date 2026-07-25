// src/components/hero/HeroIntro.tsx
import { motion } from "framer-motion";
import { introV, revealV, roleV } from "./heroAnimations";
import { InkMark } from "../ink/InkMark";

type HeroMetaProps = {
  location?: string;
  roleLines?: string[];
};

/** Location and disciplines, spanning the full width above the name. */
export function HeroMeta({
  location = "Chicago, IL",
  roleLines = ["Software Engineer", "Agentic AI", "Human-Centered Computing"],
}: HeroMetaProps) {
  return (
    <>
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
    </>
  );
}

type HeroNameProps = {
  firstName: string;
  lastName: string;
};

/**
 * The name — the hero is carried by type, not by the photo. Sized to fit the
 * left column beside the portrait, so the two share a top edge.
 */
export function HeroName({ firstName, lastName }: HeroNameProps) {
  const line =
    "font-display text-ink text-display block font-semibold tracking-[-0.02em]";

  return (
    <h1 className="mt-0 mb-0">
      <span className="sr-only">
        {firstName} {lastName}
      </span>
      <span aria-hidden className="block">
        <motion.span
          variants={revealV}
          initial="hidden"
          animate="show"
          transition={{ delay: 0.05 }}
          className={line}
        >
          {firstName}
        </motion.span>
        <motion.span
          variants={revealV}
          initial="hidden"
          animate="show"
          transition={{ delay: 0.16 }}
          className={line}
        >
          {lastName}
        </motion.span>
      </span>
    </h1>
  );
}

/** The blurb sits beside the photo rather than under the name, keeping the hero compact. */
export function HeroBlurb() {
  return (
    <motion.p
      variants={introV}
      initial="hidden"
      animate="show"
      transition={{ delay: 0.4 }}
      className="text-ink max-w-xl text-lg leading-relaxed sm:text-xl"
    >
      I design <InkMark delay={0.55}>interfaces</InkMark> with people in mind, and
      engineer <InkMark delay={0.7}>systems</InkMark> that stay efficient as they scale,
      so the software I build{" "}
      <InkMark
        type="circle"
        delay={0.85}
        // Overrides the default circle padding on the vertical only. This one is
        // inline inside a paragraph, so the line box above it is the constraint —
        // the default's 13px reaches up into the previous line and strikes
        // through it. The horizontal stays generous.
        padding={[6, 22]}
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
