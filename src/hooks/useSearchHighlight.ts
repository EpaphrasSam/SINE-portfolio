'use client';

import { useEffect } from 'react';
import { useSearch } from '../context/SearchContext';

export function useSearchHighlight() {
  const { activeSearch, clearSearch } = useSearch();

  useEffect(() => {
    if (!activeSearch?.elementId) return;

    const element = document.getElementById(activeSearch.elementId);
    if (!element) return;

    // Add highlight class
    element.classList.add('search-highlight');

    // Scroll to element with offset for navbar
    const navbarHeight = 80; // Adjust this value based on your navbar height
    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
    window.scrollTo({
      top: elementPosition - navbarHeight,
      behavior: 'smooth'
    });

    // Remove highlight after some time
    const timeout = setTimeout(() => {
      element.classList.remove('search-highlight');
    }, 5000);

    return () => {
      clearTimeout(timeout);
      element.classList.remove('search-highlight');
    };
  }, [activeSearch?.elementId]);

  return { isHighlighted: !!activeSearch?.elementId };
}
