'use client';

import { motion } from "framer-motion";
import { TextHighlight } from "../../components/TextHighlight";
import { projects } from "../../data/projects";
import { getProjectImages } from "../../utils/getProjectImages";
import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";

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
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [projectImages, setProjectImages] = useState<{
    images: string[];
    logo: string;
    hasLogo: boolean;
  }>({ images: [], logo: '', hasLogo: false });
  const [isImageLoading, setIsImageLoading] = useState(false);

  // Refs for carousel scrolling
  const webProjectsRef = useRef<HTMLDivElement>(null);
  const mobileProjectsRef = useRef<HTMLDivElement>(null);
  const mainContainerRef = useRef<HTMLDivElement>(null);
  const lastScrollPositionRef = useRef(0);
  const isScrollingRef = useRef(false);

  const scroll = (direction: 'left' | 'right', ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current) {
      const scrollAmount = direction === 'left' ? -400 : 400;
      ref.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // Save scroll position before any state updates
  const handleScroll = useCallback(() => {
    if (mainContainerRef.current && !isScrollingRef.current) {
      lastScrollPositionRef.current = mainContainerRef.current.scrollTop;
    }
  }, []);

  useEffect(() => {
    const container = mainContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, [handleScroll]);

  // Restore scroll position after state updates
  useEffect(() => {
    if (mainContainerRef.current && lastScrollPositionRef.current > 0) {
      isScrollingRef.current = true;
      const container = mainContainerRef.current;
      
      // Use requestAnimationFrame to ensure the scroll happens after the render
      requestAnimationFrame(() => {
        container.scrollTop = lastScrollPositionRef.current;
        // Add a small delay before allowing new scroll positions to be saved
        setTimeout(() => {
          isScrollingRef.current = false;
        }, 100);
      });
    }
  }, [selectedProject, projectImages]);

  const handleProjectClick = useCallback((projectId: string) => {
    // Save the current scroll position before updating state
    if (mainContainerRef.current) {
      lastScrollPositionRef.current = mainContainerRef.current.scrollTop;
    }
    setSelectedProject(projectId);
  }, []);

  useEffect(() => {
    // Handle URL hash for direct navigation
    const hash = window.location.hash.slice(1);
    if (hash && projects.some(p => p.id === hash)) {
      setSelectedProject(hash);
    }
  }, []);

  useEffect(() => {
    if (selectedProject) {
      const loadImages = async () => {
        const images = await getProjectImages(selectedProject);
        setProjectImages(images);
        setCurrentImageIndex(0);
      };
      loadImages();

      // Update URL hash when a project is selected
      window.history.pushState(null, '', `#${selectedProject}`);
    }
  }, [selectedProject]);

  const webProjects = projects.filter(p => p.type === 'web');
  const mobileProjects = projects.filter(p => p.type === 'mobile');

  const currentProject = projects.find(p => p.id === selectedProject);

  const nextImage = () => {
    setIsImageLoading(true);
    setCurrentImageIndex((prev) => 
      prev === projectImages.images.length - 1 ? 0 : prev + 1
    );
  };

  const previousImage = () => {
    setIsImageLoading(true);
    setCurrentImageIndex((prev) => 
      prev === 0 ? projectImages.images.length - 1 : prev - 1
    );
  };

  const handleImageLoad = () => {
    setIsImageLoading(false);
  };

  const ProjectSection = ({ title, projects, carouselRef }: { 
    title: string;
    projects: typeof webProjects;
    carouselRef: React.RefObject<HTMLDivElement>;
  }) => (
    <div className="relative mb-12">
      <h2 className="text-2xl font-semibold mb-4">{title}</h2>
      <div className="relative group">
        <div
          ref={carouselRef}
          className="flex overflow-x-auto gap-4 scroll-smooth no-scrollbar"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          <div className="flex gap-4 px-4">
            {projects.map(project => (
              <motion.div
                key={project.id}
                className={`flex-shrink-0 w-[320px] p-6 rounded-lg cursor-pointer transition-all duration-200 ${
                  selectedProject === project.id
                    ? 'bg-violet-500 dark:bg-violet-600 text-white'
                    : 'bg-white dark:bg-zinc-800/50 border border-gray-200 dark:border-zinc-700 hover:border-violet-500/50 dark:hover:border-violet-500/50'
                }`}
                onClick={() => handleProjectClick(project.id)}
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
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
                    <h3 className="text-lg font-semibold">{project.title}</h3>
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
        </div>
        {projects.length > 2 && (
          <>
            <button
              onClick={() => scroll('left', carouselRef)}
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-white dark:bg-zinc-800 shadow-lg rounded-r-lg p-2 opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-0"
              disabled={carouselRef.current?.scrollLeft === 0}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => scroll('right', carouselRef)}
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-white dark:bg-zinc-800 shadow-lg rounded-l-lg p-2 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}
      </div>
    </div>
  );

  return (
    <div className="bg-white dark:bg-zinc-950">
      <div ref={mainContainerRef} className="max-w-7xl mx-auto px-4 py-20">
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

        <ProjectSection 
          title="Web Projects" 
          projects={webProjects} 
          carouselRef={webProjectsRef} 
        />

        <ProjectSection 
          title="Mobile Projects" 
          projects={mobileProjects} 
          carouselRef={mobileProjectsRef} 
        />

        {selectedProject && (
          <motion.div
            key={selectedProject}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-12 border-t pt-8"
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
                      {isImageLoading && (
                        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-zinc-800">
                          <div className="w-10 h-10 border-4 border-violet-500 border-t-transparent rounded-full animate-spin"></div>
                        </div>
                      )}
                      <Image
                        src={projectImages.images[currentImageIndex]}
                        alt={`${currentProject?.title} screenshot`}
                        fill
                        className={`${currentProject?.type === 'web' ? 'object-fit' : 'object-contain'} ${
                          isImageLoading ? 'opacity-0' : 'opacity-100'
                        }`}
                        onLoad={handleImageLoad}
                      />
                    </motion.div>
                    {projectImages.images.length > 1 && (
                      <>
                        <button
                          onClick={previousImage}
                          className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                          disabled={isImageLoading}
                        >
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                          </svg>
                        </button>
                        <button
                          onClick={nextImage}
                          className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                          disabled={isImageLoading}
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
                      alt={`${currentProject?.title} logo`}
                      width={48}
                      height={48}
                      className="rounded-lg"
                    />
                  )}
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                      {currentProject?.title}
                    </h2>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="px-2 py-1 text-sm rounded-full capitalize bg-violet-500/10 dark:bg-violet-400/10 text-violet-500 dark:text-violet-400">
                        {currentProject?.type}
                      </span>
                      {currentProject?.url && (
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
                {currentProject?.description.map((paragraph, index) => (
                  <p key={index} className="text-gray-600 dark:text-gray-400">
                    {paragraph}
                  </p>
                ))}
              </div>

              <div className="flex flex-wrap gap-2">
                {currentProject?.tech.map(tech => (
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
        )}
      </div>
    </div>
  );
}