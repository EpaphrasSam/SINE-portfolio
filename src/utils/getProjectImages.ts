'use server';

import fs from "fs";
import path from "path";

export async function getProjectImages(projectId: string) {
  const projectDir = path.join(process.cwd(), 'public', 'images', 'projects', projectId.toLowerCase());
  
  try {
    const files = fs.readdirSync(projectDir);
    const images = files
      .filter(file => file !== 'logo.png' && (file.endsWith('.jpg') || file.endsWith('.png') || file.endsWith('.jpeg')))
      .map(file => `/images/projects/${projectId.toLowerCase()}/${file}`);
    
    const logo = `/images/projects/${projectId.toLowerCase()}/logo.png`;
    
    return {
      images,
      logo,
      hasLogo: files.includes('logo.png')
    };
  } catch (error) {
    return {
      images: [],
      logo: '',
      hasLogo: false
    };
  }
}
