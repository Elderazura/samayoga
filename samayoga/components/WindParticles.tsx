'use client'

import { useEffect, useState } from 'react'

interface Particle {
  id: number
  delay: number
  duration: number
  top: number
}

export function WindParticles() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const [particles] = useState<Particle[]>(() => {
    // Create 5-7 subtle particles
    return Array.from({ length: 6 }, (_, i) => ({
      id: i,
      delay: i * 2,
      duration: 15 + i * 5, // 15-45 seconds
      top: 10 + i * 15, // Distribute vertically
    }))
  })

  useEffect(() => {
    if (typeof window === 'undefined') return
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)
    
    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches)
    }
    
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  if (prefersReducedMotion) {
    return null
  }

  return (
    <div
      className="wind-particle fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    >
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute w-px h-32 bg-primary-300/8"
          style={{
            top: `${particle.top}%`,
            animation: `wind ${particle.duration}s linear infinite`,
            animationDelay: `${particle.delay}s`,
            left: '-4px',
          }}
        />
      ))}
    </div>
  )
}