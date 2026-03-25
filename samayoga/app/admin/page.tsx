'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { PageHeader } from '@/components/PageHeader'
import { Section } from '@/components/Section'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Loader2, CheckCircle, XCircle, User, Mail, Calendar, DollarSign, FileText, Image, Bot } from 'lucide-react'
import Link from 'next/link'

interface Registration {
  id: string
  user: {
    id: string
    name: string | null
    email: string
    createdAt: string
  }
  experience: string | null
  goals: string | null
  injuries: string | null
  preferences: string | null
  availability: string | null
  additionalInfo: string | null
  submittedAt: string
}

export default function AdminDashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [registrations, setRegistrations] = useState<Registration[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [processingId, setProcessingId] = useState<string | null>(null)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin')
    } else if (status === 'authenticated' && session?.user?.role !== 'ADMIN') {
      router.push('/dashboard')
    } else if (status === 'authenticated' && session?.user?.role === 'ADMIN') {
      fetchRegistrations()
    }
  }, [status, session, router])

  const fetchRegistrations = async () => {
    try {
      const response = await fetch('/api/admin/registrations')
      if (response.ok) {
        const data = await response.json()
        setRegistrations(data)
      }
    } catch (error) {
      console.error('Error fetching registrations:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleApproval = async (userId: string, approved: boolean) => {
    setProcessingId(userId)
    try {
      const response = await fetch('/api/admin/approve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, approved }),
      })

      if (response.ok) {
        await fetchRegistrations()
      } else {
        alert('Failed to update registration status')
      }
    } catch (error) {
      console.error('Error updating registration:', error)
      alert('Failed to update registration status')
    } finally {
      setProcessingId(null)
    }
  }

  if (status === 'loading' || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary-600" />
      </div>
    )
  }

  if (!session || session.user.role !== 'ADMIN') {
    return null
  }

  const pendingRegistrations = registrations.filter(
    (reg) => reg.user && (reg.user as any).status === 'PENDING'
  )

  return (
    <>
      <PageHeader
        title="Admin Dashboard"
        description="Manage students, classes, payments, and content"
      />

      <Section>
        <div className="max-w-6xl mx-auto">
          <div className="mb-6">
            <h2 className="text-2xl font-light mb-2">
              Pending Registrations ({pendingRegistrations.length})
            </h2>
            <p className="text-[#1A1A1A]/70">
              Review student registrations and questionnaire responses
            </p>
          </div>

          {pendingRegistrations.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <CheckCircle className="w-12 h-12 text-primary-500 mx-auto mb-4" />
                <p className="text-[#1A1A1A]/70">No pending registrations</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              {pendingRegistrations.map((registration) => (
                <Card key={registration.id} className="overflow-hidden">
                  <CardHeader className="bg-primary-50/50">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 sm:gap-3 mb-2">
                          <User className="w-4 h-4 sm:w-5 sm:h-5 text-primary-700 flex-shrink-0" />
                          <CardTitle className="text-lg sm:text-xl truncate">
                            {registration.user.name || 'No name provided'}
                          </CardTitle>
                        </div>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 text-xs sm:text-sm text-[#1A1A1A]/70">
                          <div className="flex items-center gap-2 min-w-0">
                            <Mail className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                            <span className="truncate">{registration.user.email}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                            {new Date(registration.submittedAt).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2 w-full sm:w-auto">
                        <Button
                          size="sm"
                          onClick={() => handleApproval(registration.user.id, true)}
                          disabled={processingId === registration.user.id}
                          className="bg-green-600 hover:bg-green-700 flex-1 sm:flex-initial min-h-[40px] sm:min-h-[36px] text-xs sm:text-sm"
                        >
                          {processingId === registration.user.id ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <>
                              <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                              <span className="hidden sm:inline">Approve</span>
                              <span className="sm:hidden">OK</span>
                            </>
                          )}
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleApproval(registration.user.id, false)}
                          disabled={processingId === registration.user.id}
                          className="border-red-300 text-red-700 hover:bg-red-50 flex-1 sm:flex-initial min-h-[40px] sm:min-h-[36px] text-xs sm:text-sm"
                        >
                          {processingId === registration.user.id ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <>
                              <XCircle className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                              <span className="hidden sm:inline">Reject</span>
                              <span className="sm:hidden">No</span>
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      {registration.experience && (
                        <div>
                          <h4 className="font-medium text-[#1A1A1A] mb-2">Experience</h4>
                          <p className="text-sm text-[#1A1A1A]/70">{registration.experience}</p>
                        </div>
                      )}
                      {registration.preferences && (
                        <div>
                          <h4 className="font-medium text-[#1A1A1A] mb-2">Preferences</h4>
                          <p className="text-sm text-[#1A1A1A]/70">{registration.preferences}</p>
                        </div>
                      )}
                      {registration.goals && (
                        <div className="md:col-span-2">
                          <h4 className="font-medium text-[#1A1A1A] mb-2">Goals</h4>
                          <p className="text-sm text-[#1A1A1A]/70">{registration.goals}</p>
                        </div>
                      )}
                      {registration.injuries && (
                        <div className="md:col-span-2">
                          <h4 className="font-medium text-[#1A1A1A] mb-2">Injuries/Limitations</h4>
                          <p className="text-sm text-[#1A1A1A]/70">{registration.injuries}</p>
                        </div>
                      )}
                      {registration.availability && (
                        <div>
                          <h4 className="font-medium text-[#1A1A1A] mb-2">Availability</h4>
                          <p className="text-sm text-[#1A1A1A]/70">{registration.availability}</p>
                        </div>
                      )}
                      {registration.additionalInfo && (
                        <div className="md:col-span-2">
                          <h4 className="font-medium text-[#1A1A1A] mb-2">Additional Information</h4>
                          <p className="text-sm text-[#1A1A1A]/70">{registration.additionalInfo}</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Admin Quick Links */}
        <div className="mt-8 sm:mt-12">
          <h2 className="text-xl sm:text-2xl font-light mb-4 sm:mb-6">Admin Tools</h2>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="pt-6">
                <Link href="/admin/schedule" className="block text-center">
                  <Calendar className="w-8 h-8 text-primary-700 mx-auto mb-2" />
                  <h3 className="font-medium">Schedule</h3>
                  <p className="text-sm text-[#1A1A1A]/70">Manage classes</p>
                </Link>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="pt-6">
                <Link href="/admin/students" className="block text-center">
                  <User className="w-8 h-8 text-primary-700 mx-auto mb-2" />
                  <h3 className="font-medium">Students</h3>
                  <p className="text-sm text-[#1A1A1A]/70">View all students</p>
                </Link>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="pt-6">
                <Link href="/admin/payments" className="block text-center">
                  <DollarSign className="w-8 h-8 text-primary-700 mx-auto mb-2" />
                  <h3 className="font-medium">Payments</h3>
                  <p className="text-sm text-[#1A1A1A]/70">Send reminders</p>
                </Link>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="pt-6">
                <Link href="/admin/content" className="block text-center">
                  <FileText className="w-8 h-8 text-primary-700 mx-auto mb-2" />
                  <h3 className="font-medium">Content</h3>
                  <p className="text-sm text-[#1A1A1A]/70">Manage content</p>
                </Link>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="pt-6">
                <Link href="/admin/creative" className="block text-center">
                  <Image className="w-8 h-8 text-primary-700 mx-auto mb-2" aria-hidden="true" />
                  <h3 className="font-medium">Creative</h3>
                  <p className="text-sm text-[#1A1A1A]/70">Generate posters</p>
                </Link>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="pt-6">
                <Link href="/admin/ai" className="block text-center">
                  <Bot className="w-8 h-8 text-primary-700 mx-auto mb-2" />
                  <h3 className="font-medium">AI Assistant</h3>
                  <p className="text-sm text-[#1A1A1A]/70">Get help</p>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </Section>
    </>
  )
}