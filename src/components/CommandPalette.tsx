'use client';

import { motion } from "motion/react";
import { useEffect, useMemo, useState } from "react";
import { searchContent } from "../data/generatedSearchData";
import { useSearch } from "../context/SearchContext";
import SearchResults from "./SearchResults";
import debounce from "lodash/debounce";

interface CommandPaletteProps {
  onClose: () => void;
}

export default function CommandPalette({ onClose }: CommandPaletteProps) {
  const { setActiveSearch } = useSearch();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState(searchContent(""));

  // Built once, not re-created per render. useCallback around a debounce()
  // call memoises a function the linter cannot see the dependencies of, and
  // leaves the pending timer running after unmount.
  const debouncedSearch = useMemo(
    () =>
      debounce((query: string) => {
        setSearchResults(searchContent(query));
      }, 150),
    []
  );

  useEffect(() => () => debouncedSearch.cancel(), [debouncedSearch]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    debouncedSearch(query);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
      setActiveSearch(null);
    }
  };

  const handleClose = () => {
    onClose();
    setActiveSearch(null);
  };

  return (
    <motion.div
      className="fixed inset-0 bg-ground/80 backdrop-blur-md z-50 flex items-start justify-center pt-24 transition-colors duration-200"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={handleClose}
    >
      <motion.div
        className="bg-surface p-6 rounded-xl shadow-2xl w-full max-w-2xl mx-4 border border-rule transition-colors duration-200"
        initial={{ scale: 0.9, y: -20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: -20 }}
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center gap-2 mb-6">
          <svg className="w-5 h-5 text-ink-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search pages and content..."
            className="w-full bg-transparent border-none text-ink placeholder:text-ink-3 focus:outline-none text-lg transition-colors duration-200"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
          />
          <div className="flex items-center gap-2">
            <kbd className="px-2 py-1 text-xs text-ink-2 bg-raise rounded-md transition-colors duration-200">ESC</kbd>
            <button
              onClick={handleClose}
              className="text-ink-2 hover:text-ink transition-colors duration-200"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <SearchResults 
          results={searchResults}
          onClose={handleClose}
          searchQuery={searchQuery}
        />
      </motion.div>
    </motion.div>
  );
}
