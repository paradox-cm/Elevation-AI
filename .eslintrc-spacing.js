/**
 * ESLint rules for preventing section spacing issues
 * Add this to your main ESLint config or use as a separate config
 */

module.exports = {
  rules: {
    // Custom rule to detect potential spacing issues
    'no-restricted-syntax': [
      'error',
      {
        selector: 'JSXAttribute[name.name="className"]',
        message: 'Consider using section-utils for safe spacing classes'
      }
    ],
    
    // Warn about complex height calculations
    'no-restricted-syntax': [
      'warn',
      {
        selector: 'Literal[value*="calc("]',
        message: 'Complex height calculations may cause cutoff issues. Consider using safeHeights utility.'
      }
    ],
    
    // Warn about missing bottom padding in containers
    'no-restricted-syntax': [
      'warn',
      {
        selector: 'JSXElement[openingElement.name.name="div"][openingElement.attributes.some(attr => attr.name.name === "className" && attr.value.value && !attr.value.value.includes("pb-"))]',
        message: 'Container may need bottom padding (pb-6) to prevent content cutoff'
      }
    ]
  }
}

/**
 * Usage in your main eslint.config.mjs:
 * 
 * import spacingRules from './.eslintrc-spacing.js'
 * 
 * export default [
 *   // ... other configs
 *   {
 *     files: ['src/app/wireframes/**/*.tsx', 'src/components/**/*.tsx'],
 *     ...spacingRules
 *   }
 * ]
 */
