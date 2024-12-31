import fs from "fs";
import path from "path";
import { parse } from "@babel/parser";
import traverse from "@babel/traverse";
import * as t from "@babel/types";

interface SearchResult {
  title: string;
  path: string;
  type: "page" | "content";
  preview: string;
  elementId?: string;
}

const pages: SearchResult[] = [
  {
    title: "Home",
    path: "/",
    type: "page",
    preview:
      "Software Developer specializing in building exceptional digital experiences",
  },
  {
    title: "About Me",
    path: "/about",
    type: "page",
    preview:
      "Software Developer with a passion for creating innovative solutions",
  },
  {
    title: "My Projects",
    path: "/projects",
    type: "page",
    preview: "Showcase of my latest work and projects",
  },
  {
    title: "Skills & Technologies",
    path: "/skills",
    type: "page",
    preview: "Technical skills and expertise in software development",
  },
  {
    title: "Contact Me",
    path: "/contact",
    type: "page",
    preview: "Get in touch for collaboration opportunities",
  },
];

function extractSearchableContent(
  code: string,
  filePath: string
): SearchResult[] {
  const ast = parse(code, {
    sourceType: "module",
    plugins: ["jsx", "typescript"],
  });

  const results: SearchResult[] = [];
  const seenContent = new Set<string>();

  function addSearchResult(
    title: string,
    preview: string,
    elementId?: string,
    specificPath?: string
  ) {
    const key = `${title}:${preview}:${specificPath || ""}`;
    if (seenContent.has(key)) return;
    seenContent.add(key);

    results.push({
      title,
      preview,
      path: specificPath || "", // Will be set later if not specified
      type: "content",
      elementId,
    });
  }

  traverse(ast, {
    VariableDeclarator(path) {
      if (!t.isIdentifier(path.node.id)) return;
      const name = path.node.id.name;

      // Handle highlighted skills - index them for the home page
      if (name === "highlightedSkills" && t.isArrayExpression(path.node.init)) {
        path.node.init.elements.forEach((element) => {
          if (t.isObjectExpression(element)) {
            let name = "";
            const items: string[] = [];

            element.properties.forEach((prop) => {
              if (!t.isObjectProperty(prop) || !t.isIdentifier(prop.key))
                return;

              if (prop.key.name === "name" && t.isStringLiteral(prop.value)) {
                name = prop.value.value;
              }
              if (
                prop.key.name === "items" &&
                t.isArrayExpression(prop.value)
              ) {
                items.push(
                  ...prop.value.elements
                    .filter((el): el is t.StringLiteral =>
                      t.isStringLiteral(el)
                    )
                    .map((el) => el.value)
                );
              }
            });

            if (name && items.length > 0) {
              // Add to home page specifically
              addSearchResult(
                name,
                `Key skills: ${items.join(", ")}`,
                "highlighted-skills",
                "/"
              );

              // Also add to skills page for comprehensive coverage
              addSearchResult(
                name,
                `Key skills: ${items.join(", ")}`,
                "highlighted-skills",
                "/skills"
              );
            }
          }
        });
      }

      // Handle social links and contact methods - index them for multiple pages
      if (
        (name === "socialLinks" || name === "contactMethods") &&
        t.isArrayExpression(path.node.init)
      ) {
        path.node.init.elements.forEach((element) => {
          if (t.isObjectExpression(element)) {
            let id = "",
              title = "",
              value = "",
              link = "";

            element.properties.forEach((prop) => {
              if (!t.isObjectProperty(prop) || !t.isIdentifier(prop.key))
                return;

              if (prop.key.name === "id" && t.isStringLiteral(prop.value)) {
                id = prop.value.value;
              }
              if (prop.key.name === "title" && t.isStringLiteral(prop.value)) {
                title = prop.value.value;
              }
              if (prop.key.name === "value" && t.isStringLiteral(prop.value)) {
                value = prop.value.value;
              }
              if (prop.key.name === "link" && t.isStringLiteral(prop.value)) {
                link = prop.value.value;
              }
            });

            if (title && (value || link)) {
              // Add to contact page
              addSearchResult(
                `Contact via ${title}`,
                value || link,
                id,
                "/contact"
              );

              // Add to home page footer
              addSearchResult(`Contact via ${title}`, value || link, id, "/");

              // Add to about page
              addSearchResult(
                `Contact via ${title}`,
                value || link,
                id,
                "/about"
              );
            }
          }
        });
      }

      // Handle skills (existing code)
      if (name === "skills" && t.isArrayExpression(path.node.init)) {
        path.node.init.elements.forEach((element) => {
          if (t.isObjectExpression(element)) {
            let id = "",
              title = "";
            const items: { name: string; description: string }[] = [];

            element.properties.forEach((prop) => {
              if (!t.isObjectProperty(prop) || !t.isIdentifier(prop.key))
                return;

              if (prop.key.name === "id" && t.isStringLiteral(prop.value)) {
                id = prop.value.value;
              }
              if (prop.key.name === "title" && t.isStringLiteral(prop.value)) {
                title = prop.value.value;
              }
              if (
                prop.key.name === "items" &&
                t.isArrayExpression(prop.value)
              ) {
                prop.value.elements.forEach((item) => {
                  if (t.isObjectExpression(item)) {
                    let name = "",
                      description = "";
                    item.properties.forEach((itemProp) => {
                      if (
                        !t.isObjectProperty(itemProp) ||
                        !t.isIdentifier(itemProp.key)
                      )
                        return;
                      if (
                        itemProp.key.name === "name" &&
                        t.isStringLiteral(itemProp.value)
                      ) {
                        name = itemProp.value.value;
                      }
                      if (
                        itemProp.key.name === "description" &&
                        t.isStringLiteral(itemProp.value)
                      ) {
                        description = itemProp.value.value;
                      }
                    });
                    if (name && description) {
                      items.push({ name, description });
                    }
                  }
                });
              }
            });

            if (title && items.length > 0) {
              // Add category entry
              addSearchResult(
                title,
                `${title}:\n${items.map((item) => `${item.name} - ${item.description}`).join("\n")}`,
                id
              );

              // Add individual skill entries
              items.forEach((item) => {
                addSearchResult(
                  item.name,
                  `${item.name} - ${item.description} (${title})`,
                  id
                );
              });
            }
          }
        });
      }

      // Handle arrays of objects (skills, experiences, projects, etc.)
      if (name === "experiences" && t.isArrayExpression(path.node.init)) {
        // Process experiences
        path.node.init.elements.forEach((element) => {
          if (t.isObjectExpression(element)) {
            let id = "",
              title = "",
              company = "",
              period = "";
            const responsibilities: string[] = [];

            element.properties.forEach((prop) => {
              if (!t.isObjectProperty(prop) || !t.isIdentifier(prop.key))
                return;

              if (prop.key.name === "id" && t.isStringLiteral(prop.value)) {
                id = prop.value.value;
              }
              if (prop.key.name === "title" && t.isStringLiteral(prop.value)) {
                title = prop.value.value;
              }
              if (
                prop.key.name === "company" &&
                t.isStringLiteral(prop.value)
              ) {
                company = prop.value.value;
              }
              if (prop.key.name === "period" && t.isStringLiteral(prop.value)) {
                period = prop.value.value;
              }
              if (
                prop.key.name === "responsibilities" &&
                t.isArrayExpression(prop.value)
              ) {
                prop.value.elements.forEach((resp) => {
                  if (t.isStringLiteral(resp)) {
                    responsibilities.push(resp.value);
                  }
                });
              }
            });

            if (title && company) {
              addSearchResult(
                `${title} at ${company}`,
                `${title} - ${company}. ${period}. ${responsibilities.join(" ")}`,
                id
              );

              addSearchResult(
                company,
                `${title} position at ${company}. ${period}. ${responsibilities[0]}`,
                id
              );

              addSearchResult(
                title,
                `${title} at ${company}. ${period}. ${responsibilities[0]}`,
                id
              );

              responsibilities.forEach((resp) => {
                addSearchResult(`${title} - ${company}`, resp, id);
              });
            }
          }
        });
      }

      // Process contact methods
      if (name === "contactMethods" && t.isArrayExpression(path.node.init)) {
        path.node.init.elements.forEach((element) => {
          if (t.isObjectExpression(element)) {
            let id = "",
              title = "",
              value = "",
              link = "";

            element.properties.forEach((prop) => {
              if (!t.isObjectProperty(prop) || !t.isIdentifier(prop.key))
                return;

              if (prop.key.name === "id" && t.isStringLiteral(prop.value)) {
                id = prop.value.value;
              }
              if (prop.key.name === "title" && t.isStringLiteral(prop.value)) {
                title = prop.value.value;
              }
              if (prop.key.name === "value" && t.isStringLiteral(prop.value)) {
                value = prop.value.value;
              }
              if (prop.key.name === "link" && t.isStringLiteral(prop.value)) {
                link = prop.value.value;
              }
            });

            if (title && value) {
              addSearchResult(`Contact via ${title}`, value, id);
            }
          }
        });
      }

      if (name === "navigationCards" && t.isArrayExpression(path.node.init)) {
        // Process navigation cards
        path.node.init.elements.forEach((element) => {
          if (t.isObjectExpression(element)) {
            let title = "",
              description = "",
              path = "";

            element.properties.forEach((prop) => {
              if (!t.isObjectProperty(prop) || !t.isIdentifier(prop.key))
                return;

              if (prop.key.name === "title" && t.isStringLiteral(prop.value)) {
                title = prop.value.value;
              }
              if (
                prop.key.name === "description" &&
                t.isStringLiteral(prop.value)
              ) {
                description = prop.value.value;
              }
              if (prop.key.name === "path" && t.isStringLiteral(prop.value)) {
                path = prop.value.value;
              }
            });

            if (title && description) {
              addSearchResult(title, description);
            }
          }
        });
      }

      // Handle projects - simplified indexing
      if (name === "projects" && t.isArrayExpression(path.node.init)) {
        path.node.init.elements.forEach((element) => {
          if (t.isObjectExpression(element)) {
            let id = "";
            let title = "";
            let preview = "";
            let tech: string[] = [];
            let type = "";

            element.properties.forEach((prop) => {
              if (!t.isObjectProperty(prop) || !t.isIdentifier(prop.key))
                return;

              if (prop.key.name === "id" && t.isStringLiteral(prop.value)) {
                id = prop.value.value;
              }
              if (prop.key.name === "title" && t.isStringLiteral(prop.value)) {
                title = prop.value.value;
              }
              if (
                prop.key.name === "preview" &&
                t.isStringLiteral(prop.value)
              ) {
                preview = prop.value.value;
              }
              if (prop.key.name === "type" && t.isStringLiteral(prop.value)) {
                type = prop.value.value;
              }
              if (prop.key.name === "tech" && t.isArrayExpression(prop.value)) {
                tech = prop.value.elements
                  .filter((el): el is t.StringLiteral => t.isStringLiteral(el))
                  .map((el) => el.value);
              }
            });

            if (id && title) {
              // Add main project entry with proper hashtag ID
              addSearchResult(
                title,
                `${preview} (${tech.slice(0, 3).join(", ")})`,
                id,
                `/projects#${id}`
              );

              // If it's a web project, also index it for the home page
              if (type === "web") {
                addSearchResult(
                  title,
                  `${preview} (${tech.slice(0, 3).join(", ")})`,
                  id,
                  "/"
                );
              }
            }
          }
        });
      }
    },

    // Handle TSX content
    JSXElement(path) {
      if (!t.isJSXElement(path.node)) return;
      const element = path.node;

      // Handle sections with IDs
      const idAttr = element.openingElement.attributes.find(
        (attr) =>
          t.isJSXAttribute(attr) &&
          t.isJSXIdentifier(attr.name) &&
          attr.name.name === "id"
      );

      if (
        idAttr &&
        t.isJSXAttribute(idAttr) &&
        t.isStringLiteral(idAttr.value)
      ) {
        const sectionId = idAttr.value.value;
        const textContent = extractTextContent(element);
        if (textContent) {
          // For sections in projects, use hashtag
          const currentPath = getCurrentPath(path);
          const sectionPath = currentPath.includes("/projects")
            ? `${currentPath}#${sectionId}`
            : currentPath;

          addSearchResult(
            textContent.slice(0, 50),
            textContent,
            sectionId,
            sectionPath
          );
        }
      }

      // Handle SectionHeader components
      if (
        t.isJSXIdentifier(element.openingElement.name) &&
        element.openingElement.name.name === "SectionHeader"
      ) {
        let title = "",
          subtitle = "";
        element.openingElement.attributes.forEach((attr) => {
          if (!t.isJSXAttribute(attr) || !t.isJSXIdentifier(attr.name)) return;

          if (attr.name.name === "title" && t.isStringLiteral(attr.value)) {
            title = attr.value.value;
          }
          if (attr.name.name === "subtitle" && t.isStringLiteral(attr.value)) {
            subtitle = attr.value.value;
          }
        });

        if (title) {
          const sectionId = findNearestSectionId(path);
          const currentPath = getCurrentPath(path);
          addSearchResult(
            title,
            subtitle || title,
            sectionId,
            sectionId ? `${currentPath}#${sectionId}` : currentPath
          );
        }
      }

      // Handle other components with text content
      const textContent = extractTextContent(element);
      if (textContent && textContent.length > 10) {
        // Avoid indexing tiny text fragments
        const sectionId = findNearestSectionId(path);
        const currentPath = getCurrentPath(path);
        addSearchResult(
          textContent.slice(0, 50),
          textContent,
          sectionId,
          sectionId ? `${currentPath}#${sectionId}` : currentPath
        );
      }
    },

    // Handle string literals in JSX
    JSXText(path) {
      const text = path.node.value.trim();
      if (text) {
        const sectionId = findNearestSectionId(path);
        addSearchResult(text.slice(0, 50), text, sectionId);
      }
    },
  });

  return results;
}

// Helper function to find the nearest section ID
function findNearestSectionId(path: any): string | undefined {
  let current = path;
  while (current) {
    if (t.isJSXElement(current.node)) {
      const idAttr = current.node.openingElement.attributes.find(
        (attr: any) =>
          t.isJSXAttribute(attr) &&
          t.isJSXIdentifier(attr.name) &&
          attr.name.name === "id"
      );

      if (
        idAttr &&
        t.isJSXAttribute(idAttr) &&
        t.isStringLiteral(idAttr.value)
      ) {
        return idAttr.value.value;
      }
    }
    current = current.parentPath;
  }
  return undefined;
}

// Helper function to extract text content from JSX elements
function extractTextContent(element: t.JSXElement): string {
  let text = "";

  function traverse(node: any) {
    if (t.isJSXText(node)) {
      text += node.value.trim() + " ";
    } else if (t.isJSXElement(node)) {
      if (node.children) {
        node.children.forEach(traverse);
      }
    } else if (
      t.isJSXExpressionContainer(node) &&
      t.isStringLiteral(node.expression)
    ) {
      text += node.expression.value + " ";
    }
  }

  element.children.forEach(traverse);
  return text.trim();
}

// Helper function to get current file path
function getCurrentPath(path: any): string {
  let current = path;
  while (current) {
    if (current.hub?.file?.opts?.filename) {
      const filename = current.hub.file.opts.filename;
      if (filename.includes("/app/")) {
        const match = filename.match(/\/app\/(.*?)\/page\.tsx$/);
        if (match) {
          return "/" + match[1];
        }
        return "/";
      }
    }
    current = current.parentPath;
  }
  return "/";
}

async function generateSearchData() {
  const searchResults: SearchResult[] = [...pages];
  const pagesDir = path.join(process.cwd(), "src", "app");

  // Process all page files first
  function processDirectory(dirPath: string, urlPath: string = "") {
    const entries = fs.readdirSync(dirPath);

    for (const entry of entries) {
      const fullPath = path.join(dirPath, entry);
      const stat = fs.statSync(fullPath);

      if (
        stat.isDirectory() &&
        !entry.startsWith("_") &&
        !entry.startsWith(".")
      ) {
        processDirectory(
          fullPath,
          urlPath + "/" + (entry === "page" ? "" : entry)
        );
      } else if (
        stat.isFile() &&
        entry === "page.tsx" &&
        !dirPath.includes("api")
      ) {
        const code = fs.readFileSync(fullPath, "utf-8");
        const pagePath = urlPath || "/";
        const results = extractSearchableContent(code, fullPath);

        results.forEach((result) => {
          if (!result.path) {
            result.path = pagePath;
          }
          searchResults.push(result);
        });
      }
    }
  }

  processDirectory(pagesDir);

  // Then process data files
  const dataFiles = [
    {
      path: "projects.tsx",
      urlPath: "/projects",
      additionalPaths: ["/"],
    },
    {
      path: "experiences.ts",
      urlPath: "/about",
      additionalPaths: ["/"],
    },
    {
      path: "skills.tsx",
      urlPath: "/skills",
      additionalPaths: ["/"],
    },
    {
      path: "contact.tsx",
      urlPath: "/contact",
      additionalPaths: ["/", "/about"],
    },
  ];

  for (const file of dataFiles) {
    try {
      const filePath = path.join(process.cwd(), "src", "data", file.path);
      const code = fs.readFileSync(filePath, "utf-8");
      const results = extractSearchableContent(code, file.path);

      // Add paths to all results
      results.forEach((result) => {
        if (!result.path) {
          // If no specific path was set during extraction, use the default path
          result.path = file.urlPath;
          searchResults.push(result);

          // Add additional entries for pages that also show this content
          if (file.additionalPaths) {
            file.additionalPaths.forEach((additionalPath) => {
              searchResults.push({
                ...result,
                path: additionalPath,
              });
            });
          }
        } else {
          // If a specific path was set during extraction, use that
          searchResults.push(result);
        }
      });
    } catch (error) {
      console.error(`Error processing ${file.path}:`, error);
    }
  }

  // Write the search data to a file
  const outputPath = path.join(
    process.cwd(),
    "src",
    "data",
    "generatedSearchData.ts"
  );
  const outputContent = `// This file is auto-generated. Do not edit manually.
export type SearchResultType = {
  title: string;
  path: string;
  type: 'page' | 'content';
  preview: string;
  elementId?: string;
};

export const searchData: SearchResultType[] = ${JSON.stringify(searchResults, null, 2)};

export function searchContent(query: string): SearchResultType[] {
  if (!query) return [];
  
  const searchTerms = query.toLowerCase().split(' ').filter(Boolean);
  if (searchTerms.length === 0) return [];

  type ScoredResult = SearchResultType & { score: number };
  const uniqueResults = new Map<string, ScoredResult>();

  const scoredResults = searchData
    .map(item => {
      const titleText = item.title.toLowerCase();
      const previewText = item.preview.toLowerCase();
      
      // Calculate match scores
      let score = 0;
      let matchedTerms = 0;

      // Check for matches
      searchTerms.forEach(term => {
        const titleMatch = titleText.includes(term);
        const previewMatch = previewText.includes(term);

        if (titleMatch || previewMatch) {
          matchedTerms++;

          // Title matches
          if (titleMatch) {
            score += 100;  // Base score for title match
            if (titleText === term) score += 50;  // Exact title match
            if (titleText.startsWith(term)) score += 25;  // Title starts with term
          }
          // Preview matches
          if (previewMatch) {
            score += 10;
            // Bonus for term appearing early in preview
            const position = previewText.indexOf(term);
            if (position < 20) score += 5;
          }
        }
      });

      // Require at least one search term to match
      if (matchedTerms === 0) return null;

      // Bonus for page type and full matches
      if (item.type === 'page') score += 30;
      if (matchedTerms === searchTerms.length) score += 50;  // Bonus for matching all terms

      return {
        ...item,
        score
      };
    })
    .filter((item): item is ScoredResult => item !== null);

  // Remove duplicates, keeping highest scoring version
  scoredResults.forEach(result => {
    const key = result.elementId ? result.elementId + ':' + result.preview : result.preview;
    const existing = uniqueResults.get(key);
    if (!existing || result.score > existing.score) {
      uniqueResults.set(key, result);
    }
  });

  return Array.from(uniqueResults.values())
    .sort((a, b) => b.score - a.score)
    .map(({ score, ...item }) => item);
}
`;

  fs.writeFileSync(outputPath, outputContent);
}

generateSearchData().catch(console.error);
