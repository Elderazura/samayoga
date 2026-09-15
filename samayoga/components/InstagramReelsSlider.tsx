'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

/** Portrait clips from `public/assets/videos/portrait` (Reel-style showcase) */
export const INSTAGRAM_REEL_VIDEOS = [
  '/assets/videos/portrait/insta-portrait-01.mp4',
  '/assets/videos/portrait/insta-portrait-02.mp4',
  '/assets/videos/portrait/insta-portrait-03.mp4',
  '/assets/videos/portrait/insta-portrait-04.mp4',
  '/assets/videos/portrait/insta-portrait-05.mp4',
  '/assets/videos/portrait/insta-portrait-06.mp4',
  '/assets/videos/portrait/insta-portrait-07.mp4',
  '/assets/videos/portrait/insta-portrait-08.mp4',
  '/assets/videos/portrait/insta-portrait-09.mp4',
] as const

const SLIDE_INTERVAL_MS = 5500

export function InstagramReelsSlider() {
  const [index, setIndex] = useState(0)
  const [inView, setInView] = useState(true)
  const [reducedMotion, setReducedMotion] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mq.matches)
    const fn = () => setReducedMotion(mq.matches)
    mq.addEventListener('change', fn)
    return () => mq.removeEventListener('change', fn)
  }, [])

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => setInView(e.isIntersecting),
      { threshold: 0.2 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const syncPlayback = useCallback((active: number) => {
    videoRefs.current.forEach((v, j) => {
      if (!v) return
      if (j === active) {
        v.muted = true
        v.play().catch(() => {})
      } else {
        v.pause()
        try {
          v.currentTime = 0
        } catch {
          /* ignore */
        }
      }
    })
  }, [])

  useEffect(() => {
    syncPlayback(index)
  }, [index, syncPlayback])

  useEffect(() => {
    if (!inView) {
      videoRefs.current.forEach((v) => v?.pause())
    } else {
      syncPlayback(index)
    }
  }, [inView, index, syncPlayback])

  useEffect(() => {
    if (reducedMotion || !inView) return
    const t = window.setInterval(() => {
      setIndex((i) => (i + 1) % INSTAGRAM_REEL_VIDEOS.length)
    }, SLIDE_INTERVAL_MS)
    return () => window.clearInterval(t)
  }, [reducedMotion, inView])

  const goTo = (i: number) => setIndex(i)

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-[min(100%,320px)] mx-auto lg:mx-0"
    >
      <div
        className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-br from-primary-200/40 via-primary-100/30 to-primary-300/25 blur-2xl -z-10"
        aria-hidden
      />

      <div className="relative rounded-[2rem] p-[3px] bg-gradient-to-br from-primary-400/50 via-primary-200/40 to-primary-500/30 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.18)]">
        <div className="rounded-[1.85rem] bg-[#0a0a0a] overflow-hidden aspect-[9/16] max-h-[min(72vh,520px)] relative">
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-16 h-1 rounded-full bg-white/10 z-20" />

          {INSTAGRAM_REEL_VIDEOS.map((src, i) => (
            <video
              key={src}
              ref={(el) => {
                videoRefs.current[i] = el
              }}
              src={src}
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[650ms] ease-out ${
                i === index ? 'opacity-100 z-[5]' : 'opacity-0 z-0 pointer-events-none'
              }`}
              muted
              playsInline
              loop
              preload={i === 0 ? 'auto' : 'metadata'}
              aria-hidden={i !== index}
              {...(i === index
                ? {
                    'aria-label': `Muted clip ${i + 1} of ${INSTAGRAM_REEL_VIDEOS.length}`,
                  }
                : {})}
            />
          ))}

          <div
            className="pointer-events-none absolute inset-0 z-10 rounded-[1.85rem] shadow-[inset_0_0_80px_rgba(0,0,0,0.22)]"
            aria-hidden
          />

          <div className="absolute bottom-3 left-3 right-3 z-20 flex gap-1.5 justify-center">
            {INSTAGRAM_REEL_VIDEOS.map((_, i) => (
              <button
                key={`dot-${i}`}
                type="button"
                onClick={() => goTo(i)}
                className={`h-1 flex-1 max-w-8 rounded-full transition-all duration-300 ${
                  i === index
                    ? 'bg-white/90 scale-y-125'
                    : 'bg-white/25 hover:bg-white/45'
                }`}
                aria-label={`Show clip ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
