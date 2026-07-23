// src/components/audition/AuditionProvider.tsx
import { useEffect, useMemo, type PropsWithChildren } from "react";
import {
  AUDITION_DEFAULTS,
  AuditionContext,
  BRUSH_CHOICES,
  type AuditionState,
  type BlueChoice,
  type BrushChoice,
  type SerifChoice,
} from "./auditionContext";

function readParams(): AuditionState {
  if (typeof window === "undefined") return AUDITION_DEFAULTS;

  const params = new URLSearchParams(window.location.search);
  const serif = params.get("serif");
  const blue = params.get("blue");
  const brush = params.get("brush");

  return {
    active: params.get("audition") === "1",
    serif: serif === "instrument" ? "instrument" : "fraunces",
    blue: blue === "deep" || blue === "teal" ? (blue as BlueChoice) : "default",
    // ?ink=off strips the hero arc and journey path
    inkDrawings: params.get("ink") !== "off",
    brush: BRUSH_CHOICES.includes(brush as BrushChoice)
      ? (brush as BrushChoice)
      : AUDITION_DEFAULTS.brush,
  };
}

/**
 * Reads audition settings from the URL once and stamps the font/color choices
 * onto <html>, where the token overrides in index.css pick them up.
 */
export function AuditionProvider({ children }: PropsWithChildren) {
  const state = useMemo(() => readParams(), []);

  useEffect(() => {
    const root = document.documentElement;
    const serif: SerifChoice = state.serif;

    if (serif === "fraunces") root.removeAttribute("data-serif");
    else root.setAttribute("data-serif", serif);

    if (state.blue === "default") root.removeAttribute("data-blue");
    else root.setAttribute("data-blue", state.blue);
  }, [state.serif, state.blue]);

  return <AuditionContext value={state}>{children}</AuditionContext>;
}
