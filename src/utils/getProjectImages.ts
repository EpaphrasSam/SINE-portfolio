import { projectData } from '../data/projectData';

interface ProjectImages {
  images: string[];
  logo: string;
  hasLogo: boolean;
}

// Cache for preloaded images
const imageCache = new Map<string, HTMLImageElement>();

// Preload a single image and cache it
function preloadImage(src: string): Promise<void> {
  if (imageCache.has(src)) {
    return Promise.resolve();
  }

  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      imageCache.set(src, img);
      resolve();
    };
    img.onerror = reject;
    img.src = src;
  });
}

// Preload multiple images concurrently
async function preloadImages(srcs: string[]): Promise<void> {
  const promises = srcs.map(src => preloadImage(src));
  await Promise.all(promises);
}

export async function getProjectImages(projectId: string): Promise<ProjectImages> {
  const projectKey = projectId;
  const projectImages = projectData[projectKey] || {
    images: [],
    logo: '',
    hasLogo: false
  };

  try {
    // Start preloading all images including the logo
    const imagesToPreload = [...projectImages.images];
    if (projectImages.hasLogo) {
      imagesToPreload.push(projectImages.logo);
    }

    // Also preload images from the next project if available
    const projects = Object.keys(projectData);
    const currentIndex = projects.indexOf(projectId);
    if (currentIndex !== -1 && currentIndex < projects.length - 1) {
      const nextProject = projectData[projects[currentIndex + 1]];
      if (nextProject) {
        imagesToPreload.push(...nextProject.images);
        if (nextProject.hasLogo) {
          imagesToPreload.push(nextProject.logo);
        }
      }
    }

    // Preload all images concurrently
    await preloadImages(imagesToPreload);
  } catch (error) {
    console.warn('Error preloading images:', error);
  }

  return projectImages;
}
