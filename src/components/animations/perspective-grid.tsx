"use client"

import React from "react"
import { useThemeProvider } from "@/hooks/use-theme"
import { cn } from "@/lib/utils"

interface PerspectiveGridProps {
  className?: string
  speed?: number
  gridSize?: number
  opacity?: number
}

export function PerspectiveGrid({ 
  className,
  speed = 1,
  gridSize = 24,
  opacity = 0.3
}: PerspectiveGridProps) {
  const { isDark } = useThemeProvider()
  const [mounted, setMounted] = React.useState(false)

  // Ensure component is mounted before accessing theme to prevent hydration mismatch
  React.useEffect(() => {
    setMounted(true)
  }, [])

  // Use default light mode during SSR to prevent hydration mismatch
  const isDarkMode = mounted ? isDark : false

  const gridColor = isDarkMode ? '#999' : '#374151'
  const fadeColor = isDarkMode ? '#000' : '#fff'

  return (
    <div className={cn("absolute inset-0 overflow-hidden", className)}>
      <div 
        className="absolute inset-0"
        style={{
          perspective: '400px',
          padding: '6rem 0',
        }}
      >
        {/* Bottom Grid */}
        <div
          className="absolute right-[-20%] bottom-0 left-[-20%] h-80"
          style={{
            transform: 'rotateX(44deg)',
            transformOrigin: 'center bottom',
            animation: `grid-move ${1 / speed}s linear infinite`,
            backgroundImage: `
              linear-gradient(${gridColor} 0px, ${gridColor} 0.5px, rgba(0, 0, 0, 0) 1px),
              linear-gradient(90deg, ${gridColor} 0px, ${gridColor} 0.5px, rgba(0, 0, 0, 0) 1px)
            `,
            backgroundPosition: 'center 0',
            backgroundSize: `${gridSize * 1.4}px ${gridSize}px`,
            opacity: opacity,
          }}
        >
          {/* Top Fade Effect */}
          <div
            className="absolute top-0 right-0 left-0 h-1/2 z-[2]"
            style={{
              backgroundImage: `linear-gradient(${fadeColor}, rgba(0, 0, 0, 0))`,
            }}
          />
        </div>

        {/* Top Grid */}
        <div
          className="absolute right-[-20%] top-0 left-[-20%] h-80"
          style={{
            transform: 'rotateX(-44deg)',
            transformOrigin: 'center top',
            animation: `grid-move ${1 / speed}s linear infinite reverse`,
            backgroundImage: `
              linear-gradient(${gridColor} 0px, ${gridColor} 0.5px, rgba(0, 0, 0, 0) 1px),
              linear-gradient(90deg, ${gridColor} 0px, ${gridColor} 0.5px, rgba(0, 0, 0, 0) 1px)
            `,
            backgroundPosition: 'center 0',
            backgroundSize: `${gridSize * 1.4}px ${gridSize}px`,
            opacity: opacity,
          }}
        >
          {/* Bottom Fade Effect */}
          <div
            className="absolute bottom-0 right-0 left-0 h-1/2 z-[2]"
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0), ${fadeColor})`,
            }}
          />
        </div>
      </div>

      {/* CSS Animation Keyframes */}
      <style jsx>{`
        @keyframes grid-move {
          to {
            background-position: center -${gridSize}px;
          }
        }
      `}</style>
    </div>
  )
}
