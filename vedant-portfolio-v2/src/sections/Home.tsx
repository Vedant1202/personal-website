// src/sections/Home.tsx
import { useInView } from "framer-motion";
import vedantImg from "../assets/vedant.png";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { FiFileText } from "react-icons/fi";
import { useEffect, useRef } from "react";
import { HeroIntro } from "../components/hero/HeroIntro";

/** Opens in a new tab — Google Drive shared resume. */
const RESUME_URL =
  "https://drive.google.com/file/d/1cSkQRiuQr2xDtOhG4atzoeOZG1ZCAuiA/view?usp=sharing";

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
    <section id="home" className="hero-bg relative w-full">
      {/* subtle vignette */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/25" />

      {/* content */}
      <div className="relative mx-auto grid min-h-[calc(100svh-84px)] w-full max-w-6xl grid-cols-12 items-start gap-y-10 px-5 pt-10 pb-2 sm:px-6 sm:pb-4 md:gap-x-10 md:pr-20">
        {/* RIGHT TEXT ZONE (mobile first) */}
        <div className="col-span-12 flex items-start md:order-2 md:col-span-7 md:mt-0">
          <div className="w-full md:pl-6">
            <HeroIntro
              firstName="Vedant"
              lastName="Nandoskar"
              roleLines={["Software Engineer", "UI/UX Design", "Virtual Reality"]}
            />

            <div className="mt-8 flex flex-wrap items-center gap-2 sm:gap-3">
              {/* <div className="h-px w-10 bg-white/20" /> */}
              <span className="text-[11px] tracking-[0.22em] text-white/55 uppercase italic">
                Open to software engineering roles, let’s talk!
              </span>
              <span
                aria-hidden
                className="h-px basis-full bg-gradient-to-r from-blue-500/60 to-transparent sm:flex-1 sm:basis-auto"
              />
            </div>

            {/* links */}
            <div
              ref={linksRef}
              className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3 text-white/65 sm:mt-10 sm:gap-x-12"
            >
              {/* GitHub */}
              <a
                className="accent-hover accent-horizontal group flex items-center gap-2 whitespace-nowrap transition-all duration-200"
                href="https://github.com/Vedant1202"
                target="_blank"
                rel="noreferrer"
              >
                <FaGithub className="text-[1.05rem] text-white/65 transition-all duration-200 group-hover:scale-110 group-hover:text-[#ffffff]" />
                <span className="text-xs tracking-[0.18em] uppercase transition-colors duration-200 group-hover:text-white">
                  GitHub
                </span>
              </a>

              {/* LinkedIn */}
              <a
                className="accent-hover accent-horizontal group flex items-center gap-2 whitespace-nowrap transition-all duration-200"
                href="https://linkedin.com/in/vedant-nandoskar-692824169/"
                target="_blank"
                rel="noreferrer"
              >
                <FaLinkedin className="text-[1.05rem] text-white/65 transition-all duration-200 group-hover:scale-110 group-hover:text-[#0A66C2]" />
                <span className="text-xs tracking-[0.18em] uppercase transition-colors duration-200 group-hover:text-white">
                  LinkedIn
                </span>
              </a>

              {/* Email */}
              <a
                className="accent-hover accent-horizontal group flex items-center gap-2 whitespace-nowrap transition-all duration-200"
                href="mailto:vedant.nandoskar@gmail.com"
              >
                <HiOutlineMail className="text-[1.1rem] text-white/65 transition-all duration-200 group-hover:scale-110 group-hover:text-[#3B82F6]" />
                <span className="text-xs tracking-[0.18em] uppercase transition-colors duration-200 group-hover:text-white">
                  Email
                </span>
              </a>

              {/* Resume */}
              <a
                className="accent-hover accent-horizontal group flex items-center gap-2 rounded-md bg-blue-500/5 px-2 py-0.5 whitespace-nowrap ring-1 ring-blue-500/30 transition-all duration-200"
                href={RESUME_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FiFileText className="text-[1.05rem] text-blue-300/85 transition-all duration-200 group-hover:scale-110 group-hover:text-blue-200" />
                <span className="text-xs tracking-[0.18em] text-blue-200/90 uppercase transition-colors duration-200 group-hover:text-white">
                  Resume
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* LEFT VISUAL ZONE (image + offset border) */}
        <div className="col-span-12 flex md:order-1 md:col-span-5 md:items-start">
          <div className="relative w-full max-w-[520px] md:mt-0">
            {/* offset border behind image (down + left) */}
            <div
              aria-hidden
              className="absolute top-3 -left-3 h-full w-full rounded-2xl border-2 border-blue-500/10 shadow-[0_0_30px_rgba(59,130,246,0.18)] sm:top-5 sm:-left-5 sm:border-[3px]"
            />
            <div
              aria-hidden
              className="absolute top-2 -left-2 h-full w-full rounded-2xl border-2 border-blue-500/40 shadow-[0_0_30px_rgba(59,130,246,0.18)] sm:top-3 sm:-left-3 sm:border-[3px]"
            />
            <div
              aria-hidden
              className="absolute top-1 -left-1 h-full w-full rounded-2xl border-2 border-blue-500/70 shadow-[0_0_30px_rgba(59,130,246,0.18)] sm:top-1 sm:-left-1 sm:border-[3px]"
            />

            {/* image */}
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5">
              <img
                src={vedantImg}
                alt="Vedant Nandoskar"
                draggable={false}
                className="aspect-[4/5] max-h-[58svh] w-full object-cover sm:max-h-[62svh] md:max-h-[72svh]"
              />
              <div aria-hidden className="absolute inset-0 bg-black/20" />
            </div>
          </div>
        </div>
      </div>
      <div className="mb-2 h-px w-full bg-white/10" />
    </section>
  );
}
