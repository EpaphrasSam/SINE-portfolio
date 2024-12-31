"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { socialLinks } from "../data/contact";
import { navItems } from "../data/routes";

export default function Footer() {
  return (
    <footer className="bg-white/50 dark:bg-zinc-900/50 border-t border-gray-200 dark:border-zinc-800">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <motion.h3
              className="text-2xl font-bold gradient-text"
              whileHover={{ scale: 1.05 }}
            >
              SINE
            </motion.h3>
            <p className="text-gray-600 dark:text-gray-400">
              Software Developer specializing in creating exceptional digital
              experiences
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {navItems.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-gray-600 dark:text-gray-400 hover:text-violet-500 dark:hover:text-violet-400 transition-colors duration-150"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Connect
            </h4>
            <div className="flex space-x-4">
              {socialLinks.map((link) => (
                <motion.a
                  key={link.id}
                  href={link.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-400 hover:text-violet-500 dark:hover:text-violet-400 transition-colors duration-150"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  title={link.title}
                >
                  {link.icon}
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-zinc-800">
          <p className="text-center text-gray-600 dark:text-gray-400">
            {new Date().getFullYear()} SINE. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
