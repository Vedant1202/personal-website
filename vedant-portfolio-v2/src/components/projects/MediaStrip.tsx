import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import type { Media } from "../../data/projects";
import { Lightbox } from "./Lightbox";
import type { LightboxImage } from "./Lightbox";

export function MediaStrip({ media }: { media?: Media[] }) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxStartIndex, setLightboxStartIndex] = useState(0);

  // Collect only image-type items (with their original index) for the lightbox
  const imageItems: { item: Extract<Media, { type: "image" }>; stripIndex: number }[] =
    [];
  media?.forEach((m, i) => {
    if (m.type === "image") imageItems.push({ item: m, stripIndex: i });
  });

  const lightboxImages: LightboxImage[] = imageItems.map(({ item }) => ({
    src: item.src,
    alt: item.alt,
  }));

  const openLightbox = (lightboxIdx: number) => {
    setLightboxStartIndex(lightboxIdx);
    setLightboxOpen(true);
  };

  // Bail out after the hooks so their call order stays stable across renders.
  if (!media?.length) return null;

  return (
    <>
      <div className="mt-4">
        <p className="text-ink-soft text-xs font-semibold tracking-wide uppercase">
          Media
        </p>

        <div className="mt-3 flex snap-x snap-mandatory gap-3 overflow-x-auto pb-1">
          {media.map((m, idx) => {
            const key = `${m.type}-${m.src}-${idx}`;

            if (m.type === "image") {
              // Find this image's position in the lightbox images array
              const lbIdx = imageItems.findIndex((x) => x.stripIndex === idx);
              return (
                <button
                  key={key}
                  type="button"
                  aria-label={`View full screen: ${m.alt ?? "image"}`}
                  onClick={() => openLightbox(lbIdx)}
                  className="hover:border-accent focus-visible:ring-accent ink-edge-sm snap-start overflow-hidden border border-black/22 transition focus-visible:ring-2 focus-visible:outline-none"
                >
                  <img
                    src={m.src}
                    alt={m.alt ?? ""}
                    className="h-40 w-64 object-cover"
                    loading="lazy"
                    draggable={false}
                  />
                </button>
              );
            }

            if (m.type === "video") {
              return (
                <div
                  key={key}
                  className="ink-edge-sm snap-start overflow-hidden border border-black/22"
                >
                  <video
                    className="h-40 w-64 object-cover"
                    controls
                    preload="metadata"
                    poster={m.poster}
                  >
                    <source src={m.src} />
                  </video>
                </div>
              );
            }

            // embed (YouTube / Drive preview)
            return (
              <div
                key={key}
                className="ink-edge-sm snap-start overflow-hidden border border-black/22"
              >
                <iframe
                  className="h-40 w-64"
                  src={m.src}
                  title={m.title ?? "Embedded video"}
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {lightboxOpen && (
          <Lightbox
            images={lightboxImages}
            initialIndex={lightboxStartIndex}
            onClose={() => setLightboxOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
