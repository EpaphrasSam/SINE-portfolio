'use client';

import { TextHighlight } from '../../components/TextHighlight';
import { Reveal } from '../../components/Reveal';
import { socialLinks } from '../../data/contact';
import { site } from '../../lib/site';

export default function ContactPage() {
  return (
    <>
      <section className="border-b border-rule">
        <div className="mx-auto max-w-shell px-5 pb-16 pt-16 sm:px-8 sm:pb-20 sm:pt-20">
          <p className="rise rise-1 font-mono text-label uppercase text-ink-3">
            Contact
          </p>
          <h1 className="rise rise-2 mt-6 max-w-[14ch] text-h1">
            <TextHighlight text="Open to engineering roles" />
          </h1>
          <p className="rise rise-3 mt-6 max-w-measure text-lg text-ink-2 text-pretty">
            <TextHighlight text="If the work on this site is the kind of thing your team is building, I would like to hear about it. The fastest route is email." />
          </p>

          <div className="rise rise-4 mt-9">
            <a
              href={`mailto:${site.email}`}
              className="inline-flex items-center gap-2 rounded-md bg-accent px-5 py-2.5 text-sm font-medium text-on-accent transition-transform duration-200 ease-out hover:-translate-y-0.5"
            >
              {site.email}
            </a>
          </div>
        </div>
      </section>

      <section className="border-b border-rule">
        <div className="mx-auto max-w-shell px-5 py-section sm:px-8">
          <h2 className="mb-10 font-mono text-label font-medium uppercase text-ink-3">
            Elsewhere
          </h2>

          <ul className="max-w-3xl">
            {socialLinks.map((link, i) => (
              <Reveal as="li" key={link.id} delay={i * 60}>
                <a
                  href={link.link}
                  target={link.link.startsWith('mailto:') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  className="group grid items-baseline gap-2 border-t border-rule py-6 transition-colors duration-200 hover:border-rule-strong sm:grid-cols-[10rem_1fr_auto] sm:gap-8"
                >
                  <span className="font-mono text-label uppercase text-ink-3">
                    {link.title}
                  </span>
                  <span className="text-ink transition-colors duration-200 group-hover:text-accent">
                    <TextHighlight text={link.value} />
                  </span>
                  <span
                    className="text-ink-3 transition-transform duration-300 ease-out group-hover:translate-x-1 group-hover:text-accent"
                    aria-hidden="true"
                  >
                    ↗
                  </span>
                </a>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-shell px-5 py-section sm:px-8">
          <Reveal>
            <div className="grid gap-8 border-t border-rule-strong pt-8 sm:grid-cols-[16rem_1fr] sm:gap-16">
              <h2 className="font-mono text-label uppercase text-ink-3">CV</h2>
              <div>
                <p className="max-w-measure text-ink-2 text-pretty">
                  The full record — roles, dates, and everything not on this site.
                </p>
                <a
                  href={site.cv}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline mt-5 inline-block text-sm"
                >
                  Download CV (PDF) ↗
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
