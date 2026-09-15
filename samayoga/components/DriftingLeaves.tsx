'use client'

import { useEffect, useRef, useState, useCallback } from 'react'

interface Leaf {
  x: number
  y: number
  vx: number
  vy: number
  rotation: number
  rotationSpeed: number
  size: number
  opacity: number
  colorIndex: number
  tumbling: number
  windPhase: number
  age: number
}

const LEAF_COLORS = [
  [0.894, 0.510, 0.451], // #E48273 - primary
  [0.839, 0.420, 0.353], // #D66B5A - primary-600
  [0.722, 0.353, 0.290], // #B85A4A - primary-700
  [0.604, 0.286, 0.227], // #9A493A - primary-800
]

const VERTEX_SHADER = `
  attribute vec2 a_position;
  uniform vec2 u_center;
  uniform float u_rotation;
  uniform float u_size;
  uniform vec2 u_resolution;
  
  varying vec2 v_uv;
  
  void main() {
    // Rotate and scale
    vec2 pos = a_position;
    float c = cos(u_rotation);
    float s = sin(u_rotation);
    mat2 rot = mat2(c, -s, s, c);
    pos = rot * pos * u_size;
    
    // Translate to center
    pos += u_center;
    
    // Convert to clip space
    vec2 clipSpace = ((pos / u_resolution) * 2.0) - 1.0;
    clipSpace.y *= -1.0;
    
    gl_Position = vec4(clipSpace, 0.0, 1.0);
    
    // Pass UV coordinates (normalized position)
    v_uv = a_position;
  }
`

const FRAGMENT_SHADER = `
  precision mediump float;
  
  uniform vec3 u_color;
  uniform float u_opacity;
  
  varying vec2 v_uv;
  
  void main() {
    vec2 uv = v_uv;
    
    // Create more realistic autumn leaf shape (asymmetric oval with slight point)
    float dist = length(uv);
    
    // Make leaf more elongated and pointed (like a real leaf)
    float leafShape = 1.0 - smoothstep(0.3, 1.0, dist);
    
    // Add subtle point at one end (stem end)
    float point = smoothstep(0.0, 0.3, abs(uv.y + 0.5)) * 0.2;
    leafShape += point;
    
    // Add gentle texture variation
    float noise = sin(uv.x * 8.0) * sin(uv.y * 6.0) * 0.02;
    
    // Add subtle vein pattern (more realistic)
    float mainVein = abs(sin(uv.y * 20.0)) * 0.05;
    float sideVeins = abs(sin(uv.x * 12.0 + uv.y * 8.0)) * 0.03;
    float veins = mainVein + sideVeins;
    
    // Add slight color variation for autumn effect
    vec3 autumnTint = vec3(0.05, 0.02, 0.0); // Slight warm brown tint
    vec3 finalColor = u_color + vec3(noise + veins) + autumnTint;
    float alpha = leafShape * u_opacity;
    
    gl_FragColor = vec4(finalColor, alpha);
  }
`

export function DriftingLeaves() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const glRef = useRef<WebGLRenderingContext | null>(null)
  const programRef = useRef<WebGLProgram | null>(null)
  const leavesRef = useRef<Leaf[]>([])
  const animationFrameRef = useRef<number>()
  const mousePositionRef = useRef({ x: -1000, y: -1000 })
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const fallbackCanvasRef = useRef<HTMLCanvasElement>(null)

  const createShader = (
    gl: WebGLRenderingContext,
    type: number,
    source: string
  ): WebGLShader | null => {
    const shader = gl.createShader(type)
    if (!shader) return null

    gl.shaderSource(shader, source)
    gl.compileShader(shader)

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      // Log shader errors (helpful for debugging)
      const error = gl.getShaderInfoLog(shader)
      if (error) {
        // Only log in development - check if we're in browser dev mode
        if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
          console.error('Shader compile error:', error)
        }
      }
      gl.deleteShader(shader)
      return null
    }

    return shader
  }

  const createProgram = (
    gl: WebGLRenderingContext,
    vertexShader: WebGLShader,
    fragmentShader: WebGLShader
  ): WebGLProgram | null => {
    const program = gl.createProgram()
    if (!program) return null

    gl.attachShader(program, vertexShader)
    gl.attachShader(program, fragmentShader)
    gl.linkProgram(program)

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      // Log program errors (helpful for debugging)
      const error = gl.getProgramInfoLog(program)
      if (error) {
        // Only log in development - check if we're in browser dev mode
        if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
          console.error('Program link error:', error)
        }
      }
      gl.deleteProgram(program)
      return null
    }

    return program
  }

  const initWebGL = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return false

    const gl = canvas.getContext('webgl', { alpha: true, antialias: true })
    if (!gl) return false

    glRef.current = gl

    const vertexShader = createShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER)
    const fragmentShader = createShader(
      gl,
      gl.FRAGMENT_SHADER,
      FRAGMENT_SHADER
    )
    if (!vertexShader || !fragmentShader) return false

    const program = createProgram(gl, vertexShader, fragmentShader)
    if (!program) return false

    programRef.current = program

    gl.enable(gl.BLEND)
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)

    return true
  }, [])

  const initLeaves = useCallback(() => {
    const count = 20 // Fewer leaves for more calming effect
    const newLeaves: Leaf[] = []

    for (let i = 0; i < count; i++) {
      newLeaves.push({
        x: Math.random() * 100,
        y: -5 - Math.random() * 20,
        vx: (Math.random() - 0.5) * 0.05, // Slower horizontal movement
        vy: 0.08 + Math.random() * 0.12, // Much slower falling
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.006, // Slower rotation
        size: 20 + Math.random() * 35, // Slightly larger leaves
        opacity: 0.15 + Math.random() * 0.25, // More visible
        colorIndex: Math.floor(Math.random() * LEAF_COLORS.length),
        tumbling: Math.random() * Math.PI * 2,
        windPhase: Math.random() * Math.PI * 2,
        age: Math.random() * 100,
      })
    }

    leavesRef.current = newLeaves
  }, [])

  const updateLeaves = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const width = canvas.width
    const height = canvas.height

    leavesRef.current = leavesRef.current.map((leaf) => {
      let { x, y, vx, vy, rotation, rotationSpeed, tumbling, windPhase, age } =
        leaf

      // Gentle, slow wind with multiple frequencies
      const wind1 = Math.sin(age * 0.003 + windPhase) * 0.06 // Slower wind
      const wind2 = Math.cos(age * 0.002 + windPhase * 1.3) * 0.04
      const windDirection = Math.cos(age * 0.0025 + windPhase) * 0.03

      vx += windDirection * 0.006 // Much gentler
      vx += (wind1 + wind2) * 0.004

      // Very gentle gravity
      vy += 0.0002

      // More air resistance for slower, floating effect
      vx *= 0.998
      vy *= 0.999

      x += vx
      y += vy

      // Gentle, slow tumbling motion
      tumbling += rotationSpeed * 0.8
      rotation += rotationSpeed + Math.sin(tumbling) * 0.003

      // Mouse interaction
      if (mousePositionRef.current.x > 0) {
        const mouseX = (mousePositionRef.current.x / width) * 100
        const mouseY = (mousePositionRef.current.y / height) * 100

        const dx = mouseX - x
        const dy = mouseY - y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < 20 && distance > 0) {
          const repelStrength = (1 - distance / 20) * 3
          const angle = Math.atan2(dy, dx)
          vx -= Math.cos(angle) * repelStrength * 0.015
          vy -= Math.sin(angle) * repelStrength * 0.015
        }
      }

      // Reset if off screen (slower reset)
      if (y > 120) {
        return {
          ...leaf,
          x: Math.random() * 100,
          y: -10,
          vx: (Math.random() - 0.5) * 0.05,
          vy: 0.08 + Math.random() * 0.12,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.006,
          tumbling: Math.random() * Math.PI * 2,
          windPhase: Math.random() * Math.PI * 2,
          age: 0,
        }
      }

      // Wrap horizontally
      if (x < -5) x = 105
      if (x > 105) x = -5

      age += 0.016

      return {
        ...leaf,
        x,
        y,
        vx,
        vy,
        rotation,
        tumbling,
        windPhase,
        age,
      }
    })
  }, [])

  const renderWebGL = useCallback(() => {
    const gl = glRef.current
    const program = programRef.current
    const canvas = canvasRef.current

    if (!gl || !program || !canvas) return

    const width = canvas.width
    const height = canvas.height

    gl.viewport(0, 0, width, height)
    gl.clearColor(0, 0, 0, 0)
    gl.clear(gl.COLOR_BUFFER_BIT)

    gl.useProgram(program)

    // Create leaf shape vertices (oval)
    const segments = 20
    const vertices: number[] = []
    for (let i = 0; i <= segments; i++) {
      const angle = (i / segments) * Math.PI * 2
      vertices.push(Math.cos(angle), Math.sin(angle) * 0.7)
    }

    const vertexBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW)

    const positionLoc = gl.getAttribLocation(program, 'a_position')
    const centerLoc = gl.getUniformLocation(program, 'u_center')
    const rotationLoc = gl.getUniformLocation(program, 'u_rotation')
    const sizeLoc = gl.getUniformLocation(program, 'u_size')
    const resolutionLoc = gl.getUniformLocation(program, 'u_resolution')
    const colorLoc = gl.getUniformLocation(program, 'u_color')
    const opacityLoc = gl.getUniformLocation(program, 'u_opacity')

    gl.enableVertexAttribArray(positionLoc)
    gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0)
    gl.uniform2f(resolutionLoc, width, height)

    leavesRef.current.forEach((leaf) => {
      const px = (leaf.x / 100) * width
      const py = (leaf.y / 100) * height

      gl.uniform2f(centerLoc, px, py)
      gl.uniform1f(rotationLoc, leaf.rotation + Math.sin(leaf.tumbling) * 0.3)
      gl.uniform1f(sizeLoc, leaf.size)
      gl.uniform3f(
        colorLoc,
        LEAF_COLORS[leaf.colorIndex][0],
        LEAF_COLORS[leaf.colorIndex][1],
        LEAF_COLORS[leaf.colorIndex][2]
      )
      gl.uniform1f(opacityLoc, leaf.opacity)

      gl.drawArrays(gl.TRIANGLE_FAN, 0, segments + 1)
    })
  }, [])

  const renderCanvas2D = useCallback(() => {
    const canvas = fallbackCanvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    const width = canvas.width
    const height = canvas.height

    ctx.clearRect(0, 0, width, height)

    leavesRef.current.forEach((leaf) => {
      const px = (leaf.x / 100) * width
      const py = (leaf.y / 100) * height

      ctx.save()
      ctx.translate(px, py)
      ctx.rotate(leaf.rotation + Math.sin(leaf.tumbling) * 0.3)

      const color = LEAF_COLORS[leaf.colorIndex]
      ctx.fillStyle = `rgba(${Math.round(color[0] * 255)}, ${Math.round(
        color[1] * 255
      )}, ${Math.round(color[2] * 255)}, ${leaf.opacity})`

      // Draw leaf shape
      ctx.beginPath()
      ctx.ellipse(0, 0, leaf.size, leaf.size * 0.7, 0, 0, Math.PI * 2)
      ctx.fill()

      // Add subtle texture
      ctx.globalAlpha = leaf.opacity * 0.3
      for (let i = 0; i < 3; i++) {
        ctx.beginPath()
        ctx.moveTo(
          (Math.sin((i * Math.PI) / 3) * leaf.size) / 2,
          (Math.cos((i * Math.PI) / 3) * leaf.size) / 2
        )
        ctx.lineTo(0, 0)
        ctx.strokeStyle = `rgba(${Math.round(color[0] * 255)}, ${Math.round(
          color[1] * 255
        )}, ${Math.round(color[2] * 255)}, 0.2)`
        ctx.lineWidth = 1
        ctx.stroke()
      }

      ctx.restore()
    })
  }, [])

  const animate = useCallback(() => {
    if (prefersReducedMotion) return

    updateLeaves()

    if (glRef.current && programRef.current) {
      renderWebGL()
    } else if (fallbackCanvasRef.current) {
      renderCanvas2D()
    }

    animationFrameRef.current = requestAnimationFrame(animate)
  }, [prefersReducedMotion, updateLeaves, renderWebGL, renderCanvas2D])

  const handleResize = useCallback(() => {
    if (typeof window === 'undefined') return
    const canvas = canvasRef.current
    const fallback = fallbackCanvasRef.current
    if (!canvas && !fallback) return

    const dpr = window.devicePixelRatio || 1

    if (canvas) {
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr

      const gl = glRef.current
      if (gl) {
        gl.viewport(0, 0, canvas.width, canvas.height)
      }
    }

    if (fallback) {
      const rect = fallback.getBoundingClientRect()
      fallback.width = rect.width * dpr
      fallback.height = rect.height * dpr
    }
  }, [])

  const handleMouseMove = useCallback((e: MouseEvent) => {
    mousePositionRef.current = { x: e.clientX, y: e.clientY }
  }, [])

  const handleMouseLeave = useCallback(() => {
    mousePositionRef.current = { x: -1000, y: -1000 }
  }, [])

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches)
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (prefersReducedMotion) return

    const webglSupported = initWebGL()
    initLeaves()
    handleResize()

    window.addEventListener('resize', handleResize)
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseleave', handleMouseLeave)

    animationFrameRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseleave', handleMouseLeave)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [
    prefersReducedMotion,
    initWebGL,
    initLeaves,
    handleResize,
    handleMouseMove,
    handleMouseLeave,
    animate,
  ])

  if (prefersReducedMotion) {
    return null
  }

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-0"
        aria-hidden="true"
        style={{ width: '100%', height: '100%' }}
      />
      <canvas
        ref={fallbackCanvasRef}
        className="fixed inset-0 pointer-events-none z-0"
        aria-hidden="true"
        style={{
          width: '100%',
          height: '100%',
          display: glRef.current ? 'none' : 'block',
        }}
      />
    </>
  )
}
