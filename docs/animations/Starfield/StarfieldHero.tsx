"use client"

import { useState, useEffect, useRef } from "react"

interface StarfieldHeroProps {
  title: string
  subtitle: string
  className?: string
  titleClassName?: string
  subtitleClassName?: string
}

export default function StarfieldHero({ 
  title, 
  subtitle, 
  className = "",
  titleClassName = "",
  subtitleClassName = ""
}: StarfieldHeroProps) {
  const [mounted, setMounted] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationFrameId = useRef<number>(0)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Load Google Fonts and inject CSS animations
  useEffect(() => {
    const link = document.createElement("link")
    link.href = "https://fonts.googleapis.com/css2?family=Bungee&family=Young+Serif&family=Patrick+Hand&display=swap"
    link.rel = "stylesheet"
    document.head.appendChild(link)

    const style = document.createElement("style")
    style.textContent = `
    @keyframes rainbow {
      0% { color: #ff0000; } 14% { color: #ff7f00; } 28% { color: #ffff00; } 42% { color: #00ff00; }
      57% { color: #0000ff; } 71% { color: #4b0082; } 85% { color: #9400d3; } 100% { color: #ff0000; }
    }
    @keyframes bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
    .rainbow-text {
      font-family: 'Bungee', cursive; 
      animation: rainbow 5s linear infinite, bounce 2s ease-in-out infinite;
      text-shadow: 2px 2px 4px rgba(0,0,0,0.3); 
      letter-spacing: 1px;
    }
    @keyframes shadow-glow { 
      0%, 100% { box-shadow: 0 0 5px rgba(255, 204, 0, 0.5); } 
      50% { box-shadow: 0 0 20px rgba(255, 204, 0, 0.8); } 
    }
    .shadow-glow {
      animation: shadow-glow 2s ease-in-out infinite;
    }
    `
    document.head.appendChild(style)
    
    return () => {
      if (link.parentNode) document.head.removeChild(link)
      if (style.parentNode) document.head.removeChild(style)
    }
  }, [])

  // Starfield Animation useEffect
  useEffect(() => {
    if (!mounted) {
      console.log("Starfield: Not mounted, skipping.")
      return
    }

    const canvas = canvasRef.current
    if (!canvas) {
      console.error("Starfield: Canvas element not found after mount.")
      return
    }

    const ctx = canvas.getContext("2d", { willReadFrequently: true })
    if (!ctx) {
      console.error("Starfield: Canvas 2D context not available.")
      return
    }

    ctx.imageSmoothingEnabled = false

    const stars: { x: number; y: number; z: number }[] = []
    const starCount = 300
    const speed = 0.5
    const Z_MAX = 1000

    // Function to set canvas buffer size and initialize/re-initialize stars
    const initializeCanvasAndStars = () => {
      const dpr = window.devicePixelRatio || 1
      if (canvas.offsetWidth === 0 || canvas.offsetHeight === 0) {
        console.warn("Starfield: Canvas has zero logical dimensions. Retrying initialization.")
        animationFrameId.current = requestAnimationFrame(initializeCanvasAndStars)
        return false
      }

      canvas.width = canvas.offsetWidth * dpr
      canvas.height = canvas.offsetHeight * dpr

      ctx.imageSmoothingEnabled = false

      console.log(
        `Starfield: Canvas initialized. Buffer: ${canvas.width}x${canvas.height}, Logical: ${canvas.offsetWidth}x${canvas.offsetHeight}, DPR: ${dpr}`,
      )

      stars.length = 0
      for (let i = 0; i < starCount; i++) {
        stars.push({
          x: Math.random() * canvas.width - canvas.width / 2,
          y: Math.random() * canvas.height - canvas.height / 2,
          z: Math.random() * Z_MAX,
        })
      }
      console.log(`Starfield: ${stars.length} stars initialized.`)
      return true
    }

    let animationRunning = false

    const animate = () => {
      if (canvas.width === 0 || canvas.height === 0) {
        console.warn("Starfield animate: Canvas buffer size is zero. Attempting re-init.")
        if (!initializeCanvasAndStars()) {
          return
        }
      }

      ctx.fillStyle = "rgba(0, 0, 0, 0.2)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const perspectiveFactor = 300
      const centerX = canvas.width / 2
      const centerY = canvas.height / 2

      for (let i = 0; i < stars.length; i++) {
        const star = stars[i]
        star.z -= speed
        if (star.z <= 0) {
          star.z = Z_MAX
          star.x = Math.random() * canvas.width - canvas.width / 2
          star.y = Math.random() * canvas.height - canvas.height / 2
        }

        const projectedX = (star.x / star.z) * perspectiveFactor + centerX
        const projectedY = (star.y / star.z) * perspectiveFactor + centerY
        const opacity = 1 - star.z / Z_MAX

        ctx.fillStyle = "#FFFFFF"
        ctx.globalAlpha = opacity
        ctx.fillRect(Math.floor(projectedX), Math.floor(projectedY), 1, 1)
        ctx.globalAlpha = 1
      }
      animationFrameId.current = requestAnimationFrame(animate)
    }

    // Resize handler
    const handleResize = () => {
      console.log("Starfield: Resize event detected.")
      if (canvasRef.current) {
        initializeCanvasAndStars()
        if (!animationRunning && canvasRef.current.width > 0 && canvasRef.current.height > 0) {
          console.log("Starfield: Starting animation after resize.")
          animationRunning = true
          animate()
        }
      }
    }

    // Attempt initial setup
    if (initializeCanvasAndStars()) {
      console.log("Starfield: Initial setup successful, starting animation.")
      animationRunning = true
      animate()
    } else {
      console.log(
        "Starfield: Initial setup pending (likely zero dimensions). Will retry via rAF in initializeCanvasAndStars.",
      )
    }

    window.addEventListener("resize", handleResize)

    return () => {
      console.log("Starfield: Cleaning up animation.")
      window.removeEventListener("resize", handleResize)
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current)
      }
      animationRunning = false
    }
  }, [mounted])

  if (!mounted) {
    return null
  }

  return (
    <div className={`relative py-12 overflow-hidden ${className}`}>
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full" 
        style={{ zIndex: 0 }} 
      />
      <div className="container mx-auto px-4 relative z-10 flex flex-col items-center justify-center">
        <h1 className={`rainbow-text text-4xl font-bold text-center mb-6 pt-4 ${titleClassName}`}>
          {title}
        </h1>
        <p className={`text-center text-muted-foreground mb-8 ${subtitleClassName}`}>
          {subtitle}
        </p>
      </div>
    </div>
  )
}
