import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog | Samyoga',
  description: 'Read our latest articles on yoga, wellness, and practice. Learn about Hatha and Yin yoga, building consistency, and finding balance.',
  openGraph: {
    title: 'Blog | Samyoga',
    description: 'Read our latest articles on yoga, wellness, and practice.',
  },
}

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}