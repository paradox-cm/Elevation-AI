"use client"

import React, { useEffect, useRef } from "react"
import { PageWrapper } from "@/components/page-wrapper"
import { AppShell } from "@/components/ui/layout/app-shell"
import { Container } from "@/components/ui/layout/container"
import { Section } from "@/components/ui/layout/section"
import { H1, H2, H3, P, Code } from "@/components/ui/typography"
import { Card, CardContent } from "@/components/ui/card"
import Icon from "@/components/ui/icon"
import { DesignSystemNavigation } from "@/components/ui/design-system-navigation"
import { DesignSystemSidebar } from "@/components/ui/design-system-sidebar"
import * as THREE from "three"

// Solutions Hero Shader Component
function SolutionsHeroShader({ 
  width = 600, 
  height = 400, 
  className = "" 
}: { 
  width?: number; 
  height?: number; 
  className?: string; 
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const materialRef = useRef<THREE.ShaderMaterial | null>(null)
  const animationIdRef = useRef<number | null>(null)

  useEffect(() => {
    const container = containerRef.current
    const canvas = canvasRef.current
    if (!container || !canvas) return

    // Setup Three.js
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, -1, 0)
    const scene = new THREE.Scene()
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true })
    
    // Store refs for cleanup
    sceneRef.current = scene
    rendererRef.current = renderer

    // Set renderer size
    const updateSize = () => {
      const rect = container.getBoundingClientRect()
      renderer.setSize(rect.width, rect.height)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    }
    updateSize()

    // Create shader material with brand colors
    const material = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uStartColor: { value: new THREE.Color('#0e62fd') }, // Elevation Blue 500
        uEndColor: { value: new THREE.Color('#93c5fd') }, // Elevation Blue 300
        uMouseX: { value: 0 }
      },
      vertexShader: `
        varying vec2 vUv;
        
        void main() {
          vec4 modelPosition = modelMatrix * vec4(position, 1.0);
          vec4 viewPosition = viewMatrix * modelPosition;
          vec4 projectionPosition = projectionMatrix * viewPosition;
          
          gl_Position = projectionPosition;
          
          vUv = uv;
        }
      `,
      fragmentShader: `
        uniform float uTime;
        uniform vec3 uStartColor;
        uniform vec3 uEndColor;
        uniform float uMouseX;
        
        varying vec2 vUv;
      
        // Classic Perlin 3D Noise by Stefan Gustavson
        vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
        vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}
        vec3 fade(vec3 t) {return t*t*t*(t*(t*6.0-15.0)+10.0);}

        float cnoise(vec3 P){
          vec3 Pi0 = floor(P);
          vec3 Pi1 = Pi0 + vec3(1.0);
          Pi0 = mod(Pi0, 289.0);
          Pi1 = mod(Pi1, 289.0);
          vec3 Pf0 = fract(P);
          vec3 Pf1 = Pf0 - vec3(1.0);
          vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
          vec4 iy = vec4(Pi0.yy, Pi1.yy);
          vec4 iz0 = Pi0.zzzz;
          vec4 iz1 = Pi1.zzzz;

          vec4 ixy = permute(permute(ix) + iy);
          vec4 ixy0 = permute(ixy + iz0);
          vec4 ixy1 = permute(ixy + iz1);

          vec4 gx0 = ixy0 * (1.0 / 7.0);
          vec4 gy0 = fract(floor(gx0) * (1.0 / 7.0)) - 0.5;
          gx0 = fract(gx0);
          vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
          vec4 sz0 = step(gz0, vec4(0.0));
          gx0 -= sz0 * (step(0.0, gx0) - 0.5);
          gy0 -= sz0 * (step(0.0, gy0) - 0.5);

          vec4 gx1 = ixy1 * (1.0 / 7.0);
          vec4 gy1 = fract(floor(gx1) * (1.0 / 7.0)) - 0.5;
          gx1 = fract(gx1);
          vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
          vec4 sz1 = step(gz1, vec4(0.0));
          gx1 -= sz1 * (step(0.0, gx1) - 0.5);
          gy1 -= sz1 * (step(0.0, gy1) - 0.5);

          vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);
          vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);
          vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);
          vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);
          vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);
          vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);
          vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);
          vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);

          vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));
          g000 *= norm0.x;
          g010 *= norm0.y;
          g100 *= norm0.z;
          g110 *= norm0.w;
          vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));
          g001 *= norm1.x;
          g011 *= norm1.y;
          g101 *= norm1.z;
          g111 *= norm1.w;

          float n000 = dot(g000, Pf0);
          float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));
          float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));
          float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));
          float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));
          float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));
          float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));
          float n111 = dot(g111, Pf1);

          vec3 fade_xyz = fade(Pf0);
          vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);
          vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);
          float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x);
          return 2.2 * n_xyz;
        }

        void main() {
          float strength = cnoise(vec3(vUv * 3.0, uTime * 0.4));
          
          float gradient = vUv.x;
          strength += gradient;
          
          strength = clamp(strength, 0.0, 1.0);
          
          strength += uMouseX;
          
          vec3 color = mix(uStartColor, uEndColor, strength);
          
          gl_FragColor = vec4(color, 0.6);
        }
      `,
      transparent: true
    })

    materialRef.current = material

    // Create plane
    const planeGeometry = new THREE.PlaneGeometry(2, 2)
    const plane = new THREE.Mesh(planeGeometry, material)
    scene.add(plane)

    // Mouse tracking
    let mouseX = 0
    const handleMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      mouseX = (event.clientX - rect.left) / rect.width - 0.5
    }
    document.addEventListener('mousemove', handleMouseMove)

    // Animation
    const clock = new THREE.Clock()
    const animate = () => {
      const elapsedTime = clock.getElapsedTime()
      
      material.uniforms.uTime.value = elapsedTime
      material.uniforms.uMouseX.value += (mouseX - material.uniforms.uMouseX.value) * 0.1
      
      renderer.render(scene, camera)
      animationIdRef.current = requestAnimationFrame(animate)
    }
    animate()

    // Handle resize
    const handleResize = () => {
      updateSize()
    }
    window.addEventListener('resize', handleResize)

    // Cleanup
    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current)
      }
      if (renderer) {
        renderer.dispose()
      }
      if (material) {
        material.dispose()
      }
      if (planeGeometry) {
        planeGeometry.dispose()
      }
    }
  }, [])

  return (
    <div ref={containerRef} className={`relative ${className}`} style={{ width, height }}>
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  )
}

export default function SolutionsHeroShaderPage() {
  return (
    <PageWrapper>
      <AppShell
        header={<DesignSystemNavigation currentPage="animations" />}
        sidebar={<DesignSystemSidebar />}
      >
        <div className="min-h-screen bg-background">
          <main>
            {/* Header */}
            <Section paddingY="lg" className="border-b">
              <Container size="2xl">
                <div className="max-w-4xl mx-auto text-center space-y-6">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
                    <Icon name="magic-line" size="sm" />
                    Animation Components
                  </div>
                  <H1>Solutions Hero Shader</H1>
                  <P className="text-muted-foreground text-lg max-w-2xl mx-auto">
                    Interactive Three.js shader animation with Perlin noise creating dynamic plasma effects in brand colors. Used in the hero section of the solutions page.
                  </P>
                </div>
              </Container>
            </Section>

          {/* Live Demo */}
          <Section paddingY="lg">
            <Container size="2xl">
              <div className="max-w-4xl mx-auto space-y-8">
                <div className="space-y-4">
                  <H2>Live Demo</H2>
                  <P className="text-muted-foreground">
                    Move your mouse over the animation to see the interactive effects. The shader responds to mouse position and creates flowing plasma patterns.
                  </P>
                </div>

                <Card>
                  <CardContent className="p-8">
                    <div className="relative h-[400px] rounded-lg border border-border/50 overflow-hidden bg-gradient-to-br from-background/50 to-background/30">
                      <SolutionsHeroShader 
                        width={800} 
                        height={400} 
                        className="w-full h-full"
                      />
                    </div>
                  </CardContent>
                </Card>

                <div className="space-y-6">
                  <div className="space-y-4">
                    <H3>Usage</H3>
                    <div className="bg-muted/50 rounded-lg p-4">
                      <Code className="text-sm">
{`<SolutionsHeroShader 
  width={800} 
  height={400} 
  className="w-full h-full"
/>`}
                      </Code>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <H3>Props</H3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <P className="font-medium">width</P>
                        <P className="text-muted-foreground">Canvas width in pixels (default: 600)</P>
                      </div>
                      <div>
                        <P className="font-medium">height</P>
                        <P className="text-muted-foreground">Canvas height in pixels (default: 400)</P>
                      </div>
                      <div>
                        <P className="font-medium">className</P>
                        <P className="text-muted-foreground">Additional CSS classes</P>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <H3>Features</H3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div className="flex items-start gap-3">
                        <Icon name="check-line" size="sm" className="text-green-600 mt-0.5" />
                        <P>Perlin noise-based plasma effects</P>
                      </div>
                      <div className="flex items-start gap-3">
                        <Icon name="check-line" size="sm" className="text-green-600 mt-0.5" />
                        <P>Mouse interaction support</P>
                      </div>
                      <div className="flex items-start gap-3">
                        <Icon name="check-line" size="sm" className="text-green-600 mt-0.5" />
                        <P>Brand color integration</P>
                      </div>
                      <div className="flex items-start gap-3">
                        <Icon name="check-line" size="sm" className="text-green-600 mt-0.5" />
                        <P>Responsive design</P>
                      </div>
                      <div className="flex items-start gap-3">
                        <Icon name="check-line" size="sm" className="text-green-600 mt-0.5" />
                        <P>High DPI support</P>
                      </div>
                      <div className="flex items-start gap-3">
                        <Icon name="check-line" size="sm" className="text-green-600 mt-0.5" />
                        <P>Automatic cleanup</P>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Container>
          </Section>
          </main>
        </div>
      </AppShell>
    </PageWrapper>
  )
}
