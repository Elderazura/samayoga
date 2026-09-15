'use client'

import { useEffect } from 'react'

function isProtectedTarget(target: EventTarget | null): boolean {
  if (!(target instanceof Element)) return false
  const el = target.closest('img, picture, video, canvas, svg')
  return Boolean(el)
}

/**
 * Raises friction against casual image/video saving.
 * Cannot stop screenshots, DevTools, or direct URL access — browsers must
 * receive the media to display it.
 */
export function ProtectMedia() {
  useEffect(() => {
    const blockContext = (e: MouseEvent) => {
      if (isProtectedTarget(e.target)) e.preventDefault()
    }

    const blockDrag = (e: DragEvent) => {
      if (isProtectedTarget(e.target)) e.preventDefault()
    }

    document.addEventListener('contextmenu', blockContext, true)
    document.addEventListener('dragstart', blockDrag, true)

    return () => {
      document.removeEventListener('contextmenu', blockContext, true)
      document.removeEventListener('dragstart', blockDrag, true)
    }
  }, [])

  return null
}
