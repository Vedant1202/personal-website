// src/sections/Education.tsx
import { Section } from "../components/Section";

export function Education() {
  return (
    <Section id="education" title="Education">
      <div className="space-y-6">
        <div className="rounded-2xl border border-white/10 p-6">
          <div className="flex justify-between text-sm text-white/60">
            <span>University of Illinois Chicago</span>
            <span>Aug 2023 – Dec 2025</span>
          </div>
          <p className="mt-2 text-base font-medium">
            Master of Science in Computer Science
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 p-6">
          <div className="flex justify-between text-sm text-white/60">
            <span>University of Mumbai</span>
            <span>Aug 2017 – Jul 2021</span>
          </div>
          <p className="mt-2 text-base font-medium">
            Bachelor of Engineering in Information Technology
          </p>
        </div>
      </div>
    </Section>
  );
}
