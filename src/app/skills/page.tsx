"use client";

import { motion } from "framer-motion";
import { TextHighlight } from "../../components/TextHighlight";
import { skills } from "../../data/skills";

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

export default function Skills() {
  return (
    <div className="bg-white dark:bg-zinc-950">
      {/* Floating Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Code Pattern */}
        <motion.div
          className="absolute top-20 right-[10%] text-violet-500/10 dark:text-violet-400/10"
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <svg className="w-32 h-32" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14.447 3.027a.75.75 0 01.527.92l-4.5 16.5a.75.75 0 01-1.448-.394l4.5-16.5a.75.75 0 01.921-.526zM16.72 6.22a.75.75 0 011.06 0l5.25 5.25a.75.75 0 010 1.06l-5.25 5.25a.75.75 0 11-1.06-1.06L21.44 12l-4.72-4.72a.75.75 0 010-1.06zm-9.44 0a.75.75 0 010 1.06L2.56 12l4.72 4.72a.75.75 0 11-1.06 1.06L.97 12.53a.75.75 0 010-1.06l5.25-5.25a.75.75 0 011.06 0z" />
          </svg>
        </motion.div>

        {/* Database Pattern */}
        <motion.div
          className="absolute bottom-20 left-[10%] text-violet-500/10 dark:text-violet-400/10"
          animate={{
            y: [0, 20, 0],
            rotate: [0, -5, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <svg className="w-28 h-28" fill="currentColor" viewBox="0 0 24 24">
            <path d="M4 7v10c0 2 1.5 3 3.5 3h9c2 0 3.5-1 3.5-3V7c0-2-1.5-3-3.5-3h-9C5.5 4 4 5 4 7zm8 11a2 2 0 100-4 2 2 0 000 4z" />
          </svg>
        </motion.div>

        {/* Tools Pattern */}
        <motion.div
          className="absolute top-1/2 right-[5%] text-violet-500/10 dark:text-violet-400/10"
          animate={{
            x: [0, 20, 0],
            rotate: [0, 10, 0],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 24 24">
            <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </motion.div>
      </div>

      <motion.div
        className="max-w-4xl mx-auto px-4 py-16 pt-32 relative"
        initial="hidden"
        animate="show"
        variants={container}
      >
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.h1
            className="text-4xl md:text-5xl font-bold gradient-text mb-2"
            variants={item}
          >
            <TextHighlight text="Skills & Expertise" />
          </motion.h1>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100px" }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="h-1 bg-violet-500 dark:bg-violet-600 rounded-full mb-12"
          />
        </motion.div>

        <motion.div className="space-y-12" variants={container}>
          {skills.map((category, index) => (
            <motion.div
              key={category.id}
              id={category.id}
              className="mb-12 last:mb-0"
              variants={item}
            >
              <motion.div
                className="flex items-center space-x-3 mb-6"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <motion.div
                  className="w-10 h-10 rounded-lg bg-violet-500/10 dark:bg-violet-400/10 flex items-center justify-center text-violet-500 dark:text-violet-400"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {category.icon}
                </motion.div>
                <h2 className="text-2xl font-bold text-violet-500 dark:text-violet-400">
                  <TextHighlight text={category.title} />
                </h2>
              </motion.div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {category.items.map((skill, skillIndex) => (
                  <motion.div
                    key={skillIndex}
                    className="p-4 rounded-lg bg-gray-50 dark:bg-zinc-900/50 border border-gray-200 dark:border-zinc-800 hover:border-violet-500/50 dark:hover:border-violet-500/50 transition-all duration-150"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: skillIndex * 0.05 }}
                    whileHover={{
                      scale: 1.02,
                      boxShadow: "0 0 20px rgba(139, 92, 246, 0.1)",
                    }}
                  >
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      <TextHighlight text={skill.name} />
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      <TextHighlight text={skill.description} />
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}
