// src/components/ink/InkMark.tsx
import { useEffect, useRef, type PropsWithChildren } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { annotate } from "rough-notation";
import type { RoughAnnotation, RoughAnnotationType } from "rough-notation/lib/model";
import { useAudition } from "../audition/auditionContext";

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
  padding = 2,
  iterations = 2,
  multiline = true,
  className,
}: InkMarkProps) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.9 });
  const reduceMotion = useReducedMotion();
  const { blue } = useAudition();

  useEffect(() => {
    if (!ref.current || !inView) return;

    let annotation: RoughAnnotation | undefined;
    let timer = 0;
    let cancelled = false;

    const draw = () => {
      const el = ref.current;
      if (cancelled || !el) return;

      const accent = getComputedStyle(document.documentElement)
        .getPropertyValue("--brand-accent")
        .trim();

      annotation = annotate(el, {
        type,
        // Highlight sits behind the text, so it needs to be transparent enough to read through.
        color: type === "highlight" ? `${accent}33` : accent,
        strokeWidth,
        padding,
        iterations,
        multiline,
        animate: !reduceMotion,
        animationDuration: 700,
      });

      timer = window.setTimeout(() => annotation?.show(), delay * 1000);
    };

    // Web fonts change text metrics; annotating first would misplace the stroke.
    if (document.fonts && document.fonts.status !== "loaded") {
      document.fonts.ready.then(draw);
    } else {
      draw();
    }

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
      annotation?.remove();
    };
    // `blue` redraws the annotation when the audition swaps the accent token.
  }, [
    inView,
    type,
    delay,
    strokeWidth,
    padding,
    iterations,
    multiline,
    reduceMotion,
    blue,
  ]);

  return (
    <span ref={ref} className={className}>
      {children}
    </span>
  );
}
