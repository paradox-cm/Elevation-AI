const fs = require('fs');
const path = require('path');

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
    
    // Remove unused config destructuring patterns
    const configPatterns = [
      /const\s*\{\s*[^}]*config[^}]*\}\s*=\s*use[A-Z][a-zA-Z]*Config\(\)/g,
      /import\s*\{[^}]*use[A-Z][a-zA-Z]*Config[^}]*\}\s*from\s*["']@\/hooks\/use-[a-z-]*-config["']/g
    ];
    
    configPatterns.forEach(pattern => {
      content = content.replace(pattern, '');
    });
    
    // Remove unused imports
    const unusedImports = [
      'Badge', 'Button', 'H1', 'H2', 'H3', 'H4', 'BodyLarge', 'Grid', 'Avatar', 'AvatarFallback', 'AvatarImage',
      'Tabs', 'TabsContent', 'TabsList', 'TabsTrigger', 'Separator', 'CardDescription', 'CardTitle',
      'Select', 'SelectContent', 'SelectItem', 'SelectValue', 'Checkbox', 'RadioGroup', 'RadioGroupItem', 'Switch',
      'Link', 'Logo', 'getBrandName', 'ExternalLink', 'ChevronRight'
    ];
    
    unusedImports.forEach(importName => {
      const importPattern = new RegExp(`\\b${importName}\\b(?=\\s*,|\\s*})`, 'g');
      content = content.replace(importPattern, '');
      
      // Clean up empty import statements
      content = content.replace(/import\s*\{\s*,\s*\}\s*from\s*["'][^"']+["']/g, '');
      content = content.replace(/import\s*\{\s*\}\s*from\s*["'][^"']+["']/g, '');
    });
    
    // Remove unused variable declarations
    const unusedVars = [
      'config', 'colorUsage', 'gridFoundation', 'iconSizes', 'iconStyles', 'trend', 'maxBarHeight',
      'variant', 'variantStyles', 'collapsible', 'addToast', 'user', 'title', 'showInviteForm',
      'getTypeScaleByComponent', 'getTypeScaleByClass', 'getFontWeightByClass', 'getFontFamilyByClass'
    ];
    
    unusedVars.forEach(varName => {
      const varPattern = new RegExp(`\\b${varName}\\b\\s*=\s*[^;]+;?`, 'g');
      content = content.replace(varPattern, '');
    });
    
    // Clean up multiple newlines
    content = content.replace(/\n\s*\n\s*\n/g, '\n\n');
    
    fs.writeFileSync(filePath, content);
    console.log(`Fixed: ${filePath}`);
  }
});

console.log('Finished fixing unused variables!');
