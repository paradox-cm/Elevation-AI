Target Behavior for Unifying Statement Section
Current Status: We have a section with two sequential text animations that becomes sticky at the bottom of the navigation bar, but there are issues with scroll progression and animation timing.
Desired Behavior Flow:
Initial Scroll: User scrolls past the vertical carousel section ("From Fragmentation to Focus")
Parallax Entry: The blue gradient text animation section should slide over/on top of the vertical carousel section with a parallax effect, bringing the first text animation with it
Sticky Fix: Once the blue section reaches the bottom edge of the navigation bar, it should become fixed/sticky at the top of the viewport and stop all page scrolling
First Animation: The first text "Elevation AI unifies your universe, transforming this chaos into your most powerful competitive advantage." should animate immediately when the section becomes sticky
Scroll Progression: While the section is fixed, the user can continue scrolling (30% of viewport height) which triggers the second text animation
Second Animation: The second text "Turn scattered knowledge into precision, collaboration, and clarity at enterprise scale." should appear and animate
Additional Scroll: After both animations complete, the user can scroll another 30% before the section exits
Section Exit: The section should scroll up and reveal the next section ("The Elevation AI Platform")
Key Requirements:
Parallax effect over the previous section
Fixed positioning at viewport top (below navigation)
Sequential text animations (one at a time, not stacked)
Scroll-triggered progression (not automatic timing)
Proper scroll control (stop/resume)
Smooth transitions between animations
Maintain existing functionality of other sections
Current Issues to Fix:
Scroll progression not working properly after second animation
Section getting stuck and not allowing normal scrolling after animations
Need to ensure both animations complete before allowing exit
Need to add the additional 30% scroll after second animation completes
Technical Implementation:
Uses sticky top-0 positioning
Wheel event listeners for scroll progression
Body scroll control with overflow: hidden and position: fixed
State management for animation completion tracking
Scroll progress tracking with refs
This section should behave like the other sticky sections but with the added complexity of two sequential text animations and scroll-triggered progression.