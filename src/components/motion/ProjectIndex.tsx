'use client';

import Image from 'next/image';
import Link from 'next/link';
import { TextHighlight } from '../TextHighlight';
import { Reveal } from '../Reveal';
import { MagneticCard } from './MagneticCard';
import type { Project } from '../../types/project';

/**
 * Editorial project rows — image always visible, alternating side for rhythm.
 *
 * Not a grid and not hover-dependent: every screenshot is on screen as you
 * scroll, and each row reveals on entry rather than appearing fully formed.
 */

interface Row {
  project: Project;
  cover?: string;
  shots: string[];
  slug?: string;
}

export function ProjectIndex({
  rows,
  onSelect,
  selected,
}: {
  rows: Row[];
  onSelect: (id: string) => void;
  selected: string | null;
}) {
  return (
    <ul className="flex flex-col gap-20 sm:gap-24">
      {rows.map(({ project, cover, shots, slug }, i) => {
        const isOpen = selected === project.id;
        const flip = i % 2 === 1;

        return (
          <Reveal as="li" key={project.id} variant="mask">
            <article
              className={`grid items-center gap-8 lg:grid-cols-2 lg:gap-14 ${
                flip ? 'lg:[&>*:first-child]:order-2' : ''
              }`}
            >
              {/* Artwork */}
              <MagneticCard strength={5}>
                <button
                  type="button"
                  onClick={() => onSelect(project.id)}
                  aria-expanded={isOpen}
                  aria-label={`${isOpen ? 'Hide' : 'Show'} details for ${project.title}`}
                  data-cursor={isOpen ? 'Close' : 'Details'}
                  className="group block w-full"
                >
                  <div
                    className={`relative aspect-[16/10] overflow-hidden rounded-xl border bg-raise transition-colors duration-500 ${
                      isOpen ? 'border-accent/50' : 'border-rule'
                    }`}
                  >
                    {cover ? (
                      <Image
                        data-parallax
                        src={cover}
                        alt={`${project.title} screenshot`}
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className={`transition-transform duration-700 ease-out will-change-transform ${
                          project.type === 'web'
                            ? 'object-cover object-top'
                            : 'object-contain p-6'
                        }`}
                      />
                    ) : (
                      <div className="grid h-full place-items-center text-ink-3">
                        <span className="font-mono text-label uppercase">
                          No capture
                        </span>
                      </div>
                    )}
                  </div>
                </button>
              </MagneticCard>

              {/* Text */}
              <div className={flip ? 'lg:order-1' : ''}>
                <div className="mb-4 flex flex-wrap items-center gap-3">
                  <span className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-ink-3 tnum">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="rounded border border-rule bg-raise px-2 py-0.5 font-mono text-[0.62rem] uppercase tracking-[0.08em] text-ink-2">
                    {project.type}
                  </span>
                </div>

                <h3 className="text-h2">
                  <TextHighlight text={project.title} />
                </h3>

                <p className="mt-4 max-w-measure text-ink-2 text-pretty">
                  <TextHighlight text={project.preview} />
                </p>

                <ul className="mt-6 flex flex-wrap gap-2">
                  {project.tech.slice(0, 5).map((t) => (
                    <li
                      key={t}
                      className="rounded border border-rule px-2 py-0.5 font-mono text-[0.68rem] text-ink-3"
                    >
                      {t}
                    </li>
                  ))}
                </ul>

                <div className="mt-7 flex flex-wrap items-center gap-x-7 gap-y-3">
                  <Link
                    href={`/work/${slug}`}
                    data-cursor="Open"
                    className="link-underline text-sm"
                  >
                    View project ↗
                  </Link>
                  <button
                    type="button"
                    onClick={() => onSelect(project.id)}
                    className="font-mono text-[0.62rem] uppercase tracking-[0.12em] text-ink-3 transition-colors duration-200 hover:text-ink"
                  >
                    {isOpen ? '— Close details' : '+ Full detail'}
                  </button>
                  {project.showUrl !== false && project.url && (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-cursor="Visit"
                      className="link-underline text-sm"
                    >
                      {project.urlLabel ?? 'Visit'} ↗
                    </a>
                  )}
                </div>
              </div>
            </article>

            {/* Expands under its own row, not at the foot of the page. */}
            {isOpen && (
              <div className="mt-10 border-t border-accent/40 pt-8">
                <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-14">
                  <div className="space-y-4">
                    {project.description.map((para) => (
                      <p key={para} className="text-sm text-ink-2 text-pretty">
                        <TextHighlight text={para} />
                      </p>
                    ))}

                    <ul className="flex flex-wrap gap-2 pt-2">
                      {project.tech.map((t) => (
                        <li
                          key={t}
                          className="rounded border border-rule bg-raise px-2.5 py-1 font-mono text-xs text-ink-2"
                        >
                          {t}
                        </li>
                      ))}
                    </ul>

                    {project.showUrl !== false && project.secondaryUrl && (
                      <a
                        href={project.secondaryUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-cursor="Visit"
                        className="link-underline inline-block pt-2 text-sm"
                      >
                        {project.secondaryUrlLabel ?? 'Secondary'} ↗
                      </a>
                    )}
                  </div>

                  {shots.length > 1 && (
                    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                      {shots.slice(1).map((src, si) => (
                        <li
                          key={src}
                          className="relative aspect-[16/10] overflow-hidden rounded-lg border border-rule bg-raise"
                        >
                          <Image
                            src={src}
                            alt={`${project.title} screenshot ${si + 2}`}
                            fill
                            sizes="(max-width: 1024px) 100vw, 50vw"
                            className={
                              project.type === 'web'
                                ? 'object-cover object-top'
                                : 'object-contain p-4'
                            }
                          />
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            )}
          </Reveal>
        );
      })}
    </ul>
  );
}
