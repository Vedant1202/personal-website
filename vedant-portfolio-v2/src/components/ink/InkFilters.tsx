// src/components/ink/InkFilters.tsx
/**
 * Hidden SVG filter defs that give clean line icons a hand-drawn wobble, so
 * ready-made Lucide glyphs sit in the same pen as the freehand ink layer.
 * feTurbulence makes noise, feDisplacementMap pushes the paths around by it.
 * Three seeds so repeated icons don't wobble identically. Rendered once in App.
 */
const SEEDS = [
  { id: "ink-rough-1", seed: 7 },
  { id: "ink-rough-2", seed: 24 },
  { id: "ink-rough-3", seed: 41 },
];

export function InkFilters() {
  return (
    <svg
      aria-hidden
      width="0"
      height="0"
      style={{ position: "absolute", pointerEvents: "none" }}
    >
      <defs>
        {SEEDS.map(({ id, seed }) => (
          <filter key={id} id={id} x="-25%" y="-25%" width="150%" height="150%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.019"
              numOctaves={2}
              seed={seed}
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="2.3"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        ))}
      </defs>
    </svg>
  );
}
