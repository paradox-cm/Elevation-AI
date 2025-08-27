"use client"

import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'

interface WavesBackgroundProps {
  className?: string
}

const particleVertex = `
  attribute float scale;
  uniform float uTime;

  void main() {
    vec3 p = position;
    float s = scale;

    // Simplified wave motion - only Y movement
    p.y += sin(p.x + uTime) * 0.3;

    vec4 mvPosition = modelViewMatrix * vec4(p, 1.0);
    gl_PointSize = s * 16.0 * (1.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
`

const particleFragment = `
  void main() {
    gl_FragColor = vec4(1.0, 1.0, 1.0, 0.3);
  }
`

function lerp(start: number, end: number, amount: number) {
  return (1 - amount) * start + amount * end
}

export function WavesBackground({ className }: WavesBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)
  const particlesRef = useRef<THREE.Points | null>(null)
  const materialRef = useRef<THREE.ShaderMaterial | null>(null)
  const animationIdRef = useRef<number | null>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const winWidth = window.innerWidth
    const winHeight = window.innerHeight
    const aspectRatio = winWidth / winHeight

    // Initialize camera
    const camera = new THREE.PerspectiveCamera(75, aspectRatio, 0.01, 1000)
    camera.position.set(0, 6, 5)
    cameraRef.current = camera

    // Initialize scene
    const scene = new THREE.Scene()
    sceneRef.current = scene

    // Initialize renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: false,
      alpha: true,
      powerPreference: "high-performance"
    })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(winWidth, winHeight)
    rendererRef.current = renderer

    // Initialize particles
    const gap = 0.8
    const amountX = 50
    const amountY = 50
    const particleNum = amountX * amountY
    const particlePositions = new Float32Array(particleNum * 3)
    const particleScales = new Float32Array(particleNum)
    let i = 0
    let j = 0

    for (let ix = 0; ix < amountX; ix++) {
      for (let iy = 0; iy < amountY; iy++) {
        particlePositions[i] = ix * gap - ((amountX * gap) / 2)
        particlePositions[i + 1] = 0
        particlePositions[i + 2] = iy * gap - ((amountX * gap) / 2)
        particleScales[j] = 1
        i += 3
        j++
      }
    }

    const particleGeometry = new THREE.BufferGeometry()
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3))
    particleGeometry.setAttribute('scale', new THREE.BufferAttribute(particleScales, 1))

    const particleMaterial = new THREE.ShaderMaterial({
      transparent: true,
      vertexShader: particleVertex,
      fragmentShader: particleFragment,
      uniforms: {
        uTime: { type: 'f', value: 0 }
      }
    })
    materialRef.current = particleMaterial

    const particles = new THREE.Points(particleGeometry, particleMaterial)
    scene.add(particles)
    particlesRef.current = particles

    // Animation loop
    const animate = () => {
      if (materialRef.current) {
        materialRef.current.uniforms.uTime.value += 0.01
      }
      
      if (cameraRef.current && sceneRef.current && rendererRef.current) {
        cameraRef.current.lookAt(sceneRef.current.position)
        rendererRef.current.render(sceneRef.current, cameraRef.current)
      }
      
      animationIdRef.current = requestAnimationFrame(animate)
    }

    animate()

    // Handle resize
    const handleResize = () => {
      if (!cameraRef.current || !rendererRef.current) return
      
      const newWidth = window.innerWidth
      const newHeight = window.innerHeight
      const newAspectRatio = newWidth / newHeight
      
      cameraRef.current.aspect = newAspectRatio
      cameraRef.current.updateProjectionMatrix()
      rendererRef.current.setSize(newWidth, newHeight)
    }

    window.addEventListener('resize', handleResize)

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize)
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current)
      }
      if (rendererRef.current) {
        rendererRef.current.dispose()
      }
      if (particleGeometry) {
        particleGeometry.dispose()
      }
      if (particleMaterial) {
        particleMaterial.dispose()
      }
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0
      }}
    />
  )
}
