const fs = require('fs');
const path = require('path');

function generateImageMap() {
  const projectsDir = path.join(process.cwd(), 'public', 'images', 'projects');
  const projectImagesMap = {};

  // Get all project directories
  const projects = fs.readdirSync(projectsDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

  // For each project, get its images
  projects.forEach(project => {
    const projectDir = path.join(projectsDir, project);
    const images = fs.readdirSync(projectDir)
      .filter(file => file !== 'logo.png' && /\.(jpg|jpeg|png|gif)$/i.test(file))
      .map(file => `/images/projects/${project}/${file}`);

    projectImagesMap[project] = images;
  });

  // Write the map to a TypeScript file
  const tsContent = `// This file is auto-generated. Do not edit manually.
export const projectImagesMap: Record<string, string[]> = ${JSON.stringify(projectImagesMap, null, 2)};
`;

  fs.writeFileSync(
    path.join(process.cwd(), 'src', 'utils', 'projectImagesMap.ts'),
    tsContent
  );
}

generateImageMap();
