'use client';

import { useSearch } from '../context/SearchContext';
import React, { useEffect } from 'react';

export function useGlobalHighlight() {
  const { activeSearch } = useSearch();

  useEffect(() => {
    if (!activeSearch?.query) return;

    // Function to highlight text in a node
    const highlightText = (node: Node) => {
      if (node.nodeType === Node.TEXT_NODE && node.textContent) {
        const text = node.textContent;
        const regex = new RegExp(`(${activeSearch.query})`, 'gi');
        if (regex.test(text)) {
          const span = document.createElement('span');
          span.innerHTML = text.replace(regex, '<span class="bg-violet-500/30 text-violet-200 px-1 rounded">$1</span>');
          span.className = 'search-highlight-wrapper';
          node.parentNode?.replaceChild(span, node);
        }
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        // Skip search results and already highlighted content
        if (
          (node as Element).classList?.contains('search-results') ||
          (node as Element).classList?.contains('search-highlight-wrapper')
        ) {
          return;
        }
        Array.from(node.childNodes).forEach(highlightText);
      }
    };

    // Remove existing highlights
    const removeHighlights = () => {
      document.querySelectorAll('.search-highlight-wrapper').forEach(el => {
        if (el.textContent) {
          el.parentNode?.replaceChild(document.createTextNode(el.textContent), el);
        }
      });
    };

    // Apply new highlights
    const applyHighlights = () => {
      removeHighlights();
      if (activeSearch.query) {
        const content = document.querySelector('main');
        if (content) {
          Array.from(content.childNodes).forEach(highlightText);
        }
      }
    };

    // Apply highlights with a small delay to ensure content is loaded
    const timeout = setTimeout(applyHighlights, 100);

    return () => {
      clearTimeout(timeout);
      removeHighlights();
    };
  }, [activeSearch?.query]);
}

export function GlobalHighlight({ children }: { children: React.ReactNode }) {
  useGlobalHighlight();
  return <>{children}</>;
}
