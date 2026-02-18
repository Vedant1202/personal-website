// src/sections/Contact.tsx
import { Section } from "../components/Section";

export function Contact() {
  return (
    <Section id="contact" title="Contact">
      <div className="space-y-6 text-sm text-white/70">
        <p>
          I’m open to software engineering roles focused on scalable systems, frontend
          architecture, and data-driven platforms.
        </p>

        <div className="flex flex-col gap-2">
          <a
            href="mailto:vedant.nandoskar@gmail.com"
            className="transition hover:text-white"
          >
            vedant.nandoskar@gmail.com
          </a>

          <a
            href="https://linkedin.com/in/vedant-nandoskar-692824169/"
            target="_blank"
            className="transition hover:text-white"
          >
            LinkedIn
          </a>

          <a
            href="https://github.com/Vedant1202"
            target="_blank"
            className="transition hover:text-white"
          >
            GitHub
          </a>
        </div>
      </div>
    </Section>
  );
}
