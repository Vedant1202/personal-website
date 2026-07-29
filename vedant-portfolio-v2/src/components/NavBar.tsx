// src/components/NavBar.tsx
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { HiOutlineMail, HiMenu, HiX } from "react-icons/hi";

// Must stay in scroll order — the rail indicator maps position to the active
// section, so a mismatch here would make it jump backwards as you scroll.
const navItems = [
  { label: "Home", id: "home" },
  { label: "Projects", id: "projects" },
  { label: "Journey", id: "journey" },
  { label: "Skills", id: "skills" },
  { label: "Contact", id: "contact" },
];

type IndicatorPos = { y: number; h: number };

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

export function NavBar({ showSocialDock }: { showSocialDock: boolean }) {
  const [activeId, setActiveId] = useState("home");
  const [indicator, setIndicator] = useState<IndicatorPos | null>(null);
  const [brandInteractive, setBrandInteractive] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navRef = useRef<HTMLElement | null>(null);
  const itemRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const ids = useMemo(() => navItems.map((n) => n.id), []);

  // ---- Brand: invisible on hero, appears after you scroll down a bit ----
  const { scrollY } = useScroll();

  const t = useTransform(scrollY, [120, 320], [0, 1]);

  const brandOpacity = useTransform(t, [0, 0.15, 1], [0, 0, 1]);
  const brandY = useTransform(t, [0, 1], [-8, 0]);
  const brandBlur = useTransform(t, [0, 1], ["blur(8px)", "blur(0px)"]);
  const brandScale = useTransform(t, [0, 1], [0.985, 1]);

  const wipeScaleX = useTransform(t, [0, 0.7, 1], [0, 1, 1]);
  const wipeOpacity = useTransform(t, [0, 0.35, 1], [0, 1, 0.75]);

  const padX = useTransform(t, [0, 1], [14, 12]);
  const padY = useTransform(t, [0, 1], [9, 8]);

  useMotionValueEvent(t, "change", (v) => {
    setBrandInteractive(v > 0.2);
  });

  // Close the mobile menu once the layout crosses into the rail's range. The
  // rail lives in the viewport's side margin, which only exists past the
  // content cap (72rem) — so it turns on at xl (1280px), not md, and the
  // hamburger carries the whole tablet band beneath it.
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1280) setMobileMenuOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  // ---- Active section tracking ----
  useEffect(() => {
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (!sections.length) return;

    let raf = 0;

    const computeMostVisible = () => {
      const vh = window.innerHeight;

      let bestId = activeId;
      let bestVisible = -1;

      for (const el of sections) {
        const r = el.getBoundingClientRect();
        const visible = Math.max(0, Math.min(r.bottom, vh) - Math.max(r.top, 0));

        if (visible > bestVisible) {
          bestVisible = visible;
          bestId = el.id;
        } else if (visible === bestVisible) {
          const currentBest = document.getElementById(bestId);
          if (currentBest) {
            const rb = currentBest.getBoundingClientRect();
            if (Math.abs(r.top) < Math.abs(rb.top)) bestId = el.id;
          }
        }
      }

      if (bestId) setActiveId(bestId);
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = window.requestAnimationFrame(computeMostVisible);
    };

    computeMostVisible();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ids]);

  // ---- Desktop nav indicator ----
  useLayoutEffect(() => {
    const navEl = navRef.current;
    const btn = itemRefs.current[activeId];
    if (!navEl || !btn) return;

    const navRect = navEl.getBoundingClientRect();
    const btnRect = btn.getBoundingClientRect();

    const h = btnRect.height * 0.3;
    const y = btnRect.top - navRect.top + btnRect.height * 0.62;

    setIndicator({
      y: clamp(y, 0, navRect.height),
      h: Math.max(10, h),
    });
  }, [activeId]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.replaceState(null, "", `#${id}`);
  };

  return (
    <>
      {/* ─── Top bar ─────────────────────────────────────────────────── */}
      <header className="fixed top-0 left-0 z-50 w-full">
        <div className="page-shell flex items-center justify-between py-4 sm:py-6">
          {/* Mobile-only: always-visible brand text */}
          <button
            onClick={() => scrollTo("home")}
            aria-label="Vedant Nandoskar — scroll to top"
            className="bg-paper text-ink font-display ink-pill -rotate-[0.6deg] border-[1.5px] border-black/45 px-3.5 py-1.5 text-sm font-semibold tracking-tight shadow-[0_3px_10px_rgba(0,0,0,0.09)] xl:hidden"
          >
            Vedant Nandoskar
          </button>

          {/* Desktop: scroll-animated brand pill */}
          <motion.button
            onClick={() => scrollTo("home")}
            aria-label="Vedant Nandoskar — scroll to top"
            className={[
              "relative hidden xl:inline-flex",
              "ink-pill",
              "text-sm font-semibold tracking-tight",
              "text-ink hover:text-ink font-display",
              "border-[1.5px] border-black/45",
              // A paper label, not glass: opaque stock with a light drop, so it
              // reads as something set down on the page rather than floating over it.
              "bg-paper",
              "shadow-[0_3px_10px_rgba(0,0,0,0.09)]",
              "overflow-hidden",
              "select-none",
              "go-home-nav-button",
            ].join(" ")}
            style={{
              opacity: brandOpacity,
              y: brandY,
              filter: brandBlur,
              scale: brandScale,
              // Set here, not as a class — Motion writes an inline transform for
              // scale/y, which would overwrite a Tailwind rotate utility.
              rotate: -0.6,
              paddingLeft: padX,
              paddingRight: padX,
              paddingTop: padY,
              paddingBottom: padY,
              pointerEvents: brandInteractive ? "auto" : "none",
            }}
            // Invisible on the hero, so it must leave the tab order and the
            // accessibility tree too — pointer-events alone only hides it from
            // the mouse, leaving keyboard and screen-reader users a first stop
            // they cannot see or use.
            tabIndex={brandInteractive ? undefined : -1}
            aria-hidden={brandInteractive ? undefined : true}
          >
            {/* Scroll-driven sweep, now a highlighter pass in the accent token */}
            <motion.span
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                opacity: wipeOpacity,
                scaleX: wipeScaleX,
                transformOrigin: "left",
                background:
                  "linear-gradient(115deg, transparent 0%, color-mix(in srgb, var(--brand-accent) 15%, transparent) 42%, color-mix(in srgb, var(--brand-accent) 6%, transparent) 62%, transparent 80%)",
              }}
            />
            <span className="relative flex items-center whitespace-nowrap">
              Vedant Nandoskar
            </span>
          </motion.button>

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open menu"
            className="bg-paper text-ink-soft hover:text-ink ink-edge-sm inline-flex items-center justify-center border-[1.5px] border-black/45 p-2 shadow-[0_3px_10px_rgba(0,0,0,0.09)] transition xl:hidden"
          >
            <HiMenu className="h-5 w-5" />
          </button>
        </div>
      </header>

      {/* ─── Desktop vertical nav rail ───────────────────────────────── */}
      <nav
        ref={navRef}
        className="fixed top-1/2 right-6 z-50 hidden -translate-y-1/2 flex-col items-center gap-10 xl:flex"
      >
        {/* Rails sit 8px out rather than 14px: the labels below gained 6px of
            padding on each side for a legal-size hit area, so this keeps the
            visible gap between rail and text where it was. */}
        <div aria-hidden className="ink-rail absolute top-0 right-[-8px] h-full" />

        {indicator ? (
          <motion.div
            aria-hidden
            className="ink-rail ink-rail--accent absolute left-[-8px]"
            animate={{ top: indicator.y, height: indicator.h, opacity: 1 }}
            initial={{ opacity: 0, top: indicator.y, height: indicator.h }}
            transition={{
              type: "spring",
              stiffness: 420,
              damping: 42,
              mass: 0.9,
            }}
          />
        ) : null}

        {navItems.map((item) => {
          const isActive = item.id === activeId;

          return (
            <button
              key={item.id}
              ref={(el) => {
                itemRefs.current[item.id] = el;
              }}
              onClick={() => scrollTo(item.id)}
              className={[
                "relative",
                "text-[11px] tracking-[0.25em] uppercase",
                "[writing-mode:vertical-rl]",
                // Vertical 11px type is only ~17px wide, under the 24px minimum
                // target (WCAG 2.5.8). py- and not px-: Tailwind's padding
                // utilities are logical, and under vertical-rl the block axis is
                // the horizontal one, so py- is what widens this on screen.
                "py-1.5",
                "transition",
                "hover:cursor-pointer",
                isActive ? "text-ink font-semibold" : "text-ink-soft hover:text-ink",
              ].join(" ")}
            >
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* ─── Desktop social dock ─────────────────────────────────────── */}
      <AnimatePresence>
        {showSocialDock ? (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed right-6 bottom-8 z-50 hidden flex-col items-end gap-4 xl:flex"
          >
            <motion.a
              layoutId="social-github"
              href="https://github.com/Vedant1202"
              target="_blank"
              rel="noreferrer"
              className="group flex items-center justify-center transition-transform duration-200 hover:scale-110"
              aria-label="GitHub"
            >
              <FaGithub className="text-ink-soft group-hover:text-ink text-2xl transition-colors duration-200" />
            </motion.a>

            <motion.a
              layoutId="social-linkedin"
              href="https://linkedin.com/in/vedant-nandoskar-692824169/"
              target="_blank"
              rel="noreferrer"
              className="group flex items-center justify-center transition-transform duration-200 hover:scale-110"
              aria-label="LinkedIn"
            >
              <FaLinkedin className="text-ink-soft text-2xl transition-colors duration-200 group-hover:text-[#0A66C2]" />
            </motion.a>

            <motion.a
              layoutId="social-email"
              href="mailto:vedant.nandoskar@gmail.com"
              className="group flex items-center justify-center transition-transform duration-200 hover:scale-110"
              aria-label="Email"
            >
              <HiOutlineMail className="text-ink-soft group-hover:text-accent text-2xl transition-colors duration-200" />
            </motion.a>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {/* ─── Mobile slide-in menu ────────────────────────────────────── */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-0 z-[60] xl:hidden"
            onClick={() => setMobileMenuOpen(false)}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/35 backdrop-blur-sm" />

            {/* Drawer panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 340, damping: 36 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-paper absolute top-0 right-0 flex h-full w-72 max-w-[80vw] flex-col border-l border-black/12 px-8 pt-6 pb-10"
            >
              {/* Close button */}
              <div className="flex items-center justify-between">
                <span className="text-ink font-display text-sm font-semibold tracking-tight">
                  Menu
                </span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="Close menu"
                  className="text-ink-soft hover:text-ink ink-edge-sm border border-black/25 p-2 transition-colors"
                >
                  <HiX className="h-4 w-4" />
                </button>
              </div>

              {/* Divider */}
              <div className="ink-rule mt-5 w-full" />

              {/* Nav links */}
              <nav className="mt-8 flex flex-col gap-1">
                {navItems.map((item) => {
                  const isActive = item.id === activeId;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        scrollTo(item.id);
                        setMobileMenuOpen(false);
                      }}
                      className={[
                        "w-full rounded-xl px-4 py-3 text-left text-base font-medium transition-colors",
                        isActive
                          ? "bg-accent/10 text-ink"
                          : "text-ink-soft hover:text-ink hover:bg-black/5",
                      ].join(" ")}
                    >
                      {item.label}
                    </button>
                  );
                })}
              </nav>

              {/* Social links at bottom */}
              <div className="mt-auto">
                <div className="ink-rule mb-5 w-full" />
                <div className="flex items-center gap-5">
                  <a
                    href="https://github.com/Vedant1202"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="GitHub"
                    className="text-ink-soft hover:text-ink transition-colors"
                  >
                    <FaGithub className="h-5 w-5" />
                  </a>
                  <a
                    href="https://linkedin.com/in/vedant-nandoskar-692824169/"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="LinkedIn"
                    className="text-ink-soft transition-colors hover:text-[#0A66C2]"
                  >
                    <FaLinkedin className="h-5 w-5" />
                  </a>
                  <a
                    href="mailto:vedant.nandoskar@gmail.com"
                    aria-label="Email"
                    className="text-ink-soft hover:text-accent transition-colors"
                  >
                    <HiOutlineMail className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
