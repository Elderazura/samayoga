'use client'

import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'

/**
 * Drifting fog overlay for the hero image.
 *
 * Renders a tileable fractal-noise texture ONCE, then animates by drawing that
 * texture twice per frame at different offsets and scales. Per-frame cost is two
 * drawImage calls, so this stays cheap enough to sit on top of the LCP element —
 * which is why it is canvas rather than three.js (see HERO_FOG notes in the PR).
 *
 * The texture is masked to a vertical band so fog gathers in the valley, where
 * the photograph already has real mist, instead of washing over the whole frame.
 */

const TEX = 256 // texture is TEX x TEX, tileable
const FPS = 24 // fog moves slowly; 60fps buys nothing here

/** Deterministic hash → [0,1), so the texture is identical between renders. */
function hash(x: number, y: number, seed: number): number {
  const n = Math.sin(x * 127.1 + y * 311.7 + seed * 74.7) * 43758.5453123
  return n - Math.floor(n)
}

/** Value noise on a wrapping grid, so the tile has no visible seams. */
function valueNoise(x: number, y: number, period: number, seed: number): number {
  const xi = Math.floor(x)
  const yi = Math.floor(y)
  const xf = x - xi
  const yf = y - yi

  // Smoothstep keeps the cells from looking like a grid.
  const u = xf * xf * (3 - 2 * xf)
  const v = yf * yf * (3 - 2 * yf)

  const wrap = (n: number) => ((n % period) + period) % period
  const x0 = wrap(xi)
  const x1 = wrap(xi + 1)
  const y0 = wrap(yi)
  const y1 = wrap(yi + 1)

  const a = hash(x0, y0, seed)
  const b = hash(x1, y0, seed)
  const c = hash(x0, y1, seed)
  const d = hash(x1, y1, seed)

  return a * (1 - u) * (1 - v) + b * u * (1 - v) + c * (1 - u) * v + d * u * v
}

/** Builds the tileable fog texture: warm-tinted, soft, alpha-encoded. */
function buildTexture(): HTMLCanvasElement {
  const cv = document.createElement('canvas')
  cv.width = TEX
  cv.height = TEX
  const ctx = cv.getContext('2d')!
  const img = ctx.createImageData(TEX, TEX)

  for (let y = 0; y < TEX; y++) {
    for (let x = 0; x < TEX; x++) {
      // 4 octaves of fBm — enough structure to read as vapour, not static.
      let amp = 0.5
      let period = 4
      let sum = 0
      let norm = 0
      for (let o = 0; o < 4; o++) {
        const sx = (x / TEX) * period
        const sy = (y / TEX) * period
        sum += valueNoise(sx, sy, period, o + 1) * amp
        norm += amp
        amp *= 0.5
        period *= 2
      }
      let n = sum / norm

      // Bias towards the wispy end so the fog has gaps rather than a flat sheet.
      n = Math.pow(Math.max(0, n * 1.5 - 0.16), 1.25)

      const i = (y * TEX + x) * 4
      // Warm white — matches the sunrise. Cool grey fog fights this palette.
      img.data[i] = 255
      img.data[i + 1] = 243
      img.data[i + 2] = 226
      img.data[i + 3] = Math.min(255, n * 255)
    }
  }

  ctx.putImageData(img, 0, 0)
  return cv
}

export function HeroFog({ className = '' }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const reduceMotion = useReducedMotion()
  // Defer mounting so the fog never competes with the hero image for LCP.
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const w = window as Window & {
      requestIdleCallback?: (cb: () => void) => number
    }
    if (typeof w.requestIdleCallback === 'function') {
      const id = w.requestIdleCallback(() => setReady(true))
      return () => (window as any).cancelIdleCallback?.(id)
    }
    const t = window.setTimeout(() => setReady(true), 400)
    return () => window.clearTimeout(t)
  }, [])

  useEffect(() => {
    if (!ready) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const tex = buildTexture()
    let raf = 0
    let last = 0
    let visible = true

    const size = () => {
      // Render at a third of CSS size: it is blurred heavily anyway.
      const r = canvas.getBoundingClientRect()
      canvas.width = Math.max(1, Math.round(r.width / 3))
      canvas.height = Math.max(1, Math.round(r.height / 3))
    }
    size()

    /**
     * Density envelope. Two sine periods that are deliberately not harmonics of
     * each other, so the combined density never repeats on a loop you can spot —
     * the fog thickens, thins out almost to nothing, and rolls back in.
     */
    const envelope = (t: number, periodMs: number, phase: number) => {
      const e = 0.5 + 0.5 * Math.sin((t / periodMs) * Math.PI * 2 + phase)
      // Bias towards the thin end so the clear spells actually read as clear.
      return 0.06 + 0.94 * Math.pow(e, 1.4)
    }

    const draw = (t: number) => {
      const { width: W, height: H } = canvas
      ctx.clearRect(0, 0, W, H)

      // Two layers at different scales, speeds and breathing periods read as depth.
      const layers = [
        { scale: 2.6, speed: 0.0038, dir: 1, alpha: 0.95, y: 0.012, period: 46000, phase: 0 },
        { scale: 4.1, speed: 0.0021, dir: -1, alpha: 0.72, y: -0.008, period: 61000, phase: 1.9 },
      ]

      for (const l of layers) {
        const tileW = W * l.scale
        const tileH = H * l.scale
        const ox = ((t * l.speed * l.dir) % tileW) - tileW
        const oy = Math.sin(t * 0.00013) * H * l.y

        ctx.globalAlpha = l.alpha * envelope(t, l.period, l.phase)
        // Draw enough copies to cover the canvas as the offset drifts.
        for (let i = 0; i < 3; i++) {
          ctx.drawImage(tex, ox + i * tileW, oy, tileW, tileH)
        }
      }

      ctx.globalAlpha = 1
      ctx.globalCompositeOperation = 'destination-in'

      // Mask to a horizontal band: fog belongs in the valley, not the sky.
      const g = ctx.createLinearGradient(0, 0, 0, H)
      g.addColorStop(0, 'rgba(0,0,0,0)')
      g.addColorStop(0.28, 'rgba(0,0,0,0.3)')
      g.addColorStop(0.55, 'rgba(0,0,0,0.9)')
      g.addColorStop(0.72, 'rgba(0,0,0,1)')
      g.addColorStop(0.92, 'rgba(0,0,0,0.7)')
      g.addColorStop(1, 'rgba(0,0,0,0.15)')
      ctx.fillStyle = g
      ctx.fillRect(0, 0, W, H)

      // Banks of denser and thinner fog rolling sideways across that band, so it
      // clears in one part of the frame while still sitting thick in another.
      const bands = ctx.createLinearGradient(0, 0, W, 0)
      const roll = (t / 78000) * Math.PI * 2
      const STOPS = 7
      for (let i = 0; i <= STOPS; i++) {
        const p = i / STOPS
        const a = 0.34 + 0.66 * (0.5 + 0.5 * Math.sin(roll + p * Math.PI * 2.4))
        bands.addColorStop(p, `rgba(0,0,0,${a.toFixed(3)})`)
      }
      ctx.fillStyle = bands
      ctx.fillRect(0, 0, W, H)

      ctx.globalCompositeOperation = 'source-over'
    }

    if (reduceMotion) {
      // One still frame at mid density — no drift, no breathing.
      draw(11500)
      return
    }

    const frame = (t: number) => {
      raf = requestAnimationFrame(frame)
      if (!visible) return
      if (t - last < 1000 / FPS) return
      last = t
      draw(t)
    }
    raf = requestAnimationFrame(frame)

    // Stop burning cycles when the hero is offscreen or the tab is hidden.
    const io = new IntersectionObserver(
      ([e]) => {
        visible = e.isIntersecting && !document.hidden
      },
      { threshold: 0 }
    )
    io.observe(canvas)

    const onVis = () => {
      visible = !document.hidden
    }
    document.addEventListener('visibilitychange', onVis)

    const onResize = () => size()
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
      document.removeEventListener('visibilitychange', onVis)
      window.removeEventListener('resize', onResize)
    }
  }, [ready, reduceMotion])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      style={{
        // Blur hides the low render resolution and turns noise into vapour.
        filter: 'blur(18px)',
        mixBlendMode: 'screen',
        opacity: ready ? 0.9 : 0,
        transition: 'opacity 2.4s ease-out',
      }}
    />
  )
}
