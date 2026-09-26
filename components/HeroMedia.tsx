'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import { MediaShield } from '@/components/MediaShield'

/**
 * Hero background: still image first, video layered on top once it can play.
 *
 * The <Image> is the LCP element and always renders, so the hero paints fast and
 * still looks right if the video never arrives. The <video> element is not even
 * mounted until the browser goes idle, which keeps ~1.5MB off the critical path.
 *
 * The video is skipped entirely for reduced-motion users and for anyone on
 * Save-Data or a 2g/3g connection — they keep the still, which is the point of
 * having a real fallback rather than a poster frame.
 */

const POSTER = '/assets/images/landscape/hero-sunrise.jpg'

type NetworkInfo = { saveData?: boolean; effectiveType?: string }

function prefersLightweight(): boolean {
  const c = (navigator as Navigator & { connection?: NetworkInfo }).connection
  if (!c) return false
  if (c.saveData) return true
  return c.effectiveType === 'slow-2g' || c.effectiveType === '2g' || c.effectiveType === '3g'
}

export function HeroMedia() {
  const reduceMotion = useReducedMotion()
  const [mountVideo, setMountVideo] = useState(false)
  const [videoReady, setVideoReady] = useState(false)
  const videoRef = useRef<HTMLVideoElement | null>(null)

  useEffect(() => {
    if (reduceMotion) return
    if (prefersLightweight()) return

    const w = window as Window & { requestIdleCallback?: (cb: () => void) => number }
    if (typeof w.requestIdleCallback === 'function') {
      const id = w.requestIdleCallback(() => setMountVideo(true))
      return () => (window as any).cancelIdleCallback?.(id)
    }
    const t = window.setTimeout(() => setMountVideo(true), 600)
    return () => window.clearTimeout(t)
  }, [reduceMotion])

  // Some browsers reject autoplay even when muted; if so we simply keep the still.
  useEffect(() => {
    if (!mountVideo) return
    const v = videoRef.current
    if (!v) return
    const p = v.play()
    if (p && typeof p.catch === 'function') {
      p.catch(() => setVideoReady(false))
    }
  }, [mountVideo])

  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      {/* Still layer — LCP, and the fallback. Drifts gently when no video covers it. */}
      <motion.div
        className="absolute inset-0 will-change-transform"
        initial={false}
        animate={
          reduceMotion || videoReady ? { scale: 1.02, x: 0 } : { scale: [1.04, 1.1], x: ['0.5%', '-0.8%'] }
        }
        transition={
          reduceMotion || videoReady
            ? { duration: 0.6 }
            : { duration: 34, ease: 'linear', repeat: Infinity, repeatType: 'reverse' }
        }
      >
        <MediaShield className="absolute inset-0">
          <Image
            src={POSTER}
            alt="Sunrise meditation on a wooden deck above a misty valley"
            fill
            className="object-cover object-center"
            priority
            sizes="100vw"
            draggable={false}
          />
        </MediaShield>
      </motion.div>

      {/* Video layer — fades over the still once it is actually playing. */}
      {mountVideo && (
        <MediaShield className="absolute inset-0">
          <video
            ref={videoRef}
            className="absolute inset-0 h-full w-full object-cover object-center"
            style={{
              opacity: videoReady ? 1 : 0,
              transition: 'opacity 1.2s ease-out',
            }}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster={POSTER}
            aria-hidden
            tabIndex={-1}
            disablePictureInPicture
            onPlaying={() => setVideoReady(true)}
            onError={() => setVideoReady(false)}
            draggable={false}
          >
            <source src="/assets/videos/hero.webm" type="video/webm" />
            <source src="/assets/videos/hero.mp4" type="video/mp4" />
          </video>
        </MediaShield>
      )}
    </div>
  )
}
