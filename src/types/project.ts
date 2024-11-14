export type ProjectType = 'web' | 'mobile';

export interface Project {
  id: string;
  title: string;
  preview: string;
  description: string[];
  type: ProjectType;
  icon: JSX.Element;
  tech: string[];
  url?: string; // Optional URL for web projects
}
