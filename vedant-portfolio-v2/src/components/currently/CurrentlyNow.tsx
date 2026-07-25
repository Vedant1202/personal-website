// src/components/currently/CurrentlyNow.tsx
import { InkMark } from "../ink/InkMark";
import { CURRENTLY, CURRENTLY_UPDATED, type CurrentlyItem } from "./currentlyData";

const KICKER = "text-ink-soft text-xs tracking-[0.35em] uppercase";

/**
 * A title inside the note. The mark itself carries the meaning: an item with an
 * href is underlined and becomes a link; an item without one is circled instead,
 * so the un-clickable thing looks deliberately different rather than like a link
 * that failed. Titles can arrive with or without URLs and the sentence still reads.
 */
function CurrentlyMark({ item, delay }: { item: CurrentlyItem; delay: number }) {
  // No link, no underline — the activity is set in the hand font instead, which
  // reads as a personal aside and sets it apart from the linked titles. Sized up
  // a touch (em-relative) because the script face has a smaller x-height.
  if (!item.href) {
    return (
      <span className="font-hand text-ink text-[1.2em] leading-none">{item.title}</span>
    );
  }
  return (
    <a
      href={item.href}
      target="_blank"
      rel="noreferrer noopener"
      className="text-ink hover:text-accent transition-colors"
    >
      <InkMark delay={delay}>{item.title}</InkMark>
    </a>
  );
}

/**
 * The "Right now" note — the /now pattern (Derek Sivers, 2015): a short, dated,
 * first-person line about what Vedant is reading, learning, watching, hearing.
 * Titles link out to explore. Lives in the hero, so it is sized under the blurb
 * above it and runs the full content width rather than a narrow column.
 */
export function CurrentlyNow() {
  const [reading, watching, learning, listening] = CURRENTLY;
  return (
    <div className="w-full">
      <div className="flex items-baseline gap-3">
        <p className={KICKER}>Right now</p>
        <span className="font-hand text-ink-soft text-base leading-none">
          updated {CURRENTLY_UPDATED}
        </span>
      </div>

      <p className="text-ink mt-4 text-base leading-relaxed sm:text-lg">
        I’m reading <CurrentlyMark item={reading} delay={0.2} />, digging into{" "}
        <CurrentlyMark item={learning} delay={0.5} />, keeping up with{" "}
        <CurrentlyMark item={watching} delay={0.75} />, and{" "}
        <CurrentlyMark item={listening} delay={0.95} /> is back on repeat.
      </p>
    </div>
  );
}
