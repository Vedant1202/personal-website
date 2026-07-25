// src/components/currently/currentlyData.tsx
import { BookOpen, Clapperboard, GraduationCap, Headphones } from "lucide-react";
import type { LucideIcon } from "lucide-react";

/**
 * Placeholder content, in Vedant's voice but his to replace — the point of the
 * audition is the *display*, not these titles. Kept plausible against the real
 * interests (systems, the VR/HCI thesis, football, guitar) so the variants read
 * honestly rather than as lorem ipsum.
 */
export type CurrentlyCategory = "Reading" | "Watching" | "Learning" | "Listening";

export type CurrentlyItem = {
  category: CurrentlyCategory;
  icon: LucideIcon;
  /** The thing itself — a book, show, skill, album. */
  title: string;
  /** Author, creator, season, context — the small print under the title. */
  meta: string;
  /**
   * Where the title links to explore. Optional: a title with no href renders as
   * plain marked text, so the block still reads before every URL is filled in.
   * The URLs below are placeholders for real, public pages — swap them with the
   * titles when the real list lands.
   */
  href?: string;
  /** One item per set can carry the accent, so the eye has a first stop. */
  accent?: boolean;
};

export const CURRENTLY: CurrentlyItem[] = [
  {
    category: "Reading",
    icon: BookOpen,
    title: "Dopamine Nation",
    meta: "Anna Lembke",
    href: "https://www.goodreads.com/book/show/55723020-dopamine-nation",
    accent: true,
  },
  {
    category: "Watching",
    icon: Clapperboard,
    title: "Vinland Saga",
    meta: "Netflix",
    href: "https://www.netflix.com/title/81249833",
  },
  {
    // No href on purpose — there's nothing to link to, so the note circles this
    // one instead of underlining it, which also flags it as the un-clickable item.
    category: "Learning",
    icon: GraduationCap,
    title: "agentic system architectures & vulnerabilities",
    meta: "self-study",
  },
  {
    category: "Listening",
    icon: Headphones,
    title: "The Jaws of Life",
    meta: "Pierce the Veil",
    href: "https://open.spotify.com/album/5Am1LFOFRwS94TaVzrFQwZ",
  },
];

/** Timestamp is content, not chrome — a /now note is only trustworthy if dated. */
export const CURRENTLY_UPDATED = "July 2026";
