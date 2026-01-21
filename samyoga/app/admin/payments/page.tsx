'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { PageHeader } from '@/components/PageHeader'
import { Section } from '@/components/Section'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Loader2, DollarSign, Send, CheckCircle, Clock } from 'lucide-react'

interface Payment {
  id: string
  user: {
    name: string | null
    email: string
  }
  amount: number
  status: string
  description: string | null
  dueDate: string | null
  createdAt: string
}

export default function PaymentsPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [payments, setPayments] = useState<Payment[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin')
    } else if (status === 'authenticated' && session?.user?.role !== 'ADMIN') {
      router.push('/dashboard')
    } else if (status === 'authenticated' && session?.user?.role === 'ADMIN') {
      fetchPayments()
    }
  }, [status, session, router])

  const fetchPayments = async () => {
    try {
      const response = await fetch('/api/admin/payments')
      if (response.ok) {
        const data = await response.json()
        setPayments(data)
      }
    } catch (error) {
      console.error('Error fetching payments:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSendReminder = async (paymentId: string) => {
    try {
      const response = await fetch('/api/admin/payments/remind', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ paymentId }),
      })

      if (response.ok) {
        alert('Reminder sent successfully')
      } else {
        alert('Failed to send reminder')
      }
    } catch (error) {
      console.error('Error sending reminder:', error)
      alert('Failed to send reminder')
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

  const pendingPayments = payments.filter((p) => p.status === 'PENDING')

  return (
    <>
      <PageHeader
        title="Payment Management"
        description="View payments and send reminders"
      />

      <Section>
        <div className="max-w-6xl mx-auto">
          <div className="mb-6">
            <h2 className="text-2xl font-light mb-2">
              Pending Payments ({pendingPayments.length})
            </h2>
            <p className="text-[#1A1A1A]/70">
              Send payment reminders to students with outstanding payments
            </p>
          </div>

          <div className="space-y-4">
            {pendingPayments.map((payment) => (
              <Card key={payment.id} className="border-amber-200">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-medium text-[#1A1A1A] mb-2">
                        {payment.user.name || payment.user.email}
                      </h3>
                      <div className="space-y-1 text-sm text-[#1A1A1A]/70">
                        <p>
                          Amount: ${payment.amount.toFixed(2)} - {payment.description}
                        </p>
                        {payment.dueDate && (
                          <p>
                            Due: {new Date(payment.dueDate).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                    </div>
                    <Button
                      size="sm"
                      onClick={() => handleSendReminder(payment.id)}
                      variant="outline"
                    >
                      <Send className="w-4 h-4 mr-2" />
                      Send Reminder
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {pendingPayments.length === 0 && (
            <Card>
              <CardContent className="py-12 text-center">
                <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                <p className="text-[#1A1A1A]/70">No pending payments</p>
              </CardContent>
            </Card>
          )}
        </div>
      </Section>
    </>
  )
}