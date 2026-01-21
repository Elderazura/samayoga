'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { PageHeader } from '@/components/PageHeader'
import { Section } from '@/components/Section'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Loader2, Calendar, BookOpen, Clock, DollarSign, TrendingUp } from 'lucide-react'
import Link from 'next/link'

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin')
    } else if (status === 'authenticated') {
      if (session?.user?.status === 'PENDING') {
        router.push('/register/pending')
      } else if (session?.user?.role === 'ADMIN') {
        router.push('/admin')
      }
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
        title="Student Dashboard"
        description={`Welcome back, ${session.user.name || 'Student'}`}
      />

      <Section>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Calendar className="w-8 h-8 text-primary-700 mb-2" />
                <CardTitle>Upcoming Classes</CardTitle>
                <CardDescription>View your scheduled sessions</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-light mb-4">0</p>
                <Button asChild variant="outline" size="sm">
                  <Link href="/dashboard/classes">View Schedule</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <BookOpen className="w-8 h-8 text-primary-700 mb-2" />
                <CardTitle>Practice Resources</CardTitle>
                <CardDescription>Access class materials</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild variant="outline" size="sm">
                  <Link href="/dashboard/resources">View Resources</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Clock className="w-8 h-8 text-primary-700 mb-2" />
                <CardTitle>Account</CardTitle>
                <CardDescription>Manage your profile</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild variant="outline" size="sm">
                  <Link href="/dashboard/settings">Settings</Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Getting Started</CardTitle>
              <CardDescription>
                Your account has been approved! Here's what you can do next.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-primary-700 font-medium">1</span>
                </div>
                <div>
                  <h3 className="font-medium text-[#1A1A1A] mb-1">Book Your First Class</h3>
                  <p className="text-sm text-[#1A1A1A]/70">
                    Contact us to schedule your first yoga session. We'll send you a Google Meet link.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-primary-700 font-medium">2</span>
                </div>
                <div>
                  <h3 className="font-medium text-[#1A1A1A] mb-1">Explore Resources</h3>
                  <p className="text-sm text-[#1A1A1A]/70">
                    Check out practice guides, videos, and helpful articles in your dashboard.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </Section>
    </>
  )
}