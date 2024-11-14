'use client';

import { motion } from "framer-motion";
import { TextHighlight } from "../../components/TextHighlight";
import { projects } from "../../lib/projects";
import { getProjectImages } from "../../utils/getProjectImages";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(projects[0].id);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [projectImages, setProjectImages] = useState<{
    images: string[];
    logo: string;
    hasLogo: boolean;
  }>({ images: [], logo: '', hasLogo: false });

  const currentProject = projects.find(p => p.id === selectedProject)!;

  useEffect(() => {
    async function loadImages() {
      const images = await getProjectImages(selectedProject);
      setProjectImages(images);
      setCurrentImageIndex(0);
    }
    loadImages();
  }, [selectedProject]);

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === projectImages.images.length - 1 ? 0 : prev + 1
    );
  };

  const previousImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? projectImages.images.length - 1 : prev - 1
    );
  };

  return (
    <div className="bg-white dark:bg-zinc-950">
      {/* Floating Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Web Icon */}
        <motion.div
          className="absolute top-20 right-[10%] text-violet-500/10 dark:text-violet-400/10"
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 5, 0]
          }}
          transition={{ 
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <svg className="w-32 h-32" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
          </svg>
        </motion.div>

        {/* Mobile Icon */}
        <motion.div
          className="absolute bottom-20 left-[10%] text-violet-500/10 dark:text-violet-400/10"
          animate={{ 
            y: [0, 20, 0],
            rotate: [0, -5, 0]
          }}
          transition={{ 
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <svg className="w-28 h-28" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-20">
      <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.h1 
            className="text-4xl md:text-5xl font-bold gradient-text mb-2"
            variants={item}
          >
            <TextHighlight text="My Projects" />
          </motion.h1>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100px" }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="h-1 bg-violet-500 dark:bg-violet-600 rounded-full mb-12"
          />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Project Navigation */}
          <div className="lg:col-span-1 space-y-4">
            {projects.map((project) => (
              <motion.div
                key={project.id}
                variants={item}
                onClick={() => {
                  setSelectedProject(project.id);
                  setCurrentImageIndex(0);
                }}
                className={`p-6 rounded-lg cursor-pointer transition-all duration-200 ${
                  selectedProject === project.id
                    ? 'bg-violet-500 dark:bg-violet-600 text-white'
                    : 'bg-white dark:bg-zinc-800/50 border border-gray-200 dark:border-zinc-700 hover:border-violet-500/50 dark:hover:border-violet-500/50'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                    selectedProject === project.id
                      ? 'bg-white/20 text-white'
                      : 'bg-violet-500/10 dark:bg-violet-400/10 text-violet-500 dark:text-violet-400'
                  }`}>
                    {project.icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-semibold">{project.title}</h3>
                      <span className={`px-2 py-1 text-xs rounded-full capitalize ${
                        selectedProject === project.id
                          ? 'bg-white/20 text-white'
                          : 'bg-violet-500/10 dark:bg-violet-400/10  text-violet-500 dark:text-violet-400'
                      }`}>
                        {project.type}
                      </span>
                    </div>
                    <p className={`text-sm mt-1 ${
                      selectedProject === project.id
                        ? 'text-white/80'
                        : 'text-gray-600 dark:text-gray-400'
                    }`}>
                      {project.preview}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Project Details */}
          <motion.div
            key={selectedProject}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2 space-y-8"
          >
            {/* Project Images */}
            <div className="space-y-4">
              <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-100 dark:bg-zinc-800">
                {projectImages.images.length > 0 ? (
                  <>
                    <motion.div
                      key={currentImageIndex}
                      initial={{ opacity: 0, x: 100 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      transition={{ duration: 0.3 }}
                      className="relative w-full h-full"
                    >
                      <Image
                        src={projectImages.images[currentImageIndex]}
                        alt={`${currentProject.title} screenshot`}
                        fill
                        className={`${projects.find(p => p.id === selectedProject)!.type === 'web' ? 'object-fit' : 'object-contain'}`}
                      />
                    </motion.div>
                    {projectImages.images.length > 1 && (
                      <>
                        <button
                          onClick={previousImage}
                          className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                        >
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                          </svg>
                        </button>
                        <button
                          onClick={nextImage}
                          className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                        >
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      </>
                    )}
                  </>
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-gray-400 dark:text-gray-600">
                    <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                )}
              </div>
              {projectImages.images.length > 1 && (
                <div className="flex justify-center items-center gap-2">
                  {projectImages.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-200 ${
                        index === currentImageIndex
                          ? 'w-4 bg-violet-500'
                          : 'bg-gray-300 dark:bg-zinc-600 hover:bg-violet-300 dark:hover:bg-violet-700'
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Project Info */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {projectImages.hasLogo && (
                    <Image
                      src={projectImages.logo}
                      alt={`${currentProject.title} logo`}
                      width={48}
                      height={48}
                      className="rounded-lg"
                    />
                  )}
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                      {currentProject.title}
                    </h2>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="px-2 py-1 text-sm rounded-full capitalize bg-violet-500/10 dark:bg-violet-400/10 text-violet-500 dark:text-violet-400">
                        {currentProject.type}
                      </span>
                      {currentProject.url && (
                        <a
                          href={currentProject.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-violet-500 dark:text-violet-400 hover:text-violet-600 dark:hover:text-violet-500"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="prose dark:prose-invert max-w-none">
                {currentProject.description.map((paragraph, index) => (
                  <p key={index} className="text-gray-600 dark:text-gray-400">
                    {paragraph}
                  </p>
                ))}
              </div>

              <div className="flex flex-wrap gap-2">
                {currentProject.tech.map(tech => (
                  <span
                    key={tech}
                    className="px-3 py-1 text-sm bg-violet-500/10 dark:bg-violet-400/10 text-violet-500 dark:text-violet-400 rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
