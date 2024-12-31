"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { TextHighlight } from "./TextHighlight";
import { useSearch } from "../context/SearchContext";
import { SearchResultType } from "../data/generatedSearchData";
import React from "react";

interface SearchResultsProps {
  results: SearchResultType[];
  onClose: () => void;
  searchQuery: string;
}

const getPageName = (path: string) => {
  if (path === "/") return "Home";
  return path
    .slice(1)
    .split("/")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" › ");
};

export default function SearchResults({
  results,
  onClose,
  searchQuery,
}: SearchResultsProps) {
  const { setActiveSearch } = useSearch();
  const [sortedResults, setSortedResults] = React.useState<{
    pageResults: SearchResultType[];
    contentResults: SearchResultType[];
  }>({ pageResults: [], contentResults: [] });

  // Debounce search query updates
  const debouncedSearchQuery = React.useRef(searchQuery);
  React.useEffect(() => {
    const timer = setTimeout(() => {
      debouncedSearchQuery.current = searchQuery;
      // Sort results when debounced query updates
      const sortResults = (results: SearchResultType[]) => {
        const searchTerms = searchQuery
          .toLowerCase()
          .split(/\s+/)
          .filter(Boolean);

        return results.sort((a, b) => {
          // First, prioritize exact matches in title
          const aExactMatch = searchTerms.some(
            (term) => a.title.toLowerCase() === term
          );
          const bExactMatch = searchTerms.some(
            (term) => b.title.toLowerCase() === term
          );
          if (aExactMatch && !bExactMatch) return -1;
          if (!aExactMatch && bExactMatch) return 1;

          // Then, prioritize matches in title
          const aTitleMatches = searchTerms.filter((term) =>
            a.title.toLowerCase().includes(term)
          ).length;
          const bTitleMatches = searchTerms.filter((term) =>
            b.title.toLowerCase().includes(term)
          ).length;
          if (aTitleMatches !== bTitleMatches)
            return bTitleMatches - aTitleMatches;

          // Finally, prioritize shorter paths (home page and main sections)
          return a.path.length - b.path.length;
        });
      };

      const pageResults = sortResults(results.filter((r) => r.type === "page"));
      const contentResults = sortResults(
        results.filter((r) => r.type === "content")
      );
      setSortedResults({ pageResults, contentResults });
    }, 150); // Small debounce delay

    return () => clearTimeout(timer);
  }, [results, searchQuery]);

  const handleResultClick = React.useCallback(
    (result: SearchResultType) => {
      setActiveSearch({
        query: debouncedSearchQuery.current,
        elementId: result.elementId,
      });

      // Close search immediately to avoid UI jumping
      onClose();

      // Handle navigation and scrolling
      setTimeout(() => {
        // If there's a hash in the path, use it as the elementId
        const hashMatch = result.path.match(/#(.+)$/);
        const elementId = hashMatch ? hashMatch[1] : result.elementId;

        if (elementId) {
          const element = document.getElementById(elementId);
          if (element) {
            // Add highlight class
            element.classList.add("section-highlight");

            // Calculate offset based on navbar height
            const navbarHeight = 80;

            // Get element position
            const elementPosition =
              element.getBoundingClientRect().top + window.pageYOffset;

            // Scroll to element with smooth behavior
            window.scrollTo({
              top: elementPosition - navbarHeight - 20,
              behavior: "smooth",
            });

            // Remove highlight after animation
            setTimeout(() => {
              element.classList.remove("section-highlight");
            }, 2000);
          }
        }

        // If we're on the projects page and clicking a project result,
        // update the URL without navigation
        const currentPath = window.location.pathname;
        if (
          currentPath === "/projects" &&
          result.path.startsWith("/projects#")
        ) {
          window.history.pushState(null, "", result.path);
          // Trigger a popstate event to notify the page of the change
          window.dispatchEvent(new PopStateEvent("popstate"));
        }
      }, 100);
    },
    [onClose, setActiveSearch]
  );

  if (!searchQuery) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center text-gray-600 dark:text-gray-400 py-8"
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
        className="text-center text-gray-600 dark:text-gray-400 py-8"
      >
        No results found for &quot;{searchQuery}&quot;
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-4 max-h-[60vh] overflow-y-auto"
    >
      <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        Found {results.length} result{results.length !== 1 ? "s" : ""} for
        &quot;{searchQuery}&quot;
      </div>

      {/* Results container with fixed height to prevent layout shifts */}
      <div className="space-y-4 min-h-[100px]">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={searchQuery}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="space-y-4"
          >
            {/* Page Results */}
            {sortedResults.pageResults.map((result, index) => (
              <motion.div
                key={`page-${result.path}-${index}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.03 }}
                className="group"
              >
                <Link
                  href={result.path}
                  onClick={() => handleResultClick(result)}
                  className="block p-4 rounded-lg bg-gray-50 dark:bg-zinc-800/50 hover:bg-violet-500/10 dark:hover:bg-violet-400/10 border border-gray-200 dark:border-zinc-700 hover:border-violet-500/50 dark:hover:border-violet-400/50 transition-all duration-150"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      <TextHighlight
                        text={result.title}
                        highlight={searchQuery}
                      />
                    </h3>
                    <span className="text-sm text-violet-500 dark:text-violet-400 px-2 py-1 rounded-full bg-violet-50 dark:bg-violet-900/20">
                      Page
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}

            {/* Content Results */}
            {sortedResults.contentResults.map((result, index) => (
              <motion.div
                key={`content-${result.path}-${result.elementId}-${index}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: (index + sortedResults.pageResults.length) * 0.03,
                }}
                className="group"
              >
                <Link
                  href={result.path}
                  onClick={() => handleResultClick(result)}
                  className="block p-4 rounded-lg bg-gray-50 dark:bg-zinc-800/50 hover:bg-violet-500/10 dark:hover:bg-violet-400/10 border border-gray-200 dark:border-zinc-700 hover:border-violet-500/50 dark:hover:border-violet-400/50 transition-all duration-150"
                >
                  <div className="text-gray-900 dark:text-white">
                    <div className="font-medium mb-2">
                      <TextHighlight
                        text={result.title}
                        highlight={searchQuery}
                      />
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      <TextHighlight
                        text={result.preview}
                        highlight={searchQuery}
                      />
                    </div>
                  </div>
                  <div className="text-xs text-violet-500 dark:text-violet-400 mt-2">
                    Found in {getPageName(result.path)}
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
