import React from "react";
import "../../styles/SkillTiles.css";
import { SKILLS } from "./skills.data";
import { splitIntoRows } from "./utils";
import { RowMarquee } from "./RowMarquee";

export function SkillTiles() {
  const [row1, row2, row3] = React.useMemo(() => splitIntoRows(SKILLS, 3), []);

  return (
    <div className="skills-marquee relative w-full">
      <div className="skills-rows">
        <RowMarquee rowSkills={row1} rowIndex={0} speedSeconds={26} />
        <RowMarquee rowSkills={row2} rowIndex={1} speedSeconds={30} />
        <RowMarquee rowSkills={row3} rowIndex={2} speedSeconds={28} />
      </div>
    </div>
  );
}
