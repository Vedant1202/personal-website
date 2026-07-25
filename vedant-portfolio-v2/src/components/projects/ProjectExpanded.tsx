import type { Project } from "../../data/projects";
import { MediaStrip } from "./MediaStrip";
import { LinkPill } from "./LinkPill";
import { TinyIcon } from "./TinyIcon";

export function ProjectExpanded({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  return (
    <div className="p-1">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <h4 className="font-display text-ink mt-3 text-xl font-semibold tracking-tight sm:text-2xl">
            {project.title}
          </h4>

          <p className="text-ink-soft mt-3 max-w-3xl text-sm leading-relaxed sm:text-[15px]">
            {project.longer}
          </p>
        </div>

        <button
          className={[
            "ink-edge-sm shrink-0 border border-black/25",
            "text-ink-soft px-3 py-2 text-xs font-semibold",
            "hover:border-accent hover:text-ink transition",
          ].join(" ")}
          onClick={onClose}
          type="button"
        >
          Close
        </button>
      </div>

      <div className="ink-rule mt-5 w-full" />

      {!!project.bullets?.length && (
        <ul className="text-ink-soft mt-5 space-y-2 text-sm">
          {project.bullets.map((b, i) => (
            <li key={`${project.id}-b-${i}`} className="flex gap-3">
              <span className="bg-accent/60 mt-[8px] h-1.5 w-1.5 shrink-0 rounded-full" />
              <span className="leading-relaxed">{b}</span>
            </li>
          ))}
        </ul>
      )}

      {(project.links?.github ||
        project.links?.live ||
        project.links?.report ||
        project.links?.paper ||
        project.links?.doi ||
        project.links?.npmjs ||
        project.links?.docs ||
        project.links?.demo) && (
        <div className="mt-6 flex flex-wrap gap-2">
          {project.links?.github && (
            <LinkPill
              href={project.links.github}
              label="GitHub"
              variant="light"
              icon={
                <TinyIcon d="M9 19c-4 1.5-4-2.5-6-3m12 6v-3.5c0-1 .1-2.2-.5-3 2-.2 4-1 4-4.5 0-1-.4-2-1.2-2.8.1-.3.5-1.5-.1-2.8 0 0-1-.3-3 .9-.9-.3-1.8-.4-2.7-.4-.9 0-1.8.1-2.7.4-2-1.2-3-.9-3-.9-.6 1.3-.2 2.5-.1 2.8C5.4 9 5 10 5 11c0 3.5 2 4.3 4 4.5-.4.4-.6 1-.6 2v3.5" />
              }
            />
          )}
          {project.links?.live && (
            <LinkPill
              href={project.links.live}
              label="Live"
              variant="light"
              icon={<TinyIcon d="M10 14L21 3m0 0h-6m6 0v6M21 14v6H3V3h6" />}
            />
          )}
          {project.links?.report && (
            <LinkPill
              href={project.links.report}
              label="Report"
              variant="light"
              icon={<TinyIcon d="M10 14L21 3m0 0h-6m6 0v6M21 14v6H3V3h6" />}
            />
          )}
          {project.links?.paper && (
            <LinkPill
              href={project.links.paper}
              label="Paper"
              variant="light"
              icon={<TinyIcon d="M10 14L21 3m0 0h-6m6 0v6M21 14v6H3V3h6" />}
            />
          )}
          {project.links?.doi && (
            <LinkPill
              href={project.links.doi}
              label="DOI"
              variant="light"
              icon={<TinyIcon d="M10 14L21 3m0 0h-6m6 0v6M21 14v6H3V3h6" />}
            />
          )}
          {project.links?.demo && (
            <LinkPill
              href={project.links.demo}
              label="Demo"
              variant="light"
              icon={<TinyIcon d="M10 14L21 3m0 0h-6m6 0v6M21 14v6H3V3h6" />}
            />
          )}
          {project.links?.npmjs && (
            <LinkPill
              href={project.links.npmjs}
              label="NPM"
              variant="light"
              icon={<TinyIcon d="M10 14L21 3m0 0h-6m6 0v6M21 14v6H3V3h6" />}
            />
          )}
          {project.links?.docs && (
            <LinkPill
              href={project.links.docs}
              label="Docs"
              variant="light"
              icon={<TinyIcon d="M10 14L21 3m0 0h-6m6 0v6M21 14v6H3V3h6" />}
            />
          )}
        </div>
      )}

      {!!project.media?.length && (
        <div className="mt-6">
          <MediaStrip media={project.media} />
        </div>
      )}
    </div>
  );
}
