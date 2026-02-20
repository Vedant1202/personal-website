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
import { HiOutlineMail } from "react-icons/hi";

const navItems = [
  { label: "Home", id: "home" },
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

  const navRef = useRef<HTMLElement | null>(null);
  const itemRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const ids = useMemo(() => navItems.map((n) => n.id), []);

  // ---- Brand: invisible on hero, appears after you scroll down a bit ----
  const { scrollY } = useScroll();

  // Opinion: start showing once you're clearly leaving the hero
  // (this feels intentional, not twitchy)
  const t = useTransform(scrollY, [120, 320], [0, 1]);

  // Fade + slight slide + deblur
  const brandOpacity = useTransform(t, [0, 0.15, 1], [0, 0, 1]);
  const brandY = useTransform(t, [0, 1], [-8, 0]);
  const brandBlur = useTransform(t, [0, 1], ["blur(8px)", "blur(0px)"]);
  const brandScale = useTransform(t, [0, 1], [0.985, 1]);

  // Subtle diagonal wipe overlay (slash vibe, but not loud)
  const wipeScaleX = useTransform(t, [0, 0.7, 1], [0, 1, 1]);
  const wipeOpacity = useTransform(t, [0, 0.35, 1], [0, 1, 0.75]);

  // Slight padding tighten so it feels "snapped into place"
  const padX = useTransform(t, [0, 1], [14, 12]);
  const padY = useTransform(t, [0, 1], [9, 8]);

  // Make it non-clickable when hidden (avoid invisible click target)
  useMotionValueEvent(t, "change", (v) => {
    setBrandInteractive(v > 0.2);
  });

  // ---- 1) Active section = the one occupying most vertical space in viewport ----
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

  // ---- 2) Move the single accent line to the active nav item ----
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
  };

  return (
    <>
      {/* Top-left brand */}
      <header className="fixed top-0 left-0 z-50 w-full">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6">
          <motion.button
            onClick={() => scrollTo("home")}
            aria-label="Scroll to top"
            className={[
              "relative",
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
            {/* Vignette/glass layer so it never blends into content */}
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(120% 140% at 30% 20%, rgba(59,130,246,0.18), transparent 55%), radial-gradient(120% 140% at 80% 70%, rgba(0,0,0,0.55), transparent 60%), linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0))",
              }}
            />

            {/* Diagonal wipe (slash vibe) */}
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

            {/* Content */}
            <span className="relative flex items-center whitespace-nowrap">
              Vedant Nandoskar
            </span>
          </motion.button>

          <div className="hidden md:block" />
        </div>
      </header>

      {/* Right-side vertical nav rail */}
      <nav
        ref={navRef}
        className="fixed top-1/2 right-6 z-50 hidden -translate-y-1/2 flex-col items-center gap-10 md:flex"
      >
        {/* Faint rail line behind */}
        <div
          aria-hidden
          className="absolute top-0 right-[-12px] h-full w-px bg-white/10"
        />

        {/* Single moving accent line */}
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
                isActive ? "font-semibold text-white" : "text-white/55 hover:text-white",
              ].join(" ")}
            >
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* Bottom-right social dock */}
      <AnimatePresence>
        {showSocialDock ? (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed right-6 bottom-8 z-50 hidden flex-col items-end gap-4 md:flex"
          >
            {/* Opinion: no underline on icons, only scale + brand color */}
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
    </>
  );
}
