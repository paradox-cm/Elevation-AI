"use client"

import { useEffect, useRef } from 'react'
import { cn } from "@/lib/utils"
import { useAnimationContext } from '@/contexts/animation-context'

/**
 * AnimatedFavicon Component
 * 
 * This component displays the Perlin plasma animation used across multiple pages.
 * It uses a global animation context to share the Perlin noise state and avoid
 * reloading the animation when navigating between pages.
 * 
 * The animation is preloaded once in the AnimationProvider and then reused
 * across all instances of this component.
 */

interface AnimatedFaviconProps {
  className?: string
  width?: number
  height?: number
  preset?: 'high-detail' | 'balanced' | 'dramatic'
}

export function AnimatedFavicon({ className, width = 100, height = 100, preset = 'dramatic' }: AnimatedFaviconProps) {
  const { isAnimationInitialized, animationState } = useAnimationContext()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number | undefined>(undefined)
  const lastTimeRef = useRef<number>(0)
  const isVisibleRef = useRef<boolean>(true)

  // Preset configurations
  const presets = {
    'high-detail': {
      scaleX: 0.005,
      scaleY: 0.005,
      waveMultiplier: 3072,
      threshold: 0.15,
      description: "High detail settings with smaller, more detailed filaments"
    },
    'balanced': {
      scaleX: 0.0015,
      scaleY: 0.0015,
      waveMultiplier: 1536,
      threshold: 0.08,
      description: "Balanced settings with larger, more prominent filaments"
    },
    'dramatic': {
      scaleX: 0.0008,
      scaleY: 0.0008,
      waveMultiplier: 1024,
      threshold: 0.04,
      description: "Dramatic settings with the largest, most dramatic filaments"
    }
  }

  const currentPreset = presets[preset]




  // Visibility change handler for performance optimization
  useEffect(() => {
    const handleVisibilityChange = () => {
      isVisibleRef.current = !document.hidden
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Cancel any existing animation
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current)
    }

    // If animation is initialized, use the shared state
    if (isAnimationInitialized && animationState) {
      // Set canvas size
      canvas.width = width
      canvas.height = height
      
      // Use shared animation state
      const { perlin: p, colorIndex: initialColorIndex, brandColors: sharedBrandColors } = animationState
      
      // Performance optimization: Pre-calculate constants
      const rmin = -1, rmax = 1
      const scaleX = currentPreset.scaleX
      const scaleY = currentPreset.scaleY
      const speed = 0.0002
      const colorTransitionSpeed = 0.005
      const waveMultiplier = currentPreset.waveMultiplier
      const threshold = currentPreset.threshold

      // Local animation state that syncs with global state
      // IMPORTANT: Ensure we start with the first color (blue)
      let colorIndex = initialColorIndex // Should be 0 for blue
      let colorTransition = 0 // Start with no transition
      let currentR = sharedBrandColors[0].rgb.r // Blue R value: 14
      let currentG = sharedBrandColors[0].rgb.g // Blue G value: 98
      let currentB = sharedBrandColors[0].rgb.b // Blue B value: 253
      
      const animate = (currentTime: number) => {
        // Throttle animation when tab is not visible
        if (!isVisibleRef.current) {
          animationRef.current = requestAnimationFrame(animate)
          return
        }

        // Throttle to ~60fps for better performance
        if (currentTime - lastTimeRef.current < 16) { // ~60fps
          animationRef.current = requestAnimationFrame(animate)
          return
        }
        lastTimeRef.current = currentTime

                 // Update color transition
         colorTransition += colorTransitionSpeed
         if (colorTransition >= 1) {
           colorTransition = 0
           colorIndex = (colorIndex + 1) % sharedBrandColors.length
         }

         // Clear canvas and add solid black background
         ctx.fillStyle = 'rgba(0, 0, 0, 1)'
         ctx.fillRect(0, 0, width, height)
         
         const time = Date.now()
         const z = time * speed
         
         // Get current and next colors for smooth transition
         const currentColor = sharedBrandColors[colorIndex].rgb
         const nextColor = sharedBrandColors[(colorIndex + 1) % sharedBrandColors.length].rgb
        
        // Interpolate between colors
        currentR = Math.round(currentColor.r + (nextColor.r - currentColor.r) * colorTransition)
        currentG = Math.round(currentColor.g + (nextColor.g - currentColor.g) * colorTransition)
        currentB = Math.round(currentColor.b + (nextColor.b - currentColor.b) * colorTransition)

        // Create image data for pixel manipulation
        const imageData = ctx.getImageData(0, 0, width, height)
        const data = imageData.data

        // Performance optimization: Use more efficient loop
        const dataLength = data.length
        for(let i = 0; i < dataLength; i += 4) {
          const x = (i / 4) % width
          const y = Math.floor((i / 4) / width)
          
          // Scale coordinates for noise
          const xx = x * scaleX
          const yy = y * scaleY
          
          // Get noise value using shared Perlin instance
          const n = p.simplex3d(xx, yy, z)
          const nn = ((n - rmin) / (rmax - rmin))
          
          // Create wave effect
          const wave = Math.abs(nn - 0.5)
          const f = ((255 - Math.min(Math.max(wave * waveMultiplier, 0), 255))) / 255
          
          if(f > threshold) {
            data[i] = f * currentR     // Red
            data[i + 1] = f * currentG // Green
            data[i + 2] = f * currentB // Blue
            data[i + 3] = 255          // Alpha
          }
        }

        ctx.putImageData(imageData, 0, 0)
        animationRef.current = requestAnimationFrame(animate)
      }
      
      // Start animation with a small delay to ensure smooth initial animation
      setTimeout(() => {
        animationRef.current = requestAnimationFrame(animate)
      }, 100)
      
      return () => {
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current)
        }
      }
    }

    // Fallback to original animation if not initialized yet
    // Set canvas size
    canvas.width = width
    canvas.height = height

    // Original Perlin noise implementation (fallback)
    // Vector3D class for Perlin noise
    class Vector3D {
      x: number = 0
      y: number = 0
      z: number = 0

      constructor(x: number, y: number, z: number) {
        this.set(x, y, z)
      }

      dot3d(x: number, y: number, z: number) {
        return ((this.x * x) + (this.y * y) + (this.z * z))
      }

      set(x: number, y: number, z: number) {
        this.x = x
        this.y = y
        this.z = z
        return this
      }
    }

    // Perlin noise implementation
    class Perlin {
      grad3: Vector3D[]
      p: number[]
      permutation: number[]
      gradP: Vector3D[]
      F3: number
      G3: number

      constructor() {
        this.grad3 = [
          new Vector3D(1,1,0), new Vector3D(-1,1,0), new Vector3D(1,-1,0), new Vector3D(-1,-1,0),
          new Vector3D(1,0,1), new Vector3D(-1,0,1), new Vector3D(1,0,-1), new Vector3D(-1,0,-1),
          new Vector3D(0,1,1), new Vector3D(0,-1,1), new Vector3D(0,1,-1), new Vector3D(0,-1,-1)
        ]

        this.p = [
          0x97, 0xa0, 0x89, 0x5b, 0x5a, 0x0f, 0x83, 0x0d, 0xc9, 0x5f, 0x60, 0x35, 0xc2, 0xe9, 0x07, 0xe1, 
          0x8c, 0x24, 0x67, 0x1e, 0x45, 0x8e, 0x08, 0x63, 0x25, 0xf0, 0x15, 0x0a, 0x17, 0xbe, 0x06, 0x94, 
          0xf7, 0x78, 0xea, 0x4b, 0x00, 0x1a, 0xc5, 0x3e, 0x5e, 0xfc, 0xdb, 0xcb, 0x75, 0x23, 0x0b, 0x20, 
          0x39, 0xb1, 0x21, 0x58, 0xed, 0x95, 0x38, 0x57, 0xae, 0x14, 0x7d, 0x88, 0xab, 0xa8, 0x44, 0xaf, 
          0x4a, 0xa5, 0x47, 0x86, 0x8b, 0x30, 0x1b, 0xa6, 0x4d, 0x92, 0x9e, 0xe7, 0x53, 0x6f, 0xe5, 0x7a, 
          0x3c, 0xd3, 0x85, 0xe6, 0xdc, 0x69, 0x5c, 0x29, 0x37, 0x2e, 0xf5, 0x28, 0xf4, 0x66, 0x8f, 0x36, 
          0x41, 0x19, 0x3f, 0xa1, 0x01, 0xd8, 0x50, 0x49, 0xd1, 0x4c, 0x84, 0xbb, 0xd0, 0x59, 0x12, 0xa9, 
          0xc8, 0xc4, 0x87, 0x82, 0x74, 0xbc, 0x9f, 0x56, 0xa4, 0x64, 0x6d, 0xc6, 0xad, 0xba, 0x03, 0x40, 
          0x34, 0xd9, 0xe2, 0xfa, 0x7c, 0x7b, 0x05, 0xca, 0x26, 0x93, 0x76, 0x7e, 0xff, 0x52, 0x55, 0xd4, 
          0xcf, 0xce, 0x3b, 0xe3, 0x2f, 0x10, 0x3a, 0x11, 0xb6, 0xbd, 0x1c, 0x2a, 0xdf, 0xb7, 0xaa, 0xd5, 
          0x77, 0xf8, 0x98, 0x02, 0x2c, 0x9a, 0xa3, 0x46, 0xdd, 0x99, 0x65, 0x9b, 0xa7, 0x2b, 0xac, 0x09, 
          0x81, 0x16, 0x27, 0xfd, 0x13, 0x62, 0x6c, 0x6e, 0x4f, 0x71, 0xe0, 0xe8, 0xb2, 0xb9, 0x70, 0x68, 
          0xda, 0xf6, 0x61, 0xe4, 0xfb, 0x22, 0xf2, 0xc1, 0xee, 0xd2, 0x90, 0x0c, 0xbf, 0xb3, 0xa2, 0xf1, 
          0x51, 0x33, 0x91, 0xeb, 0xf9, 0x0e, 0xef, 0x6b, 0x31, 0xc0, 0xd6, 0x1f, 0xb5, 0xc7, 0x6a, 0x9d, 
          0xb8, 0x54, 0xcc, 0xb0, 0x73, 0x79, 0x32, 0x2d, 0x7f, 0x04, 0x96, 0xfe, 0x8a, 0xec, 0xcd, 0x5d, 
          0xde, 0x72, 0x43, 0x1d, 0x18, 0x48, 0xf3, 0x8d, 0x80, 0xc3, 0x4e, 0x42, 0xd7, 0x3d, 0x9c, 0xb4
        ]

        this.permutation = new Array(512)
        this.gradP = new Array(512)
        this.F3 = (1 / 3)
        this.G3 = (1 / 6)
      }

      init(prng: () => number) {
        for(let i = 0; i < 256; i += 1) {
          const randval = (this.p[i] ^ prng())
          this.permutation[i] = this.permutation[i + 256] = randval
          this.gradP[i] = this.gradP[i + 256] = this.grad3[randval % this.grad3.length]
        }
      }

      simplex3d(x: number, y: number, z: number) {
        let n0, n1, n2, n3, i1, j1, k1, i2, j2, k2,
            t0, t1, t2, t3
        const s = ((x + y + z) * this.F3)
        let i = Math.floor(x + s)
        let j = Math.floor(y + s)
        let k = Math.floor(z + s)
        const t = ((i + j + k) * this.G3)
        const x0 = (x - i + t)
        const y0 = (y - j + t)
        const z0 = (z - k + t)

        if(x0 >= y0) {
          if(y0 >= z0)      { 
            i1=1; j1=0; k1=0; i2=1; j2=1; k2=0; 
          } else if(x0 >= z0) { 
            i1=1; j1=0; k1=0; i2=1; j2=0; k2=1; 
          } else { 
            i1=0; j1=0; k1=1; i2=1; j2=0; k2=1; 
          }
        } else {
          if(y0 < z0) { 
            i1=0; j1=0; k1=1; i2=0; j2=1; k2=1; 
          } else if(x0 < z0) { 
            i1=0; j1=1; k1=0; i2=0; j2=1; k2=1; 
          } else { 
            i1=0; j1=1; k1=0; i2=1; j2=1; k2=0; 
          }
        }

        const x1 = (x0 - i1 + this.G3)
        const y1 = (y0 - j1 + this.G3)
        const z1 = (z0 - k1 + this.G3)
        const x2 = (x0 - i2 + 2 * this.G3)
        const y2 = (y0 - j2 + 2 * this.G3)
        const z2 = (z0 - k2 + 2 * this.G3)
        const x3 = (x0 - 1 + 3 * this.G3)
        const y3 = (y0 - 1 + 3 * this.G3)
        const z3 = (z0 - 1 + 3 * this.G3)

        i &= 255
        j &= 255
        k &= 255

        const gi0 = this.gradP[i + this.permutation[j + this.permutation[k]]]
        const gi1 = this.gradP[i + i1 + this.permutation[j + j1 + this.permutation[k + k1]]]
        const gi2 = this.gradP[i + i2 + this.permutation[j + j2 + this.permutation[k + k2]]]
        const gi3 = this.gradP[i + 1 + this.permutation[j + 1 + this.permutation[k + 1]]]

        t0 = (0.6 - x0 * x0 - y0 * y0 - z0 * z0)
        t1 = (0.6 - x1 * x1 - y1 * y1 - z1 * z1)
        t2 = (0.6 - x2 * x2 - y2 * y2 - z2 * z2)
        t3 = (0.6 - x3 * x3 - y3 * y3 - z3 * z3)
        
        // Fix unused expressions by properly handling the calculations
        if (t0 < 0) {
          n0 = 0
        } else {
          t0 *= t0
          n0 = t0 * t0 * gi0.dot3d(x0, y0, z0)
        }
        
        if (t1 < 0) {
          n1 = 0
        } else {
          t1 *= t1
          n1 = t1 * t1 * gi1.dot3d(x1, y1, z1)
        }
        
        if (t2 < 0) {
          n2 = 0
        } else {
          t2 *= t2
          n2 = t2 * t2 * gi2.dot3d(x2, y2, z2)
        }
        
        if (t3 < 0) {
          n3 = 0
        } else {
          t3 *= t3
          n3 = t3 * t3 * gi3.dot3d(x3, y3, z3)
        }

        return (32 * (n0 + n1 + n2 + n3))
      }
    }

    // Simple PRNG
    class SmallPRNG {
      private seed: number

      constructor(seed: number) {
        this.seed = seed
      }

      random(min: number, max: number) {
        this.seed = (this.seed * 9301 + 49297) % 233280
        return min + (this.seed / 233280) * (max - min)
      }
    }

    // Initialize Perlin noise
    const rctx = new SmallPRNG(+new Date())
    const p = new Perlin()
    p.init(() => rctx.random(0, 255))

    // Fallback brand colors (same as shared ones)
    // IMPORTANT: Blue (Elevation) is first to ensure it shows first in the animation
    const fallbackBrandColors = [
      { name: 'Elevation', hex: '#0e62fd', rgb: { r: 14, g: 98, b: 253 } }, // Blue first
      { name: 'Periwinkle', hex: '#7458f4', rgb: { r: 116, g: 88, b: 244 } }, // Purple second
      { name: 'Green', hex: '#12c55d', rgb: { r: 18, g: 197, b: 93 } },
      { name: 'Red', hex: '#df3523', rgb: { r: 223, g: 53, b: 35 } },
      { name: 'Gold', hex: '#ebbc48', rgb: { r: 235, g: 188, b: 72 } },
      { name: 'Magenta', hex: '#e433c3', rgb: { r: 228, g: 51, b: 195 } },
      { name: 'Cyan', hex: '#5bc8f7', rgb: { r: 91, g: 200, b: 247 } }
    ]

    // Performance optimization: Pre-calculate constants
    const rmin = -1, rmax = 1
    const scaleX = currentPreset.scaleX
    const scaleY = currentPreset.scaleY
    const speed = 0.0002
    const colorTransitionSpeed = 0.005
    const waveMultiplier = currentPreset.waveMultiplier
    const threshold = currentPreset.threshold

    // Performance optimization: Cache color calculations
    // IMPORTANT: Start with first color (blue) to ensure it shows first
    let colorIndex = 0 // Start with first color (blue)
    let colorTransition = 0 // Start with no transition
    let currentR = fallbackBrandColors[0].rgb.r // Blue R value: 14
    let currentG = fallbackBrandColors[0].rgb.g // Blue G value: 98
    let currentB = fallbackBrandColors[0].rgb.b // Blue B value: 253

    // Performance optimization: Throttled animation function
    const animate = (currentTime: number) => {
      // Throttle animation when tab is not visible
      if (!isVisibleRef.current) {
        animationRef.current = requestAnimationFrame(animate)
        return
      }

      // Throttle to ~60fps for better performance
      if (currentTime - lastTimeRef.current < 16) { // ~60fps
        animationRef.current = requestAnimationFrame(animate)
        return
      }
      lastTimeRef.current = currentTime

      // Pre-warm the animation for smoother initial frames
      if (!lastTimeRef.current) {
        lastTimeRef.current = currentTime
        animationRef.current = requestAnimationFrame(animate)
        return
      }

      // Update color transition
      colorTransition += colorTransitionSpeed
      if (colorTransition >= 1) {
        colorTransition = 0
        colorIndex = (colorIndex + 1) % fallbackBrandColors.length
      }

      // Clear canvas and add solid black background
      ctx.fillStyle = 'rgba(0, 0, 0, 1)'
      ctx.fillRect(0, 0, width, height)
      
      const time = Date.now()
      const z = time * speed
      
      // Get current and next colors for smooth transition
      const currentColor = fallbackBrandColors[colorIndex].rgb
      const nextColor = fallbackBrandColors[(colorIndex + 1) % fallbackBrandColors.length].rgb
      
      // Interpolate between colors
      currentR = Math.round(currentColor.r + (nextColor.r - currentColor.r) * colorTransition)
      currentG = Math.round(currentColor.g + (nextColor.g - currentColor.g) * colorTransition)
      currentB = Math.round(currentColor.b + (nextColor.b - currentColor.b) * colorTransition)

      // Create image data for pixel manipulation
      const imageData = ctx.getImageData(0, 0, width, height)
      const data = imageData.data

      // Performance optimization: Use more efficient loop
      const dataLength = data.length
      for(let i = 0; i < dataLength; i += 4) {
        const x = (i / 4) % width
        const y = Math.floor((i / 4) / width)
        
        // Scale coordinates for noise
        const xx = x * scaleX
        const yy = y * scaleY
        
        // Get noise value
        const n = p.simplex3d(xx, yy, z)
        const nn = ((n - rmin) / (rmax - rmin))
        
        // Create wave effect
        const wave = Math.abs(nn - 0.5)
        const f = ((255 - Math.min(Math.max(wave * waveMultiplier, 0), 255))) / 255
        
        if(f > threshold) {
          data[i] = f * currentR     // Red
          data[i + 1] = f * currentG // Green
          data[i + 2] = f * currentB // Blue
          data[i + 3] = 255          // Alpha
        }
      }

      ctx.putImageData(imageData, 0, 0)
      animationRef.current = requestAnimationFrame(animate)
    }

    // Small delay to ensure smooth initial animation
    setTimeout(() => {
      animationRef.current = requestAnimationFrame(animate)
    }, 100)

    // Cleanup function
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [width, height, isAnimationInitialized, animationState, preset])

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      {/* Loading state while animation is being initialized */}
      {!isAnimationInitialized && (
        <div className="absolute inset-0 z-10 w-full h-full flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      )}
      
      {/* Animated Canvas - Only visible element */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-20 w-full h-full"
        style={{
          mask: `url(/images/branding/E-AI-Arrow.svg)`,
          WebkitMask: `url(/images/branding/E-AI-Arrow.svg)`,
          maskSize: 'contain',
          WebkitMaskSize: 'contain',
          maskRepeat: 'no-repeat',
          WebkitMaskRepeat: 'no-repeat',
          maskPosition: 'center',
          WebkitMaskPosition: 'center'
        }}
      />
    </div>
  )
}
