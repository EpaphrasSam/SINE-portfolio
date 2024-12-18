'use client';

import { useSearch } from '../context/SearchContext';
import React from 'react';

interface TextHighlightProps {
  text: string;
  className?: string;
}

export function TextHighlight({ text, className = '' }: TextHighlightProps) {
  const { activeSearch } = useSearch();

  if (!activeSearch?.query) {
    return <span className={className}>{text}</span>;
  }

  const escapeRegExp = (string: string) => {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  };

  try {
    // Split query into words and escape each
    const searchTerms = activeSearch.query.toLowerCase()
      .split(/\s+/)  // Split on any whitespace
      .map(term => term.trim())
      .filter(term => term.length > 0)
      .map(escapeRegExp);
    
    if (searchTerms.length === 0) {
      return <span className={className}>{text}</span>;
    }

    // First, find all matches for all terms
    const allMatches: { term: string, index: number }[] = [];
    searchTerms.forEach(term => {
      const regex = new RegExp(term, 'gi');
      let match;
      while ((match = regex.exec(text.toLowerCase())) !== null) {
        allMatches.push({ term, index: match.index });
      }
    });

    // If no matches, return original text
    if (allMatches.length === 0) {
      return <span className={className}>{text}</span>;
    }

    // Sort matches by index
    allMatches.sort((a, b) => a.index - b.index);

    // Create parts with context
    const parts: { text: string; isMatch: boolean }[] = [];
    let lastIndex = 0;

    allMatches.forEach((match, i) => {
      const matchText = text.slice(match.index, match.index + match.term.length);
      
      // Add text before this match
      if (match.index > lastIndex) {
        // If there's a gap between matches, add ellipsis for gaps longer than 40 chars
        const beforeText = text.slice(lastIndex, match.index);
        if (beforeText.length > 40) {
          parts.push({ text: '...', isMatch: false });
        } else {
          parts.push({ text: beforeText, isMatch: false });
        }
      }

      // Add the matched text
      parts.push({ text: matchText, isMatch: true });
      lastIndex = match.index + match.term.length;
    });

    // Add remaining text (with possible truncation)
    if (lastIndex < text.length) {
      const remainingText = text.slice(lastIndex);
      if (remainingText.length > 40) {
        parts.push({ text: remainingText.slice(0, 40) + '...', isMatch: false });
      } else {
        parts.push({ text: remainingText, isMatch: false });
      }
    }

    return (
      <span className={className}>
        {parts.map((part, i) => 
          part.isMatch ? (
            <span 
              key={i} 
              className="bg-violet-500/30 dark:bg-violet-400/30 text-violet-800 dark:text-violet-200 font-medium px-0.5 rounded-sm"
            >
              {part.text}
            </span>
          ) : (
            <React.Fragment key={i}>{part.text}</React.Fragment>
          )
        )}
      </span>
    );
  } catch (error) {
    console.error('Error in TextHighlight:', error);
    return <span className={className}>{text}</span>;
  }
}

interface HighlightContainerProps {
  children: React.ReactNode;
}

export function HighlightContainer({ children }: HighlightContainerProps) {
  const { activeSearch } = useSearch();
  const scrollTimeout = React.useRef<NodeJS.Timeout>();

  React.useEffect(() => {
    if (activeSearch?.elementId) {
      // Clear any existing timeout
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }

      // Set a new timeout to allow page transition to complete
      scrollTimeout.current = setTimeout(() => {
        const element = document.getElementById(activeSearch.elementId!);
        if (element) {
          // Add highlight class
          element.classList.add('section-highlight');
          
          // Get the navbar height
          const navbar = document.querySelector('nav');
          const navbarHeight = navbar?.getBoundingClientRect().height || 80;
          
          // Calculate the element's position
          const elementRect = element.getBoundingClientRect();
          const absoluteElementTop = elementRect.top + window.pageYOffset;
          
          // Add some padding for better visibility
          const scrollPadding = 20;
          
          // Scroll to the element
          window.scrollTo({
            top: absoluteElementTop - navbarHeight - scrollPadding,
            behavior: 'smooth'
          });

          // Remove highlight after animation
          const highlightTimeout = setTimeout(() => {
            element.classList.remove('section-highlight');
          }, 2000);

          return () => clearTimeout(highlightTimeout);
        }
      }, 100); // Small delay to ensure page transition

      return () => {
        if (scrollTimeout.current) {
          clearTimeout(scrollTimeout.current);
        }
      };
    }
  }, [activeSearch]);

  return <>{children}</>;
}
