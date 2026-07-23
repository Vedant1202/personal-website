// src/components/SectionPicture.tsx
import type { CSSProperties } from "react";

/** Audition treatments — one per section, labelled, so the winner is picked in situ. */
export type PictureTreatment = "snapshot" | "sketch" | "natural" | "washed";

/** `behind` sits the image under section text; `beside` places it in flow. */
export type PicturePlacement = "beside" | "behind";

type SectionPictureProps = {
  src: string;
  alt: string;
  treatment: PictureTreatment;
  placement?: PicturePlacement;
  /** Shown as a handwritten tag while auditioning. */
  label?: string;
  caption?: string;
  className?: string;
  /** Hero photo is above the fold; everything else lazy-loads. */
  eager?: boolean;
};

const TREATMENT_LABELS: Record<PictureTreatment, string> = {
  snapshot: "snapshot / print",
  sketch: "sketch frame",
  natural: "natural",
  washed: "washed duotone",
};

/**
 * A personal photo slot. Deliberately aspect-ratio agnostic: the image keeps its
 * natural proportions (no aspect-* crop, no fixed height) so any painting or
 * snapshot can drop in later without the layout being retuned.
 *
 * With placement="behind" the figure positions itself to fill its parent, so give
 * that parent `relative isolate` and pass no position class of your own. The
 * isolation keeps a negatively-stacked child from sliding behind an ancestor's
 * background instead of behind the text it belongs to.
 */
export function SectionPicture({
  src,
  alt,
  treatment,
  placement = "beside",
  label,
  caption,
  className,
  eager = false,
}: SectionPictureProps) {
  const behind = placement === "behind";

  // The sketch frame's drawn corners come from .ink-edge, shared with the rest
  // of the chrome so every boundary on the page is cut from the same pen.
  const frameStyle: CSSProperties =
    treatment === "snapshot" ? { transform: "rotate(-1.6deg)" } : {};

  const frameClass = {
    snapshot: "bg-white p-2.5 pb-8 shadow-[0_6px_24px_rgba(0,0,0,0.14)]",
    sketch: "ink-edge border-2 border-ink/80 p-1.5",
    natural: "shadow-[0_10px_30px_rgba(0,0,0,0.12)] rounded-sm",
    washed: "",
  }[treatment];

  const imgClass = [
    "block",
    // Ratio-agnostic in both directions: in flow the photo is the subject and is
    // never cropped; behind text it is texture, so it fills whatever box it is given.
    behind ? "h-full w-full object-cover select-none" : "h-auto w-full",
    treatment === "sketch" ? "rounded-[inherit]" : "",
  ]
    .filter(Boolean)
    .join(" ");

  // Ink-blue duotone. Washed behind text goes much further, since copy sits on top.
  const imgStyle: CSSProperties =
    treatment === "washed"
      ? {
          filter: "grayscale(1) sepia(0.45) hue-rotate(165deg) saturate(1.7)",
          opacity: behind ? 0.35 : 0.9,
        }
      : {};

  return (
    <figure
      className={`m-0 ${
        behind
          ? // Fills the positioning parent itself — callers must not also pass a
            // position class, since `relative` and `absolute` would collide.
            "pointer-events-none absolute inset-0 -z-10 overflow-hidden"
          : "relative"
      } ${className ?? ""}`}
      aria-hidden={behind ? true : undefined}
    >
      <div
        className={`relative overflow-hidden ${behind ? "h-full" : ""} ${frameClass}`}
        style={frameStyle}
      >
        <img
          src={src}
          alt={behind ? "" : alt}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          fetchPriority={eager ? "high" : undefined}
          draggable={false}
          className={imgClass}
          style={imgStyle}
        />
        {behind && (
          // Lifts the whites so overlaid text keeps its contrast.
          <div aria-hidden className="bg-paper/55 absolute inset-0" />
        )}
      </div>

      {treatment === "snapshot" && (
        <>
          <span
            aria-hidden
            className="absolute -top-2 left-6 h-5 w-16 -rotate-6 bg-[#e8e2d4]/80 shadow-sm"
          />
          <span
            aria-hidden
            className="absolute -top-1.5 right-7 h-5 w-14 rotate-3 bg-[#e8e2d4]/80 shadow-sm"
          />
        </>
      )}

      {(caption || label) && (
        <figcaption className="mt-2 flex flex-wrap items-baseline gap-x-2">
          {label && (
            <span className="font-hand text-accent text-lg leading-none">
              {label} — {TREATMENT_LABELS[treatment]}
            </span>
          )}
          {caption && <span className="text-ink-soft text-xs">{caption}</span>}
        </figcaption>
      )}
    </figure>
  );
}
