'use client';

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

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
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
  },
  {
    name: "MongoDB",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
  },
  // {
  //   name: "TailwindCSS",
  //   icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg",
  // },
  {
    name: "Python",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  }
];

export function TechStackCarousel() {
  return (
    <div className="w-full overflow-hidden bg-gray-50 dark:bg-zinc-900/50 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-8"
        >
          Technologies I Work With
        </motion.h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-8">
          {techStack.map((tech, index) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.1 }}
              className="flex flex-col items-center justify-center space-y-2 group"
            >
              <div className="relative w-16 h-16 md:w-20 md:h-20 p-4 rounded-xl bg-white dark:bg-zinc-800/50 border border-gray-200 dark:border-zinc-700 group-hover:border-violet-500/50 dark:group-hover:border-violet-500/50 transition-all duration-200">
                <Image
                  src={tech.icon}
                  alt={tech.name}
                  width={80}
                  height={80}
                  className="filter dark:invert-[.15] transition-transform duration-200"
                />
              </div>
              <span className="text-sm text-gray-600 dark:text-gray-400 group-hover:text-violet-500 dark:group-hover:text-violet-400 transition-colors duration-200">
                {tech.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
