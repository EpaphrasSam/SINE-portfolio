import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Reveal } from '../../../components/Reveal';
import { workEntries, getWork } from '../../../data/work';

export function generateStaticParams() {
  return workEntries.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const entry = getWork(slug);
  if (!entry) return {};

  return {
    title: entry.project.title,
    description: entry.project.preview,
    openGraph: {
      title: entry.project.title,
      description: entry.project.preview,
      images: entry.images[0] ? [entry.images[0]] : undefined,
    },
  };
}

function Block({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <section className="grid gap-4 border-t border-rule py-10 sm:grid-cols-[11rem_1fr] sm:gap-10">
      <h2 className="font-mono text-label uppercase text-ink-3 sm:pt-1">{label}</h2>
      <div className="max-w-measure">{children}</div>
    </section>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="font-mono text-label uppercase text-ink-3">{label}</dt>
      <dd className="mt-1.5 text-sm text-ink">{value}</dd>
    </div>
  );
}

export default async function WorkPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = getWork(slug);
  if (!entry) notFound();

  const { project, detail, images } = entry;
  const index = workEntries.findIndex((e) => e.slug === entry.slug);
  const next = workEntries[(index + 1) % workEntries.length];
  const showLinks = project.showUrl !== false;

  return (
    <article>
      <header className="border-b border-rule">
        <div className="mx-auto max-w-shell px-5 pb-16 pt-14 sm:px-8 sm:pb-20 sm:pt-16">
          <Link
            href="/projects"
            className="font-mono text-label uppercase text-ink-3 transition-colors duration-200 hover:text-ink"
          >
            ← All projects
          </Link>

          <h1 className="rise rise-1 mt-8 max-w-[16ch] text-h1">{project.title}</h1>

          <p className="rise rise-2 mt-6 max-w-measure text-lg text-ink-2 text-pretty">
            {project.preview}
          </p>

          <dl className="rise rise-3 mt-10 grid max-w-3xl grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-4">
            <Fact label="Type" value={project.type === 'web' ? 'Web' : 'Mobile'} />
            {detail.domain && <Fact label="Domain" value={detail.domain} />}
            {detail.status && <Fact label="Status" value={detail.status} />}
            {detail.org && <Fact label="Built at" value={detail.org} />}
            {detail.period && <Fact label="Period" value={detail.period} />}
          </dl>

          {showLinks && (project.url || project.secondaryUrl) && (
            <div className="rise rise-4 mt-8 flex flex-wrap gap-x-7 gap-y-3">
              {project.url && (
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
              {project.secondaryUrl && (
                <a
                  href={project.secondaryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="Visit"
                  className="link-underline text-sm"
                >
                  {project.secondaryUrlLabel ?? 'Secondary'} ↗
                </a>
              )}
            </div>
          )}
        </div>
      </header>

      {images[0] && (
        <div className="border-b border-rule">
          <div className="mx-auto max-w-shell px-5 py-14 sm:px-8">
            <Reveal>
              <div className="relative aspect-[16/9] overflow-hidden rounded-lg border border-rule bg-raise">
                <Image
                  src={images[0]}
                  alt={`${project.title} screenshot`}
                  fill
                  sizes="(max-width: 1152px) 100vw, 1152px"
                  className={
                    project.type === 'web'
                      ? 'object-cover object-top'
                      : 'object-contain p-6'
                  }
                  priority
                />
              </div>
            </Reveal>
          </div>
        </div>
      )}

      <div className="mx-auto max-w-shell px-5 pb-section pt-6 sm:px-8">
        <Reveal>
          <Block label="Overview">
            <div className="space-y-4">
              {project.description.map((para) => (
                <p key={para} className="text-ink-2 text-pretty">
                  {para}
                </p>
              ))}
            </div>
          </Block>
        </Reveal>

        {detail.constraint && (
          <Reveal>
            <Block label="The constraint">
              <p className="text-ink-2 text-pretty">{detail.constraint}</p>
            </Block>
          </Reveal>
        )}

        {detail.owned && detail.owned.length > 0 && (
          <Reveal>
            <Block label="What I owned">
              <ul className="space-y-2.5">
                {detail.owned.map((item) => (
                  <li
                    key={item}
                    className="relative pl-5 text-ink-2 text-pretty before:absolute before:left-0 before:top-[0.68em] before:h-1 before:w-1 before:rounded-full before:bg-accent"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </Block>
          </Reveal>
        )}

        <Reveal>
          <Block label="Stack">
            <ul className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <li
                  key={t}
                  className="rounded border border-rule bg-raise px-2.5 py-1 font-mono text-xs text-ink-2"
                >
                  {t}
                </li>
              ))}
            </ul>
          </Block>
        </Reveal>

        {images.length > 1 && (
          <Reveal>
            <Block label="More">
              <ul className="grid gap-4 sm:grid-cols-2">
                {images.slice(1).map((src, i) => (
                  <li
                    key={src}
                    className="relative aspect-[16/10] overflow-hidden rounded-lg border border-rule bg-raise"
                  >
                    <Image
                      src={src}
                      alt={`${project.title} screenshot ${i + 2}`}
                      fill
                      sizes="(max-width: 640px) 100vw, 50vw"
                      className={
                        project.type === 'web'
                          ? 'object-cover object-top'
                          : 'object-contain p-4'
                      }
                    />
                  </li>
                ))}
              </ul>
            </Block>
          </Reveal>
        )}

        <Reveal>
          <Link
            href={`/work/${next.slug}`}
            data-cursor="Next"
            className="group mt-8 flex items-baseline justify-between gap-6 border-t border-rule-strong pt-8 transition-colors duration-300 hover:border-accent"
          >
            <span className="font-mono text-label uppercase text-ink-3">Next project</span>
            <span className="text-h2 transition-transform duration-500 ease-out group-hover:-translate-x-1.5">
              {next.project.title} →
            </span>
          </Link>
        </Reveal>
      </div>
    </article>
  );
}
