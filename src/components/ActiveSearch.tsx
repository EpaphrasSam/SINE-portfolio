'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useSearch } from '../context/SearchContext';

export default function ActiveSearch() {
  const { activeSearch, clearSearch } = useSearch();

  if (!activeSearch) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="fixed top-20 left-1/2 transform -translate-x-1/2 z-40"
      >
        <div className="bg-zinc-900/90 backdrop-blur-sm border border-violet-500/20 rounded-lg shadow-lg px-4 py-2 flex items-center gap-3">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <span className="text-gray-300">
              Showing results for "{activeSearch.query}"
              {activeSearch.section && (
                <span className="text-violet-400 ml-1">
                  in {activeSearch.section}
                </span>
              )}
            </span>
          </div>
          <button
            onClick={clearSearch}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
