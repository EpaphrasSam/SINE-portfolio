'use client';

import { motion } from "framer-motion";
import Image from "next/image";
import { SectionHeader } from "./SectionHeader";

const techStack = [
  {
    name: "React",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  },
  {
    name: "TypeScript",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
  },
  {
    name: "Next.js",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
  },
  {
    name: "Node.js",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  },
  {
    name: "Express",
    customIcon: (
      <svg
        viewBox="0 0 32 32"
        xmlns="http://www.w3.org/2000/svg"
        className="w-12 h-12 fill-gray-900 dark:fill-white"
      >
        <path d="M32 24.795c-1.164.296-1.884.013-2.53-.957l-4.594-6.356-.664-.88-5.365 7.257c-.613.873-1.256 1.253-2.4.944l6.87-9.222-6.396-8.33c1.1-.214 1.86-.105 2.535.88l4.765 6.435 4.8-6.4c.615-.873 1.276-1.205 2.38-.883l-2.48 3.288-3.36 4.375c-.4.5-.345.842.023 1.325L32 24.795zM.008 15.427l.562-2.764C2.1 7.193 8.37 4.92 12.694 8.3c2.527 1.988 3.155 4.8 3.03 7.95H1.48c-.214 5.67 3.867 9.092 9.07 7.346 1.825-.613 2.9-2.042 3.438-3.83.273-.896.725-1.036 1.567-.78-.43 2.236-1.4 4.104-3.45 5.273-3.063 1.75-7.435 1.184-9.735-1.248C1 21.6.434 19.812.18 17.9c-.04-.316-.12-.617-.18-.92q.008-.776.008-1.552zm1.498-.38h12.872c-.084-4.1-2.637-7.012-6.126-7.037-3.83-.03-6.58 2.813-6.746 7.037z"/>
      </svg>
    ),
  },
  {
    name: "MongoDB",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
  },
  {
    name: "Tailwind CSS",
    customIcon: (
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 32 32"
        className="w-12 h-12"
      >
        <path 
          className="fill-[#38bdf8] dark:fill-[#38bdf8]" 
          d="M9 13.7q1.4-5.6 7-5.6c5.6 0 6.3 4.2 9.1 4.9q2.8.7 4.9-2.1-1.4 5.6-7 5.6c-5.6 0-6.3-4.2-9.1-4.9q-2.8-.7-4.9 2.1Zm-7 8.4q1.4-5.6 7-5.6c5.6 0 6.3 4.2 9.1 4.9q2.8.7 4.9-2.1-1.4 5.6-7 5.6c-5.6 0-6.3-4.2-9.1-4.9q-2.8-.7-4.9 2.1Z"
        />
      </svg>
    ),
  },
  {
    name: "Python",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  }
];

// Duplicate the array to create a seamless loop
const DUPLICATE_COUNT = 3;
const extendedTechStack = Array(DUPLICATE_COUNT).fill(techStack).flat();

export function TechStackCarousel() {
  return (
    <div className="w-full overflow-hidden bg-gray-50 dark:bg-zinc-900/50 py-12">
      <div className="max-w-6xl mx-auto px-4">
        
          <SectionHeader title="Tech Stack" subtitle="Technologies I work with" />

        <div className="flex justify-center">
          <div className="relative w-[600px] overflow-hidden">
            {/* Gradient Overlays */}
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-gray-50 dark:from-zinc-900/50 to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-gray-50 dark:from-zinc-900/50 to-transparent z-10" />

            {/* Carousel Track */}
            <motion.div
              className="flex gap-8 py-4"
              initial={{ x: 0 }}
              animate={{
                x: [0, -((techStack.length * 96) * (DUPLICATE_COUNT - 1))]
              }}
              transition={{
                x: {
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear",
                  repeatType: "loop"
                }
              }}
              style={{
                width: `${techStack.length * 96 * DUPLICATE_COUNT}px`
              }}
            >
              {extendedTechStack.map((tech, index) => (
                <div
                  key={`${tech.name}-${index}`}
                  className="flex flex-col items-center gap-2 flex-shrink-0"
                >
                  <div className="relative w-16 h-16 p-2 rounded-xl bg-white dark:bg-zinc-800/50 border border-gray-200 dark:border-zinc-700 hover:border-violet-500/50 dark:hover:border-violet-500/50 transition-all duration-200">
                    {tech.customIcon ? (
                      tech.customIcon
                    ) : (
                      <Image
                        src={tech.icon}
                        alt={tech.name}
                        width={48}
                        height={48}
                        className="w-12 h-12"
                      />
                    )}
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {tech.name}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
