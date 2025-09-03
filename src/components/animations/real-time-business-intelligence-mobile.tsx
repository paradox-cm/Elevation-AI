"use client"

import { useEffect, useRef } from "react"

interface RealTimeBusinessIntelligenceMobileProps {
  width?: number
  height?: number
  className?: string
  showBorder?: boolean
}

export function RealTimeBusinessIntelligenceMobile({ 
  width = 480, // 20% smaller than 600
  height = 320, // 20% smaller than 400
  className = "",
  showBorder = true 
}: RealTimeBusinessIntelligenceMobileProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // High-DPI support for mobile devices
    const devicePixelRatio = window.devicePixelRatio || 1
    const rect = canvas.getBoundingClientRect()
    
    // Set canvas size accounting for device pixel ratio
    canvas.width = rect.width * devicePixelRatio
    canvas.height = rect.height * devicePixelRatio
    
    // Scale the drawing context to match device pixel ratio
    ctx.scale(devicePixelRatio, devicePixelRatio)
    
    // Set the canvas CSS size to the logical size
    canvas.style.width = rect.width + 'px'
    canvas.style.height = rect.height + 'px'

    // Theme-aware colors - proper light/dark mode distinction
    let isDark = document.documentElement.classList.contains('dark')
    let backgroundColor = 'transparent' // No background in either mode
    let panelColor = isDark ? 'rgba(0, 0, 0, 0.7)' : 'rgba(240, 240, 240, 0.8)' // Dark panel for dark mode, light gray panel for light mode
    let titleBarColor = isDark ? 'rgba(82, 82, 91, 0.8)' : 'rgba(156, 163, 175, 0.8)' // Dark title bar for dark mode, light gray for light mode
    let dataColor = isDark ? 'rgba(37, 99, 235, 0.8)' : 'rgba(37, 99, 235, 0.8)' // Same blue for both modes
    let connectionColor = isDark ? 'rgba(82, 82, 91, 0.4)' : 'rgba(156, 163, 175, 0.4)' // Dark zinc for dark mode, light gray for light mode
    let metricColor = isDark ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)' // White for dark mode, black for light mode

    // Theme change observer - dark mode matches light mode
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          isDark = document.documentElement.classList.contains('dark')
          backgroundColor = 'transparent' // No background in either mode
          panelColor = isDark ? 'rgba(0, 0, 0, 0.7)' : 'rgba(240, 240, 240, 0.8)' // Dark panel for dark mode, light gray panel for light mode
          titleBarColor = isDark ? 'rgba(82, 82, 91, 0.8)' : 'rgba(156, 163, 175, 0.8)' // Dark title bar for dark mode, light gray for light mode
          dataColor = isDark ? 'rgba(37, 99, 235, 0.8)' : 'rgba(37, 99, 235, 0.8)' // Same blue for both modes
          connectionColor = isDark ? 'rgba(82, 82, 91, 0.4)' : 'rgba(156, 163, 175, 0.4)' // Dark zinc for dark mode, light gray for light mode
          metricColor = isDark ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)' // White for dark mode, black for light mode
        }
      })
    })

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    })

    // Define single dashboard window with 16:9 aspect ratio
    // Get the logical dimensions (CSS size) for positioning calculations
    const logicalWidth = canvas.width / (window.devicePixelRatio || 1)
    const logicalHeight = canvas.height / (window.devicePixelRatio || 1)
    
    const dashboard = {
      x: logicalWidth * 0.091, // 40px for 440px canvas, scaled proportionally
      y: (logicalHeight - (logicalWidth * 0.46)) / 2, // Vertically center the dashboard
      width: logicalWidth * 0.818, // 360px for 440px canvas, scaled proportionally
      height: logicalWidth * 0.46 // 16:9 aspect ratio (360 * 9/16), scaled proportionally
    }

    let animationTime = 0

    function drawDashboard() {
      if (!ctx) return
      
      const radius = Math.max(4, logicalWidth * 0.018) // Corner radius for rounded corners, scaled proportionally
      
      // Draw glass effect background (subtle outer glow)
      ctx.shadowColor = isDark ? 'rgba(0, 0, 0, 0.3)' : 'rgba(0, 0, 0, 0.1)'
      ctx.shadowBlur = 15
      ctx.shadowOffsetX = 0
      ctx.shadowOffsetY = 4
      
      // Draw main dashboard window with glass effect
      ctx.fillStyle = panelColor
      ctx.beginPath()
      ctx.roundRect(dashboard.x, dashboard.y, dashboard.width, dashboard.height, radius)
      ctx.fill()
      
      // Reset shadow for other elements
      ctx.shadowColor = 'transparent'
      ctx.shadowBlur = 0
      ctx.shadowOffsetX = 0
      ctx.shadowOffsetY = 0
      
      // Draw title bar
      ctx.fillStyle = titleBarColor
      ctx.beginPath()
      ctx.roundRect(dashboard.x, dashboard.y, dashboard.width, 30, radius, radius, 0, 0)
      ctx.fill()
      
      // Draw title text
      ctx.fillStyle = metricColor
      ctx.font = 'bold 12px system-ui'
      ctx.textAlign = 'left'
      ctx.textBaseline = 'middle'
      ctx.fillText('Real-Time Business Intelligence', dashboard.x + 10, dashboard.y + 15)
      
      // Draw close button
      ctx.fillStyle = metricColor
      ctx.beginPath()
      ctx.arc(dashboard.x + dashboard.width - 15, dashboard.y + 15, 6, 0, Math.PI * 2)
      ctx.fill()
      
      // Draw minimize button
      ctx.fillStyle = metricColor
      ctx.beginPath()
      ctx.arc(dashboard.x + dashboard.width - 35, dashboard.y + 15, 6, 0, Math.PI * 2)
      ctx.fill()
      
      // Draw maximize button
      ctx.fillStyle = metricColor
      ctx.beginPath()
      ctx.arc(dashboard.x + dashboard.width - 55, dashboard.y + 15, 6, 0, Math.PI * 2)
      ctx.fill()
    }

    function drawGridElements() {
      if (!ctx) return
      
      // Grid elements in the main dashboard area
      const gridX = dashboard.x + 10
      const gridY = dashboard.y + 40
      const gridWidth = dashboard.width - 20
      const gridHeight = dashboard.height - 50
      
      // Create a responsive grid
      const cols = 4
      const rows = 3
      const elementWidth = gridWidth / cols
      const elementHeight = gridHeight / rows
      
      ctx.fillStyle = connectionColor + '30'
      
      // Draw grid elements with subtle animation
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const x = gridX + (col * elementWidth)
          const y = gridY + (row * elementHeight)
          const width = elementWidth - 5
          const height = elementHeight - 5
          
          // Animate opacity based on position and time
          const progress = (animationTime * 0.02 + (row * 0.5) + (col * 0.3)) % (Math.PI * 2)
          const opacity = 0.1 + 0.2 * Math.sin(progress)
          
          ctx.globalAlpha = opacity
          ctx.fillRect(x, y, width, height)
          
          // Draw some internal elements
          ctx.fillStyle = dataColor
          ctx.fillRect(x + 5, y + height - 15, width * 0.2, elementHeight)
          ctx.fillRect(x + width * 0.25, y + height - 15, width * 0.2, elementHeight)
          ctx.fillRect(x + width * 0.5, y + height - 15, width * 0.2, elementHeight)
        }
      }
      
      // Reset global alpha
      ctx.globalAlpha = 1
    }

    function drawLineChart() {
      if (!ctx) return
      
      // Line chart in top-left section - properly contained within dashboard
      const chartX = dashboard.x + (logicalWidth * 0.034) // 15px for 440px canvas, scaled proportionally
      const chartY = dashboard.y + 50 // Start after title bar
      const chartWidth = logicalWidth * 0.227 // 100px for 440px canvas, scaled proportionally
      const chartHeight = Math.min(logicalHeight * 0.113, dashboard.height - 120) // Ensure fit within dashboard
      
      // Chart background
      ctx.fillStyle = connectionColor + '20'
      ctx.fillRect(chartX, chartY, chartWidth, chartHeight)
      
      // Chart border
      ctx.strokeStyle = connectionColor
      ctx.lineWidth = 1
      ctx.strokeRect(chartX, chartY, chartWidth, chartHeight)
      
      // Animated line chart - ensure it stays within chart boundaries
      ctx.strokeStyle = dataColor
      ctx.lineWidth = 2
      ctx.beginPath()
      
      for (let i = 0; i < chartWidth; i += 2) {
        const x = chartX + i
        const progress = (animationTime * 0.04 + i * 0.2) % (Math.PI * 2)
        const maxAmplitude = Math.min(15, chartHeight / 3) // Limit amplitude to chart height
        const y = chartY + chartHeight/2 + Math.sin(progress) * maxAmplitude + Math.sin(i * 0.3) * (maxAmplitude * 0.5)
        
        if (i === 0) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }
      }
      ctx.stroke()
      
      // Data points - ensure they stay within chart boundaries
      ctx.fillStyle = dataColor
      for (let i = 0; i < chartWidth; i += 15) {
        const x = chartX + i
        const progress = (animationTime * 0.04 + i * 0.2) % (Math.PI * 2)
        const maxAmplitude = Math.min(15, chartHeight / 3) // Limit amplitude to chart height
        const y = chartY + chartHeight/2 + Math.sin(progress) * maxAmplitude + Math.sin(i * 0.3) * (maxAmplitude * 0.5)
        ctx.beginPath()
        ctx.arc(x, y, 2, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    function drawPieChart() {
      if (!ctx) return
      
      // Pie chart in top-right section - properly contained within dashboard
      const centerX = dashboard.x + dashboard.width - (logicalWidth * 0.136) // 60px for 440px canvas, scaled proportionally
      const centerY = dashboard.y + 75 // Position after title bar
      const radius = Math.min(logicalWidth * 0.057, 25) // Limit radius to prevent overflow
      
      // Animated pie slices
      const slices = [
        { start: 0, end: Math.PI * 0.4, color: dataColor },
        { start: Math.PI * 0.4, end: Math.PI * 0.7, color: metricColor },
        { start: Math.PI * 0.7, end: Math.PI * 1.2, color: connectionColor },
        { start: Math.PI * 1.2, end: Math.PI * 2, color: titleBarColor }
      ]
      
      slices.forEach((slice, index) => {
        const animationOffset = (animationTime * 0.01 + index * 0.4) % (Math.PI * 2)
        const startAngle = slice.start + animationOffset
        const endAngle = slice.end + animationOffset
        
        ctx.fillStyle = slice.color
        ctx.beginPath()
        ctx.moveTo(centerX, centerY)
        ctx.arc(centerX, centerY, radius, startAngle, endAngle)
        ctx.closePath()
        ctx.fill()
      })
    }

    function drawBarChart() {
      if (!ctx) return
      
      // Bar chart in bottom-left section - properly contained within dashboard
      const chartX = dashboard.x + (logicalWidth * 0.034) // 15px for 440px canvas, scaled proportionally
      const chartY = dashboard.y + dashboard.height - 60 // Position from bottom of dashboard
      const chartWidth = logicalWidth * 0.273 // 120px for 440px canvas, scaled proportionally
      const chartHeight = Math.min(50, dashboard.height - 80) // Ensure fit within dashboard height
      
      // Chart background
      ctx.fillStyle = connectionColor + '20'
      ctx.fillRect(chartX, chartY, chartWidth, chartHeight)
      
      // Chart border
      ctx.strokeStyle = connectionColor
      ctx.lineWidth = 1
      ctx.strokeRect(chartX, chartY, chartWidth, chartHeight)
      
      // Animated bars - ensure they don't exceed chart boundaries
      const barWidth = logicalWidth * 0.027 // 12px for 440px canvas, scaled proportionally
      const maxBarHeight = chartHeight - 4 // Leave 2px padding top and bottom
      
      for (let i = 0; i < 6; i++) {
        const x = chartX + 8 + (i * 18)
        const progress = (animationTime * 0.05 + i * 0.7) % (Math.PI * 2)
        const barHeight = Math.min(Math.abs(Math.sin(progress) * 20 + Math.sin(i * 0.5) * 12), maxBarHeight)
        
        ctx.fillStyle = dataColor
        ctx.fillRect(x, chartY + chartHeight - barHeight, barWidth, barHeight)
      }
    }

    function drawMetrics() {
      if (!ctx) return
      
      // Metrics in bottom-right section - properly contained within dashboard
      const startX = dashboard.x + dashboard.width - (logicalWidth * 0.273) // 120px for 440px canvas, scaled proportionally
      const startY = dashboard.y + dashboard.height - 60 // Position from bottom of dashboard
      
      // Three animated metric circles
      for (let i = 0; i < 3; i++) {
        const x = startX + (i * 30)
        const y = startY + 25
        const progress = (animationTime * 0.03 + i * 0.5) % (Math.PI * 2)
        const pulse = 0.8 + 0.2 * Math.sin(progress)
        const size = Math.min(10 * pulse, 15) // Limit size to prevent overflow
        
        // Outer ring
        ctx.strokeStyle = metricColor
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.arc(x, y, size, 0, Math.PI * 2)
        ctx.stroke()
      }
    }

    function drawGauge() {
      if (!ctx) return
      
      // Gauge in middle-right section - properly contained within dashboard
      const centerX = dashboard.x + dashboard.width - (logicalWidth * 0.136) // 60px for 440px canvas, scaled proportionally
      const centerY = dashboard.y + dashboard.height - 45 // Position from bottom of dashboard
      const radius = Math.min(logicalWidth * 0.045, 20) // Limit radius to prevent overflow
      
      // Gauge background
      ctx.strokeStyle = connectionColor
      ctx.lineWidth = 5
      ctx.beginPath()
      ctx.arc(centerX, centerY, radius, Math.PI, 0)
      ctx.stroke()
      
      // Animated gauge needle
      const progress = (animationTime * 0.02) % (Math.PI * 2)
      const needleAngle = Math.PI + (Math.sin(progress) * 0.5)
      
      ctx.strokeStyle = metricColor
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.moveTo(centerX, centerY)
      ctx.lineTo(
        centerX + Math.cos(needleAngle) * radius * 0.6,
        centerY + Math.sin(needleAngle) * radius * 0.6
      )
      ctx.stroke()
      
      // Center dot
      ctx.fillStyle = metricColor
      ctx.beginPath()
      ctx.arc(centerX, centerY, 2, 0, Math.PI * 2)
      ctx.fill()
    }

    function drawAnimatedDataMatrix() {
      if (!ctx) return
      
      // Position the data matrix behind the dashboard, justified to the right
      const matrixX = dashboard.x + dashboard.width - (logicalWidth * 0.318) // Behind and to the right of dashboard, scaled proportionally
      const matrixY = dashboard.y - 30 // Slightly above dashboard
      const matrixWidth = logicalWidth * 0.364 // 160px for 440px canvas, scaled proportionally
      const matrixHeight = dashboard.height + 60
      
      // Create a grid of changing data values
      const gridSize = 16
      const cols = Math.floor(matrixWidth / gridSize)
      const rows = Math.floor(matrixHeight / gridSize)
      
      // Theme-aware color for the data matrix (fixed opacity)
      const dataMatrixColor = isDark ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.6)'
      ctx.fillStyle = dataMatrixColor
      ctx.font = '9px monospace'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      
      // Generate and display changing data values
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const x = matrixX + (col * gridSize) + (gridSize / 2)
          const y = matrixY + (row * gridSize) + (gridSize / 2)
          
          // Generate different types of data based on position and time (slowed down by 30%)
          let dataValue = ''
          const timeSeed = Math.floor(animationTime * 0.28) + (row * 15) + (col * 8) // Slowed down by 30% (0.4 * 0.7 = 0.28)
          
          if (col % 3 === 0) {
            // Binary data (0s and 1s)
            dataValue = (timeSeed % 2).toString()
          } else if (col % 3 === 1) {
            // Hexadecimal data
            dataValue = (timeSeed % 16).toString(16).toUpperCase()
          } else {
            // Decimal numbers
            dataValue = (timeSeed % 10).toString()
          }
          
          // Draw the data value with consistent opacity
          ctx.fillText(dataValue, x, y)
        }
      }
    }

    function animate() {
      if (!ctx || !canvas) return
      
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      // Draw background
      ctx.fillStyle = backgroundColor
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      
      // Draw animated data matrix behind the dashboard
      drawAnimatedDataMatrix()
      
      // Draw single dashboard with all elements
      drawDashboard()
      drawGridElements()
      drawLineChart()
      drawPieChart()
      drawBarChart()
      drawMetrics()
      drawGauge()
      
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
