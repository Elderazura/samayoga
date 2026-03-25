import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface PageHeaderProps {
  title: string
  description?: string
  className?: string
}

export function PageHeader({ title, description, className }: PageHeaderProps) {
  return (
    <div className={cn("text-center py-10 sm:py-12 md:py-16 px-4 sm:px-6 lg:px-8", className)}>
      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light mb-4 sm:mb-6 text-balance">
        {title}
      </h1>
      {description && (
        <p className="text-base sm:text-lg md:text-xl text-[#1A1A1A]/70 max-w-2xl mx-auto px-2">
          {description}
        </p>
      )}
    </div>
  )
}