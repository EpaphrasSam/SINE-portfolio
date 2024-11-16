import fs from 'fs';
import path from 'path';
import { parse } from '@babel/parser';
import traverse from '@babel/traverse';
import * as t from '@babel/types';

interface SearchResult {
  title: string;
  path: string;
  type: 'page' | 'content';
  preview: string;
  elementId?: string;
}

const pages: SearchResult[] = [
  {
    title: "Home",
    path: "/",
    type: "page",
    preview: "Software Developer specializing in building exceptional digital experiences"
  },
  {
    title: "About Me",
    path: "/about",
    type: "page",
    preview: "Software Developer with a passion for creating innovative solutions"
  },
  {
    title: "My Projects",
    path: "/projects",
    type: "page",
    preview: "Showcase of my latest work and projects"
  },
  {
    title: "Skills & Technologies",
    path: "/skills",
    type: "page",
    preview: "Technical skills and expertise in software development"
  },
  {
    title: "Contact Me",
    path: "/contact",
    type: "page",
    preview: "Get in touch for collaboration opportunities"
  }
];

function extractSearchableContent(code: string): SearchResult[] {
  const ast = parse(code, {
    sourceType: 'module',
    plugins: ['jsx', 'typescript'],
  });

  const results: SearchResult[] = [];
  const seenContent = new Set<string>();

  function addSearchResult(title: string, preview: string, elementId?: string) {
    const key = `${title}:${preview}`;
    if (seenContent.has(key)) return;
    seenContent.add(key);

    results.push({
      title,
      preview,
      path: '',  // Will be set later
      type: 'content',
      elementId
    });
  }

  traverse(ast, {
    // Handle arrays of objects (skills, experiences, projects, etc.)
    VariableDeclarator(path) {
      if (!t.isIdentifier(path.node.id)) return;
      const name = path.node.id.name;
      
      if (name === 'experiences' && t.isArrayExpression(path.node.init)) {
        // Process experiences
        path.node.init.elements.forEach(element => {
          if (t.isObjectExpression(element)) {
            let id = '', title = '', company = '', period = '';
            const responsibilities: string[] = [];

            element.properties.forEach(prop => {
              if (!t.isObjectProperty(prop) || !t.isIdentifier(prop.key)) return;

              if (prop.key.name === 'id' && t.isStringLiteral(prop.value)) {
                id = prop.value.value;
              }
              if (prop.key.name === 'title' && t.isStringLiteral(prop.value)) {
                title = prop.value.value;
              }
              if (prop.key.name === 'company' && t.isStringLiteral(prop.value)) {
                company = prop.value.value;
              }
              if (prop.key.name === 'period' && t.isStringLiteral(prop.value)) {
                period = prop.value.value;
              }
              if (prop.key.name === 'responsibilities' && t.isArrayExpression(prop.value)) {
                prop.value.elements.forEach(resp => {
                  if (t.isStringLiteral(resp)) {
                    responsibilities.push(resp.value);
                  }
                });
              }
            });

            if (title && company) {
              addSearchResult(
                `${title} at ${company}`,
                `${title} - ${company}. ${period}. ${responsibilities.join(' ')}`,
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

              responsibilities.forEach(resp => {
                addSearchResult(
                  `${title} - ${company}`,
                  resp,
                  id
                );
              });
            }
          }
        });
      }

      // Process contact methods
      if (name === 'contactMethods' && t.isArrayExpression(path.node.init)) {
        path.node.init.elements.forEach(element => {
          if (t.isObjectExpression(element)) {
            let id = '', title = '', value = '', link = '';

            element.properties.forEach(prop => {
              if (!t.isObjectProperty(prop) || !t.isIdentifier(prop.key)) return;

              if (prop.key.name === 'id' && t.isStringLiteral(prop.value)) {
                id = prop.value.value;
              }
              if (prop.key.name === 'title' && t.isStringLiteral(prop.value)) {
                title = prop.value.value;
              }
              if (prop.key.name === 'value' && t.isStringLiteral(prop.value)) {
                value = prop.value.value;
              }
              if (prop.key.name === 'link' && t.isStringLiteral(prop.value)) {
                link = prop.value.value;
              }
            });

            if (title && value) {
              addSearchResult(
                `Contact via ${title}`,
                value,
                id
              );
            }
          }
        });
      }
      
      if (name === 'skills' && t.isArrayExpression(path.node.init)) {
        // Process skills
        path.node.init.elements.forEach(element => {
          if (t.isObjectExpression(element)) {
            let id = '', title = '';
            const items: { name: string, description: string }[] = [];

            element.properties.forEach(prop => {
              if (!t.isObjectProperty(prop) || !t.isIdentifier(prop.key)) return;

              if (prop.key.name === 'id' && t.isStringLiteral(prop.value)) {
                id = prop.value.value;
              }
              if (prop.key.name === 'title' && t.isStringLiteral(prop.value)) {
                title = prop.value.value;
              }
              if (prop.key.name === 'items' && t.isArrayExpression(prop.value)) {
                prop.value.elements.forEach(item => {
                  if (t.isObjectExpression(item)) {
                    let name = '', description = '';
                    item.properties.forEach(itemProp => {
                      if (!t.isObjectProperty(itemProp) || !t.isIdentifier(itemProp.key)) return;
                      if (itemProp.key.name === 'name' && t.isStringLiteral(itemProp.value)) {
                        name = itemProp.value.value;
                      }
                      if (itemProp.key.name === 'description' && t.isStringLiteral(itemProp.value)) {
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
              // Add single entry for the skill category with all items
              const preview = `${title}:\n${items.map(item => `${item.name} - ${item.description}`).join('\n')}`;
              addSearchResult(title, preview, id);

              // Add individual skill entries that point back to the category
              items.forEach(item => {
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

      if (name === 'navigationCards' && t.isArrayExpression(path.node.init)) {
        // Process navigation cards
        path.node.init.elements.forEach(element => {
          if (t.isObjectExpression(element)) {
            let title = '', description = '', path = '';

            element.properties.forEach(prop => {
              if (!t.isObjectProperty(prop) || !t.isIdentifier(prop.key)) return;

              if (prop.key.name === 'title' && t.isStringLiteral(prop.value)) {
                title = prop.value.value;
              }
              if (prop.key.name === 'description' && t.isStringLiteral(prop.value)) {
                description = prop.value.value;
              }
              if (prop.key.name === 'path' && t.isStringLiteral(prop.value)) {
                path = prop.value.value;
              }
            });

            if (title && description) {
              addSearchResult(title, description);
            }
          }
        });
      }
    },

    // Handle TextHighlight components
    JSXElement(path) {
      if (!t.isJSXElement(path.node)) return;
      const element = path.node;

      if (t.isJSXIdentifier(element.openingElement.name) && 
          element.openingElement.name.name === 'TextHighlight') {
        const textAttr = element.openingElement.attributes.find(attr => 
          t.isJSXAttribute(attr) && 
          t.isJSXIdentifier(attr.name) && 
          attr.name.name === 'text'
        );

        if (textAttr && t.isJSXAttribute(textAttr) && t.isStringLiteral(textAttr.value)) {
          const text = textAttr.value.value;
          addSearchResult(text, text);
        }
      }
    }
  });

  return results;
}

async function generateSearchData() {
  const pagesDir = path.join(process.cwd(), 'src', 'app');
  const searchResults: SearchResult[] = [...pages];

  // Add projects to search results
  try {
    const projectsFile = path.join(process.cwd(), 'src', 'data', 'projects.tsx');
    const projectsCode = fs.readFileSync(projectsFile, 'utf-8');
    const ast = parse(projectsCode, {
      sourceType: 'module',
      plugins: ['jsx', 'typescript'],
    });

    traverse(ast, {
      VariableDeclarator(path) {
        if (
          t.isIdentifier(path.node.id, { name: 'projects' }) &&
          t.isArrayExpression(path.node.init)
        ) {
          path.node.init.elements.forEach((element) => {
            if (t.isObjectExpression(element)) {
              let id = '';
              let title = '';
              let preview = '';
              let description: string[] = [];
              let tech: string[] = [];

              element.properties.forEach((prop) => {
                if (
                  t.isObjectProperty(prop) &&
                  t.isIdentifier(prop.key)
                ) {
                  if (prop.key.name === 'id' && t.isStringLiteral(prop.value)) {
                    id = prop.value.value;
                  }
                  if (prop.key.name === 'title' && t.isStringLiteral(prop.value)) {
                    title = prop.value.value;
                  }
                  if (prop.key.name === 'preview' && t.isStringLiteral(prop.value)) {
                    preview = prop.value.value;
                  }
                  if (prop.key.name === 'description' && t.isArrayExpression(prop.value)) {
                    description = prop.value.elements
                      .filter((el): el is t.StringLiteral => t.isStringLiteral(el))
                      .map(el => el.value);
                  }
                  if (prop.key.name === 'tech' && t.isArrayExpression(prop.value)) {
                    tech = prop.value.elements
                      .filter((el): el is t.StringLiteral => t.isStringLiteral(el))
                      .map(el => el.value);
                  }
                }
              });

              if (id && title) {
                // Add main project entry
                searchResults.push({
                  title,
                  path: '/projects',
                  type: 'content',
                  preview: `${preview} (Technologies: ${tech.join(', ')})`,
                  elementId: id
                });

                // Add each description paragraph
                description.forEach(desc => {
                  searchResults.push({
                    title: `${title} - Details`,
                    path: '/projects',
                    type: 'content',
                    preview: desc,
                    elementId: id
                  });
                });

                // Add technology-specific entries
                tech.forEach(techItem => {
                  searchResults.push({
                    title: `${techItem} Project: ${title}`,
                    path: '/projects',
                    type: 'content',
                    preview: `${title} - Built with ${techItem}. ${preview}`,
                    elementId: id
                  });
                });
              }
            }
          });
        }
      }
    });
  } catch (error) {
    console.error('Error processing projects:', error);
  }

  // Add experiences to search results
  try {
    const experiencesFile = path.join(process.cwd(), 'src', 'data', 'experiences.ts');
    const experiencesCode = fs.readFileSync(experiencesFile, 'utf-8');
    const ast = parse(experiencesCode, {
      sourceType: 'module',
      plugins: ['jsx', 'typescript'],
    });

    traverse(ast, {
      VariableDeclarator(path) {
        if (
          t.isIdentifier(path.node.id, { name: 'experiences' }) &&
          t.isArrayExpression(path.node.init)
        ) {
          path.node.init.elements.forEach((element) => {
            if (t.isObjectExpression(element)) {
              let id = '';
              let title = '';
              let company = '';
              let period = '';
              let responsibilities: string[] = [];

              element.properties.forEach((prop) => {
                if (
                  t.isObjectProperty(prop) &&
                  t.isIdentifier(prop.key)
                ) {
                  if (prop.key.name === 'id' && t.isStringLiteral(prop.value)) {
                    id = prop.value.value;
                  }
                  if (prop.key.name === 'title' && t.isStringLiteral(prop.value)) {
                    title = prop.value.value;
                  }
                  if (prop.key.name === 'company' && t.isStringLiteral(prop.value)) {
                    company = prop.value.value;
                  }
                  if (prop.key.name === 'period' && t.isStringLiteral(prop.value)) {
                    period = prop.value.value;
                  }
                  if (prop.key.name === 'responsibilities' && t.isArrayExpression(prop.value)) {
                    responsibilities = prop.value.elements
                      .filter((el): el is t.StringLiteral => t.isStringLiteral(el))
                      .map(el => el.value);
                  }
                }
              });

              if (title && company) {
                // Add main experience entry with company and title in preview
                searchResults.push({
                  title: `${title} at ${company}`,
                  path: '/about',
                  type: 'content',
                  preview: `${title} - ${company}. ${period}. ${responsibilities.join(' ')}`,
                  elementId: id
                });

                // Add company-specific entry
                searchResults.push({
                  title: company,
                  path: '/about',
                  type: 'content',
                  preview: `${title} position at ${company}. ${period}. ${responsibilities[0]}`,
                  elementId: id
                });

                // Add title-specific entry
                searchResults.push({
                  title: title,
                  path: '/about',
                  type: 'content',
                  preview: `${title} at ${company}. ${period}. ${responsibilities[0]}`,
                  elementId: id
                });

                // Add individual responsibility entries with job context
                responsibilities.forEach(resp => {
                  searchResults.push({
                    title: `${title} - ${company}`,
                    path: '/about',
                    type: 'content',
                    preview: resp,
                    elementId: id
                  });
                });
              }
            }
          });
        }
      }
    });
  } catch (error) {
    console.error('Error processing experiences:', error);
  }

  function processDirectory(dirPath: string, urlPath: string = '') {
    const entries = fs.readdirSync(dirPath);

    for (const entry of entries) {
      const fullPath = path.join(dirPath, entry);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory() && !entry.startsWith('_') && !entry.startsWith('.')) {
        processDirectory(
          fullPath,
          urlPath + '/' + (entry === 'page' ? '' : entry)
        );
      } else if (
        stat.isFile() &&
        entry === 'page.tsx' &&
        !dirPath.includes('api')
      ) {
        const code = fs.readFileSync(fullPath, 'utf-8');
        const pagePath = urlPath || '/';
        const results = extractSearchableContent(code);
        
        // Add path to all results
        results.forEach(result => {
          result.path = pagePath;
          searchResults.push(result);
        });
      }
    }
  }

  processDirectory(pagesDir);

  // Write the search data to a file
  const outputPath = path.join(process.cwd(), 'src', 'data', 'generatedSearchData.ts');
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
