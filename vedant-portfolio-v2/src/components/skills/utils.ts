import type { Skill } from "./icons";

export function splitIntoRows(skills: Skill[], rows = 3) {
  const out: Skill[][] = Array.from({ length: rows }, () => []);
  skills.forEach((s, idx) => out[idx % rows].push(s));
  return out;
}
