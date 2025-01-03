"use client";

import { motion } from "framer-motion";
import { TextHighlight } from "../../components/TextHighlight";
import { socialLinks } from "../../data/contact";

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

export default function Contact() {
  return (
    <div className="bg-white dark:bg-zinc-950">
      {/* Floating Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Email Icon */}
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
            <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </motion.div>

        {/* Connect Icon */}
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
            <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
          </svg>
        </motion.div>

        {/* Social Icon */}
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
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
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
            <TextHighlight text="Get in Touch" />
          </motion.h1>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100px" }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="h-1 bg-violet-500 dark:bg-violet-600 rounded-full mb-12"
          />
        </motion.div>

        <motion.div className="space-y-8" variants={container}>
          <motion.p
            className="text-xl text-gray-600 dark:text-gray-400"
            variants={item}
          >
            <TextHighlight text="I'm always interested in new opportunities and collaborations. Feel free to reach out through any of these channels:" />
          </motion.p>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            variants={container}
          >
            {socialLinks.map((method, index) => (
              <motion.a
                key={index}
                href={method.link}
                target="_blank"
                rel="noopener noreferrer"
                className="p-6 rounded-lg bg-gray-50 dark:bg-zinc-900/50 border border-gray-200 dark:border-zinc-800 hover:border-violet-500/50 dark:hover:border-violet-500/50 transition-all duration-150 group"
                variants={item}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0 0 20px rgba(139, 92, 246, 0.1)",
                }}
              >
                <div className="flex items-center space-x-4">
                  <motion.div
                    className="w-12 h-12 rounded-lg bg-violet-500/10 dark:bg-violet-400/10 flex items-center justify-center text-violet-500 dark:text-violet-400 group-hover:bg-violet-500/20 dark:group-hover:bg-violet-400/20 transition-colors duration-150"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {method.icon}
                  </motion.div>
                  <div>
                    <motion.h3
                      className="text-lg font-semibold text-gray-900 dark:text-white"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                    >
                      <TextHighlight text={method.title} />
                    </motion.h3>
                    <motion.p
                      className="text-gray-600 dark:text-gray-400"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 }}
                    >
                      <TextHighlight text={method.value} />
                    </motion.p>
                  </div>
                </div>
              </motion.a>
            ))}
          </motion.div>

          <motion.div
            className="mt-12 p-6 rounded-lg bg-gray-50 dark:bg-zinc-900/50 border border-gray-200 dark:border-zinc-800"
            variants={item}
            whileHover={{
              scale: 1.01,
              boxShadow: "0 0 20px rgba(139, 92, 246, 0.1)",
            }}
          >
            <motion.h2
              className="text-2xl font-bold text-gray-900 dark:text-white mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <TextHighlight text="Let's Create Something Amazing" />
            </motion.h2>
            <motion.p
              className="text-gray-600 dark:text-gray-400"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <TextHighlight text="Whether you have a project in mind or just want to connect, I'm always open to discussing new opportunities and ideas." />
            </motion.p>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
