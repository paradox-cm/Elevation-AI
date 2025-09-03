"use client"

import { useEffect, useRef } from "react"

interface WorkspacesCanvasesProps {
  width?: number
  height?: number
  className?: string
  showBorder?: boolean
}

export function WorkspacesCanvases({ 
  width = 440, 
  height = 440, 
  className = "",
  showBorder = true 
}: WorkspacesCanvasesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = width
    canvas.height = height

    // Theme-aware colors
    let isDark = document.documentElement.classList.contains('dark')
    let backgroundColor = isDark ? 'rgba(15, 15, 15, 0.1)' : 'rgba(250, 250, 250, 0.1)'
    let windowColor = isDark ? 'rgba(0, 0, 0, 0.9)' : 'rgba(255, 255, 255, 0.9)' // Reversed: dark windows for dark mode, light windows for light mode
    let windowBorderColor = isDark ? 'rgba(82, 82, 91, 0.8)' : 'rgba(161, 161, 170, 0.8)' // Reversed border colors
    let dataColor = isDark ? 'rgba(59, 130, 246, 0.8)' : 'rgba(37, 99, 235, 0.8)'
    let connectionColor = isDark ? 'rgba(82, 82, 91, 0.4)' : 'rgba(161, 161, 170, 0.4)' // Reversed connection colors

    // Theme change observer
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          isDark = document.documentElement.classList.contains('dark')
          backgroundColor = isDark ? 'rgba(15, 15, 15, 0.1)' : 'rgba(250, 250, 250, 0.1)'
          windowColor = isDark ? 'rgba(0, 0, 0, 0.9)' : 'rgba(255, 255, 255, 0.9)' // Reversed: dark windows for dark mode, light windows for light mode
          windowBorderColor = isDark ? 'rgba(82, 82, 91, 0.8)' : 'rgba(161, 161, 170, 0.8)' // Reversed border colors
          dataColor = isDark ? 'rgba(59, 130, 246, 0.8)' : 'rgba(37, 99, 235, 0.8)'
          connectionColor = isDark ? 'rgba(82, 82, 91, 0.4)' : 'rgba(161, 161, 170, 0.4)' // Reversed connection colors
        }
      })
    })

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    })

    // Performance optimization: Pre-calculate constants
    const centerX = canvas.width / 2
    const centerY = canvas.height / 2

    let dataParticles: Array<DataParticle> = []
    let animationTime = 0

    // Define workspace windows (vertically centered)
    const workspaces = [
      { x: width * 0.182, y: height * 0.295, width: width * 0.182, height: height * 0.136, id: 1 }, // 80, 130, 80, 60 for 440x440
      { x: width * 0.636, y: height * 0.295, width: width * 0.182, height: height * 0.136, id: 2 }, // 280, 130, 80, 60 for 440x440
      { x: width * 0.182, y: height * 0.568, width: width * 0.182, height: height * 0.136, id: 3 }, // 80, 250, 80, 60 for 440x440
      { x: width * 0.636, y: height * 0.568, width: width * 0.182, height: height * 0.136, id: 4 }, // 280, 250, 80, 60 for 440x440
      { x: width * 0.409, y: height * 0.432, width: width * 0.182, height: height * 0.136, id: 5 }  // 180, 190, 80, 60 for 440x440
    ]

    class DataParticle {
      x: number
      y: number
      targetX: number
      targetY: number
      progress: number
      speed: number
      size: number
      sourceId: number
      targetId: number

      constructor(startX: number, startY: number, endX: number, endY: number, sourceId: number, targetId: number) {
        this.x = startX
        this.y = startY
        this.targetX = endX
        this.targetY = endY
        this.progress = 0
        this.speed = (Math.random() * 0.015 + 0.01) * 0.7 // Reduced by 30% for slower movement
        this.size = 4
        this.sourceId = sourceId
        this.targetId = targetId
      }

      update() {
        this.progress += this.speed
        
        if (this.progress >= 1) {
          return false // Remove particle
        }
        
        // Move along path
        this.x = this.x + (this.targetX - this.x) * this.speed
        this.y = this.y + (this.targetY - this.y) * this.speed
        
        return true // Keep particle
      }

      draw() {
        if (!ctx) return
        
        const currentX = this.x + (this.targetX - this.x) * this.progress
        const currentY = this.y + (this.targetY - this.y) * this.progress
        
        // Clean blue circle with no outline
        ctx.beginPath()
        ctx.arc(currentX, currentY, this.size, 0, Math.PI * 2)
        ctx.fillStyle = dataColor
        ctx.fill()
      }
    }

    function drawWorkspaces() {
      if (!ctx) return
      
      workspaces.forEach(workspace => {
        const radius = 8 // Corner radius for rounded corners
        
        // Draw rounded window frame
        ctx.fillStyle = windowColor
        ctx.beginPath()
        ctx.roundRect(workspace.x, workspace.y, workspace.width, workspace.height, radius)
        ctx.fill()
        
        // Draw rounded title bar
        ctx.fillStyle = windowBorderColor
        ctx.beginPath()
        ctx.roundRect(workspace.x, workspace.y, workspace.width, 20, [radius, radius, 0, 0])
        ctx.fill()
        
        // Draw skeleton UI elements properly contained within window bounds
        const contentStartY = workspace.y + 25
        const padding = 8
        const availableWidth = workspace.width - (padding * 2)
        const availableHeight = workspace.height - 25 - padding // Subtract title bar height and bottom padding
        
        ctx.fillStyle = connectionColor
        
        // Small rectangle (like a button or input field) - properly contained
        const buttonWidth = Math.min(20, availableWidth - 4)
        const buttonHeight = Math.min(12, availableHeight - 20) // Ensure it fits in available height
        if (buttonHeight > 0) {
          ctx.fillRect(workspace.x + padding, contentStartY + 5, buttonWidth, buttonHeight)
        }
        
        // Circle (like an icon or avatar) - properly contained
        const iconSize = Math.min(6, Math.min(availableWidth, availableHeight) / 3)
        const iconX = workspace.x + workspace.width - padding - iconSize
        const iconY = contentStartY + 5 + iconSize // Ensure it's within bounds
        if (iconY + iconSize <= workspace.y + workspace.height - padding) {
          ctx.beginPath()
          ctx.arc(iconX, iconY, iconSize, 0, Math.PI * 2)
          ctx.fill()
        }
        
        // Horizontal line (like a divider or progress bar) - properly contained
        const lineWidth = Math.max(0, availableWidth - 4)
        const lineY = contentStartY + 15
        if (lineWidth > 0 && lineY + 2 <= workspace.y + workspace.height - padding) {
          ctx.fillRect(workspace.x + padding, lineY, lineWidth, 2)
        }
        
        // Additional horizontal line beneath the divider (representing text content)
        const textLineY = contentStartY + 20
        if (lineWidth > 0 && textLineY + 2 <= workspace.y + workspace.height - padding) {
          ctx.fillRect(workspace.x + padding, textLineY, lineWidth, 2)
        }
        
        // Small square (like a checkbox or status indicator) - properly contained
        const checkboxSize = Math.min(8, Math.min(availableWidth, availableHeight - 20))
        const checkboxY = contentStartY + 30 // Adjusted position to accommodate new text line
        if (checkboxSize > 0 && checkboxY + checkboxSize <= workspace.y + workspace.height - padding) {
          ctx.fillRect(workspace.x + padding, checkboxY, checkboxSize, checkboxSize)
        }
      })
    }

    function drawConnections() {
      if (!ctx) return
      
      // Draw solid connection lines between workspaces (no transparency)
      ctx.strokeStyle = isDark ? 'rgba(255, 255, 255, 1)' : 'rgba(0, 0, 0, 1)' // White for dark mode, black for light mode
      ctx.lineWidth = 1
      
      // Fixed connections to prevent flashing - each workspace connects to 2 specific others
      const fixedConnections = [
        { from: 1, to: 2 }, { from: 1, to: 3 },
        { from: 2, to: 4 }, { from: 2, to: 5 },
        { from: 3, to: 4 }, { from: 3, to: 5 },
        { from: 4, to: 1 }, { from: 5, to: 2 }
      ]
      
      fixedConnections.forEach(connection => {
        const source = workspaces.find(w => w.id === connection.from)
        const target = workspaces.find(w => w.id === connection.to)
        
        if (source && target) {
          ctx.beginPath()
          ctx.moveTo(source.x + source.width/2, source.y + source.height/2)
          ctx.lineTo(target.x + target.width/2, target.y + target.height/2)
          ctx.stroke()
        }
      })
    }

    function generateDataParticles() {
      // Generate new data particles periodically
      if (animationTime % 40 === 0) {
        // Create 3-4 particles per cycle
        for (let i = 0; i < 4; i++) {
          const randomSource = workspaces[Math.floor(Math.random() * workspaces.length)]
          const randomTarget = workspaces[Math.floor(Math.random() * workspaces.length)]
          
          if (randomSource.id !== randomTarget.id) {
            dataParticles.push(new DataParticle(
              randomSource.x + randomSource.width/2, randomSource.y + randomSource.height/2,
              randomTarget.x + randomTarget.width/2, randomTarget.y + randomTarget.height/2,
              randomSource.id, randomTarget.id
            ))
          }
        }
      }
    }

    function animate() {
      if (!ctx || !canvas) return
      
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      // Draw background
      ctx.fillStyle = backgroundColor
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      
      // Draw static elements
      drawConnections()
      drawWorkspaces()
      
      // Generate new data particles
      generateDataParticles()
      
      // Update and draw data particles
      dataParticles = dataParticles.filter(particle => particle.update())
      dataParticles.forEach(particle => particle.draw())
      
      animationTime++
      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      observer.disconnect()
    }
  }, [width, height])

  return (
    <div className={`flex justify-center ${className}`}>
      <div className={`${showBorder ? 'bg-muted/50 rounded-lg p-4 border border-border' : ''}`}>
        <canvas 
          ref={canvasRef}
          className="rounded-lg"
          style={{ width: `${width}px`, height: `${height}px` }}
        />
      </div>
    </div>
  )
}
