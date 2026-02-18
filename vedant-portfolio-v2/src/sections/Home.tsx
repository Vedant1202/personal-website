// src/sections/Home.tsx
import { Section } from "../components/Section";

export function Home() {
  return (
    <Section id="home">
      <div className="space-y-6">
        <p className="text-sm text-white/60">Chicago, IL</p>

        <h1 className="text-4xl leading-tight font-semibold tracking-tight sm:text-5xl">
          Building scalable systems for research, healthcare, and enterprise products.
        </h1>

        <p className="max-w-2xl text-base text-white/70">
          Software engineer focused on data-intensive dashboards, secure backend systems,
          and performance-driven frontend architecture.
        </p>

        <div className="flex gap-6 text-sm text-white/70">
          <a
            href="https://github.com/Vedant1202"
            target="_blank"
            className="transition hover:text-white"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/vedant-nandoskar-692824169/"
            target="_blank"
            className="transition hover:text-white"
          >
            LinkedIn
          </a>
          <a
            href="mailto:vedant.nandoskar@gmail.com"
            className="transition hover:text-white"
          >
            Email
          </a>
        </div>
      </div>
    </Section>
  );
}
