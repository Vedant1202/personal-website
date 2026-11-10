// src/blog/BlogShell.tsx
import type { PropsWithChildren } from "react";
import { BLOGS_PATH, HOME_PATH } from "../data/posts";

const NAV_LINK_CLASS = "ink-link text-xs tracking-[0.18em] uppercase";

/** Page frame shared by the blog index and every post: brand, nav, then content */
export function BlogShell({
  isIndex = false,
  children,
}: PropsWithChildren<{ isIndex?: boolean }>) {
  return (
    <div className="bg-paper text-ink min-h-screen">
      <header className="page-shell flex items-center justify-between gap-4 pt-6 pb-5">
        <a
          href={HOME_PATH}
          className="bg-paper text-ink font-display ink-pill -rotate-[0.6deg] border-[1.5px] border-black/45 px-3.5 py-1.5 text-sm font-semibold tracking-tight shadow-[0_3px_10px_rgba(0,0,0,0.09)]"
        >
          Vedant Nandoskar
        </a>
        <nav aria-label="Site" className="text-ink-soft flex items-center gap-6">
          <a className={NAV_LINK_CLASS} href={HOME_PATH}>
            Home
          </a>
          <a
            className={NAV_LINK_CLASS}
            href={BLOGS_PATH}
            aria-current={isIndex ? "page" : undefined}
          >
            Blog
          </a>
        </nav>
      </header>
      <main className="page-shell pt-10 pb-24 sm:pt-14">{children}</main>
    </div>
  );
}
