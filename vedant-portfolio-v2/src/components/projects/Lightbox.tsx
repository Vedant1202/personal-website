// src/components/projects/Lightbox.tsx
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";

export interface LightboxImage {
  src: string;
  alt?: string;
}

interface LightboxProps {
  images: LightboxImage[];
  initialIndex?: number;
  onClose: () => void;
}

const slideVariants = {
  enter: (dir: number) => ({
    x: dir > 0 ? "55%" : "-55%",
    opacity: 0,
    scale: 0.94,
  }),
  center: { x: 0, opacity: 1, scale: 1 },
  exit: (dir: number) => ({
    x: dir > 0 ? "-55%" : "55%",
    opacity: 0,
    scale: 0.94,
  }),
};

export function Lightbox({ images, initialIndex = 0, onClose }: LightboxProps) {
  const [index, setIndex] = useState(initialIndex);
  const [dir, setDir] = useState(0);

  const prev = () => {
    setDir(-1);
    setIndex((i) => (i - 1 + images.length) % images.length);
  };

  const next = () => {
    setDir(1);
    setIndex((i) => (i + 1) % images.length);
  };

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Lock body scroll
  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, []);

  // Pointer/touch swipe
  const pointerStartX = useRef<number | null>(null);

  const onPointerDown = (e: React.PointerEvent) => {
    pointerStartX.current = e.clientX;
  };
  const onPointerUp = (e: React.PointerEvent) => {
    if (pointerStartX.current === null) return;
    const delta = e.clientX - pointerStartX.current;
    if (Math.abs(delta) > 40) {
      if (delta < 0) next();
      else prev();
    }
    pointerStartX.current = null;
  };

  const isMulti = images.length > 1;
  const img = images[index];

  return createPortal(
    <motion.div
      key="lightbox-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18 }}
      className="fixed inset-0 z-9999 flex items-center justify-center bg-black/92 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* Inner container — stop click-through */}
      <div
        className="relative flex h-full w-full max-w-6xl flex-col items-center justify-center px-12 py-14 sm:px-16 sm:py-16"
        onClick={(e) => e.stopPropagation()}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
      >
        {/* Close button */}
        <button
          type="button"
          aria-label="Close lightbox"
          onClick={onClose}
          className="absolute top-4 right-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white/75 transition hover:bg-white/20 hover:text-white"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="h-4 w-4"
          >
            <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
          </svg>
        </button>

        {/* Counter */}
        {isMulti && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 text-[11px] tracking-[0.22em] text-white/45 uppercase select-none">
            {index + 1} / {images.length}
          </div>
        )}

        {/* Prev arrow */}
        {isMulti && (
          <button
            type="button"
            aria-label="Previous image"
            onClick={prev}
            className="absolute left-2 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white/75 transition hover:bg-white/22 hover:text-white sm:left-4"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              className="h-5 w-5"
            >
              <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        )}

        {/* Image with slide animation */}
        <div className="flex w-full flex-1 items-center justify-center overflow-hidden">
          <AnimatePresence mode="wait" custom={dir}>
            <motion.img
              key={index}
              custom={dir}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.22, ease: "easeOut" }}
              src={img.src}
              alt={img.alt ?? ""}
              draggable={false}
              className="max-h-[calc(100svh-8rem)] max-w-full rounded-xl object-contain shadow-2xl select-none"
            />
          </AnimatePresence>
        </div>

        {/* Caption */}
        {img.alt && (
          <p className="mt-3 max-w-xl text-center text-xs text-white/45 select-none">
            {img.alt}
          </p>
        )}

        {/* Next arrow */}
        {isMulti && (
          <button
            type="button"
            aria-label="Next image"
            onClick={next}
            className="absolute right-2 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white/75 transition hover:bg-white/22 hover:text-white sm:right-4"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              className="h-5 w-5"
            >
              <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        )}

        {/* Dot indicators */}
        {isMulti && (
          <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Go to image ${i + 1}`}
                onClick={() => {
                  setDir(i > index ? 1 : -1);
                  setIndex(i);
                }}
                className={[
                  "h-1.5 rounded-full transition-all duration-200",
                  i === index
                    ? "w-4 bg-blue-400/90"
                    : "w-1.5 bg-white/30 hover:bg-white/55",
                ].join(" ")}
              />
            ))}
          </div>
        )}
      </div>
    </motion.div>,
    document.body,
  );
}
