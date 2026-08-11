import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Skills',
  description:
    'Languages, frameworks, databases, tooling and cloud services — grouped by what they are for.',
};

export default function SkillsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
