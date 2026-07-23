// src/components/audition/auditionContext.ts
import { createContext, useContext } from "react";

export type SerifChoice = "fraunces" | "instrument";
export type BlueChoice = "default" | "deep" | "teal";

export type AuditionState = {
  /** Panel + treatment labels only render while auditioning. */
  active: boolean;
  serif: SerifChoice;
  blue: BlueChoice;
  /** Hero arc + journey path — the toggleable depictive drawings. */
  inkDrawings: boolean;
};

export const AUDITION_DEFAULTS: AuditionState = {
  active: false,
  serif: "fraunces",
  blue: "default",
  inkDrawings: true,
};

export const AuditionContext = createContext<AuditionState>(AUDITION_DEFAULTS);

export function useAudition(): AuditionState {
  return useContext(AuditionContext);
}
