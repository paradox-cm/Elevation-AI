"use client"

import { useEffect, useRef, useState } from 'react'

interface PixelAnimationLightProps {
  width?: number
  height?: number
  gap?: number
  speed?: number
  maxSize?: number
  colors?: string[]
  autoPlay?: boolean
  className?: string
}

interface Pixel {
  x: number
  y: number
  color: string
  speed: number
  size: number
  sizeStep: number
  minSize: number
  maxSizeAvailable: number
  maxSize: number
  sizeDirection: number
  delay: number
  delayHide: number
  counter: number
  counterHide: number
  counterStep: number
  isHidden: boolean
  isFlicking: boolean
}

const rand = (min: number, max: number) => {
  return Math.random() * (max - min) + min
}

// Helper function to create light mode optimized colors
const createLightModeColors = (baseColors: string[]): string[] => {
  return baseColors.map(color => {
    // Convert hex to RGB
    const hex = color.replace('#', '')
    const r = parseInt(hex.substr(0, 2), 16) / 255
    const g = parseInt(hex.substr(2, 2), 16) / 255
    const b = parseInt(hex.substr(4, 2), 16) / 255
    
    // Create a lighter, more muted version by mixing with white
    const whiteMix = 0.4 // Mix 40% white with 60% original color
    const newR = Math.round(((r * (1 - whiteMix)) + (1.0 * whiteMix)) * 255)
    const newG = Math.round(((g * (1 - whiteMix)) + (1.0 * whiteMix)) * 255)
    const newB = Math.round(((b * (1 - whiteMix)) + (1.0 * whiteMix)) * 255)
    
    return `rgb(${newR}, ${newG}, ${newB})`
  })
}

export function PixelAnimationLight({
  width = 400,
  height = 300,
  gap = 6,
  speed = 0.1,
  maxSize = 2,
  colors = ['#3B82F6', '#8B5CF6', '#06B6D4', '#10B981', '#F59E0B'],
  autoPlay = true,
  className = ''
}: PixelAnimationLightProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number | null>(null)
  const pixelsRef = useRef<Pixel[]>([])
  const lastTimeRef = useRef<number>()
  const tickerRef = useRef<number>(0)
  const animationDirectionRef = useRef<number>(1)
  const maxTickerRef = useRef<number>(360)
  const intervalRef = useRef<number>(1000 / 60)

  const [isPlaying, setIsPlaying] = useState(autoPlay)

  // Create light mode optimized colors
  const lightModeColors = createLightModeColors(colors)

  const getDelay = (x: number, y: number, direction: boolean = false) => {
    let dx = x - width * 0.5
    let dy = y - height
    
    if (direction) {
      dy = y
    }
    
    return Math.sqrt(dx ** 2 + dy ** 2)
  }

  const createPixel = (x: number, y: number, color: string, speed: number, delay: number, delayHide: number, step: number, boundSize: number): Pixel => {
    return {
      x,
      y,
      color,
      speed: rand(0.1, 0.9) * speed,
      size: 0,
      sizeStep: rand(0, 0.5),
      minSize: 0.5,
      maxSizeAvailable: boundSize || 2,
      maxSize: rand(0.5, boundSize || 2),
      sizeDirection: 1,
      delay,
      delayHide,
      counter: 0,
      counterHide: 0,
      counterStep: step,
      isHidden: false,
      isFlicking: false
    }
  }

  const initPixels = () => {
    const h = Math.floor(rand(0, 360))
    const colorsLen = lightModeColors.length
    const generatedColors = Array.from({ length: colorsLen }, (_, index) => {
      if (lightModeColors[index]) {
        return lightModeColors[index]
      }
      // Fallback to HSL for light mode
      return `hsl(${Math.floor(rand(h, h + (index + 1) * 10))} 60% ${rand(40, 60)}%)`
    })
    
    const step = (width + height) * 0.005
    const maxSizeValue = Math.floor(gap * 0.5)
    
    pixelsRef.current = []
    
    for (let x = 0; x < width; x += gap) {
      for (let y = 0; y < height; y += gap) {
        if (x + maxSizeValue > width || y + maxSizeValue > height) {
          continue
        }

        const color = generatedColors[Math.floor(Math.random() * colorsLen)]
        const delay = getDelay(x, y)
        const delayHide = getDelay(x, y)

        pixelsRef.current.push(createPixel(x, y, color, speed, delay, delayHide, step, maxSizeValue))
      }
    }
  }

  const drawPixel = (ctx: CanvasRenderingContext2D, pixel: Pixel) => {
    const centerOffset = pixel.maxSizeAvailable * 0.5 - pixel.size * 0.5

    // Add subtle transparency for light mode
    const alpha = 0.8
    ctx.globalAlpha = alpha
    
    ctx.fillStyle = pixel.color
    ctx.fillRect(
      pixel.x + centerOffset,
      pixel.y + centerOffset,
      pixel.size,
      pixel.size
    )
    
    // Reset alpha
    ctx.globalAlpha = 1.0
  }

  const showPixel = (pixel: Pixel) => {
    pixel.isHidden = false
    pixel.counterHide = 0

    if (pixel.counter <= pixel.delay) {
      pixel.counter += pixel.counterStep
      return
    }

    if (pixel.size >= pixel.maxSize) {
      pixel.isFlicking = true
    }

    if (pixel.isFlicking) {
      flickPixel(pixel)
    } else {
      pixel.size += pixel.sizeStep
    }
  }

  const hidePixel = (pixel: Pixel) => {
    pixel.counter = 0

    if (pixel.counterHide <= pixel.delayHide) {
      pixel.counterHide += pixel.counterStep
      if (pixel.isFlicking) {
        flickPixel(pixel)
      }
      return
    }
    
    pixel.isFlicking = false

    if (pixel.size <= 0) {
      pixel.size = 0
      pixel.isHidden = true
      return
    } else {
      pixel.size -= 0.05
    }
  }

  const flickPixel = (pixel: Pixel) => {
    if (pixel.size >= pixel.maxSize) {
      pixel.sizeDirection = -1
    } else if (pixel.size <= pixel.minSize) {
      pixel.sizeDirection = 1
    }
    
    pixel.size += pixel.sizeDirection * pixel.speed
  }

  const animate = () => {
    if (!isPlaying) return

    animationRef.current = requestAnimationFrame(animate)
    
    const now = performance.now()
    const diff = now - (lastTimeRef.current || 0)

    if (diff < intervalRef.current) {
      return
    }

    lastTimeRef.current = now - (diff % intervalRef.current)

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Light mode background - white instead of dark
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, width, height)

    if (tickerRef.current >= maxTickerRef.current) {
      animationDirectionRef.current = -1
    } else if (tickerRef.current <= 0) {
      animationDirectionRef.current = 1
    }
    
    let allHidden = true

    pixelsRef.current.forEach((pixel) => {
      if (animationDirectionRef.current > 0) {
        showPixel(pixel)
      } else {
        hidePixel(pixel)
        allHidden = allHidden && pixel.isHidden
      }

      drawPixel(ctx, pixel)
    })
    
    tickerRef.current += animationDirectionRef.current
    
    if (animationDirectionRef.current < 0 && allHidden) {
      tickerRef.current = 0
    }
  }

  const resetAnimation = () => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current)
    }
    
    tickerRef.current = 0
    animationDirectionRef.current = 1
    
    initPixels()
    
    if (isPlaying) {
      animate()
    }
  }

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    canvas.width = width
    canvas.height = height

    initPixels()

    if (isPlaying) {
      animate()
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [width, height, gap, speed, maxSize, colors, isPlaying])

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        className="border border-border rounded-lg cursor-pointer bg-white"
        onClick={resetAnimation}
        style={{ background: '#ffffff' }}
      />
      <div className="absolute top-2 right-2 flex gap-2">
        <button
          onClick={togglePlayPause}
          className="px-3 py-1 text-xs bg-white/90 backdrop-blur-sm border border-gray-200 rounded hover:bg-white transition-colors text-gray-700"
        >
          {isPlaying ? 'Pause' : 'Play'}
        </button>
        <button
          onClick={resetAnimation}
          className="px-3 py-1 text-xs bg-white/90 backdrop-blur-sm border border-gray-200 rounded hover:bg-white transition-colors text-gray-700"
        >
          Reset
        </button>
      </div>
      <div className="absolute bottom-2 left-2 text-xs text-gray-600 bg-white/90 backdrop-blur-sm px-2 py-1 rounded">
        Click to regenerate
      </div>
    </div>
  )
}
