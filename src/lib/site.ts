export const site = {
  name: 'Isaac Sam',
  fullName: 'Isaac Epaphras Nana Sam',
  mark: 'SINE',
  role: 'Full-Stack Software Engineer',
  // Canonical origin — drives metadataBase, sitemap, robots and OG image URLs.
  url: 'https://isaacsam.com',
  claim:
    'Building production systems since 2022 where the constraints are real: HIPAA-compliant healthcare, live crypto trading infrastructure, a government crisis-response platform, and AI agent evaluation environments on Kubernetes.',
  summary:
    'Full-stack engineer working mostly in TypeScript, React and Next.js, equally comfortable on the backend. Systems shipped across healthcare, fintech, government and crypto.',
  cv: '/cv/Isaac_Sam_CV.pdf',
  email: 'isinesam@gmail.com',
  socials: [
    { label: 'GitHub', href: 'https://github.com/EpaphrasSam', handle: 'EpaphrasSam' },
    {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/isaac-epaphras-nana-sam',
      handle: 'isaac-epaphras-nana-sam',
    },
    { label: 'Email', href: 'mailto:isinesam@gmail.com', handle: 'isinesam@gmail.com' },
  ],
} as const;

export const nav = [
  { href: '/', label: 'Index' },
  { href: '/about', label: 'About' },
] as const;

/** Compact capability block — replaces the old /skills page. */
export const capabilities = [
  {
    label: 'Languages',
    items: ['TypeScript', 'JavaScript', 'Python', 'SQL'],
  },
  {
    label: 'Frontend',
    items: ['React', 'Next.js', 'Vue 3', 'React Native', 'TailwindCSS'],
  },
  {
    label: 'Backend',
    items: ['Node.js', 'Express', 'Prisma', 'PostgreSQL', 'Firebase'],
  },
  {
    label: 'Infrastructure',
    items: ['Kubernetes / K3s', 'Docker', 'AWS', 'CI/CD', 'Observability'],
  },
] as const;
