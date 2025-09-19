The Next.js build failed during the linting phase (after successful compilation and type-checking) because ESLint reported numerous warnings, and your project's configuration (likely in next.config.js or .eslintrc) is set to treat these as fatal errors, causing the npm run build command to exit with code 1.
Key Issues
The warnings fall into several common categories, primarily related to code quality, React best practices, and accessibility. Here's a breakdown of the most frequent types, with examples from the log:
Category
Description
Example Files/Lines
Count (Approx.)
Unused Variables/Imports
Variables, imports, or assignments declared but never referenced (e.g., @typescript-eslint/no-unused-vars).
- ./src/app/admin/pages/[id]/edit/page.tsx:27:10 (pageSectionsService) - ./src/app/design-system/animations/growth-animation/page.tsx:9:14 (H3) - Many others in animation and design-system files
~150+
React Hook Dependencies
Missing or unnecessary dependencies in useEffect, useCallback, etc. (e.g., react-hooks/exhaustive-deps).
- ./src/app/admin/pages/[id]/sections/[sectionId]/edit/page.tsx:85:6(missing pageId) - ./src/components/animations/growth-animation.tsx:127:6 (missing animate and createGrid) - ./src/components/ui/carousel.tsx:184:6 (unnecessary items.length)
~50+
Unescaped Entities in JSX
Quotes (") or apostrophes (') in JSX text not properly escaped (e.g., react/no-unescaped-entities).
- ./src/app/design-system/animations/growth-animation/page.tsx:86:81 - ./src/app/design-system/hero/page.tsx:667:53 - ./src/components/ui/consultation-request-modal.tsx:460:17
~100+
Missing Alt Props on Images
<img> or <Image> elements without alt attributes (e.g., jsx-a11y/alt-text).
- ./src/app/admin/media/page.tsx:283:15 - ./src/components/admin/sortable-section-list.tsx:49:40
~10
No-Img-Element
Using raw <img> tags instead of Next.js <Image>component for optimization (e.g., @next/next/no-img-element).
- ./src/components/ui/main-header.tsx:191:25 - ./src/components/cms/dynamic-blog-listing.tsx:93:19
~15
Other (e.g., Comments in JSX, No-Comment-Textnodes)
Comments placed incorrectly in JSX children (e.g., react/jsx-no-comment-textnodes).
- ./src/app/design-system/design-tokens/page.tsx:518:62 - ./src/app/design-system/motion/page.tsx:497:62
