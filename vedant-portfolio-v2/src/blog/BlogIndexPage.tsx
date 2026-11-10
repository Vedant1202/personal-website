// src/blog/BlogIndexPage.tsx
import { FiArrowUpRight } from "react-icons/fi";
import { POSTS, formatPostDate, postPath } from "../data/posts";
import { BlogShell } from "./BlogShell";

export function BlogIndexPage() {
  return (
    <BlogShell isIndex>
      <div className="mx-auto max-w-[42rem]">
        <h1 className="font-display text-h2 font-semibold tracking-tight">Blog</h1>
        <p className="text-ink-soft mt-4 text-base sm:text-lg">
          Write-ups on the tools and setups I use.
        </p>

        <ul className="mt-12">
          {POSTS.map((post) => (
            <li key={post.slug}>
              <div aria-hidden className="ink-rule" />
              <article className="py-8">
                <p className="text-ink-soft text-xs tracking-[0.18em] uppercase">
                  <time dateTime={post.date}>{formatPostDate(post.date)}</time>
                  {" · "}
                  {post.readingMinutes} min read
                </p>
                <h2 className="font-display text-title mt-3 font-semibold tracking-tight">
                  <a
                    href={postPath(post.slug)}
                    className="hover:text-accent transition-colors"
                  >
                    {post.title}
                  </a>
                </h2>
                <p className="text-ink-soft mt-3">{post.summary}</p>
                {post.devtoUrl && (
                  <a
                    className="ink-link text-accent mt-5 inline-flex items-center gap-1.5 text-xs tracking-[0.18em] uppercase"
                    href={post.devtoUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Read on dev.to
                    <FiArrowUpRight aria-hidden className="text-sm" />
                  </a>
                )}
              </article>
            </li>
          ))}
        </ul>
      </div>
    </BlogShell>
  );
}
