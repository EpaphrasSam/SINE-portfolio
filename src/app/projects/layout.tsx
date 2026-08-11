import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'Twelve shipped projects across fintech, healthcare, government and consumer — web and mobile.',
};

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
