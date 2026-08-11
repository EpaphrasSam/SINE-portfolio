import Link from 'next/link';
import { Reveal } from '../components/Reveal';
import { WaveField } from '../components/motion/WaveField';
import { SplitText } from '../components/motion/SplitText';
import { RotatingWord } from '../components/motion/RotatingWord';
import { MirrorCarousel } from '../components/motion/MirrorCarousel';
import { featuredWork } from '../data/work';
import { experiences, education } from '../data/experiences';
import { capabilities, site } from '../lib/site';

function SectionLabel({ children, id }: { children: React.ReactNode; id?: string }) {
  return (
    <h2
      id={id}
      className="mb-10 font-mono text-label font-medium uppercase text-ink-3"
    >
      {children}
    </h2>
  );
}

export default function Home() {
  return (
    <>
      {/* ---------------------------------------------------------- Hero */}
      <section className="relative isolate flex min-h-[100svh] flex-col justify-center overflow-hidden border-b border-rule">
        <WaveField className="opacity-90" />
        <div className="glow left-[6%] top-[10%] h-[40rem] w-[40rem]" aria-hidden="true" />
        <div
          className="glow bottom-[4%] right-[2%] h-[28rem] w-[28rem] opacity-70"
          aria-hidden="true"
        />

        <div className="relative z-10 mx-auto w-full max-w-shell px-5 pb-24 pt-28 sm:px-8">
          {/* A thin metadata line, not a badge — role left, status right. */}
          <div className="rise rise-1 flex items-center justify-between gap-6 border-b border-rule pb-5 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-ink-3">
            <span>{site.role}</span>
            <span className="inline-flex items-center gap-2.5 text-ink-2">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
              </span>
              Available for work
            </span>
          </div>

          {/* The name, at full width. It is the composition, not a label. */}
          <SplitText
            as="h1"
            text="Isaac"
            className="mt-10 block text-hero"
            delay={120}
            stagger={0}
          />
          <SplitText
            as="span"
            text="Epaphras Sam"
            className="-mt-1 block text-hero text-ink-2"
            delay={220}
            stagger={80}
          />

          {/* The line that does the positioning. */}
          <p className="rise rise-3 mt-10 max-w-[24ch] font-display text-2xl font-medium leading-[1.25] tracking-[-0.025em] text-ink sm:max-w-none sm:text-3xl">
            Building software for{' '}
            <RotatingWord
              words={['healthcare', 'fintech', 'government', 'AI infrastructure', 'crypto']}
              className="text-accent"
            />
          </p>

          <p className="rise rise-3 mt-7 max-w-measure text-ink-2 text-pretty">
            Four years of production systems where being wrong has consequences —
            regulated patient records, live funds moving between strangers, and
            infrastructure that has to stay standing.
          </p>

          <div className="rise rise-4 mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
            <a
              href="#work"
              data-cursor="Scroll"
              className="group inline-flex items-center gap-2.5 rounded-md bg-accent px-5 py-2.5 text-sm font-medium text-on-accent transition-transform duration-200 ease-out hover:-translate-y-0.5"
            >
              See the work
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                className="transition-transform duration-300 ease-out group-hover:translate-y-0.5"
              >
                <path d="M12 5v14M6 13l6 6 6-6" />
              </svg>
            </a>
            <a
              href={site.cv}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="Open"
              className="link-underline text-sm"
            >
              Download CV
            </a>
            <a href={`mailto:${site.email}`} data-cursor="Email" className="link-underline text-sm">
              {site.email}
            </a>
          </div>

        </div>

        {/* Scroll cue */}
        <a
          href="#work"
          aria-label="Scroll to work"
          className="rise rise-4 absolute bottom-7 left-1/2 z-10 -translate-x-1/2 text-ink-3 transition-colors duration-300 hover:text-accent"
        >
          <svg
            width="22"
            height="34"
            viewBox="0 0 22 34"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
            aria-hidden="true"
          >
            <rect x="0.7" y="0.7" width="20.6" height="32.6" rx="10.3" />
            <circle cx="11" cy="10" r="1.8" fill="currentColor" stroke="none">
              <animate
                attributeName="cy"
                values="10;22;10"
                dur="2.1s"
                repeatCount="indefinite"
                calcMode="spline"
                keySplines="0.4 0 0.2 1; 0.4 0 0.2 1"
              />
            </circle>
          </svg>
        </a>
      </section>

      {/* -------------------------------------------------- Selected work */}
      <section id="work" className="scroll-mt-20 border-b border-rule py-section">
        <div className="mx-auto mb-14 max-w-shell px-5 sm:px-8">
          <SectionLabel>Selected work</SectionLabel>
          <Reveal variant="mask">
            <h2 className="max-w-[20ch] text-h1">
              Four systems, built where being wrong has consequences.
            </h2>
          </Reveal>
        </div>

        <MirrorCarousel studies={featuredWork} />

        <div className="mx-auto mt-16 max-w-shell px-5 sm:px-8">
          <Link
            href="/projects"
            data-cursor="Browse"
            className="group flex items-center justify-between gap-6 border-t border-rule-strong pt-8 transition-colors duration-300 hover:border-accent"
          >
            <div>
              <p className="font-mono text-label uppercase text-ink-3">
                Everything else
              </p>
              <p className="mt-3 font-display text-2xl font-semibold tracking-[-0.02em] transition-transform duration-500 ease-out group-hover:translate-x-2 sm:text-3xl">
                View all 12 projects
              </p>
            </div>
            <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full border border-rule text-ink-2 transition-all duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-on-accent sm:h-16 sm:w-16">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </span>
          </Link>
        </div>
      </section>

      {/* ---------------------------------------------------- Experience */}
      <section className="border-b border-rule">
        <div className="mx-auto max-w-shell px-5 py-section sm:px-8">
          <SectionLabel>Experience</SectionLabel>

          <ol className="max-w-4xl">
            {experiences.map((exp, i) => (
              <Reveal as="li" key={exp.id} delay={i * 50}>
                <article className="grid gap-3 border-t border-rule py-8 sm:grid-cols-[11rem_1fr] sm:gap-10">
                  <div className="font-mono text-label uppercase text-ink-3 tnum sm:pt-1">
                    {exp.period}
                  </div>
                  <div>
                    <h3 className="text-h3">{exp.title}</h3>
                    <p className="mt-1 text-sm text-accent">{exp.company}</p>
                    <ul className="mt-4 space-y-2">
                      {exp.responsibilities.map((r) => (
                        <li
                          key={r}
                          className="relative pl-5 text-sm text-ink-2 text-pretty before:absolute before:left-0 before:top-[0.62em] before:h-1 before:w-1 before:rounded-full before:bg-rule-strong"
                        >
                          {r}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </Reveal>
            ))}

            <Reveal as="li">
              <article className="grid gap-3 border-y border-rule py-8 sm:grid-cols-[11rem_1fr] sm:gap-10">
                <div className="font-mono text-label uppercase text-ink-3 tnum sm:pt-1">
                  {education.period}
                </div>
                <div>
                  <h3 className="text-h3">{education.degree}</h3>
                  <p className="mt-1 text-sm text-accent">{education.school}</p>
                  <ul className="mt-4 space-y-2">
                    {education.achievements.map((a) => (
                      <li
                        key={a}
                        className="relative pl-5 text-sm text-ink-2 before:absolute before:left-0 before:top-[0.62em] before:h-1 before:w-1 before:rounded-full before:bg-rule-strong"
                      >
                        {a}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </Reveal>
          </ol>
        </div>
      </section>

      {/* -------------------------------------------------- Capabilities */}
      <section className="border-b border-rule">
        <div className="mx-auto max-w-shell px-5 py-section sm:px-8">
          <SectionLabel>Capabilities</SectionLabel>
          <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {capabilities.map((group, i) => (
              <Reveal key={group.label} delay={i * 60}>
                <div className="border-t border-rule-strong pt-5">
                  <h3 className="font-mono text-label uppercase text-accent">
                    {group.label}
                  </h3>
                  <ul className="mt-4 space-y-1.5">
                    {group.items.map((item) => (
                      <li key={item} className="text-sm text-ink-2">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------- Contact */}
      <section>
        <div className="mx-auto max-w-shell px-5 py-section sm:px-8">
          <Reveal>
            <h2 className="max-w-[18ch] text-h1">
              Open to engineering roles.
            </h2>
            <p className="mt-6 max-w-measure text-lg text-ink-2 text-pretty">
              If the work above is the kind of thing your team is building, I&rsquo;d
              like to hear about it.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
              <a
                href={`mailto:${site.email}`}
                className="inline-flex items-center gap-2 rounded-md bg-accent px-5 py-2.5 text-sm font-medium text-on-accent transition-transform duration-200 ease-out hover:-translate-y-0.5"
              >
                Get in touch
              </a>
              <a
                href={site.socials[0].href}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline text-sm"
              >
                GitHub
              </a>
              <a
                href={site.socials[1].href}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline text-sm"
              >
                LinkedIn
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
