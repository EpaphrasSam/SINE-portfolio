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

  function addSearchResult(content: string, elementId?: string) {
    // Skip very short content or duplicates
    content = content.trim();
    if (content.length < 10 || seenContent.has(content)) return;
    seenContent.add(content);

    results.push({
      title: content.slice(0, 100),
      preview: content,
      path: '',  // Will be set later
      type: 'content',
      elementId
    });
  }

  // Helper to extract text from object literals
  function extractFromObjectLiteral(node: t.ObjectExpression) {
    const properties = new Map<string, string>();
    
    node.properties.forEach(prop => {
      if (!t.isObjectProperty(prop) || !t.isIdentifier(prop.key)) return;
      
      const key = prop.key.name;
      
      if (t.isStringLiteral(prop.value)) {
        properties.set(key, prop.value.value);
      } else if (t.isArrayExpression(prop.value)) {
        const values = prop.value.elements
          .filter((el): el is t.StringLiteral => t.isStringLiteral(el))
          .map(el => el.value);
        if (values.length > 0) {
          properties.set(key, values.join('. '));
        }
      }
    });

    return properties;
  }

  traverse(ast, {
    // Extract text from TextHighlight components
    JSXElement(path) {
      if (!t.isJSXElement(path.node)) return;
      const element = path.node;

      // Find the closest parent element with an id
      let currentPath = path;
      let parentId = '';

      while (currentPath.parentPath) {
        const parent = currentPath.parentPath.node;
        if (t.isJSXElement(parent)) {
          const idAttr = parent.openingElement.attributes.find(attr => 
            t.isJSXAttribute(attr) && 
            t.isJSXIdentifier(attr.name) && 
            attr.name.name === 'id'
          );

          if (idAttr && t.isJSXAttribute(idAttr) && t.isStringLiteral(idAttr.value)) {
            parentId = idAttr.value.value;
            break;
          }
        }
        // @ts-ignore
        currentPath = currentPath.parentPath;
      }

      // Handle TextHighlight components
      if (t.isJSXIdentifier(element.openingElement.name) && 
          element.openingElement.name.name === 'TextHighlight') {
        const textAttr = element.openingElement.attributes.find(attr => 
          t.isJSXAttribute(attr) && 
          t.isJSXIdentifier(attr.name) && 
          attr.name.name === 'text'
        );

        if (textAttr && t.isJSXAttribute(textAttr) && textAttr.value) {
          if (t.isStringLiteral(textAttr.value)) {
            addSearchResult(textAttr.value.value, parentId);
          } else if (t.isJSXExpressionContainer(textAttr.value) && 
                     t.isMemberExpression(textAttr.value.expression)) {
            // Handle dynamic text from objects (e.g., skill.name)
            const expr = textAttr.value.expression;
            if (t.isIdentifier(expr.object) && t.isIdentifier(expr.property)) {
              const variableName = expr.object.name;
              const propertyName = expr.property.name;
              
              // Find the variable declaration
              let scope = path.scope;
              while (scope) {
                const binding = scope.getBinding(variableName);
                if (binding && binding.path.node) {
                  const declaration = binding.path.node;
                  if (t.isVariableDeclarator(declaration) && 
                      t.isObjectExpression(declaration.init)) {
                    const props = extractFromObjectLiteral(declaration.init);
                    const value = props.get(propertyName);
                    if (value) {
                      addSearchResult(value, parentId);
                    }
                  }
                }
                scope = scope.parent;
              }
            }
          }
        }
      }
    },

    // Extract from array/object declarations
    VariableDeclarator(path) {
      if (!t.isIdentifier(path.node.id)) return;
      const name = path.node.id.name;
      
      // Handle arrays of objects (like skills array)
      if (t.isArrayExpression(path.node.init)) {
        path.node.init.elements.forEach(element => {
          if (t.isObjectExpression(element)) {
            const props = extractFromObjectLiteral(element);
            const id = props.get('id');
            
            // Extract text from common properties
            ['title', 'name', 'description', 'responsibilities', 'text'].forEach(key => {
              const value = props.get(key);
              if (value) {
                if (key === 'responsibilities') {
                  // Split responsibilities into individual items
                  value.split('. ').forEach(item => {
                    addSearchResult(item, id);
                  });
                } else {
                  addSearchResult(value, id);
                }
              }
            });

            // Handle nested items array
            const items = element.properties.find(prop => 
              t.isObjectProperty(prop) && 
              t.isIdentifier(prop.key) && 
              prop.key.name === 'items'
            );

            if (items && t.isObjectProperty(items) && t.isArrayExpression(items.value)) {
              items.value.elements.forEach(item => {
                if (t.isObjectExpression(item)) {
                  const itemProps = extractFromObjectLiteral(item);
                  ['name', 'description', 'text'].forEach(key => {
                    const value = itemProps.get(key);
                    if (value) addSearchResult(value, id);
                  });
                }
              });
            }
          }
        });
      }
    }
  });

  return results;
}

async function generateSearchData() {
  const pagesDir = path.join(process.cwd(), 'src', 'app');
  const searchResults: SearchResult[] = [...pages];

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
  const outputContent = `export type SearchResultType = {
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

  return searchData
    .map(item => {
      // For pages, only search in title
      const searchableText = item.type === 'page' 
        ? item.title.toLowerCase()
        : [item.title, item.preview].join(' ').toLowerCase();
      
      // Check if all search terms are present
      const matches = searchTerms.every(term => searchableText.includes(term));
      if (!matches) return null;

      return item;
    })
    .filter((item): item is SearchResultType => item !== null)
    .sort((a, b) => {
      // Pages always come first
      if (a.type !== b.type) {
        return a.type === 'page' ? -1 : 1;
      }
      
      // Then sort by length (shorter matches first)
      return a.preview.length - b.preview.length;
    });
}
`;

  fs.writeFileSync(outputPath, outputContent);
  console.log('Search data generated successfully!');
}

generateSearchData().catch(console.error);
