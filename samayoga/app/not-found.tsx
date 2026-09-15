import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-cream-50">
      <div className="text-center max-w-md">
        <h1 className="text-6xl font-light mb-4 text-primary-600">404</h1>
        <h2 className="text-2xl font-light mb-4 text-[#1A1A1A]">Page Not Found</h2>
        <p className="text-[#1A1A1A]/70 mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Button asChild>
          <Link href="/">Return Home</Link>
        </Button>
      </div>
    </div>
  )
}
