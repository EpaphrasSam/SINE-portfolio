import type { Metadata } from 'next';
import { Reveal } from '../../components/Reveal';
import { summary, experiences, education } from '../../data/experiences';
import { site } from '../../lib/site';

export const metadata: Metadata = {
  title: 'About',
  description: site.summary,
};

export default function About() {
  return (
    <>
      <section className="border-b border-rule">
        <div className="mx-auto max-w-shell px-5 pb-20 pt-16 sm:px-8 sm:pb-24 sm:pt-20">
          <p className="rise rise-1 font-mono text-label uppercase text-ink-3">About</p>
          <h1 className="rise rise-2 mt-6 max-w-[14ch] text-h1">{site.fullName}</h1>

          <div className="rise rise-3 mt-10 max-w-measure space-y-5">
            {summary.map((paragraph) => (
              <p key={paragraph} className="text-lg text-ink-2 text-pretty">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="rise rise-4 mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
            <a
              href={site.cv}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md bg-accent px-5 py-2.5 text-sm font-medium text-on-accent transition-transform duration-200 ease-out hover:-translate-y-0.5"
            >
              Download CV
            </a>
            <a href={`mailto:${site.email}`} className="link-underline text-sm">
              {site.email}
            </a>
          </div>
        </div>
      </section>

      <section className="border-b border-rule">
        <div className="mx-auto max-w-shell px-5 py-section sm:px-8">
          <h2 className="mb-10 font-mono text-label font-medium uppercase text-ink-3">
            Experience
          </h2>

          <ol className="max-w-4xl">
            {experiences.map((exp, i) => (
              <Reveal as="li" key={exp.id} delay={i * 50}>
                <article
                  id={exp.id}
                  className="grid gap-3 border-t border-rule py-8 sm:grid-cols-[11rem_1fr] sm:gap-10"
                >
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
          </ol>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-shell px-5 py-section sm:px-8">
          <h2 className="mb-10 font-mono text-label font-medium uppercase text-ink-3">
            Education
          </h2>

          <Reveal>
            <article
              id={education.id}
              className="grid max-w-4xl gap-3 border-t border-rule py-8 sm:grid-cols-[11rem_1fr] sm:gap-10"
            >
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
        </div>
      </section>
    </>
  );
}
