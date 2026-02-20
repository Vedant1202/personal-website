// src/sections/Contact.tsx
import { motion } from "framer-motion";
import { Section } from "../components/Section";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";

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

export function Contact() {
  return (
    <Section id="contact" title="Contact">
      <div className="mt-2 h-px w-16 bg-blue-500/70 shadow-[0_0_16px_rgba(59,130,246,0.4)]" />

      <h2 className="mt-6 mb-6 text-[2.1rem] leading-[1.05] font-semibold tracking-tight text-white sm:text-[2.7rem] md:text-[3.1rem]">
        Let's talk<span className="accent-punct">.</span>
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
          className="mb-6 text-base leading-relaxed text-white/70 sm:text-[1.05rem]"
        >
          I’m open to software engineering roles, especially work around{" "}
          <span className="relative inline-block">
            <span className="relative z-10">scalable systems</span>
            <span
              aria-hidden
              className="absolute bottom-[0.08em] left-0 z-0 h-[40%] w-full rounded-[0.25em] bg-blue-500/22 shadow-[0_0_16px_rgba(59,130,246,0.18)]"
            />
          </span>
          ,{" "}
          <span className="relative inline-block">
            <span className="relative z-10">frontend architecture</span>
            <span
              aria-hidden
              className="absolute bottom-[0.08em] left-0 z-0 h-[40%] w-full rounded-[0.25em] bg-blue-500/22 shadow-[0_0_16px_rgba(59,130,246,0.18)]"
            />
          </span>
          , and{" "}
          <span className="relative inline-block">
            <span className="relative z-10">data-heavy platforms</span>
            <span
              aria-hidden
              className="absolute bottom-[0.08em] left-0 z-0 h-[40%] w-full rounded-[0.25em] bg-blue-500/22 shadow-[0_0_16px_rgba(59,130,246,0.18)]"
            />
          </span>
          .
        </motion.p>

        {/* Divider */}
        <motion.div variants={itemV} className="mt-8 h-px w-12 bg-white/15" />

        {/* Links */}
        <motion.div variants={itemV} className="mt-8 flex flex-col gap-3 text-white/70">
          <a
            href="mailto:vedant.nandoskar@gmail.com"
            className="group inline-flex w-fit items-center gap-3"
          >
            <HiOutlineMail className="text-[1.2rem] text-white/55 transition-colors duration-200 group-hover:text-blue-300" />
            <span className="accent-hover accent-horizontal text-xs tracking-[0.18em] uppercase">
              Email
            </span>
            <span className="text-xs text-white/60 italic transition-colors duration-200 group-hover:text-white/85">
              vedant.nandoskar@gmail.com
            </span>
          </a>

          <a
            href="https://linkedin.com/in/vedant-nandoskar-692824169/"
            target="_blank"
            rel="noreferrer"
            className="group inline-flex w-fit items-center gap-3"
          >
            <FaLinkedin className="text-[1.12rem] text-white/55 transition-colors duration-200 group-hover:text-[#0A66C2]" />
            <span className="accent-hover accent-horizontal text-xs tracking-[0.18em] uppercase">
              LinkedIn
            </span>
            <span className="text-xs text-white/60 italic transition-colors duration-200 group-hover:text-white/85">
              let’s connect
            </span>
          </a>

          <a
            href="https://github.com/Vedant1202"
            target="_blank"
            rel="noreferrer"
            className="group inline-flex w-fit items-center gap-3"
          >
            <FaGithub className="text-[1.12rem] text-white/55 transition-colors duration-200 group-hover:text-white" />
            <span className="accent-hover accent-horizontal text-xs tracking-[0.18em] uppercase italic">
              GitHub
            </span>
            <span className="text-xs text-white/60 italic transition-colors duration-200 group-hover:text-white/85">
              my projects
            </span>
          </a>
        </motion.div>

        {/* Footer microcopy */}
        <motion.div variants={itemV} className="mt-10 flex items-center gap-5">
          <span className="text-[11px] tracking-[0.22em] text-white/45 uppercase">
            based in chicago, open to relocation and remote opportunities
          </span>
          <span
            aria-hidden
            className="h-px flex-1 bg-gradient-to-r from-blue-500/100 to-transparent"
          />
        </motion.div>
      </motion.div>
    </Section>
  );
}
