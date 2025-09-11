"use client"

import React, { useEffect, useRef } from 'react'
import { useThemeProvider } from '@/hooks/use-theme'

export function TunnelShader() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number | undefined>(undefined)
  const { theme } = useThemeProvider()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    // Dynamically import Three.js
    const initThreeJS = async () => {
      const THREE = await import('three')
      
      const renderer = new THREE.WebGLRenderer({ 
        canvas, 
        alpha: true,
        antialias: true 
      })
      renderer.setSize(canvas.offsetWidth, canvas.offsetHeight)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)) // Limit pixel ratio for better performance

      const scene = new THREE.Scene()
      const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)
      
      // Ensure camera is centered
      camera.position.set(0, 0, 1)
      camera.lookAt(0, 0, 0)

      // Set up shader material with theme-aware colors
      const shaderMaterial = new THREE.ShaderMaterial({
        uniforms: {
          iTime: { value: 0 },
          iResolution: { value: new THREE.Vector3(canvas.offsetWidth, canvas.offsetHeight, 1) },
          iTheme: { value: theme === 'dark' ? 1.0 : 0.0 }, // 1.0 for dark mode, 0.0 for light mode
        },
        vertexShader: `
          void main() {
            gl_Position = vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          uniform float iTime;
          uniform vec3 iResolution;
          uniform float iTheme;

          //Constants
          #define TAU 6.2831853071795865

          //Parameters
          #define TUNNEL_LAYERS 120
          #define RING_POINTS 160
          #define POINT_SIZE 2.8
          #define POINT_COLOR_A vec3(1.0)
          #define POINT_COLOR_B vec3(0.7)
          #define SPEED 0.175 // 50% slower than previous half speed

          //Square of x
          float sq(float x) {
            return x*x;   
          }

          //Angular repeat
          vec2 AngRep(vec2 uv, float angle) {
            vec2 polar = vec2(atan(uv.y, uv.x), length(uv));
            polar.x = mod(polar.x + angle / 2.0, angle) - angle / 2.0; 
            return polar.y * vec2(cos(polar.x), sin(polar.x));
          }

          //Signed distance to circle
          float sdCircle(vec2 uv, float r) {
            return length(uv) - r;
          }

          //Mix a shape defined by a distance field 'sd' with a 'target' color using the 'fill' color.
          vec3 MixShape(float sd, vec3 fill, vec3 target) {
            float blend = smoothstep(0.0, 1.0/iResolution.y, sd);
            return mix(fill, target, blend);
          }

          //Tunnel/Camera path
          vec2 TunnelPath(float x) {
            vec2 offs = vec2(0, 0);
            
            // Smoother, lower frequency movement
            offs.x = 0.3 * sin(TAU * x * 0.2) + 0.4 * sin(TAU * x * 0.08 + 0.3);
            offs.y = 0.35 * cos(TAU * x * 0.15) + 0.3 * cos(TAU * x * 0.05);
            
            // Smoother scaling with gentler transition
            offs *= smoothstep(0.8, 3.5, x);
            
            return offs;
          }

          void main() {
            vec2 res = iResolution.xy / iResolution.y;
            vec2 uv = gl_FragCoord.xy / iResolution.y;
            
            // Center the UV coordinates and offset to move right and up
            uv -= res * 0.5;
            uv += vec2(0.15, -0.1); // Move right and up
            
            vec3 color = vec3(0);
            
            float repAngle = TAU / float(RING_POINTS);
            float pointSize = POINT_SIZE/2.0/iResolution.y;
            
            float camZ = iTime * SPEED;
            vec2 camOffs = TunnelPath(camZ);
            
            // Ensure the tunnel center is at the origin
            vec2 tunnelCenter = vec2(0.0, 0.0);
            
            for(int i = 1; i <= TUNNEL_LAYERS; i++) {
              float pz = 1.0 - (float(i) / float(TUNNEL_LAYERS));
              
              //Scroll the points towards the screen
              pz -= mod(camZ, 4.0 / float(TUNNEL_LAYERS));
              
              //Layer x/y offset
              vec2 offs = TunnelPath(camZ + pz) - camOffs;
              
              //Radius of the current ring
              float ringRad = 0.35 * (1.0 / sq(pz * 0.5 + 0.25));
              
              //Only draw points when uv is close to the ring.
              vec2 centeredUV = uv + offs - tunnelCenter;
              if(abs(length(centeredUV) - ringRad) < pointSize * 2.0) {
                //Angular repeated uv coords
                vec2 aruv = AngRep(centeredUV, repAngle);

                //Distance to the nearest point
                float pdist = sdCircle(aruv - vec2(ringRad, 0), pointSize);

                //Stripes
                vec3 ptColor = (mod(float(i / 2), 2.0) == 0.0) ? POINT_COLOR_A : POINT_COLOR_B;
                
                //Distance fade
                float shade = (1.0-pz);

                color = MixShape(pdist, ptColor * shade, color);
              }
            }
            
            // Theme-based color inversion
            // Dark mode: show as-is (black background, white dots)
            // Light mode: invert colors (white background, black dots)
            if (iTheme < 0.5) {
              color = 1.0 - color;
            }
            
            gl_FragColor = vec4(color, 1.0);
          }
        `
      })

      // Create a plane to render the shader on
      const geometry = new THREE.PlaneGeometry(2, 2)
      const mesh = new THREE.Mesh(geometry, shaderMaterial)
      mesh.position.set(0, 0, 0) // Ensure mesh is centered
      scene.add(mesh)

      // Animation variables
      let lastTime = 0

      // Animation loop with performance optimization
      const animate = (time: number) => {
        animationRef.current = requestAnimationFrame(animate)
        
        time *= 0.001 // Convert to seconds
        const deltaTime = time - lastTime
        lastTime = time
        
        // Only update time uniform, theme changes less frequently
        shaderMaterial.uniforms.iTime.value += deltaTime
        
        // Update theme only when it actually changes (performance optimization)
        const currentTheme = theme === 'dark' ? 1.0 : 0.0
        if (shaderMaterial.uniforms.iTheme.value !== currentTheme) {
          shaderMaterial.uniforms.iTheme.value = currentTheme
        }
        
        renderer.render(scene, camera)
      }

      // Handle window resize
      const handleResize = () => {
        const width = canvas.offsetWidth
        const height = canvas.offsetHeight
        renderer.setSize(width, height)
        shaderMaterial.uniforms.iResolution.value.set(width, height, 1)
      }

      window.addEventListener('resize', handleResize)
      animate(0)

      // Cleanup function
      return () => {
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current)
        }
        window.removeEventListener('resize', handleResize)
        renderer.dispose()
        geometry.dispose()
        shaderMaterial.dispose()
      }
    }

    const cleanup = initThreeJS()

    return () => {
      cleanup.then(cleanupFn => cleanupFn?.())
    }
  }, [theme])

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full object-contain"
      style={{ 
        width: '100%', 
        height: '100%',
        display: 'block',
        margin: '0 auto'
      }}
    />
  )
}
