'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

interface SearchContextType {
  activeSearch: {
    query: string;
    section?: string;
    elementId?: string;
  } | null;
  setActiveSearch: (search: { query: string; section?: string; elementId?: string; } | null) => void;
  clearSearch: () => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export function SearchProvider({ children }: { children: React.ReactNode }) {
  const [activeSearch, setActiveSearch] = useState<{ query: string; section?: string; elementId?: string; } | null>(null);
  const pathname = usePathname();

  // Clear search when navigating to a different page
  useEffect(() => {
    setActiveSearch(null);
  }, [pathname]);

  const clearSearch = () => {
    setActiveSearch(null);
  };

  return (
    <SearchContext.Provider value={{ activeSearch, setActiveSearch, clearSearch }}>
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
}
