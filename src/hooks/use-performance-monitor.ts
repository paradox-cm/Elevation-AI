import { useEffect, useRef, useState } from 'react'

interface PerformanceMetrics {
  fps: number
  frameTime: number
  isLowPerformance: boolean
}

interface UsePerformanceMonitorOptions {
  targetFPS?: number
  lowPerformanceThreshold?: number
  sampleSize?: number
}

export function usePerformanceMonitor(options: UsePerformanceMonitorOptions = {}) {
  const {
    targetFPS = 30,
    lowPerformanceThreshold = 0.8, // 80% of target FPS
    sampleSize = 60 // Sample over 60 frames
  } = options

  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fps: targetFPS,
    frameTime: 1000 / targetFPS,
    isLowPerformance: false
  })

  const frameTimesRef = useRef<number[]>([])
  const lastFrameTimeRef = useRef(0)
  const frameCountRef = useRef(0)

  const measureFrame = () => {
    const currentTime = performance.now()
    const frameTime = currentTime - lastFrameTimeRef.current
    
    if (lastFrameTimeRef.current > 0) {
      frameTimesRef.current.push(frameTime)
      
      // Keep only the last sampleSize frames
      if (frameTimesRef.current.length > sampleSize) {
        frameTimesRef.current.shift()
      }
      
      // Calculate metrics every 10 frames to avoid excessive calculations
      if (frameCountRef.current % 10 === 0 && frameTimesRef.current.length >= 10) {
        const avgFrameTime = frameTimesRef.current.reduce((a, b) => a + b, 0) / frameTimesRef.current.length
        const fps = 1000 / avgFrameTime
        const isLowPerformance = fps < (targetFPS * lowPerformanceThreshold)
        
        setMetrics({
          fps: Math.round(fps),
          frameTime: Math.round(avgFrameTime * 100) / 100,
          isLowPerformance
        })
      }
    }
    
    lastFrameTimeRef.current = currentTime
    frameCountRef.current++
  }

  const reset = () => {
    frameTimesRef.current = []
    lastFrameTimeRef.current = 0
    frameCountRef.current = 0
    setMetrics({
      fps: targetFPS,
      frameTime: 1000 / targetFPS,
      isLowPerformance: false
    })
  }

  return {
    metrics,
    measureFrame,
    reset
  }
}
