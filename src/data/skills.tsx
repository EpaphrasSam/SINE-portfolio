import { ReactNode } from "react";

interface SkillItem {
  name: string;
  description: string;
}

interface Skill {
  id: string;
  title: string;
  icon: ReactNode;
  items: SkillItem[];
}

export const highlightedSkills = [
  { name: "Frontend Development", items: ["React", "Next.js", "TypeScript"] },
  { name: "Backend Development", items: ["Node.js", "Express", "Python"] },
  { name: "Cloud Services", items: ["AWS", "Firebase", "PostgreSQL"] },
  { name: "Mobile Development", items: ["React Native", "Expo"] },
];

export const skills: Skill[] = [
  {
    id: "languages",
    title: "Programming Languages",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
        />
      </svg>
    ),
    items: [
      {
        name: "JavaScript",
        description: "Advanced web and mobile application development",
      },
      {
        name: "TypeScript",
        description: "Type-safe application development with modern features",
      },
      {
        name: "Python",
        description: "Backend development and data processing",
      },
      { name: "SQL", description: "Database design and optimization" },
      { name: "Java", description: "Backend services with Spring Boot" },
    ],
  },
  {
    id: "frameworks",
    title: "Frameworks & Libraries",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
        />
      </svg>
    ),
    items: [
      { name: "React", description: "Building interactive user interfaces" },
      {
        name: "Next.js",
        description: "Server-side rendering and static site generation",
      },
      { name: "Vue.js", description: "Progressive JavaScript framework" },
      { name: "Express.js", description: "RESTful API development" },
      { name: "Flask", description: "Python web application framework" },
      {
        name: "React Native",
        description: "Cross-platform mobile development",
      },
      { name: "Spring Boot", description: "Java-based REST API development" },
    ],
  },
  {
    id: "databases",
    title: "Databases",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 7v10c0 2 1.5 3 3.5 3h9c2 0 3.5-1 3.5-3V7c0-2-1.5-3-3.5-3h-9C5.5 4 4 5 4 7zm8 11a2 2 0 100-4 2 2 0 000 4z"
        />
      </svg>
    ),
    items: [
      {
        name: "PostgreSQL",
        description: "Advanced relational database features",
      },
      {
        name: "MongoDB",
        description: "NoSQL database for flexible data structures",
      },
      { name: "MySQL", description: "Relational database management" },
      {
        name: "SQLite",
        description: "Lightweight embedded database for applications",
      },
    ],
  },
  {
    id: "tools",
    title: "Developer Tools",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    ),
    items: [
      { name: "Git", description: "Version control and collaboration" },
      { name: "Docker", description: "Containerization and deployment" },
      { name: "AWS", description: "Cloud computing and services" },
      { name: "Prisma", description: "Next-generation ORM" },
      { name: "Firebase", description: "Backend-as-a-Service platform" },
      { name: "Jest", description: "JavaScript testing framework" },
      { name: "Playwright", description: "End-to-end testing framework" },
    ],
  },
  {
    id: "cloud",
    title: "Cloud Services",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
        />
      </svg>
    ),
    items: [
      {
        name: "AWS",
        description:
          "Cloud computing services and infrastructure",
      },
      {
        name: "Firebase",
        description:
          "Google's platform for building and scaling web and mobile applications",
      },
      {
        name: "Supabase",
        description:
          "Backend-as-a-Service with PostgreSQL and real-time capabilities",
      },
      {
        name: "Appwrite",
        description:
          "Open-source Backend-as-a-Service platform for modern app development",
      },
    ],
  },
];
