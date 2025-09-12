import { useEffect, useRef, useState } from 'react'

interface StarfieldOptions {
  starCount?: number
  speed?: number
  zMax?: number
  perspectiveFactor?: number
  backgroundColor?: string
  starColor?: string
}

interface UseStarfieldReturn {
  canvasRef: React.RefObject<HTMLCanvasElement | null>
  isRunning: boolean
  start: () => void
  stop: () => void
  pause: () => void
  resume: () => void
  updateOptions: (options: StarfieldOptions) => void
}

export function useStarfield(options: StarfieldOptions = {}): UseStarfieldReturn {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<StarfieldAnimation | null>(null)
  const [isRunning, setIsRunning] = useState(false)

  const defaultOptions = {
    starCount: 300,
    speed: 0.5,
    zMax: 1000,
    perspectiveFactor: 300,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    starColor: '#FFFFFF',
    ...options
  }

  useEffect(() => {
    if (!canvasRef.current) return

    // Create the StarfieldAnimation instance directly
    animationRef.current = new StarfieldAnimation(canvasRef.current!, defaultOptions)
    setIsRunning(true)
    animationRef.current.start()

    return () => {
      if (animationRef.current) {
        animationRef.current.destroy()
        animationRef.current = null
        setIsRunning(false)
      }
    }
  }, [])

  const start = () => {
    if (animationRef.current) {
      animationRef.current.start()
      setIsRunning(true)
    }
  }

  const stop = () => {
    if (animationRef.current) {
      animationRef.current.stop()
      setIsRunning(false)
    }
  }

  const pause = () => {
    if (animationRef.current) {
      animationRef.current.pause()
      setIsRunning(false)
    }
  }

  const resume = () => {
    if (animationRef.current) {
      animationRef.current.resume()
      setIsRunning(true)
    }
  }

  const updateOptions = (newOptions: StarfieldOptions) => {
    if (animationRef.current) {
      animationRef.current.updateOptions(newOptions)
    }
  }

  return {
    canvasRef,
    isRunning,
    start,
    stop,
    pause,
    resume,
    updateOptions
  }
}

// Simple StarfieldAnimation class for TypeScript
class StarfieldAnimation {
  private canvas: HTMLCanvasElement
  private ctx: CanvasRenderingContext2D
  private options: Required<StarfieldOptions>
  private stars: Array<{ x: number; y: number; z: number }> = []
  private animationFrameId: number = 0
  private animationRunning: boolean = false
  private mounted: boolean = false

  constructor(canvas: HTMLCanvasElement, options: StarfieldOptions) {
    this.canvas = canvas
    this.ctx = canvas.getContext('2d', { willReadFrequently: true })!
    this.options = {
      starCount: 300,
      speed: 0.5,
      zMax: 1000,
      perspectiveFactor: 300,
      backgroundColor: 'rgba(0, 0, 0, 0.2)',
      starColor: '#FFFFFF',
      ...options
    }
    this.init()
  }

  private init() {
    this.setupCanvas()
    this.initializeStars()
    this.setupResizeHandler()
    this.mounted = true
  }

  private setupCanvas() {
    const dpr = window.devicePixelRatio || 1
    const rect = this.canvas.getBoundingClientRect()
    
    this.canvas.width = rect.width * dpr
    this.canvas.height = rect.height * dpr
    
    this.canvas.style.width = rect.width + 'px'
    this.canvas.style.height = rect.height + 'px'
    
    this.ctx.scale(dpr, dpr)
    this.ctx.imageSmoothingEnabled = false
  }

  private initializeStars() {
    this.stars = []
    const rect = this.canvas.getBoundingClientRect()
    
    for (let i = 0; i < this.options.starCount; i++) {
      this.stars.push({
        x: Math.random() * rect.width - rect.width / 2,
        y: Math.random() * rect.height - rect.height / 2,
        z: Math.random() * this.options.zMax
      })
    }
  }

  private animate() {
    if (!this.animationRunning || !this.mounted) return

    const rect = this.canvas.getBoundingClientRect()
    
    this.ctx.fillStyle = this.options.backgroundColor
    this.ctx.fillRect(0, 0, rect.width, rect.height)

    const centerX = rect.width / 2
    const centerY = rect.height / 2

    for (let i = 0; i < this.stars.length; i++) {
      const star = this.stars[i]
      star.z -= this.options.speed

      if (star.z <= 0) {
        star.z = this.options.zMax
        star.x = Math.random() * rect.width - rect.width / 2
        star.y = Math.random() * rect.height - rect.height / 2
      }

      const projectedX = (star.x / star.z) * this.options.perspectiveFactor + centerX
      const projectedY = (star.y / star.z) * this.options.perspectiveFactor + centerY
      const opacity = 1 - star.z / this.options.zMax

      this.ctx.fillStyle = this.options.starColor
      this.ctx.globalAlpha = opacity
      this.ctx.fillRect(Math.floor(projectedX), Math.floor(projectedY), 1, 1)
      this.ctx.globalAlpha = 1
    }

    this.animationFrameId = requestAnimationFrame(() => this.animate())
  }

  start() {
    if (!this.animationRunning) {
      this.animationRunning = true
      this.animate()
    }
  }

  stop() {
    this.animationRunning = false
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId)
    }
  }

  pause() {
    this.animationRunning = false
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId)
    }
  }

  resume() {
    if (!this.animationRunning) {
      this.animationRunning = true
      this.animate()
    }
  }

  updateOptions(newOptions: StarfieldOptions) {
    this.options = { ...this.options, ...newOptions }
    this.initializeStars()
  }

  private setupResizeHandler() {
    const handleResize = () => {
      this.setupCanvas()
      this.initializeStars()
    }
    
    window.addEventListener('resize', handleResize)
  }

  destroy() {
    this.stop()
    window.removeEventListener('resize', this.setupResizeHandler)
    this.mounted = false
  }
}
