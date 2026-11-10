// src/data/posts.ts
// Blog post metadata. The post bodies live in src/content/blog/.

export type Post = {
  /** URL segment: the post is served at /personal-website/blogs/{slug}/ */
  slug: string;
  title: string;
  /** Publish date, YYYY-MM-DD */
  date: string;
  summary: string;
  readingMinutes: number;
  /** The same post on dev.to; null until it is published there */
  devtoUrl: string | null;
};

export const POSTS: Post[] = [
  {
    slug: "claude-code-terminal-setup",
    title: "Claude in the terminal: a non-opinionated setup",
    date: "2026-11-09",
    summary:
      "The tools I use to make Claude Code in the terminal look and feel better: prismantis, Ghostty, ccstatusline, anotifier and caveman.",
    readingMinutes: 5,
    devtoUrl: null,
  },
];

export const HOME_PATH = import.meta.env.BASE_URL;
export const BLOGS_PATH = `${import.meta.env.BASE_URL}blogs/`;

export function postPath(slug: string) {
  return `${BLOGS_PATH}${slug}/`;
}

export function getPost(slug: string): Post {
  const post = POSTS.find((p) => p.slug === slug);
  if (!post) throw new Error(`Unknown post: ${slug}`);
  return post;
}

/** Dates are stored as plain days, so format them in UTC to avoid a timezone shift */
export function formatPostDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(date));
}
