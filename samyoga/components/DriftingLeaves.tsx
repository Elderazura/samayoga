'use client'

import { useEffect, useState, useRef, useCallback } from 'react'

interface Leaf {
  id: number
  initialX: number
  initialY: number
  rotation: number
  size: number
  duration: number
  opacity: number
  driftX: number
  driftY: number
  currentX: number
  currentY: number
  age: number
}

export function DriftingLeaves() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const [leaves, setLeaves] = useState<Leaf[]>([])
  const [mousePosition, setMousePosition] = useState({ x: -1000, y: -1000 })
  const containerRef = useRef<HTMLDivElement>(null)
  const animationFrameRef = useRef<number>()

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
    if (prefersReducedMotion) return

    // Create 8-10 leaves with varied properties
    const newLeaves: Leaf[] = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      initialX: Math.random() * 100,
      initialY: -10 - Math.random() * 10, // Start above viewport
      rotation: Math.random() * 360,
      size: 24 + Math.random() * 20, // 24-44px
      duration: 30 + Math.random() * 20, // 30-50 seconds
      opacity: 0.2 + Math.random() * 0.15, // 0.2-0.35
      driftX: (Math.random() - 0.5) * 0.3, // Subtle horizontal drift
      driftY: 0.8 + Math.random() * 0.4, // Downward drift
      currentX: Math.random() * 100,
      currentY: -10 - Math.random() * 10,
      age: Math.random() * 50, // Random starting age
    }))
    setLeaves(newLeaves)
  }, [prefersReducedMotion])

  const handleMouseMove = useCallback((e: MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY })
  }, [])

  const handleMouseLeave = useCallback(() => {
    setMousePosition({ x: -1000, y: -1000 })
  }, [])

  useEffect(() => {
    if (prefersReducedMotion) return
    
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseleave', handleMouseLeave)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [handleMouseMove, handleMouseLeave, prefersReducedMotion])

  useEffect(() => {
    if (prefersReducedMotion || leaves.length === 0) return

    const animate = () => {
      setLeaves((prevLeaves) => {
        return prevLeaves.map((leaf) => {
          // Calculate base drift position
          const time = (leaf.age % leaf.duration) / leaf.duration
          const baseX = (leaf.initialX + time * 100 * leaf.driftX) % 100
          let newY = leaf.currentY + leaf.driftY * 0.05
          
          // Reset if leaf has drifted too far down
          if (newY > 110) {
            newY = -10
            return {
              ...leaf,
              currentY: newY,
              currentX: Math.random() * 100,
              initialX: Math.random() * 100,
              age: 0,
            }
          }

          let finalX = baseX

          // Mouse repel effect
          if (containerRef.current && mousePosition.x > 0) {
            const rect = containerRef.current.getBoundingClientRect()
            const mouseX = ((mousePosition.x - rect.left) / rect.width) * 100
            const mouseY = ((mousePosition.y - rect.top) / rect.height) * 100
            
            const distanceX = mouseX - baseX
            const distanceY = mouseY - newY
            const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY)
            
            // Repel within 12% of viewport distance
            const repelRadius = 12
            if (distance < repelRadius && distance > 0) {
              const repelStrength = (1 - distance / repelRadius) * 1.5 // Max 1.5% repel
              const angle = Math.atan2(distanceY, distanceX)
              finalX = baseX - Math.cos(angle) * repelStrength
              newY = newY - Math.sin(angle) * repelStrength * 0.5
            }
          }

          return {
            ...leaf,
            currentX: finalX,
            currentY: newY,
            rotation: leaf.rotation + 0.2, // Slow rotation
            age: leaf.age + 0.016, // ~60fps
          }
        })
      })
      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animationFrameRef.current = requestAnimationFrame(animate)
    
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [leaves.length, prefersReducedMotion, mousePosition])

  if (prefersReducedMotion) {
    return null
  }

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    >
      {leaves.map((leaf) => (
        <div
          key={leaf.id}
          className="absolute transition-transform duration-75 ease-out"
          style={{
            left: `${leaf.currentX}%`,
            top: `${leaf.currentY}%`,
            width: `${leaf.size}px`,
            height: `${leaf.size}px`,
            opacity: leaf.opacity,
            transform: `translate(-50%, -50%) rotate(${leaf.rotation}deg)`,
            willChange: 'transform',
          }}
        >
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="drop-shadow-sm"
          >
            <path
              d="M12 2C10 2 8 4 8 6C8 8 10 10 12 12C14 10 16 8 16 6C16 4 14 2 12 2Z"
              fill="currentColor"
              className="text-primary-600"
            />
            <path
              d="M6 8C5 8 4 9 4 10C4 11 5 12 6 12C7 12 8 11 8 10C8 9 7 8 6 8Z"
              fill="currentColor"
              className="text-primary-500"
              opacity="0.7"
            />
            <path
              d="M18 8C17 8 16 9 16 10C16 11 17 12 18 12C19 12 20 11 20 10C20 9 19 8 18 8Z"
              fill="currentColor"
              className="text-primary-500"
              opacity="0.7"
            />
            <path
              d="M12 14C11 14 10 15 10 16C10 17 11 18 12 18C13 18 14 17 14 16C14 15 13 14 12 14Z"
              fill="currentColor"
              className="text-primary-400"
              opacity="0.5"
            />
          </svg>
        </div>
      ))}
    </div>
  )
}