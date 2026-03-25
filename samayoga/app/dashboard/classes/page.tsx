'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { PageHeader } from '@/components/PageHeader'
import { Section } from '@/components/Section'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Loader2, Calendar, Video, Clock, Users, CheckCircle } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'

interface Class {
  id: string
  title: string
  description: string | null
  type: string
  date: string
  duration: number
  meetLink: string | null
  status: string
  bookingStatus?: string
}

export default function ClassesPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [classes, setClasses] = useState<Class[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin')
    } else if (status === 'authenticated' && session?.user?.status !== 'APPROVED') {
      router.push('/register/pending')
    } else if (status === 'authenticated' && session?.user?.role === 'ADMIN') {
      router.push('/admin')
    } else if (status === 'authenticated') {
      fetchClasses()
    }
  }, [status, session, router])

  const fetchClasses = async () => {
    try {
      const response = await fetch('/api/dashboard/classes')
      if (response.ok) {
        const data = await response.json()
        setClasses(data)
      }
    } catch (error) {
      console.error('Error fetching classes:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleBookClass = async (classId: string) => {
    try {
      const response = await fetch('/api/dashboard/classes/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ classId }),
      })

      if (response.ok) {
        await fetchClasses()
      } else {
        alert('Failed to book class. Please try again.')
      }
    } catch (error) {
      console.error('Error booking class:', error)
      alert('Failed to book class. Please try again.')
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

  const upcomingClasses = classes.filter(
    (c) => new Date(c.date) >= new Date() && c.status === 'SCHEDULED'
  )
  const pastClasses = classes.filter(
    (c) => new Date(c.date) < new Date() || c.status === 'COMPLETED'
  )

  return (
    <>
      <PageHeader
        title="My Classes"
        description="View your scheduled classes and access meeting links"
      />

      <Section>
        <div className="max-w-6xl mx-auto">
          {/* Upcoming Classes */}
          <div className="mb-12">
            <h2 className="text-2xl font-light mb-6">Upcoming Classes</h2>
            {upcomingClasses.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <Calendar className="w-12 h-12 text-primary-400 mx-auto mb-4" />
                  <p className="text-[#1A1A1A]/70 mb-4">No upcoming classes scheduled</p>
                  <Button asChild variant="outline">
                    <Link href="/contact">Contact to Book a Class</Link>
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {upcomingClasses.map((classItem, index) => (
                  <motion.div
                    key={classItem.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="h-full hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex items-start justify-between mb-2">
                          <CardTitle className="text-xl">{classItem.title}</CardTitle>
                          <span className="px-2 py-1 text-xs rounded-full bg-primary-100 text-primary-700">
                            {classItem.type}
                          </span>
                        </div>
                        <CardDescription>{classItem.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center gap-2 text-[#1A1A1A]/70">
                            <Calendar className="w-4 h-4" />
                            {new Date(classItem.date).toLocaleDateString('en-US', {
                              weekday: 'long',
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                            })}
                          </div>
                          <div className="flex items-center gap-2 text-[#1A1A1A]/70">
                            <Clock className="w-4 h-4" />
                            {new Date(classItem.date).toLocaleTimeString('en-US', {
                              hour: 'numeric',
                              minute: '2-digit',
                            })} ({classItem.duration} min)
                          </div>
                        </div>

                        {classItem.bookingStatus === 'CONFIRMED' ? (
                          <div className="space-y-2">
                            {classItem.meetLink && (
                              <Button asChild className="w-full" size="sm">
                                <a
                                  href={classItem.meetLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <Video className="w-4 h-4 mr-2" />
                                  Join Class
                                </a>
                              </Button>
                            )}
                            <div className="flex items-center gap-2 text-sm text-green-700">
                              <CheckCircle className="w-4 h-4" />
                              Booked
                            </div>
                          </div>
                        ) : (
                          <Button
                            onClick={() => handleBookClass(classItem.id)}
                            className="w-full"
                            size="sm"
                          >
                            Book This Class
                          </Button>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* Past Classes */}
          {pastClasses.length > 0 && (
            <div>
              <h2 className="text-2xl font-light mb-6">Past Classes</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {pastClasses.map((classItem) => (
                  <Card key={classItem.id} className="opacity-60">
                    <CardHeader>
                      <CardTitle className="text-lg">{classItem.title}</CardTitle>
                      <CardDescription>
                        {new Date(classItem.date).toLocaleDateString()}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {classItem.bookingStatus === 'ATTENDED' && (
                        <div className="flex items-center gap-2 text-sm text-green-700">
                          <CheckCircle className="w-4 h-4" />
                          Attended
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </Section>
    </>
  )
}