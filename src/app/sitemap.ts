import type { MetadataRoute } from 'next';
import { workEntries } from '../data/work';
import { site } from '../lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const pages = ['', '/about', '/projects', '/skills', '/contact'].map((path) => ({
    url: `${site.url}${path}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: path === '' ? 1 : 0.8,
  }));

  const work = workEntries.map((entry) => ({
    url: `${site.url}/work/${entry.slug}`,
    lastModified: now,
    changeFrequency: 'yearly' as const,
    priority: 0.6,
  }));

  return [...pages, ...work];
}
