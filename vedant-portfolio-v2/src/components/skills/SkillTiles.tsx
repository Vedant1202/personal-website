import { SKILLS, SKILL_GROUPS } from "./skills.data";
import type { Skill } from "./icons";

const byKey = new Map<string, Skill>(SKILLS.map((s) => [s.key, s]));

function SkillChip({ s }: { s: Skill }) {
  return (
    <li
      title={s.tagline}
      className={[
        "ink-edge-sm ink-jitter inline-flex items-center gap-2 border border-black/22 px-3 py-1.5",
        "text-ink-soft hover:border-accent/45 hover:text-ink text-xs transition duration-200",
        // Brand logos are the one place rainbow color leaks into a strictly
        // white/ink/one-blue system, so the icons read as ink at rest (fully
        // desaturated) and only bloom to full color on hover — the same reward-
        // on-interest move the project covers make with .ink-duotone.
        "[&_svg]:h-[15px] [&_svg]:w-[15px] [&_svg]:opacity-70 [&_svg]:grayscale [&_svg]:transition [&_svg]:duration-200 hover:[&_svg]:opacity-100 hover:[&_svg]:grayscale-0",
      ].join(" ")}
    >
      <span aria-hidden className="inline-flex shrink-0 items-center">
        {s.icon}
      </span>
      {s.label}
    </li>
  );
}

export function SkillTiles() {
  return (
    <div className="space-y-5">
      {SKILL_GROUPS.map((g) => (
        <div key={g.label} className="flex flex-col gap-3 sm:flex-row sm:gap-6">
          <p className="text-ink-soft w-44 shrink-0 pt-1.5 text-[11px] tracking-[0.25em] uppercase">
            {g.label}
          </p>
          <ul className="flex flex-wrap gap-2">
            {g.keys.map((k) => {
              const s = byKey.get(k);
              return s ? <SkillChip key={k} s={s} /> : null;
            })}
          </ul>
        </div>
      ))}
    </div>
  );
}
