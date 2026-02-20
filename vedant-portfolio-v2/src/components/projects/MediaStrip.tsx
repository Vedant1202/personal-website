import type { Media } from "../../data/projects";

export function MediaStrip({ media }: { media?: Media[] }) {
  if (!media?.length) return null;

  return (
    <div className="mt-4">
      <p className="text-xs font-semibold tracking-wide text-slate-500 uppercase">
        Media
      </p>

      <div className="mt-3 flex snap-x snap-mandatory gap-3 overflow-x-auto pb-1">
        {media.map((m, idx) => {
          if (m.type === "image") {
            return (
              <div
                key={`${m.src}-${idx}`}
                className="snap-start overflow-hidden rounded-xl border border-slate-200 bg-white"
              >
                <img
                  src={m.src}
                  alt={m.alt ?? ""}
                  className="h-40 w-64 object-cover"
                  loading="lazy"
                />
              </div>
            );
          }

          return (
            <div
              key={`${m.src}-${idx}`}
              className="snap-start overflow-hidden rounded-xl border border-slate-200 bg-white"
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
        })}
      </div>
    </div>
  );
}
