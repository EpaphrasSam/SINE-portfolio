'use client';

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { TextHighlight } from "./TextHighlight";
import { useSearch } from "../context/SearchContext";
import { SearchResultType } from "../data/generatedSearchData";
import React from 'react';

interface SearchResultsProps {
  results: SearchResultType[];
  onClose: () => void;
  searchQuery: string;
}

const getPageName = (path: string) => {
  if (path === '/') return 'Home';
  return path.slice(1).split('/').map(part => 
    part.charAt(0).toUpperCase() + part.slice(1)
  ).join(' › ');
};

export default function SearchResults({ results, onClose, searchQuery }: SearchResultsProps) {
  const { setActiveSearch } = useSearch();

  // Set activeSearch whenever searchQuery changes
  React.useEffect(() => {
    if (searchQuery) {
      setActiveSearch({ query: searchQuery });
    } else {
      setActiveSearch(null);
    }
  }, [searchQuery, setActiveSearch]);

  const handleResultClick = (result: SearchResultType) => {
    setActiveSearch({
      query: searchQuery,
      elementId: result.elementId
    });

    // If there's an elementId, scroll to it after navigation
    if (result.elementId) {
      // Use a longer timeout to ensure the page has loaded
      setTimeout(() => {
        const element = document.getElementById(result.elementId!);
        if (element) {
          // Add highlight class
          element.classList.add('section-highlight');
          
          // Calculate offset based on navbar height
          const navbarHeight = 80;
          
          // Get element position
          const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
          
          // Scroll to element with smooth behavior
          window.scrollTo({
            top: elementPosition - navbarHeight - 20, // Add extra padding
            behavior: 'smooth'
          });

          // Remove highlight after animation
          setTimeout(() => {
            element.classList.remove('section-highlight');
          }, 2000);
        }
      }, 500); // Increased timeout to ensure page load
    }

    onClose();
  };

  if (searchQuery === "") {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center text-gray-600 dark:text-gray-400 py-8 transition-colors duration-150"
      >
        Start typing to search...
      </motion.div>
    );
  }

  if (results.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center text-gray-600 dark:text-gray-400 py-8 transition-colors duration-150"
      >
        No results found for &quot;{searchQuery}&quot;
      </motion.div>
    );
  }

  // Separate pages and content
  const pageResults = results.filter(r => r.type === 'page');
  const contentResults = results.filter(r => r.type === 'content');

  // Sort content results by whether they have matches in the title
  const searchTerms = searchQuery.toLowerCase().split(/\s+/).filter(Boolean);
  contentResults.sort((a, b) => {
    const aHasTitleMatch = searchTerms.some(term => a.title.toLowerCase().includes(term));
    const bHasTitleMatch = searchTerms.some(term => b.title.toLowerCase().includes(term));
    if (aHasTitleMatch && !bHasTitleMatch) return -1;
    if (!aHasTitleMatch && bHasTitleMatch) return 1;
    return 0;
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-4 max-h-[60vh] overflow-y-auto"
    >
      <div className="text-sm text-gray-600 dark:text-gray-400 mb-4 transition-colors duration-150">
        Found {results.length} result{results.length !== 1 ? 's' : ''} for &quot;{searchQuery}&quot;
      </div>
      <AnimatePresence>
        {/* Page Results */}
        {pageResults.map((result, index) => (
          <motion.div
            key={`page-${index}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ delay: index * 0.05 }}
            className="group"
          >
            <Link
              href={result.path}
              onClick={() => handleResultClick(result)}
              className="block p-4 rounded-lg bg-gray-50 dark:bg-zinc-800/50 hover:bg-violet-500/10 dark:hover:bg-violet-400/10 border border-gray-200 dark:border-zinc-700 hover:border-violet-500/50 dark:hover:border-violet-400/50 transition-all duration-150"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white transition-colors duration-150">
                  <TextHighlight text={result.title} />
                </h3>
                <span className="text-sm text-violet-500 dark:text-violet-400 px-2 py-1 rounded-full bg-violet-50 dark:bg-violet-900/20">
                  Page
                </span>
              </div>
            </Link>
          </motion.div>
        ))}

        {/* Content Results */}
        {contentResults.map((result, index) => (
          <motion.div
            key={`content-${index}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ delay: (index + pageResults.length) * 0.05 }}
            className="group"
          >
            <Link
              href={result.path}
              onClick={() => handleResultClick(result)}
              className="block p-4 rounded-lg bg-gray-50 dark:bg-zinc-800/50 hover:bg-violet-500/10 dark:hover:bg-violet-400/10 border border-gray-200 dark:border-zinc-700 hover:border-violet-500/50 dark:hover:border-violet-400/50 transition-all duration-150"
            >
              <div className="text-gray-900 dark:text-white transition-colors duration-150">
                <div className="font-medium mb-2">
                  <TextHighlight text={result.title} />
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  <TextHighlight text={result.preview} />
                </div>
              </div>
              <div className="text-xs text-violet-500 dark:text-violet-400 mt-2">
                Found in {getPageName(result.path)}
              </div>
            </Link>
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
}
