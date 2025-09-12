"use client"

import React, { useEffect, useRef } from 'react'

interface ShaderAnimationProps {
  className?: string
  width?: number
  height?: number
  colors?: {
    primary: [number, number, number]
    secondary: [number, number, number]
    tertiary: [number, number, number]
  }
}

// Helper function to convert RGB to 700 variant (darker)
function getColor700Variant(rgb: [number, number, number]): [number, number, number] {
  // Convert RGB to HSL, then create a 700 variant
  const [r, g, b] = rgb
  
  // Simple darkening by reducing brightness and saturation
  // This creates a darker, more muted version of the color
  const factor = 0.35 // Make it darker but not as dark as 800
  const saturation = 0.5 // Reduce saturation for 700 variant
  
  return [
    r * factor,
    g * factor, 
    b * factor
  ] as [number, number, number]
}

export function ShaderAnimation({ className = "", width = 400, height = 200, colors }: ShaderAnimationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const glRef = useRef<WebGLRenderingContext | null>(null)
  const programRef = useRef<WebGLProgram | null>(null)
  const mousePosRef = useRef<[number, number]>([0, 0])
  const animationRef = useRef<number | undefined>(undefined)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const gl = (canvas.getContext('experimental-webgl') || canvas.getContext('webgl')) as WebGLRenderingContext | null
    if (!gl) return

    glRef.current = gl

    // Default colors if none provided
    const defaultColors = {
      primary: [1.000, 0.455, 0.282] as [number, number, number],
      secondary: [0.282, 0.396, 1.000] as [number, number, number],
      tertiary: [0.350, 0.710, 0.953] as [number, number, number]
    }
    
    const cardColors = colors || defaultColors
    
    // Generate 700 variants for dark mode
    const color700Variants = {
      primary: getColor700Variant(cardColors.primary),
      secondary: getColor700Variant(cardColors.secondary),
      tertiary: getColor700Variant(cardColors.tertiary)
    }

    // Vertex shader source
    const vertexShaderSource = `
      attribute vec2 inPos;
      void main() {
        gl_Position = vec4(inPos, 0.0, 1.0);
      }
    `

    // Fragment shader source
    const fragmentShaderSource = `
      precision mediump float;
      
      uniform vec2 iResolution;
      uniform vec2 iMouse;
      uniform float iTime;
      uniform vec3 uColor1;
      uniform vec3 uColor2;
      uniform vec3 uColor3;
      uniform vec3 uColor700_1;
      uniform vec3 uColor700_2;
      uniform vec3 uColor700_3;
      
      #define S(a,b,t) smoothstep(a,b,t)
      
      mat2 Rot(float a) {
        float s = sin(a);
        float c = cos(a);
        return mat2(c, -s, s, c);
      }
      
      vec2 hash( vec2 p ) {
        p = vec2( dot(p,vec2(2127.1,81.17)), dot(p,vec2(1269.5,283.37)) );
        return fract(sin(p)*43758.5453);
      }
      
      float noise( in vec2 p ) {
        vec2 i = floor( p );
        vec2 f = fract( p );
        
        vec2 u = f*f*(3.0-2.0*f);
        
        float n = mix( mix( dot( -1.0+2.0*hash( i + vec2(0.0,0.0) ), f - vec2(0.0,0.0) ), 
                            dot( -1.0+2.0*hash( i + vec2(1.0,0.0) ), f - vec2(1.0,0.0) ), u.x),
                       mix( dot( -1.0+2.0*hash( i + vec2(0.0,1.0) ), f - vec2(0.0,1.0) ), 
                            dot( -1.0+2.0*hash( i + vec2(1.0,1.0) ), f - vec2(1.0,1.0) ), u.x), u.y);
        return 0.5 + 0.5*n;
      }
      
      void mainImage( out vec4 fragColor, in vec2 fragCoord ) {
        vec2 uv = fragCoord/iResolution.xy;
        float ratio = iResolution.x / iResolution.y;
        
        vec2 tuv = uv;
        tuv -= .5;
        
        float degree = noise(vec2(iTime*.07, tuv.x*tuv.y)); // Reduced from 0.1 to 0.07 (30% slower)
        
        tuv.y *= 1./ratio;
        tuv *= Rot(radians((degree-.5)*720.+180.));
        tuv.y *= ratio;
        
        float frequency = 3.5; // Reduced from 5.0 to make patterns larger
        float amplitude = 20.; // Reduced from 30.0 to make waves larger
        float speed = iTime * 1.4; // Reduced from 2.0 to 1.4 (30% slower)
        tuv.x += sin(tuv.y*frequency+speed)/amplitude;
        tuv.y += sin(tuv.x*frequency*1.5+speed)/(amplitude*.5);
        
        vec3 layer1 = mix(uColor1, uColor2, S(-.3, .2, (tuv*Rot(radians(-5.))).x));
        vec3 layer2 = mix(uColor2, uColor3, S(-.3, .2, (tuv*Rot(radians(-5.))).x));
        
        // Use dynamic 700 variants instead of hardcoded black
        vec3 color700_1 = uColor700_1;
        vec3 color700_2 = uColor700_2;
        
        vec3 layer3 = mix(layer1, layer2, S(.5, -.3, tuv.y));
        vec3 layer4 = mix(layer3, color700_1, S(-.2, .2, tuv.y));
        vec3 finalComp = mix(layer4, color700_2, S(.0, 1.0, tuv.x));
        
        vec3 col = finalComp;
        
        fragColor = vec4(col,1.0);
      }
      
      void main() {
        mainImage(gl_FragColor, gl_FragCoord.xy);
      }
    `

    // Create shader
    function createShader(type: number, source: string): WebGLShader | null {
      if (!gl) return null
      const shader = gl.createShader(type)
      if (!shader) return null
      
      gl.shaderSource(shader, source)
      gl.compileShader(shader)
      
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('Shader compilation error:', gl.getShaderInfoLog(shader))
        gl.deleteShader(shader)
        return null
      }
      
      return shader
    }

    // Create program
    const vertexShader = createShader(gl.VERTEX_SHADER, vertexShaderSource)
    const fragmentShader = createShader(gl.FRAGMENT_SHADER, fragmentShaderSource)
    
    if (!vertexShader || !fragmentShader) return

    const program = gl.createProgram()
    if (!program) return

    gl.attachShader(program, vertexShader)
    gl.attachShader(program, fragmentShader)
    gl.linkProgram(program)

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Program linking error:', gl.getProgramInfoLog(program))
      return
    }

    programRef.current = program

    // Get attribute and uniform locations
    const inPos = gl.getAttribLocation(program, 'inPos')
    const iTime = gl.getUniformLocation(program, 'iTime')
    const iMouse = gl.getUniformLocation(program, 'iMouse')
    const iResolution = gl.getUniformLocation(program, 'iResolution')
    const uColor1 = gl.getUniformLocation(program, 'uColor1')
    const uColor2 = gl.getUniformLocation(program, 'uColor2')
    const uColor3 = gl.getUniformLocation(program, 'uColor3')
    const uColor700_1 = gl.getUniformLocation(program, 'uColor700_1')
    const uColor700_2 = gl.getUniformLocation(program, 'uColor700_2')
    const uColor700_3 = gl.getUniformLocation(program, 'uColor700_3')

    // Create buffers
    const positions = new Float32Array([-1, -1, 1, -1, 1, 1, -1, 1])
    const indices = new Uint16Array([0, 1, 2, 0, 2, 3])

    const positionBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW)

    const indexBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer)
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW)

    // Mouse event listener
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mousePosRef.current = [e.clientX - rect.left, e.clientY - rect.top]
    }

    canvas.addEventListener('mousemove', handleMouseMove)

    // Resize function
    const resize = () => {
      canvas.width = width
      canvas.height = height
      gl.viewport(0, 0, canvas.width, canvas.height)
    }

    resize()

    // Render function
    const render = (time: number) => {
      gl.clearColor(0.0, 0.0, 0.0, 1.0)
      gl.clear(gl.COLOR_BUFFER_BIT)

      gl.useProgram(program)

      // Set uniforms
      gl.uniform1f(iTime, time / 1000.0)
      gl.uniform2f(iResolution, canvas.width, canvas.height)
      gl.uniform2f(iMouse, mousePosRef.current[0], mousePosRef.current[1])
      gl.uniform3f(uColor1, cardColors.primary[0], cardColors.primary[1], cardColors.primary[2])
      gl.uniform3f(uColor2, cardColors.secondary[0], cardColors.secondary[1], cardColors.secondary[2])
      gl.uniform3f(uColor3, cardColors.tertiary[0], cardColors.tertiary[1], cardColors.tertiary[2])
      gl.uniform3f(uColor700_1, color700Variants.primary[0], color700Variants.primary[1], color700Variants.primary[2])
      gl.uniform3f(uColor700_2, color700Variants.secondary[0], color700Variants.secondary[1], color700Variants.secondary[2])
      gl.uniform3f(uColor700_3, color700Variants.tertiary[0], color700Variants.tertiary[1], color700Variants.tertiary[2])

      // Set attributes
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
      gl.enableVertexAttribArray(inPos)
      gl.vertexAttribPointer(inPos, 2, gl.FLOAT, false, 0, 0)

      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer)
      gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0)

      animationRef.current = requestAnimationFrame(render)
    }

    render(0)

    // Cleanup
    return () => {
      canvas.removeEventListener('mousemove', handleMouseMove)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      if (program) {
        gl.deleteProgram(program)
      }
      if (vertexShader) {
        gl.deleteShader(vertexShader)
      }
      if (fragmentShader) {
        gl.deleteShader(fragmentShader)
      }
    }
  }, [width, height, colors])

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ width: '100%', height: '100%' }}
    />
  )
}