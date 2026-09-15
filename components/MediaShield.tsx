'use client'

import { cn } from '@/lib/utils'

/**
 * Transparent shield over media so right-click / long-press hits the overlay,
 * not the underlying img. Use on certificate and hero media frames.
 */
export function MediaShield({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={cn('relative select-none', className)}
      onContextMenu={(e) => e.preventDefault()}
      onDragStart={(e) => e.preventDefault()}
    >
      <div className="pointer-events-none select-none [&_img]:pointer-events-none [&_img]:select-none">
        {children}
      </div>
      {/* Captures interaction; keeps media visible underneath */}
      <div
        className="absolute inset-0 z-[2] cursor-default"
        aria-hidden
        onContextMenu={(e) => e.preventDefault()}
      />
    </div>
  )
}
