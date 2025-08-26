"use client"

import { useEffect, useRef } from 'react'

interface PlasmaBackgroundProps {
  className?: string
}

export function PlasmaBackground({ className }: PlasmaBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const width = canvas.width = canvas.offsetWidth
    const height = canvas.height = canvas.offsetHeight
    const startTime = Date.now()

    const gl = canvas.getContext('webgl')
    if (!gl) return

    // Vertex shader
    const vertexShaderSource = `
      attribute vec3 aVertexPosition;
      void main(void) {
        gl_Position = vec4(aVertexPosition, 1.0);
      }
    `

    // Fragment shader
    const fragmentShaderSource = `
      precision mediump float;
      uniform highp float uTime;
      uniform vec2 uRes;
      
      void main(void) {
        float scale = 0.01;
        float time = uTime * 100.0;
        float r1 = 0.4; 
        float r2 = 0.9; 
        float r3 = 0.29; 
        float x = gl_FragCoord.x;
        float y = gl_FragCoord.y;
        float h = uRes.y;
        float w = uRes.x;
        
        float col = 
          sin(distance(vec2(x * r1 + time, y * r2), vec2(w / r3, h)) * scale) +
          sin(distance(vec2(x, y * r2), vec2(1.0 / h * r3, w * r1)) * scale) +
          sin(distance(vec2(r3 * x + time, r1 * y + time), vec2(w * r2 + h * r1, h * r2)) * scale) +
          sin(distance(vec2(1.0 / x * r3, y * r2), vec2(h, w)) * scale);    
        
        vec3 color = vec3(0.5 + 0.5 * sin(col), cos(col), cos(col) - sin(col)) + 0.1;
        color += mod(gl_FragCoord.x, 2.0) < 1.0 ? 0.0 : 0.4;                                    
        
        gl_FragColor = vec4(color, 1.0);
      }
    `

    // Create shaders
    const vertexShader = gl.createShader(gl.VERTEX_SHADER)!
    gl.shaderSource(vertexShader, vertexShaderSource)
    gl.compileShader(vertexShader)

    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)!
    gl.shaderSource(fragmentShader, fragmentShaderSource)
    gl.compileShader(fragmentShader)

    // Create program
    const program = gl.createProgram()!
    gl.attachShader(program, vertexShader)
    gl.attachShader(program, fragmentShader)
    gl.linkProgram(program)
    gl.useProgram(program)

    // Get attribute and uniform locations
    const aVertexPosition = gl.getAttribLocation(program, 'aVertexPosition')
    const uTime = gl.getUniformLocation(program, 'uTime')
    const uRes = gl.getUniformLocation(program, 'uRes')

    // Create buffer
    const buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
      -1, 1,
      -1, -1,
      1, -1,
      1, -1,
      1, 1,
      -1, 1
    ]), gl.STATIC_DRAW)

    gl.enableVertexAttribArray(aVertexPosition)
    gl.vertexAttribPointer(aVertexPosition, 2, gl.FLOAT, false, 0, 0)

    gl.uniform2fv(uRes, [width, height])
    gl.clearColor(0.0, 0.0, 0.0, 1.0)

    function drawScene() {
      requestAnimationFrame(drawScene)
      const time = (Date.now() - startTime) * 0.001

      gl.clear(gl.COLOR_BUFFER_BIT)
      gl.uniform1f(uTime, time)
      gl.drawArrays(gl.TRIANGLES, 0, 6)
    }

    drawScene()

    // Handle resize
    const handleResize = () => {
      const newWidth = canvas.offsetWidth
      const newHeight = canvas.offsetHeight
      canvas.width = newWidth
      canvas.height = newHeight
      gl.viewport(0, 0, newWidth, newHeight)
      gl.uniform2fv(uRes, [newWidth, newHeight])
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ width: '100%', height: '100%' }}
    />
  )
}
