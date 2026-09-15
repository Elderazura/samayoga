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
      className="relative w-full max-w-[min(100%,340px)]"
    >
      <p className="mb-3 text-center text-xs font-medium uppercase tracking-[0.16em] text-umber-soft lg:text-left">
        Reels preview
      </p>
      <div className="relative overflow-hidden border border-stone-300 bg-umber aspect-[9/16] max-h-[min(70vh,540px)] shadow-sm">
        <div
          className="absolute top-2.5 left-1/2 z-20 h-0.5 w-12 -translate-x-1/2 rounded-sm bg-white/20"
          aria-hidden
        />

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
            className="pointer-events-none absolute inset-0 z-10 shadow-[inset_0_0_60px_rgba(0,0,0,0.18)]"
            aria-hidden
          />

          <div className="absolute bottom-0 left-0 right-0 z-20 bg-gradient-to-t from-umber/70 to-transparent px-4 pb-3 pt-10">
            <p className="mb-2 text-center text-[10px] font-medium uppercase tracking-wider text-stone-100/80">
              {index + 1} / {INSTAGRAM_REEL_VIDEOS.length}
            </p>
            <div className="flex gap-1 justify-center">
              {INSTAGRAM_REEL_VIDEOS.map((_, i) => (
                <button
                  key={`dot-${i}`}
                  type="button"
                  onClick={() => goTo(i)}
                  className={`h-1 min-w-[16px] flex-1 max-w-6 rounded-full transition-colors duration-200 cursor-pointer ${
                    i === index ? 'bg-stone-50' : 'bg-stone-50/35 hover:bg-stone-50/55'
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
