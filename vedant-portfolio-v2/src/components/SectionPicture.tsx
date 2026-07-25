// src/components/SectionPicture.tsx
import type { CSSProperties, ReactNode } from "react";

/** How a photo is framed. */
export type PictureTreatment = "sketch" | "washed" | "circle";

/**
 * Frame chrome and the caption's matching horizontal inset, defined together so
 * they cannot drift apart. A caption belongs to the image, not to the frame
 * around it — and the sketch frame holds the image 8px in on every side (6px
 * padding + a 2px border), so an un-inset caption sat 8px wider on each edge and
 * read as slightly misaligned under every picture on the page.
 */
const FRAMES = {
  sketch: { frame: "ink-edge border-2 border-ink/80 p-1.5", captionInset: "px-2" },
  washed: { frame: "", captionInset: "" },
  // Round frame is rendered as a special case below (a hand-drawn ring rather
  // than a CSS border), so no frame classes here — just the caption inset.
  circle: { frame: "", captionInset: "" },
} as const;

/** `behind` sits the image under section text; `beside` places it in flow. */
export type PicturePlacement = "beside" | "behind";

/**
 * Colour treatment for an in-flow photo (circle or sketch). `bw` and `accent` sit
 * desaturated at rest and bloom to full colour on hover — the same reward-on-
 * interest move the project covers make. `color` is the untouched photo.
 */
export type PictureTone = "color" | "bw" | "accent";

type SectionPictureProps = {
  src: string;
  alt: string;
  treatment: PictureTreatment;
  placement?: PicturePlacement;
  /** Handwritten note under the frame; takes nodes so a doodle can sit inline. */
  caption?: ReactNode;
  /**
   * Centred suits a caption that wraps — the two lines sit as a block under the
   * picture rather than trailing off its left edge. A one-line gallery label
   * still reads better left-aligned, against the print's own edge, so that
   * stays the default.
   */
  captionAlign?: "start" | "center";
  className?: string;
  /** Small rotation in degrees, so a wall of prints sits hand-placed. */
  tilt?: number;
  /** Colour treatment for the photo; `bw`/`accent` reveal colour on hover. */
  tone?: PictureTone;
  /**
   * Whether a toned photo blooms to full colour on hover. Off keeps it permanently
   * in its toned state — the hero portrait stays black-and-white.
   */
  revealOnHover?: boolean;
  /** Hero photo is above the fold; everything else lazy-loads. */
  eager?: boolean;
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
  caption,
  captionAlign = "start",
  className,
  tilt,
  tone = "color",
  revealOnHover = true,
  eager = false,
}: SectionPictureProps) {
  const behind = placement === "behind";

  // Rest-state filter for the photo. `.ink-bw`/`.ink-duotone` carry their own
  // group-hover → full-colour rule; when the reveal is turned off, fall back to a
  // static `grayscale` so the photo stays permanently toned (the hero portrait).
  const bwClass = revealOnHover ? "ink-bw" : "grayscale";
  const toneClass = tone === "bw" ? bwClass : tone === "accent" ? "ink-duotone" : "";

  // The sketch frame's drawn corners come from .ink-edge, shared with the rest
  // of the chrome so every boundary on the page is cut from the same pen.
  const frameStyle: CSSProperties =
    tilt !== undefined ? { transform: `rotate(${tilt}deg)` } : {};

  const { frame: frameClass, captionInset } = FRAMES[treatment];

  const imgClass = [
    "block",
    // Ratio-agnostic in both directions: in flow the photo is the subject and is
    // never cropped; behind text it is texture, so it fills whatever box it is
    // given. (The circle treatment renders its own image above, cropped square.)
    behind ? "h-full w-full object-cover select-none" : "h-auto w-full",
    treatment === "sketch" ? "rounded-[inherit]" : "",
    // `washed` carries its own duotone; otherwise honour the `tone` prop so a
    // sketch-framed photo can sit b&w/accent and reveal colour on hover.
    treatment === "washed" ? "ink-duotone" : toneClass,
  ]
    .filter(Boolean)
    .join(" ");

  // Duotone itself comes from the shared .ink-duotone class; only the depth
  // differs — washed behind text goes much further, since copy sits on top.
  const imgStyle: CSSProperties =
    treatment === "washed" ? { opacity: behind ? 0.35 : 0.9 } : {};

  return (
    <figure
      className={`m-0 ${
        behind
          ? // Fills the positioning parent itself — callers must not also pass a
            // position class, since `relative` and `absolute` would collide.
            "pointer-events-none absolute inset-0 -z-10 overflow-hidden"
          : // A query container, so the caption can size itself against this
            // picture's width. Only in flow: `behind` is decorative and captionless.
            "picture-figure relative"
      } ${className ?? ""}`}
      aria-hidden={behind ? true : undefined}
    >
      {treatment === "circle" ? (
        <div className="group relative aspect-square" style={frameStyle}>
          {/* Image clipped to a circle, inset a touch so the drawn ring reads as
              a frame around it rather than a border stuck to its edge. */}
          <div className="absolute inset-[3.5%] overflow-hidden rounded-full">
            <img
              src={src}
              alt={alt}
              loading={eager ? "eager" : "lazy"}
              decoding="async"
              fetchPriority={eager ? "high" : undefined}
              draggable={false}
              className={`h-full w-full object-cover select-none ${toneClass}`}
            />
          </div>
          {/* The frame: a stroked circle wobbled by the same ink-rough filter the
              hand-drawn doodles use, so it reads as sketched, not a hard CSS ring. */}
          <svg
            viewBox="0 0 100 100"
            aria-hidden
            className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
            style={{ filter: "url(#ink-rough-2)", color: "var(--brand-ink)" }}
          >
            <circle
              cx="50"
              cy="50"
              r="48"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.1"
              strokeOpacity="0.82"
            />
          </svg>
        </div>
      ) : (
        <div
          className={`group relative overflow-hidden ${behind ? "h-full" : ""} ${frameClass}`}
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
      )}

      {caption && (
        <figcaption
          className={`picture-caption font-hand text-ink-soft mt-2 leading-snug ${captionInset} ${
            captionAlign === "center" ? "text-center" : ""
          }`}
        >
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
