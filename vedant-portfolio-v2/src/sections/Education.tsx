// src/sections/Education.tsx
import { Section } from "../components/Section";

export function Education() {
  return (
    <Section id="education">
      <div className="relative mx-auto max-w-4xl">
        {/* Section label */}
        <div className="mb-16">
          <p className="text-xs tracking-[0.35em] text-white/50 uppercase">Education</p>
          <div className="mt-4 h-px w-12 bg-blue-500/60 shadow-[0_0_12px_rgba(59,130,246,0.4)]" />
        </div>

        <div className="space-y-14">
          {/* UIC */}
          <div className="group relative pl-8">
            {/* subtle vertical timeline line */}
            <div className="absolute top-2 left-0 h-full w-px bg-white/10" />
            <div className="absolute top-2 left-[-2px] h-3 w-3 rounded-full bg-blue-500 shadow-[0_0_12px_rgba(59,130,246,0.5)]" />

            <div className="transition duration-300 group-hover:translate-x-1">
              <div className="flex flex-col gap-2 text-sm text-white/60 sm:flex-row sm:justify-between">
                <span>University of Illinois Chicago</span>
                <span>Aug 2023 – Dec 2025</span>
              </div>

              <p className="mt-3 text-lg font-semibold text-white">
                Master of Science in Computer Science
              </p>

              <p className="mt-3 max-w-xl text-sm text-white/65">
                Focused on scalable systems, data-intensive applications, and healthcare
                research software.
              </p>
            </div>
          </div>

          {/* Mumbai */}
          <div className="group relative pl-8">
            <div className="absolute top-2 left-0 h-full w-px bg-white/10" />
            <div className="absolute top-2 left-[-2px] h-3 w-3 rounded-full bg-blue-500 shadow-[0_0_12px_rgba(59,130,246,0.5)]" />

            <div className="transition duration-300 group-hover:translate-x-1">
              <div className="flex flex-col gap-2 text-sm text-white/60 sm:flex-row sm:justify-between">
                <span>University of Mumbai</span>
                <span>Aug 2017 – Jul 2021</span>
              </div>

              <p className="mt-3 text-lg font-semibold text-white">
                Bachelor of Engineering in Information Technology
              </p>

              <p className="mt-3 max-w-xl text-sm text-white/65">
                Built strong foundations in computer systems, networking, and software
                engineering principles.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
