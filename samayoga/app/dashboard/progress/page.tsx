'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { PageHeader } from '@/components/PageHeader'
import { Section } from '@/components/Section'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Loader2, TrendingUp, Calendar, Target } from 'lucide-react'
import { motion } from 'framer-motion'

interface ProgressData {
  classesAttended: number
  practiceDays: number
  lastPracticeDate: string | null
  goals: Array<{ metric: string; value: number; notes: string | null }>
}

export default function ProgressPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [progress, setProgress] = useState<ProgressData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin')
    } else if (status === 'authenticated' && session?.user?.status !== 'APPROVED') {
      router.push('/register/pending')
    } else if (status === 'authenticated' && session?.user?.role === 'ADMIN') {
      router.push('/admin')
    } else if (status === 'authenticated') {
      fetchProgress()
    }
  }, [status, session, router])

  const fetchProgress = async () => {
    try {
      const response = await fetch('/api/dashboard/progress')
      if (response.ok) {
        const data = await response.json()
        setProgress(data)
      }
    } catch (error) {
      console.error('Error fetching progress:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (status === 'loading' || isLoading) {
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
        title="My Progress"
        description="Track your yoga journey and practice milestones"
      />

      <Section>
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-primary-600" />
                    Classes Attended
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-light">{progress?.classesAttended || 0}</p>
                  <p className="text-sm text-[#1A1A1A]/70 mt-2">Total sessions</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-primary-600" />
                    Practice Days
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-light">{progress?.practiceDays || 0}</p>
                  <p className="text-sm text-[#1A1A1A]/70 mt-2">Days with practice</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Target className="w-5 h-5 text-primary-600" />
                    Last Practice
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg font-light">
                    {progress?.lastPracticeDate
                      ? new Date(progress.lastPracticeDate).toLocaleDateString()
                      : 'Not yet'}
                  </p>
                  <p className="text-sm text-[#1A1A1A]/70 mt-2">Most recent session</p>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Goals/Notes */}
          {progress && progress.goals.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Practice Notes & Goals</CardTitle>
                <CardDescription>Your recorded progress and observations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {progress.goals.map((goal, index) => (
                    <div key={index} className="border-b border-primary-100 pb-4 last:border-0">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-medium text-[#1A1A1A]">{goal.metric}</h4>
                        <span className="text-sm text-primary-700">{goal.value}</span>
                      </div>
                      {goal.notes && (
                        <p className="text-sm text-[#1A1A1A]/70">{goal.notes}</p>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {(!progress || progress.classesAttended === 0) && (
            <Card>
              <CardContent className="py-12 text-center">
                <Target className="w-12 h-12 text-primary-400 mx-auto mb-4" />
                <p className="text-[#1A1A1A]/70 mb-4">
                  Start your practice to see your progress here
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </Section>
    </>
  )
}