'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { PageHeader } from '@/components/PageHeader'
import { Section } from '@/components/Section'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Loader2, User, Mail, Calendar, DollarSign, Search } from 'lucide-react'
import { motion } from 'framer-motion'

interface Student {
  id: string
  name: string | null
  email: string
  status: string
  createdAt: string
  bookingsCount: number
  paymentsCount: number
}

export default function StudentsPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [students, setStudents] = useState<Student[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin')
    } else if (status === 'authenticated' && session?.user?.role !== 'ADMIN') {
      router.push('/dashboard')
    } else if (status === 'authenticated' && session?.user?.role === 'ADMIN') {
      fetchStudents()
    }
  }, [status, session, router])

  const fetchStudents = async () => {
    try {
      const response = await fetch('/api/admin/students')
      if (response.ok) {
        const data = await response.json()
        setStudents(data)
      }
    } catch (error) {
      console.error('Error fetching students:', error)
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

  if (!session || session.user.role !== 'ADMIN') {
    return null
  }

  const filteredStudents = students.filter(
    (student) =>
      student.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <>
      <PageHeader
        title="Student Management"
        description="View and manage all students"
      />

      <Section>
        <div className="max-w-6xl mx-auto">
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#1A1A1A]/40" />
              <input
                type="text"
                placeholder="Search students..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-primary-200 bg-white focus:outline-none focus:ring-2 focus:ring-primary-400"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStudents.map((student, index) => (
              <motion.div
                key={student.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
                        <User className="w-5 h-5 text-primary-700" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-lg">
                          {student.name || 'No name'}
                        </CardTitle>
                        <CardDescription className="flex items-center gap-1 mt-1">
                          <Mail className="w-3 h-3" />
                          {student.email}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-[#1A1A1A]/70">Status:</span>
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          student.status === 'APPROVED'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-amber-100 text-amber-700'
                        }`}
                      >
                        {student.status}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-[#1A1A1A]/70">Classes:</span>
                      <span className="font-medium">{student.bookingsCount}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-[#1A1A1A]/70">Payments:</span>
                      <span className="font-medium">{student.paymentsCount}</span>
                    </div>
                    <div className="pt-3 border-t border-primary-100">
                      <Button variant="outline" size="sm" className="w-full">
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {filteredStudents.length === 0 && (
            <Card>
              <CardContent className="py-12 text-center">
                <User className="w-12 h-12 text-primary-400 mx-auto mb-4" />
                <p className="text-[#1A1A1A]/70">No students found</p>
              </CardContent>
            </Card>
          )}
        </div>
      </Section>
    </>
  )
}