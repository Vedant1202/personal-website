// src/components/audition/auditionContext.ts
import { createContext, useContext } from "react";

export type SerifChoice = "fraunces" | "instrument";
export type BlueChoice = "default" | "deep" | "teal";

/** How every brushstroke on the page is painted. */
export type BrushChoice = "gouache" | "drybrush" | "watercolor" | "ink";
export const BRUSH_CHOICES: BrushChoice[] = ["gouache", "drybrush", "watercolor", "ink"];

export type AuditionState = {
  /** Panel + treatment labels only render while auditioning. */
  active: boolean;
  serif: SerifChoice;
  blue: BlueChoice;
  /** Hero arc + journey path — the toggleable depictive drawings. */
  inkDrawings: boolean;
  brush: BrushChoice;
};

export const AUDITION_DEFAULTS: AuditionState = {
  active: false,
  serif: "fraunces",
  blue: "default",
  inkDrawings: true,
  brush: "gouache",
};

export const AuditionContext = createContext<AuditionState>(AUDITION_DEFAULTS);

export function useAudition(): AuditionState {
  return useContext(AuditionContext);
}
