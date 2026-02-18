// src/sections/Projects.tsx
import { Section } from "../components/Section";

export function Projects() {
  return (
    <Section id="projects" title="Selected Work">
      <div className="space-y-8">
        {/* GestureTips */}
        <div className="rounded-2xl border border-white/10 p-6">
          <h3 className="text-base font-semibold">
            GestureTips — Context-Aware VR Help System
          </h3>
          <p className="mt-2 text-sm text-white/60">Master’s Thesis · Unity · HoloLens</p>

          <ul className="mt-4 space-y-3 text-sm text-white/70">
            <li>
              Designed and built a context-aware gesture assistance system for immersive
              computing.
            </li>
            <li>
              Reduced gesture learning effort by 30% in a 24-participant user study.
            </li>
            <li>Published UX design guidelines for gesture-based interaction systems.</li>
          </ul>
        </div>

        {/* Grant Management */}
        <div className="rounded-2xl border border-white/10 p-6">
          <h3 className="text-base font-semibold">Grant Management System</h3>
          <p className="mt-2 text-sm text-white/60">
            Node.js · MongoDB · Workflow Automation
          </p>

          <ul className="mt-4 space-y-3 text-sm text-white/70">
            <li>
              Architected modular backend supporting 9 research divisions with role-based
              access.
            </li>
            <li>
              Automated forms, reminders, and reporting dashboards across 100+ grant
              submissions.
            </li>
            <li>
              Designed API-driven integrations for administrative transparency and
              tracking.
            </li>
          </ul>
        </div>
      </div>
    </Section>
  );
}
