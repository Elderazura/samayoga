'use client'

import { useEffect, useState } from 'react'

export function BackgroundBreath() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

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
      className="breathing-effect fixed inset-0 pointer-events-none z-0"
      aria-hidden="true"
    >
      <div
        className="absolute inset-0 bg-primary-200/15 rounded-full blur-3xl"
        style={{
          animation: 'breath 10s ease-in-out infinite',
          transform: 'scale(1)',
        }}
      />
    </div>
  )
}