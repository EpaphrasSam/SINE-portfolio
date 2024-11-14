import fs from 'fs';
import path from 'path';

interface ProjectImages {
  images: string[];
  logo: string;
  hasLogo: boolean;
}

function generateProjectData() {
  const projectsDir = path.join(process.cwd(), 'public', 'images', 'projects');
  const projectData: Record<string, ProjectImages> = {};

  // Ensure the directory exists
  if (!fs.existsSync(projectsDir)) {
    fs.mkdirSync(projectsDir, { recursive: true });
    return;
  }

  // Get all project directories
  const projects = fs.readdirSync(projectsDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

  // For each project, get its images
  projects.forEach(project => {
    const projectDir = path.join(projectsDir, project);
    const files = fs.readdirSync(projectDir);
    
    const images = files
      .filter(file => file !== 'logo.png' && /\.(jpg|jpeg|png|gif)$/i.test(file))
      .map(file => `/images/projects/${project}/${file}`);

    const hasLogo = files.includes('logo.png');
    const logo = hasLogo ? `/images/projects/${project}/logo.png` : '';

    projectData[project] = {
      images,
      logo,
      hasLogo
    };
  });

  // Write the data to a TypeScript file
  const tsContent = `// This file is auto-generated. Do not edit manually.
// Generated on ${new Date().toISOString()}

export interface ProjectImages {
  images: string[];
  logo: string;
  hasLogo: boolean;
}

export const projectData: Record<string, ProjectImages> = ${JSON.stringify(projectData, null, 2)};
`;

  const outputPath = path.join(process.cwd(), 'src', 'data');
  if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath, { recursive: true });
  }

  fs.writeFileSync(
    path.join(outputPath, 'projectData.ts'),
    tsContent
  );

  console.log('Project data generated successfully!');
}

generateProjectData();
