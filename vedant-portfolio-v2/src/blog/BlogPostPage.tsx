// src/blog/BlogPostPage.tsx
import Markdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import { FiArrowUpRight } from "react-icons/fi";
import { BLOGS_PATH, formatPostDate, type Post } from "../data/posts";
import { BlogShell } from "./BlogShell";

type PostImage = { src: string; width: number; height: number };

export type PostContent = {
  /** The post in Markdown, without its title */
  body: string;
  /** Imported image assets, keyed by the src used in the Markdown */
  images: Record<string, PostImage>;
};

export function BlogPostPage({ post, content }: { post: Post; content: PostContent }) {
  const components: Components = {
    img({ src, alt }) {
      const image = typeof src === "string" ? content.images[src] : undefined;
      if (!image) return null;
      return (
        <img
          src={image.src}
          alt={alt ?? ""}
          width={image.width}
          height={image.height}
          loading="lazy"
          decoding="async"
        />
      );
    },
    a({ href, children }) {
      const external = href?.startsWith("http");
      return (
        <a href={href} {...(external ? { target: "_blank", rel: "noreferrer" } : {})}>
          {children}
        </a>
      );
    },
  };

  return (
    <BlogShell>
      <article className="mx-auto max-w-[42rem]">
        <header>
          <p className="text-ink-soft text-xs tracking-[0.18em] uppercase">
            <time dateTime={post.date}>{formatPostDate(post.date)}</time>
            {" · "}
            {post.readingMinutes} min read
          </p>
          <h1 className="font-display mt-4 text-4xl leading-[1.08] font-semibold tracking-tight sm:text-5xl">
            {post.title}
          </h1>
          {post.devtoUrl && (
            <a
              className="ink-link text-accent mt-5 inline-flex items-center gap-1.5 text-xs tracking-[0.18em] uppercase"
              href={post.devtoUrl}
              target="_blank"
              rel="noreferrer"
            >
              Also on dev.to
              <FiArrowUpRight aria-hidden className="text-sm" />
            </a>
          )}
        </header>

        <div aria-hidden className="ink-rule my-10" />

        <div className="blog-prose">
          <Markdown remarkPlugins={[remarkGfm]} components={components}>
            {content.body}
          </Markdown>
        </div>

        <div aria-hidden className="ink-rule mt-16" />
        <a
          className="ink-link mt-8 inline-block text-xs tracking-[0.18em] uppercase"
          href={BLOGS_PATH}
        >
          ← All posts
        </a>
      </article>
    </BlogShell>
  );
}
