'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { TextHighlight } from '../../components/TextHighlight';
import { ProjectIndex } from '../../components/motion/ProjectIndex';
import { projects } from '../../data/projects';
import { projectData } from '../../data/projectData';
import { slugFor } from '../../data/work';
import type { Project } from '../../types/project';


function images(id: string) {
  return projectData[id] ?? { images: [], logo: '', hasLogo: false };
}

export default function ProjectsPage() {
  const [selected, setSelected] = useState<string | null>(null);

  const web = useMemo(() => projects.filter((p) => p.type === 'web'), []);
  const mobile = useMemo(() => projects.filter((p) => p.type === 'mobile'), []);

  const toRows = (list: Project[]) =>
    list.map((project) => ({
      project,
      cover: images(project.id).images[0],
      shots: images(project.id).images,
      slug: slugFor(project.id),
    }));

  const webRows = useMemo(() => toRows(web), [web]);
  const mobileRows = useMemo(() => toRows(mobile), [mobile]);

  const onSelect = useCallback((id: string) => {
    setSelected((prev) => (prev === id ? null : id));
    if (typeof window !== 'undefined') {
      window.history.replaceState(null, '', `#${id}`);
    }
  }, []);

  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash && projects.some((p) => p.id === hash)) setSelected(hash);
  }, []);

  return (
    <>
      <section className="border-b border-rule">
        <div className="mx-auto max-w-shell px-5 pb-16 pt-16 sm:px-8 sm:pb-20 sm:pt-20">
          <p className="rise rise-1 font-mono text-label uppercase text-ink-3">
            Projects
          </p>
          <h1 className="rise rise-2 mt-6 max-w-[16ch] text-h1">
            <TextHighlight text="Things I have shipped" />
          </h1>
          <p className="rise rise-3 mt-6 max-w-measure text-lg text-ink-2 text-pretty">
            {web.length + mobile.length} projects across fintech, healthcare,
            government and consumer. Four have full case studies.
          </p>
        </div>
      </section>

      <section className="border-b border-rule">
        <div className="mx-auto max-w-shell px-5 py-section sm:px-8">
          <h2 className="mb-8 font-mono text-label font-medium uppercase text-ink-3">
            Web — {web.length}
          </h2>
          <ProjectIndex rows={webRows} onSelect={onSelect} selected={selected} />

          <h2 className="mb-8 mt-24 font-mono text-label font-medium uppercase text-ink-3">
            Mobile — {mobile.length}
          </h2>
          <ProjectIndex rows={mobileRows} onSelect={onSelect} selected={selected} />
        </div>
      </section>
    </>
  );
}
