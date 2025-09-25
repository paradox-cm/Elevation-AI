Project Context: Elevation AI Homepage Wireframe
You're working on a Next.js homepage with sticky scroll sections that have carousel/tab functionality. The page has three main sections:
ProblemSection - 4 slides showing business problems
UnifyingStatementSection - 3 slides with typewriter text
PlatformSection - 4 tabs showing platform features
The Core Issue
You want section-level jump navigation where:
Any scroll amount from outside a section → jumps to that section with first slide/tab active
Any scroll amount within a section → progresses to the next slide/tab (one at a time)
After the last slide/tab → any scroll jumps to the next section
What We've Tried (That Didn't Work)
Complex scroll calculations with custom slide heights and scroll spaces
State-based section entry protection using hasEnteredSection and hasCompletedSection
Pure section-level navigation that advanced slides on every scroll event
Simple percentage-based thresholds (25%, 50%, 75%) - this caused slides to be skipped with minimal scroll
Current Problem
The latest implementation uses scroll thresholds (0-25%, 25-50%, etc.) but even minimal scrolling causes multiple slides to be skipped. You need a system where:
One scroll action = one slide advancement
No skipping slides regardless of scroll amount
Smooth progression through each section
Technical Setup
Framework: Next.js with TypeScript
Styling: Tailwind CSS
Sections: Sticky positioned with top-20
Scroll Detection: getBoundingClientRect() in useEffect
State: activeStep/activeTab for current slide/tab
Goal for Next Chat
Implement a debounced scroll-based system or scroll event counting system that ensures:
Each scroll action advances exactly one slide/tab
No slides are skipped regardless of scroll speed/amount
Sections have clear entry and completion boundaries
The UI/UX remains smooth and predictable
The key insight is that you need to count scroll events rather than measure scroll distance to achieve the one-action-one-slide behavior you want.