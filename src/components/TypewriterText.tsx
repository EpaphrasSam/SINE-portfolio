"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

interface TypewriterTextProps {
  texts?: string[];
}

const defaultTitles = [
  "Software Developer",
  "Frontend Engineer",
  "Backend Developer",
  "Mobile App Developer",
  "Full Stack Developer",
  "UI/UX Enthusiast",
  "Web3 Developer",
];

export function TypewriterText({ texts = defaultTitles }: TypewriterTextProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [text, setText] = useState("");
  const [delta, setDelta] = useState(100);

  useEffect(() => {
    let ticker = setInterval(() => {
      tick();
    }, delta);

    return () => clearInterval(ticker);
  }, [text, isDeleting, currentIndex]);

  const tick = () => {
    const fullText = texts[currentIndex];
    const nextIndex = (currentIndex + 1) % texts.length;

    if (!isDeleting) {
      setText(fullText.substring(0, text.length + 1));
      setDelta(100);

      if (text === fullText) {
        setIsDeleting(true);
        setDelta(2000); // Wait before starting to delete
      }
    } else {
      setText(fullText.substring(0, text.length - 1));
      setDelta(50);

      if (text === "") {
        setIsDeleting(false);
        setCurrentIndex(nextIndex);
        setDelta(500); // Wait before typing next word
      }
    }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={text}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="h-8 flex items-center justify-center"
      >
        <span className="text-xl md:text-2xl text-gray-600 dark:text-gray-400">
          {text}
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{
              duration: 0.5,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            className="inline-block w-0.5 h-6 bg-violet-500 dark:bg-violet-400 ml-1"
          />
        </span>
      </motion.div>
    </AnimatePresence>
  );
}
