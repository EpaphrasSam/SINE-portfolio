import { projectData } from '../data/projectData';

interface ProjectImages {
  images: string[];
  logo: string;
  hasLogo: boolean;
}

export function getProjectImages(projectId: string): ProjectImages {
  const projectKey = projectId;  
  return projectData[projectKey] || {
    images: [],
    logo: '',
    hasLogo: false
  };
}
