import { SKILLS, SKILL_GROUPS } from "./skills.data";
import type { Skill } from "./icons";

const byKey = new Map<string, Skill>(SKILLS.map((s) => [s.key, s]));

function SkillChip({ s }: { s: Skill }) {
  return (
    <li
      title={s.tagline}
      className={[
        "inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-1.5",
        "text-xs text-white/70 transition duration-200 hover:border-blue-500/30 hover:bg-white/[0.05] hover:text-white",
        // shrink + mute the brand icons; full color on hover
        "[&_svg]:h-[15px] [&_svg]:w-[15px] [&_svg]:opacity-80 [&_svg]:grayscale-[0.55] [&_svg]:transition [&_svg]:duration-200 hover:[&_svg]:opacity-100 hover:[&_svg]:grayscale-0",
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
          <p className="w-44 shrink-0 pt-1.5 text-[11px] tracking-[0.25em] text-white/45 uppercase">
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
