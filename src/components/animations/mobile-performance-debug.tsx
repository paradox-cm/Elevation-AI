"use client"

import React, { useEffect, useState } from 'react'
import { useMediaQuery } from '@/hooks/use-media-query'

interface MobilePerformanceDebugProps {
  enabled?: boolean
}

export function MobilePerformanceDebug({ enabled = false }: MobilePerformanceDebugProps) {
  const [metrics, setMetrics] = useState({
    fps: 0,
    frameTime: 0,
    memoryUsage: 0,
    isLowPerformance: false
  })
  
  const isMobile = useMediaQuery("(max-width: 1023px)")
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (!enabled || !isMobile) return

    let frameCount = 0
    let lastTime = performance.now()
    let animationId: number

    const measurePerformance = () => {
      const currentTime = performance.now()
      const deltaTime = currentTime - lastTime
      
      frameCount++
      
      // Calculate FPS every 60 frames
      if (frameCount % 60 === 0) {
        const fps = Math.round(1000 / (deltaTime / 60))
        const frameTime = deltaTime / 60
        
        // Check memory usage if available
        const memoryUsage = (performance as any).memory 
          ? Math.round((performance as any).memory.usedJSHeapSize / 1024 / 1024)
          : 0

        setMetrics({
          fps,
          frameTime: Math.round(frameTime * 100) / 100,
          memoryUsage,
          isLowPerformance: fps < 15 || frameTime > 66
        })
      }

      lastTime = currentTime
      animationId = requestAnimationFrame(measurePerformance)
    }

    // Intersection Observer for visibility
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting)
        })
      },
      { threshold: 0.1 }
    )

    const debugElement = document.createElement('div')
    observer.observe(debugElement)

    if (isVisible) {
      animationId = requestAnimationFrame(measurePerformance)
    }

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
      observer.disconnect()
    }
  }, [enabled, isMobile, isVisible])

  if (!enabled || !isMobile) return null

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-black/80 text-white p-2 rounded text-xs font-mono">
      <div>Mobile Performance Debug</div>
      <div>FPS: {metrics.fps}</div>
      <div>Frame Time: {metrics.frameTime}ms</div>
      <div>Memory: {metrics.memoryUsage}MB</div>
      <div className={metrics.isLowPerformance ? 'text-red-400' : 'text-green-400'}>
        Status: {metrics.isLowPerformance ? 'LOW PERF' : 'OK'}
      </div>
    </div>
  )
}
