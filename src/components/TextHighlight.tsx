"use client";

import { useSearch } from "../context/SearchContext";
import React from "react";

interface TextHighlightProps {
  text: string;
  highlight?: string;
}

export function TextHighlight({ text, highlight }: TextHighlightProps) {
  if (!highlight) return <>{text}</>;

  const parts = text.split(new RegExp(`(${highlight})`, "gi"));

  return (
    <>
      {parts.map((part, i) => (
        <span
          key={i}
          className={
            part.toLowerCase() === highlight.toLowerCase()
              ? "bg-violet-200 dark:bg-violet-900/50 text-violet-900 dark:text-violet-100 rounded px-0.5"
              : ""
          }
        >
          {part}
        </span>
      ))}
    </>
  );
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
          element.classList.add("section-highlight");

          // Get the navbar height
          const navbar = document.querySelector("nav");
          const navbarHeight = navbar?.getBoundingClientRect().height || 80;

          // Calculate the element's position
          const elementRect = element.getBoundingClientRect();
          const absoluteElementTop = elementRect.top + window.pageYOffset;

          // Add some padding for better visibility
          const scrollPadding = 20;

          // Scroll to the element
          window.scrollTo({
            top: absoluteElementTop - navbarHeight - scrollPadding,
            behavior: "smooth",
          });

          // Remove highlight after animation
          const highlightTimeout = setTimeout(() => {
            element.classList.remove("section-highlight");
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
