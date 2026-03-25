'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { PageHeader } from '@/components/PageHeader'
import { Section } from '@/components/Section'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Loader2, FileText, Video, BookOpen } from 'lucide-react'
import Link from 'next/link'

export default function ResourcesPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin')
    } else if (status === 'authenticated' && session?.user?.status !== 'APPROVED') {
      router.push('/register/pending')
    } else if (status === 'authenticated' && session?.user?.role === 'ADMIN') {
      router.push('/admin')
    }
  }, [status, session, router])

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary-600" />
      </div>
    )
  }

  if (!session || session.user.status !== 'APPROVED') {
    return null
  }

  return (
    <>
      <PageHeader
        title="Practice Resources"
        description="Access guides, videos, and materials for your practice"
      />

      <Section>
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <FileText className="w-8 h-8 text-primary-700 mb-2" />
                <CardTitle>Practice Guides</CardTitle>
                <CardDescription>Written guides and instructions</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-[#1A1A1A]/70 mb-4">
                  Access detailed practice guides and sequences
                </p>
                <Button variant="outline" size="sm" disabled>
                  Coming Soon
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Video className="w-8 h-8 text-primary-700 mb-2" />
                <CardTitle>Video Library</CardTitle>
                <CardDescription>Recorded practice sessions</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-[#1A1A1A]/70 mb-4">
                  Watch recorded classes and tutorials
                </p>
                <Button variant="outline" size="sm" disabled>
                  Coming Soon
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <BookOpen className="w-8 h-8 text-primary-700 mb-2" />
                <CardTitle>Blog Articles</CardTitle>
                <CardDescription>Read about yoga and wellness</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-[#1A1A1A]/70 mb-4">
                  Explore our blog for insights and tips
                </p>
                <Button asChild variant="outline" size="sm">
                  <Link href="/blog">Read Blog</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </Section>
    </>
  )
}