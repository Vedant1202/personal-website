// src/components/audition/AuditionPanel.tsx
import { useAudition } from "./auditionContext";

/**
 * Variant switcher shown only with ?audition=1. Plain links rather than state
 * so each variant is a shareable URL, and so a reload proves the choice sticks.
 */
function variantHref(overrides: Record<string, string | null>): string {
  const params = new URLSearchParams(window.location.search);
  for (const [key, value] of Object.entries(overrides)) {
    if (value === null) params.delete(key);
    else params.set(key, value);
  }
  return `?${params.toString()}${window.location.hash}`;
}

type OptionProps = {
  label: string;
  active: boolean;
  overrides: Record<string, string | null>;
};

function Option({ label, active, overrides }: OptionProps) {
  return (
    <a
      href={variantHref(overrides)}
      aria-current={active ? "true" : undefined}
      className={`ink-edge-sm px-2.5 py-1 text-xs transition-colors ${
        active
          ? "bg-ink text-paper"
          : "text-ink-soft hover:text-ink border border-black/25 hover:border-black/50"
      }`}
    >
      {label}
    </a>
  );
}

export function AuditionPanel() {
  const { active, serif, blue, inkDrawings } = useAudition();
  if (!active) return null;

  return (
    <aside
      aria-label="Design audition controls"
      className="bg-paper/95 ink-edge-sm fixed bottom-3 left-3 z-[60] max-w-[15rem] border border-black/25 p-3 shadow-lg backdrop-blur"
    >
      <p className="font-hand text-ink mb-2 text-lg leading-none">Try a variant</p>

      <div className="space-y-2">
        <div>
          <p className="text-ink-soft mb-1 text-[10px] tracking-[0.18em] uppercase">
            Serif
          </p>
          <div className="flex flex-wrap gap-1.5">
            <Option
              label="Fraunces"
              active={serif === "fraunces"}
              overrides={{ serif: null }}
            />
            <Option
              label="Instrument"
              active={serif === "instrument"}
              overrides={{ serif: "instrument" }}
            />
          </div>
        </div>

        <div>
          <p className="text-ink-soft mb-1 text-[10px] tracking-[0.18em] uppercase">
            Blue
          </p>
          <div className="flex flex-wrap gap-1.5">
            <Option
              label="#0369A1"
              active={blue === "default"}
              overrides={{ blue: null }}
            />
            <Option
              label="#075985"
              active={blue === "deep"}
              overrides={{ blue: "deep" }}
            />
            <Option
              label="#0E7490"
              active={blue === "teal"}
              overrides={{ blue: "teal" }}
            />
          </div>
        </div>

        <div>
          <p className="text-ink-soft mb-1 text-[10px] tracking-[0.18em] uppercase">
            Ink drawings
          </p>
          <div className="flex flex-wrap gap-1.5">
            <Option label="On" active={inkDrawings} overrides={{ ink: null }} />
            <Option label="Off" active={!inkDrawings} overrides={{ ink: "off" }} />
          </div>
        </div>
      </div>

      <p className="text-ink-soft mt-2.5 text-[10px] leading-snug">
        Photo treatments are labelled in place — one per section.
      </p>
    </aside>
  );
}
