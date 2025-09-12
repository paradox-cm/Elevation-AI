import React from 'react'
import StarfieldHero from './StarfieldHero'

// Example 1: Basic Usage
export function BasicExample() {
  return (
    <StarfieldHero 
      title="Welcome to My Site"
      subtitle="Experience something amazing"
    />
  )
}

// Example 2: Custom Styling
export function CustomStyledExample() {
  return (
    <StarfieldHero 
      title="Custom Styled Title"
      subtitle="With custom styling applied"
      className="min-h-screen bg-gradient-to-b from-purple-900 to-black"
      titleClassName="rainbow-text text-6xl font-extrabold"
      subtitleClassName="text-xl text-purple-200 font-light"
    />
  )
}

// Example 3: Different Animation Speeds
export function SpeedVariationsExample() {
  return (
    <div className="space-y-20">
      <StarfieldHero 
        title="Slow Animation"
        subtitle="This one moves slowly"
        titleClassName="rainbow-text-slow text-4xl"
      />
      
      <StarfieldHero 
        title="Fast Animation"
        subtitle="This one moves quickly"
        titleClassName="rainbow-text-fast text-4xl"
      />
    </div>
  )
}

// Example 4: Different Text Effects
export function TextEffectsExample() {
  return (
    <div className="space-y-20">
      <StarfieldHero 
        title="Rainbow + Bounce"
        subtitle="Full effect"
        titleClassName="rainbow-text text-4xl"
      />
      
      <StarfieldHero 
        title="Rainbow Only"
        subtitle="No bouncing"
        titleClassName="rainbow-only-text text-4xl"
      />
      
      <StarfieldHero 
        title="Bounce Only"
        subtitle="No rainbow colors"
        titleClassName="bounce-text text-4xl text-blue-400"
      />
    </div>
  )
}

// Example 5: Custom Colors
export function CustomColorsExample() {
  return (
    <StarfieldHero 
      title="Custom Colors"
      subtitle="Red rainbow effect"
      titleClassName="rainbow-text-red text-4xl"
      subtitleClassName="text-red-300"
    />
  )
}

// Example 6: Full Page Layout
export function FullPageExample() {
  return (
    <div className="min-h-screen bg-black">
      <StarfieldHero 
        title="Full Page Hero"
        subtitle="This takes up the full viewport"
        className="min-h-screen"
      />
      
      {/* Content below the hero */}
      <div className="bg-white text-black py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-8">Your Content Here</h2>
          <p className="text-lg">
            This content appears below the animated hero section.
            The starfield animation only affects the hero area.
          </p>
        </div>
      </div>
    </div>
  )
}

// Example 7: With Navigation
export function WithNavigationExample() {
  return (
    <div className="min-h-screen bg-black">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-white font-bold text-xl">My Site</h1>
            <div className="space-x-4">
              <a href="#home" className="text-white hover:text-yellow-400">Home</a>
              <a href="#about" className="text-white hover:text-yellow-400">About</a>
              <a href="#contact" className="text-white hover:text-yellow-400">Contact</a>
            </div>
          </div>
        </div>
      </nav>
      
      {/* Hero with navigation offset */}
      <StarfieldHero 
        title="Hero with Navigation"
        subtitle="Navigation doesn't interfere with animation"
        className="pt-20" // Add padding to account for fixed nav
      />
    </div>
  )
}

// Example 8: Multiple Hero Sections
export function MultipleHeroesExample() {
  return (
    <div>
      <StarfieldHero 
        title="First Hero"
        subtitle="First section"
        className="min-h-screen"
      />
      
      <div className="bg-gray-100 py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-8">Regular Content</h2>
          <p className="text-lg">This is a regular content section between heroes.</p>
        </div>
      </div>
      
      <StarfieldHero 
        title="Second Hero"
        subtitle="Second section"
        className="min-h-screen"
      />
    </div>
  )
}

// Main App Component
export default function App() {
  return (
    <div>
      <BasicExample />
    </div>
  )
}
