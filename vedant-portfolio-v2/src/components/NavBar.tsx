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

const navItems = [
  { label: "Home", id: "home" },
  { label: "Skills", id: "skills" },
  { label: "Projects", id: "projects" },
  { label: "Journey", id: "journey" },
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

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMobileMenuOpen(false);
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
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 sm:px-6 sm:py-6">
          {/* Mobile-only: always-visible brand text */}
          <button
            onClick={() => scrollTo("home")}
            aria-label="Vedant Nandoskar — scroll to top"
            className="rounded-full border border-white/10 bg-black/40 px-3 py-1.5 text-sm font-semibold tracking-tight text-white/90 backdrop-blur md:hidden"
          >
            Vedant Nandoskar
          </button>

          {/* Desktop: scroll-animated brand pill */}
          <motion.button
            onClick={() => scrollTo("home")}
            aria-label="Vedant Nandoskar — scroll to top"
            className={[
              "relative hidden md:inline-flex",
              "rounded-full",
              "text-sm font-semibold tracking-tight",
              "text-white/90 hover:text-white",
              "border border-white/10",
              "bg-black/30 backdrop-blur",
              "shadow-[0_10px_30px_rgba(0,0,0,0.35)]",
              "overflow-hidden",
              "select-none",
              "go-home-nav-button",
            ].join(" ")}
            style={{
              opacity: brandOpacity,
              y: brandY,
              filter: brandBlur,
              scale: brandScale,
              paddingLeft: padX,
              paddingRight: padX,
              paddingTop: padY,
              paddingBottom: padY,
              pointerEvents: brandInteractive ? "auto" : "none",
            }}
          >
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(120% 140% at 30% 20%, rgba(59,130,246,0.18), transparent 55%), radial-gradient(120% 140% at 80% 70%, rgba(0,0,0,0.55), transparent 60%), linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0))",
              }}
            />
            <motion.span
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                opacity: wipeOpacity,
                scaleX: wipeScaleX,
                transformOrigin: "left",
                background:
                  "linear-gradient(135deg, transparent 0%, rgba(59,130,246,0.14) 35%, rgba(59,130,246,0.06) 55%, transparent 72%)",
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
            className="inline-flex items-center justify-center rounded-full border border-white/10 bg-black/40 p-2 text-white/80 backdrop-blur transition hover:text-white md:hidden"
          >
            <HiMenu className="h-5 w-5" />
          </button>
        </div>
      </header>

      {/* ─── Desktop vertical nav rail ───────────────────────────────── */}
      <nav
        ref={navRef}
        className="fixed top-1/2 right-6 z-50 hidden -translate-y-1/2 flex-col items-center gap-10 md:flex"
      >
        <div
          aria-hidden
          className="absolute top-0 right-[-12px] h-full w-px bg-white/10"
        />

        {indicator ? (
          <motion.div
            aria-hidden
            className="absolute left-[-12px] w-px bg-blue-500/80 shadow-[0_0_16px_rgba(59,130,246,0.35)]"
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
                "transition",
                "hover:cursor-pointer",
                isActive ? "font-semibold text-white" : "text-white/55 hover:text-white",
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
            className="fixed right-6 bottom-8 z-50 hidden flex-col items-end gap-4 md:flex"
          >
            <motion.a
              layoutId="social-github"
              href="https://github.com/Vedant1202"
              target="_blank"
              rel="noreferrer"
              className="group flex items-center justify-center transition-transform duration-200 hover:scale-110"
              aria-label="GitHub"
            >
              <FaGithub className="text-[1.35rem] text-white/60 transition-colors duration-200 group-hover:text-white" />
            </motion.a>

            <motion.a
              layoutId="social-linkedin"
              href="https://linkedin.com/in/vedant-nandoskar-692824169/"
              target="_blank"
              rel="noreferrer"
              className="group flex items-center justify-center transition-transform duration-200 hover:scale-110"
              aria-label="LinkedIn"
            >
              <FaLinkedin className="text-[1.35rem] text-white/60 transition-colors duration-200 group-hover:text-[#0A66C2]" />
            </motion.a>

            <motion.a
              layoutId="social-email"
              href="mailto:vedant.nandoskar@gmail.com"
              className="group flex items-center justify-center transition-transform duration-200 hover:scale-110"
              aria-label="Email"
            >
              <HiOutlineMail className="text-[1.45rem] text-white/60 transition-colors duration-200 group-hover:text-blue-700" />
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
            className="fixed inset-0 z-[60] md:hidden"
            onClick={() => setMobileMenuOpen(false)}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" />

            {/* Drawer panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 340, damping: 36 }}
              onClick={(e) => e.stopPropagation()}
              className="absolute top-0 right-0 flex h-full w-72 max-w-[80vw] flex-col border-l border-white/10 bg-[#050816] px-8 pt-6 pb-10"
            >
              {/* Close button */}
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold tracking-tight text-white/70">
                  Menu
                </span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="Close menu"
                  className="rounded-full border border-white/10 bg-white/5 p-2 text-white/60 transition-colors hover:text-white"
                >
                  <HiX className="h-4 w-4" />
                </button>
              </div>

              {/* Divider */}
              <div className="mt-5 h-px w-full bg-white/8" />

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
                          ? "bg-blue-500/10 text-white"
                          : "text-white/60 hover:bg-white/5 hover:text-white",
                      ].join(" ")}
                    >
                      {item.label}
                    </button>
                  );
                })}
              </nav>

              {/* Social links at bottom */}
              <div className="mt-auto">
                <div className="mb-5 h-px w-full bg-white/8" />
                <div className="flex items-center gap-5">
                  <a
                    href="https://github.com/Vedant1202"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="GitHub"
                    className="text-white/50 transition-colors hover:text-white"
                  >
                    <FaGithub className="h-5 w-5" />
                  </a>
                  <a
                    href="https://linkedin.com/in/vedant-nandoskar-692824169/"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="LinkedIn"
                    className="text-white/50 transition-colors hover:text-[#0A66C2]"
                  >
                    <FaLinkedin className="h-5 w-5" />
                  </a>
                  <a
                    href="mailto:vedant.nandoskar@gmail.com"
                    aria-label="Email"
                    className="text-white/50 transition-colors hover:text-blue-400"
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
