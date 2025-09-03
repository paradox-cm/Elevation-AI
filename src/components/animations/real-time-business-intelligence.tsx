"use client"

import { useEffect, useRef } from "react"

interface RealTimeBusinessIntelligenceProps {
  width?: number
  height?: number
  className?: string
  showBorder?: boolean
}

export function RealTimeBusinessIntelligence({ 
  width = 600, 
  height = 400, 
  className = "",
  showBorder = true 
}: RealTimeBusinessIntelligenceProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = width
    canvas.height = height

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
    const dashboard = {
      x: width * 0.091, // 40px for 440px canvas, scaled proportionally
      y: (canvas.height - (canvas.width * 0.46)) / 2, // Vertically center the dashboard
      width: width * 0.818, // 360px for 440px canvas, scaled proportionally
      height: canvas.width * 0.46 // 16:9 aspect ratio (360 * 9/16), scaled proportionally
    }

    let animationTime = 0

    function drawDashboard() {
      if (!ctx) return
      
      const radius = Math.max(4, width * 0.018) // Corner radius for rounded corners, scaled proportionally
      
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
      
      // Reset shadow for inner elements
      ctx.shadowColor = 'transparent'
      ctx.shadowBlur = 0
      ctx.shadowOffsetX = 0
      ctx.shadowOffsetY = 0
      
      // Draw subtle inner border for glass effect
      ctx.strokeStyle = isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.roundRect(dashboard.x + 1, dashboard.y + 1, dashboard.width - 2, dashboard.height - 2, radius)
      ctx.stroke()
      
      // Draw title bar with glass effect
      ctx.fillStyle = titleBarColor
      ctx.beginPath()
      ctx.roundRect(dashboard.x, dashboard.y, dashboard.width, 25, [radius, radius, 0, 0])
      ctx.fill()
      
      // Draw subtle title bar border
      ctx.strokeStyle = isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.15)'
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.roundRect(dashboard.x + 1, dashboard.y + 1, dashboard.width - 2, 23, [radius, radius, 0, 0])
      ctx.stroke()
      
      // Draw dashboard grid structure and skeleton UI
      drawDashboardGrid()
      
      // Draw all dashboard elements within the single window
      drawLineChart()
      drawPieChart()
      drawBarChart()
      drawMetrics()
      drawGauge()
    }

    function drawDashboardGrid() {
      if (!ctx) return
      
      // Define grid system
      const gridPadding = width * 0.034 // 15px for 440px canvas, scaled proportionally
      const gridSpacing = width * 0.045 // 20px for 440px canvas, scaled proportionally
      const sectionHeight = width * 0.182 // 80px for 440px canvas, scaled proportionally
      
      // Top section (charts row)
      const topSectionY = dashboard.y + 35
      const topSectionHeight = sectionHeight
      
      // Bottom section (metrics row)
      const bottomSectionY = dashboard.y + 130
      const bottomSectionHeight = sectionHeight
      
      // Left column (charts)
      const leftColumnX = dashboard.x + gridPadding
      const leftColumnWidth = width * 0.318 // 140px for 440px canvas, scaled proportionally
      
      // Right column (metrics and gauge)
      const rightColumnX = dashboard.x + dashboard.width - gridPadding - (width * 0.273) // 120px for 440px canvas, scaled proportionally
      const rightColumnWidth = width * 0.273 // 120px for 440px canvas, scaled proportionally
      
      // Draw skeleton UI elements
      drawSkeletonElements(leftColumnX, topSectionY, leftColumnWidth, topSectionHeight, 'charts')
      drawSkeletonElements(rightColumnX, topSectionY, rightColumnWidth, topSectionHeight, 'metrics')
      drawSkeletonElements(leftColumnX, bottomSectionY, leftColumnWidth, bottomSectionHeight, 'analytics')
      drawSkeletonElements(rightColumnX, bottomSectionY, rightColumnWidth, bottomSectionHeight, 'status')
    }

    function drawSkeletonElements(x: number, y: number, width: number, height: number, type: string) {
      if (!ctx) return
      
      const elementSpacing = 8
      const elementHeight = 4
      
      // Draw section heading (small rectangle)
      ctx.fillStyle = connectionColor + '40'
      ctx.fillRect(x, y, width * 0.6, elementHeight)
      
      // Draw description line (smaller rectangle)
      ctx.fillStyle = connectionColor + '30'
      ctx.fillRect(x, y + elementHeight + 4, width * 0.4, elementHeight)
      
      // Draw additional skeleton elements based on type
      if (type === 'charts') {
        // Chart labels
        ctx.fillRect(x, y + height - 15, width * 0.3, elementHeight)
        ctx.fillRect(x + width * 0.35, y + height - 15, width * 0.3, elementHeight)
      } else if (type === 'metrics') {
        // Metric labels
        ctx.fillRect(x, y + height - 15, width * 0.25, elementHeight)
        ctx.fillRect(x + width * 0.3, y + height - 15, width * 0.25, elementHeight)
      } else if (type === 'analytics') {
        // Analytics labels
        ctx.fillRect(x, y + height - 15, width * 0.4, elementHeight)
        ctx.fillRect(x + width * 0.45, y + height - 15, width * 0.4, elementHeight)
      } else if (type === 'status') {
        // Status indicators
        ctx.fillRect(x, y + height - 15, width * 0.2, elementHeight)
        ctx.fillRect(x + width * 0.25, y + height - 15, width * 0.2, elementHeight)
        ctx.fillRect(x + width * 0.5, y + height - 15, width * 0.2, elementHeight)
      }
    }

    function drawLineChart() {
      if (!ctx) return
      
      // Line chart in top-left section (aligned with grid)
      const chartX = dashboard.x + (width * 0.034) // 15px for 440px canvas, scaled proportionally
      const chartY = dashboard.y + 50
      const chartWidth = width * 0.227 // 100px for 440px canvas, scaled proportionally
      const chartHeight = height * 0.113 // 45px for 400px canvas, scaled proportionally
      
      // Chart background
      ctx.fillStyle = connectionColor + '20'
      ctx.fillRect(chartX, chartY, chartWidth, chartHeight)
      
      // Chart border
      ctx.strokeStyle = connectionColor
      ctx.lineWidth = 1
      ctx.strokeRect(chartX, chartY, chartWidth, chartHeight)
      
      // Animated line chart
      ctx.strokeStyle = dataColor
      ctx.lineWidth = 2
      ctx.beginPath()
      
      for (let i = 0; i < chartWidth; i += 2) {
        const x = chartX + i
        const progress = (animationTime * 0.04 + i * 0.2) % (Math.PI * 2)
        const y = chartY + chartHeight/2 + Math.sin(progress) * 15 + Math.sin(i * 0.3) * 8
        
        if (i === 0) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }
      }
      ctx.stroke()
      
      // Data points
      ctx.fillStyle = dataColor
      for (let i = 0; i < chartWidth; i += 15) {
        const x = chartX + i
        const progress = (animationTime * 0.04 + i * 0.2) % (Math.PI * 2)
        const y = chartY + chartHeight/2 + Math.sin(progress) * 15 + Math.sin(i * 0.3) * 8
        ctx.beginPath()
        ctx.arc(x, y, 2, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    function drawPieChart() {
      if (!ctx) return
      
      // Pie chart in top-right section (aligned with grid)
      const centerX = dashboard.x + dashboard.width - (width * 0.136) // 60px for 440px canvas, scaled proportionally
      const centerY = dashboard.y + 75
      const radius = width * 0.057 // 25px for 440px canvas, scaled proportionally
      
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
      
      // Bar chart in bottom-left section (aligned with grid)
      const chartX = dashboard.x + (width * 0.034) // 15px for 440px canvas, scaled proportionally
      const chartY = dashboard.y + 150
      const chartWidth = width * 0.273 // 120px for 440px canvas, scaled proportionally
      const chartHeight = height * 0.125 // 50px for 400px canvas, scaled proportionally
      
      // Chart background
      ctx.fillStyle = connectionColor + '20'
      ctx.fillRect(chartX, chartY, chartWidth, chartHeight)
      
      // Chart border
      ctx.strokeStyle = connectionColor
      ctx.lineWidth = 1
      ctx.strokeRect(chartX, chartY, chartWidth, chartHeight)
      
      // Animated bars
      const barWidth = width * 0.027 // 12px for 440px canvas, scaled proportionally
      for (let i = 0; i < 6; i++) {
        const x = chartX + 8 + (i * 18)
        const progress = (animationTime * 0.05 + i * 0.7) % (Math.PI * 2)
        const barHeight = Math.abs(Math.sin(progress) * 20 + Math.sin(i * 0.5) * 12)
        
        ctx.fillStyle = dataColor
        ctx.fillRect(x, chartY + chartHeight - barHeight, barWidth, barHeight)
      }
    }

    function drawMetrics() {
      if (!ctx) return
      
      // Metrics in bottom-right section (aligned with grid)
      const startX = dashboard.x + dashboard.width - (width * 0.273) // 120px for 440px canvas, scaled proportionally
      const startY = dashboard.y + 150
      
      // Three animated metric circles
      for (let i = 0; i < 3; i++) {
        const x = startX + (i * 30)
        const y = startY + 25
        const progress = (animationTime * 0.03 + i * 0.5) % (Math.PI * 2)
        const pulse = 0.8 + 0.2 * Math.sin(progress)
        const size = 10 * pulse
        
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
      
      // Gauge in middle-right section (aligned with grid)
      const centerX = dashboard.x + dashboard.width - (width * 0.136) // 60px for 440px canvas, scaled proportionally
      const centerY = dashboard.y + 135
      const radius = width * 0.045 // 20px for 440px canvas, scaled proportionally
      
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
      const matrixX = dashboard.x + dashboard.width - (width * 0.318) // Behind and to the right of dashboard, scaled proportionally
      const matrixY = dashboard.y - 30 // Slightly above dashboard
      const matrixWidth = width * 0.364 // 160px for 440px canvas, scaled proportionally
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
          
          // Generate different types of data based on position and time (slowed down)
          let dataValue = ''
          const timeSeed = Math.floor(animationTime * 0.1) + (row * 15) + (col * 8) // Slowed down by factor of 10
          
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
