"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { TextHighlight } from "../components/TextHighlight";
import { TechStackCarousel } from "../components/TechStackCarousel";
import { TypewriterText } from "../components/TypewriterText";
import { SectionHeader } from "../components/SectionHeader";
import Image from "next/image";
import { projects } from "../data/projects";
import { getProjectImages } from "../utils/getProjectImages";
import { Project } from "../types/project";
import { useState, useEffect } from "react";
import { socialLinks } from "../data/contact";
import { highlightedSkills } from "../data/skills";

const navigationCards = [
  {
    title: "About Me",
    description:
      "Learn about my journey, experience, and what drives me as a developer.",
    path: "/about",
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
          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
        />
      </svg>
    ),
  },
  {
    title: "My Projects",
    description: "Explore my portfolio of web and mobile applications.",
    path: "/projects",
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
          d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
        />
      </svg>
    ),
  },
  {
    title: "Skills & Tech",
    description:
      "Discover my technical expertise and the technologies I work with.",
    path: "/skills",
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
          d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
    ),
  },
  {
    title: "Get in Touch",
    description: "Let's connect and discuss potential collaborations.",
    path: "/contact",
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
          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
    ),
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

interface FeaturedProjectCardProps {
  project: Project;
  projectImages: {
    images: string[];
    logo: string;
    hasLogo: boolean;
  };
}

function FeaturedProjectCard({
  project,
  projectImages,
}: FeaturedProjectCardProps) {
  return (
    <motion.div
      className="relative h-64 rounded-lg overflow-hidden bg-white dark:bg-zinc-800/50 border border-gray-200 dark:border-zinc-700"
      whileHover={{
        scale: 1.02,
        boxShadow: "0 0 20px rgba(139, 92, 246, 0.1)",
        borderColor: "rgba(139, 92, 246, 0.5)",
      }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 rounded-lg relative overflow-hidden bg-violet-500/10 dark:bg-violet-400/10">
            {projectImages.hasLogo ? (
              <Image
                src={projectImages.logo}
                alt={`${project.title} logo`}
                fill
                className="object-contain p-2 bg-white"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-violet-500 dark:text-violet-400">
                {project.icon}
              </div>
            )}
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {project.title}
          </h3>
        </div>
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
          {project.preview}
        </p>
        <div className="flex flex-wrap gap-2">
          {project.tech.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 text-sm bg-violet-500/10 dark:bg-violet-400/10 text-violet-600 dark:text-violet-400 rounded-full"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function FeaturedProject({ project }: { project: Project }) {
  const [projectImages, setProjectImages] = useState<{
    images: string[];
    logo: string;
    hasLogo: boolean;
  }>({ images: [], logo: "", hasLogo: false });

  useEffect(() => {
    async function loadImages() {
      const images = await getProjectImages(project.id);
      setProjectImages(images);
    }
    loadImages();
  }, [project.id]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.2 }}
      className="group relative"
    >
      <Link href={`/projects#${project.id}`}>
        <FeaturedProjectCard project={project} projectImages={projectImages} />
      </Link>
    </motion.div>
  );
}

export default function Home() {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-b from-violet-500/5 to-transparent dark:from-violet-400/5" />
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        </div>

        {/* Floating Icons */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Top Right */}
          <motion.div
            className="absolute top-20 right-[20%] text-violet-500/20 dark:text-violet-400/20"
            animate={{
              y: [0, -20, 0],
              rotate: [0, 10, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <svg className="w-24 h-24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
            </svg>
          </motion.div>

          {/* Bottom Left */}
          <motion.div
            className="absolute bottom-20 left-[15%] text-violet-500/20 dark:text-violet-400/20"
            animate={{
              y: [0, 20, 0],
              rotate: [0, -10, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <svg className="w-20 h-20" viewBox="0 0 24 24" fill="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14.447 3.027a.75.75 0 01.527.92l-4.5 16.5a.75.75 0 01-1.448-.394l4.5-16.5a.75.75 0 01.921-.526zM16.72 6.22a.75.75 0 011.06 0l5.25 5.25a.75.75 0 010 1.06l-5.25 5.25a.75.75 0 11-1.06-1.06L21.44 12l-4.72-4.72a.75.75 0 010-1.06l5.25-5.25a.75.75 0 011.06 0z"
              />
            </svg>
          </motion.div>

          {/* Middle Right */}
          <motion.div
            className="absolute top-1/2 right-[10%] text-violet-500/20 dark:text-violet-400/20"
            animate={{
              x: [0, 20, 0],
              rotate: [0, 15, 0],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <svg className="w-16 h-16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M11.7 2.805a.75.75 0 01.6 0A60.65 60.65 0 0122.83 8.72a.75.75 0 01-.231 1.337 49.949 49.949 0 00-9.902 3.912l-.003.002-.34.18a.75.75 0 01-.707 0A50.009 50.009 0 007.5 12.174v-.224c0-.131.067-.248.172-.311a54.614 54.614 0 014.653-2.52.75.75 0 00-.65-1.352 56.129 56.129 0 00-4.78 2.589 1.858 1.858 0 00-.859 1.228 49.803 49.803 0 00-4.634-1.527.75.75 0 01-.231-1.337A60.653 60.653 0 0111.7 2.805z" />
              <path d="M13.06 15.473a48.45 48.45 0 017.666-3.282c.134 1.414.22 2.843.255 4.285a.75.75 0 01-.46.71 47.878 47.878 0 00-8.105 4.342.75.75 0 01-.832 0 47.877 47.877 0 00-8.104-4.342.75.75 0 01-.461-.71c.035-1.442.121-2.87.255-4.286A48.4 48.4 0 016 13.18v1.27a1.5 1.5 0 00-.14 2.508c-.09.38-.222.753-.397 1.11.452.213.901.434 1.346.661a6.729 6.729 0 00.551-1.608 1.5 1.5 0 00.14-2.67v-.645a48.549 48.549 0 013.44 1.668 2.25 2.25 0 002.12 0z" />
              <path d="M4.462 19.462c.42-.419.753-.89 1-1.394.453.213.902.434 1.347.661a6.743 6.743 0 01-1.286 1.794.75.75 0 11-1.06-1.06z" />
            </svg>
          </motion.div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-32 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center space-y-8"
          >
            <motion.h1
              className="text-5xl md:text-7xl font-bold gradient-text"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <TextHighlight text="Isaac Epaphras Nana Sam" />
            </motion.h1>
            <TypewriterText />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex justify-center gap-4"
            >
              <Link
                href="/projects"
                className="px-8 py-3 rounded-lg bg-violet-500 dark:bg-violet-600 text-white hover:bg-violet-600 dark:hover:bg-violet-700 transition-colors duration-200"
              >
                View Projects
              </Link>
              <Link
                href="/contact"
                className="px-8 py-3 rounded-lg border border-gray-300 dark:border-zinc-700 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-zinc-800/50 transition-colors duration-200"
              >
                Get in Touch
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Tech Stack Carousel */}
      <TechStackCarousel />

      {/* Featured Projects */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <SectionHeader
            title="Featured Projects"
            subtitle="Some of my recent web applications that I'm proud of"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects
              .filter((project) => project.type === "web")
              .slice(0, 3)
              .map((project) => (
                <FeaturedProject key={project.id} project={project} />
              ))}
          </div>
        </div>
      </section>

      {/* Skills Overview */}
      <section className="py-20 bg-gray-50 dark:bg-zinc-900/50">
        <div className="max-w-4xl mx-auto px-4">
          <SectionHeader
            title="Skills Overview"
            subtitle="My technical expertise and tools I work with"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {highlightedSkills.map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 rounded-lg bg-white dark:bg-zinc-800/50 border border-gray-200 dark:border-zinc-700"
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  {category.name}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {category.items.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 text-sm bg-violet-500/10 dark:bg-violet-400/10 text-violet-600 dark:text-violet-400 rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Navigation Cards */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <SectionHeader
            title="Explore My Portfolio"
            subtitle="Navigate through different sections to learn more about my work and expertise"
          />
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {navigationCards.map((card, index) => (
              <motion.div
                key={card.path}
                variants={item}
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0 0 20px rgba(139, 92, 246, 0.1)",
                }}
                className="group"
              >
                <Link
                  href={card.path}
                  className="block p-6 rounded-lg bg-white dark:bg-zinc-800/50 border border-gray-200 dark:border-zinc-700 hover:border-violet-500/50 dark:hover:border-violet-500/50 transition-all duration-200 h-full"
                >
                  <div className="w-12 h-12 rounded-lg bg-violet-500/10 dark:bg-violet-400/10 flex items-center justify-center text-violet-500 dark:text-violet-400 transition-colors duration-200 mb-4 group-hover:bg-violet-500 group-hover:text-white dark:group-hover:bg-violet-400 dark:group-hover:text-zinc-900">
                    {card.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {card.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {card.description}
                  </p>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <SectionHeader
            title="Let's Work Together"
            subtitle="I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions."
          />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              <TextHighlight text="I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions." />
            </p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex justify-center gap-4"
            >
              <Link
                href="/contact"
                className="px-8 py-3 rounded-lg bg-violet-500 dark:bg-violet-600 text-white hover:bg-violet-600 dark:hover:bg-violet-700 transition-colors duration-200"
              >
                Get in Touch
              </Link>
              <a
                href="https://github.com/EpaphrasSam"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3 rounded-lg border border-gray-300 dark:border-zinc-700 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-zinc-800/50 transition-colors duration-200"
              >
                View GitHub
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Floating Contact Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1 }}
        className="fixed bottom-8 right-8 z-50"
      >
        <Link
          href="/contact"
          className="flex items-center gap-2 px-6 py-3 bg-violet-500 dark:bg-violet-600 text-white rounded-full hover:bg-violet-600 dark:hover:bg-violet-700 transition-colors duration-200 shadow-lg"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
          <span>Let's Talk</span>
        </Link>
      </motion.div>

      {/* Social Links */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.2 }}
        className="fixed left-8 bottom-8 z-50 flex gap-4"
      >
        {socialLinks.map((link) => (
          <a
            key={link.id}
            href={link.link}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-gray-400 hover:bg-violet-500 hover:text-white dark:hover:bg-violet-600 transition-colors duration-200"
          >
            <span className="sr-only">{link.title}</span>
            {link.icon}
          </a>
        ))}
      </motion.div>
    </div>
  );
}
