import type { Project, ProjectLink } from '../types/project';

/**
 * Every outbound link for a project, in display order.
 *
 * Projects can list any number of `links`. Older entries that only set
 * `url` / `secondaryUrl` keep working: those are read as the first two links.
 * `showUrl: false` hides them all.
 */
export function getProjectLinks(project: Project): ProjectLink[] {
  if (project.showUrl === false) return [];
  if (project.links && project.links.length > 0) return project.links;

  const links: ProjectLink[] = [];
  if (project.url) links.push({ label: project.urlLabel ?? 'Visit', url: project.url });
  if (project.secondaryUrl) {
    links.push({ label: project.secondaryUrlLabel ?? 'Secondary', url: project.secondaryUrl });
  }
  return links;
}
