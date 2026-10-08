import type { ReactElement } from 'react';

export type ProjectType = 'web' | 'mobile';

export interface ProjectLink {
  label: string;
  url: string;
}

export interface Project {
  id: string;
  title: string;
  preview: string;
  description: string[];
  type: ProjectType;
  icon: ReactElement;
  tech: string[];
  url?: string; // Optional primary URL for the project
  urlLabel?: string; // Optional label for the primary URL (e.g. \ App\, \Site\)
  showUrl?: boolean; // If false, hide all links (e.g. for NCCRM); default true when undefined
  secondaryUrl?: string; // Optional secondary URL (e.g. marketing site vs app)
  secondaryUrlLabel?: string; // Optional label for the secondary URL
  links?: ProjectLink[]; // Any number of links; takes precedence over url / secondaryUrl
}
