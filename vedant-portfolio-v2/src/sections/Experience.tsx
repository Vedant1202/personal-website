// src/sections/Experience.tsx
import { Section } from "../components/Section";

export function Experience() {
  return (
    <Section id="experience" title="Experience">
      <div className="space-y-8">
        {/* UIC */}
        <div className="rounded-2xl border border-white/10 p-6">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
            <h3 className="text-base font-semibold">
              Software Research Engineer · University of Illinois
            </h3>
            <span className="text-sm text-white/60">Jul 2024 – Present</span>
          </div>

          <ul className="mt-4 space-y-3 text-sm text-white/70">
            <li>
              Built HIPAA-compliant pipelines processing 500K+ PHI records, enabling
              secure collaboration across Stanford, UWash, and UIC.
            </li>
            <li>
              Engineered automated reporting systems (Python, Django, MongoDB) with
              ingestion, monitoring, and validation workflows.
            </li>
            <li>
              Automated $10M+ research expense tracking, reducing manual effort by 70% and
              improving predictive budgeting.
            </li>
          </ul>
        </div>

        {/* CleverTap Senior */}
        <div className="rounded-2xl border border-white/10 p-6">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
            <h3 className="text-base font-semibold">
              Senior Software Engineer · CleverTap
            </h3>
            <span className="text-sm text-white/60">Jan 2023 – Jul 2023</span>
          </div>

          <ul className="mt-4 space-y-3 text-sm text-white/70">
            <li>
              Led Vue dashboard revamp; reduced campaign creation time 50% and improved
              enterprise adoption.
            </li>
            <li>
              Introduced clustering and load balancing; reduced load times 80% and
              improved API throughput.
            </li>
            <li>
              Owned production triage during beta rollout under tight release cycles.
            </li>
          </ul>
        </div>

        {/* CleverTap Engineer */}
        <div className="rounded-2xl border border-white/10 p-6">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
            <h3 className="text-base font-semibold">Software Engineer · CleverTap</h3>
            <span className="text-sm text-white/60">Jun 2021 – Dec 2022</span>
          </div>

          <ul className="mt-4 space-y-3 text-sm text-white/70">
            <li>
              Built reusable component library adopted across teams, reducing duplication
              and accelerating delivery.
            </li>
            <li>
              Integrated automated regression testing into CI/CD; reduced post-release
              defects by 70%.
            </li>
          </ul>
        </div>
      </div>
    </Section>
  );
}
