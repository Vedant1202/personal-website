import React from "react";
import { SkillTile } from "./SkillTile";
import type { Skill } from "./icons";

export function RowMarquee({
  rowSkills,
  rowIndex,
  speedSeconds,
}: {
  rowSkills: Skill[];
  rowIndex: number;
  speedSeconds: number;
}) {
  const rowRef = React.useRef<HTMLDivElement | null>(null);
  const groupRef = React.useRef<HTMLDivElement | null>(null);

  React.useLayoutEffect(() => {
    const rowEl = rowRef.current;
    const groupEl = groupRef.current;
    if (!rowEl || !groupEl) return;

    const set = () => {
      const w = groupEl.getBoundingClientRect().width;
      rowEl.style.setProperty("--groupW", `${w}px`);
    };

    set();
    const ro = new ResizeObserver(set);
    ro.observe(groupEl);
    return () => ro.disconnect();
  }, []);

  const offset =
    rowIndex === 0
      ? "0px"
      : rowIndex === 1
        ? "calc(var(--tileW) / -3)"
        : "calc(var(--tileW) * -2 / 3)";

  const setPaused = (paused: boolean) => {
    const rowEl = rowRef.current;
    if (!rowEl) return;
    rowEl.toggleAttribute("data-paused", paused);
  };

  return (
    <div
      ref={rowRef}
      className="skills-row"
      style={
        {
          ["--rowOffset" as any]: offset,
          ["--dur" as any]: `${speedSeconds}s`,
        } as React.CSSProperties
      }
      onPointerOver={(e) => {
        const isTile = (e.target as HTMLElement)?.closest?.(".skill-tile");
        if (isTile) setPaused(true);
      }}
      onPointerOut={(e) => {
        const rowEl = rowRef.current;
        if (!rowEl) return;

        const to = e.relatedTarget as HTMLElement | null;
        const stillInsideThisRow = to ? rowEl.contains(to) : false;
        const stillOnATile = to?.closest?.(".skill-tile");

        if (!stillInsideThisRow || !stillOnATile) setPaused(false);
      }}
      onFocusCapture={(e) => {
        const isTile = (e.target as HTMLElement)?.closest?.(".skill-tile");
        if (isTile) setPaused(true);
      }}
      onBlurCapture={(e) => {
        const rowEl = rowRef.current;
        if (!rowEl) return;

        const to = e.relatedTarget as HTMLElement | null;
        const stillInsideThisRow = to ? rowEl.contains(to) : false;
        const stillOnATile = to?.closest?.(".skill-tile");

        if (!stillInsideThisRow || !stillOnATile) setPaused(false);
      }}
    >
      <div className="skills-row-clip">
        <div className="skills-track">
          <div className="skills-group" ref={groupRef}>
            {rowSkills.map((s, i) => (
              <SkillTile key={`a-${rowIndex}-${s.key}`} s={s} index={i} />
            ))}
          </div>

          <div className="skills-group" aria-hidden>
            {rowSkills.map((s, i) => (
              <SkillTile key={`b-${rowIndex}-${s.key}`} s={s} index={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
