// src/components/Polaroid.tsx
import type { CSSProperties, ReactNode } from "react";

type PolaroidProps = {
  src: string;
  alt: string;
  /** Handwritten note printed on the bottom border. */
  caption?: ReactNode;
  /** Rotation in degrees, so a stack sits hand-placed rather than aligned. */
  tilt?: number;
  /**
   * Where the caption sits under the print. In an overlapping pair, aligning
   * each caption to the print's *outer* edge keeps it out from under the other
   * print, so both stay readable even when the images overlap in the middle.
   */
  captionAlign?: "center" | "left" | "right";
  /**
   * Image crop ratio inside the card. Prints are uniform in a scrapbook even
   * when the source photos aren't, so the image is cropped to fit rather than
   * kept at its natural ratio (that job belongs to SectionPicture).
   */
  ratio?: string;
  /** Sit the print greyscale at rest, blooming to full colour on hover. */
  bw?: boolean;
  className?: string;
  eager?: boolean;
};

/**
 * A photo-card / instant print: white stock, a thin mount around the image and a
 * deeper strip at the bottom for a handwritten caption, with a soft drop shadow.
 * Distinct from SectionPicture's drawn ink frame — used where photos cluster as a
 * scrapbook and want a clean, overlappable edge rather than a sketched one.
 */
export function Polaroid({
  src,
  alt,
  caption,
  tilt = 0,
  ratio = "4 / 5",
  captionAlign = "center",
  bw = false,
  className,
  eager = false,
}: PolaroidProps) {
  const style: CSSProperties = { transform: `rotate(${tilt}deg)` };
  const captionAlignClass = {
    center: "text-center",
    left: "text-left",
    right: "text-right",
  }[captionAlign];
  return (
    <figure
      className={`m-0 bg-white p-2 pb-2 shadow-[0_10px_26px_rgba(0,0,0,0.16)] ring-1 ring-black/5 ${
        bw ? "group" : ""
      } ${className ?? ""}`}
      style={style}
    >
      <div className="overflow-hidden bg-neutral-100" style={{ aspectRatio: ratio }}>
        <img
          src={src}
          alt={alt}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          draggable={false}
          className={`h-full w-full object-cover select-none ${bw ? "ink-bw" : ""}`}
        />
      </div>
      {caption && (
        <figcaption
          className={`font-hand text-ink-soft px-1 pt-2 pb-1 text-base leading-tight ${captionAlignClass}`}
        >
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
