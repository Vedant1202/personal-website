// src/components/ink/InkMark.tsx
import { useEffect, useMemo, useRef, useState, type PropsWithChildren } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { annotate } from "rough-notation";
import type { RoughAnnotation, RoughAnnotationType } from "rough-notation/lib/model";

type InkMarkProps = PropsWithChildren<{
  type?: RoughAnnotationType;
  /** Seconds to wait after the mark scrolls into view. */
  delay?: number;
  strokeWidth?: number;
  padding?: number | [number, number];
  iterations?: number;
  multiline?: boolean;
  className?: string;
}>;

/**
 * Module-level so the reference is stable — a fresh array literal per render
 * would re-run the annotate effect and redraw the mark on every render.
 */
const CIRCLE_PADDING: [number, number] = [13, 26];

/**
 * Below `sm` the page gutter is only 20px, and a circled phrase often starts
 * right at it — so the ellipse (plus rough.js's few px of overshoot) draws past
 * the screen edge and gets cut into a broken-looking arc. Horizontal padding is
 * clamped to what the gutter can absorb; vertical is unaffected, since nothing
 * clips there.
 */
const NARROW_MAX_X_PADDING = 10;
const NARROW_QUERY = "(max-width: 639px)";

/**
 * Hand-drawn annotation (underline, circle, highlight…) over real text, in the
 * ocean-blue accent. Black ink is reserved for InkDrawing; blue for marks.
 *
 * rough-notation writes stroke colors as attributes, so the accent has to be
 * resolved to a concrete value rather than passed as var(--brand-accent).
 * It re-measures on resize itself, so only font loading needs handling here.
 */
export function InkMark({
  children,
  type = "underline",
  delay = 0,
  strokeWidth = 2,
  padding,
  iterations = 2,
  multiline = true,
  className,
}: InkMarkProps) {
  /*
   * Circles need far more room than the other marks. rough-notation fits its
   * ellipse *inside* the padded box, so the curve is tangent at the mid-edges
   * and cuts well inside the box corners — at the same padding value a circle
   * crowds the text where an underline or highlight sits clear of it. Wide,
   * short text is the worst case, which is exactly what the section kickers are.
   */
  const [narrow, setNarrow] = useState(
    () => typeof window !== "undefined" && window.matchMedia(NARROW_QUERY).matches,
  );

  useEffect(() => {
    const mq = window.matchMedia(NARROW_QUERY);
    const onChange = (e: MediaQueryListEvent) => setNarrow(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const pad = useMemo(() => {
    const base = padding ?? (type === "circle" ? CIRCLE_PADDING : 2);
    if (type !== "circle" || !narrow) return base;
    const [y, x] = Array.isArray(base) ? base : [base, base];
    return [y, Math.min(x, NARROW_MAX_X_PADDING)] as [number, number];
  }, [padding, type, narrow]);

  const ref = useRef<HTMLSpanElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.9 });
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!ref.current || !inView) return;

    let annotation: RoughAnnotation | undefined;
    let timer = 0;
    let raf = 0;
    let cancelled = false;

    // rough-notation measures the target once, when annotate() is called, and
    // draws the stroke at those coordinates for good. If it measures while the
    // section is still animating in (framer-motion moves an ancestor), the mark
    // is fixed to the wrong spot — in Contact it landed on the heading. So wait
    // until the element's *page* position is stable (entrance done) before
    // annotating. Page position = rect.top + scrollY is scroll-invariant, so
    // this waits out layout/animation, never the user's scrolling.
    const annotateNow = () => {
      const el = ref.current;
      if (cancelled || !el) return;

      const accent = getComputedStyle(document.documentElement)
        .getPropertyValue("--brand-accent")
        .trim();

      annotation = annotate(el, {
        type,
        // Highlight sits behind the text, so it stays faint — a pale wash the
        // words read cleanly through, not a band that competes with them.
        color: type === "highlight" ? `${accent}1f` : accent,
        strokeWidth,
        padding: pad,
        iterations,
        multiline,
        animate: !reduceMotion,
        // Short enough that the last mark in the hero chain lands inside 1.5s.
        animationDuration: 600,
      });

      timer = window.setTimeout(() => annotation?.show(), delay * 1000);
    };

    const waitForStableLayout = () => {
      let lastY: number | null = null;
      let stableFrames = 0;
      const tick = () => {
        const el = ref.current;
        if (cancelled || !el) return;
        const y = el.getBoundingClientRect().top + window.scrollY;
        stableFrames = lastY !== null && Math.abs(y - lastY) < 0.5 ? stableFrames + 1 : 0;
        lastY = y;
        if (stableFrames >= 3) annotateNow();
        else raf = requestAnimationFrame(tick);
      };
      tick();
    };

    // Web fonts change text metrics; annotating first would misplace the stroke.
    if (document.fonts && document.fonts.status !== "loaded") {
      document.fonts.ready.then(waitForStableLayout);
    } else {
      waitForStableLayout();
    }

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      window.clearTimeout(timer);
      annotation?.remove();
    };
  }, [inView, type, delay, strokeWidth, pad, iterations, multiline, reduceMotion]);

  return (
    <span ref={ref} className={className}>
      {children}
    </span>
  );
}
