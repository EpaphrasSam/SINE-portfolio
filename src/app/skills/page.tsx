'use client';

import { TextHighlight } from '../../components/TextHighlight';
import { Reveal } from '../../components/Reveal';
import { skills } from '../../data/skills';

export default function SkillsPage() {
  return (
    <>
      <section className="border-b border-rule">
        <div className="mx-auto max-w-shell px-5 pb-16 pt-16 sm:px-8 sm:pb-20 sm:pt-20">
          <p className="rise rise-1 font-mono text-label uppercase text-ink-3">
            Skills
          </p>
          <h1 className="rise rise-2 mt-6 max-w-[16ch] text-h1">
            <TextHighlight text="Tools and where I use them" />
          </h1>
          <p className="rise rise-3 mt-6 max-w-measure text-lg text-ink-2 text-pretty">
            Grouped by what they are for rather than rated out of five.
          </p>
        </div>
      </section>

      {skills.map((category, ci) => (
        <section key={category.id} className="border-b border-rule last:border-0">
          <div className="mx-auto max-w-shell px-5 py-section sm:px-8">
            <div
              id={category.id}
              className="grid gap-8 lg:grid-cols-[16rem_1fr] lg:gap-16"
            >
              <div className="lg:sticky lg:top-28 lg:self-start">
                <span className="font-mono text-label uppercase text-accent tnum">
                  {String(ci + 1).padStart(2, '0')}
                </span>
                <h2 className="mt-3 text-h2">
                  <TextHighlight text={category.title} />
                </h2>
              </div>

              <ul className="grid gap-x-8 gap-y-10 sm:grid-cols-2">
                {category.items.map((skill, i) => (
                  <Reveal as="li" key={skill.name} delay={(i % 2) * 60}>
                    <div className="border-t border-rule-strong pt-4">
                      <h3 className="text-h3">
                        <TextHighlight text={skill.name} />
                      </h3>
                      <p className="mt-2 text-sm text-ink-2 text-pretty">
                        <TextHighlight text={skill.description} />
                      </p>
                    </div>
                  </Reveal>
                ))}
              </ul>
            </div>
          </div>
        </section>
      ))}
    </>
  );
}
