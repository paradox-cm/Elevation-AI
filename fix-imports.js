const fs = require('fs');

// List of files to fix
const filesToFix = [
  'src/app/design-system/branding/page.tsx',
  'src/app/design-system/colors/page.tsx',
  'src/app/design-system/content-components/page.tsx',
  'src/app/design-system/corner-radius/page.tsx',
  'src/app/design-system/dashboard/page.tsx',
  'src/app/design-system/data-display/page.tsx',
  'src/app/design-system/design-tokens/page.tsx',
  'src/app/design-system/error-states/page.tsx',
  'src/app/design-system/forms/page.tsx',
  'src/app/design-system/grid/page.tsx',
  'src/app/design-system/icons/page.tsx',
  'src/app/design-system/interactive-states/page.tsx',
  'src/app/design-system/layout-patterns/page.tsx',
  'src/app/design-system/motion/page.tsx',
  'src/app/design-system/principles/page.tsx',
  'src/app/design-system/responsive/page.tsx',
  'src/app/design-system/shadows-elevation/page.tsx',
  'src/app/design-system/spacing/page.tsx',
  'src/app/design-system/transparency/page.tsx',
  'src/app/design-system/typography/page.tsx',
  'src/app/design-system/user-management/page.tsx',
  'src/app/page.tsx',
  'src/app/wireframes/page.tsx',
  'src/app/wireframes/resources/page.tsx',
  'src/app/wireframes/solutions/page.tsx',
  'src/components/page-template.tsx',
  'src/components/ui/analytics.tsx',
  'src/components/ui/colors-editor.tsx',
  'src/components/ui/content-components.tsx',
  'src/components/ui/dashboard.tsx',
  'src/components/ui/data-table.tsx',
  'src/components/ui/form.tsx',
  'src/components/ui/layout-patterns.tsx',
  'src/components/ui/loading.tsx',
  'src/components/ui/typography-editor.tsx',
  'src/components/ui/user-management.tsx',
  'src/hooks/use-tab-scroll.ts',
  'src/hooks/use-typography-config.ts'
];

filesToFix.forEach(filePath => {
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Fix malformed import statements with empty commas
    content = content.replace(/import\s*\{\s*,+\s*([^}]+)\s*\}\s*from\s*["'][^"']+["']/g, (match, imports) => {
      const cleanImports = imports.split(',').filter(imp => imp.trim()).join(', ');
      return `import { ${cleanImports} } from "${match.match(/from\s*["']([^"']+)["']/)[1]}"`;
    });
    
    // Fix import statements with empty commas at the end
    content = content.replace(/import\s*\{\s*([^}]+),\s*\}\s*from\s*["'][^"']+["']/g, (match, imports) => {
      const cleanImports = imports.split(',').filter(imp => imp.trim()).join(', ');
      return `import { ${cleanImports} } from "${match.match(/from\s*["']([^"']+)["']/)[1]}"`;
    });
    
    // Fix import statements with empty commas in the middle
    content = content.replace(/import\s*\{\s*([^}]+)\s*\}\s*from\s*["'][^"']+["']/g, (match, imports) => {
      const cleanImports = imports.split(',').filter(imp => imp.trim()).join(', ');
      return `import { ${cleanImports} } from "${match.match(/from\s*["']([^"']+)["']/)[1]}"`;
    });
    
    // Remove completely empty import statements
    content = content.replace(/import\s*\{\s*\}\s*from\s*["'][^"']+["']\s*;?\s*/g, '');
    
    // Clean up multiple newlines
    content = content.replace(/\n\s*\n\s*\n/g, '\n\n');
    
    fs.writeFileSync(filePath, content);
    console.log(`Fixed imports: ${filePath}`);
  }
});

console.log('Finished fixing import statements!');
