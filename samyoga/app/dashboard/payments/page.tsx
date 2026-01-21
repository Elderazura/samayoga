'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { PageHeader } from '@/components/PageHeader'
import { Section } from '@/components/Section'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Loader2, DollarSign, CheckCircle, Clock, XCircle } from 'lucide-react'
import { motion } from 'framer-motion'

interface Payment {
  id: string
  amount: number
  currency: string
  status: string
  description: string | null
  dueDate: string | null
  paidAt: string | null
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
    } else if (status === 'authenticated' && session?.user?.status !== 'APPROVED') {
      router.push('/register/pending')
    } else if (status === 'authenticated' && session?.user?.role === 'ADMIN') {
      router.push('/admin')
    } else if (status === 'authenticated') {
      fetchPayments()
    }
  }, [status, session, router])

  const fetchPayments = async () => {
    try {
      const response = await fetch('/api/dashboard/payments')
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

  const pendingPayments = payments.filter((p) => p.status === 'PENDING')
  const paidPayments = payments.filter((p) => p.status === 'PAID')

  const totalPending = pendingPayments.reduce((sum, p) => sum + p.amount, 0)
  const totalPaid = paidPayments.reduce((sum, p) => sum + p.amount, 0)

  return (
    <>
      <PageHeader
        title="Payments"
        description="View your payment history and manage outstanding payments"
      />

      <Section>
        <div className="max-w-6xl mx-auto">
          {/* Summary Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Clock className="w-5 h-5 text-amber-600" />
                  Pending
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-light">${totalPending.toFixed(2)}</p>
                <p className="text-sm text-[#1A1A1A]/70">{pendingPayments.length} payment(s)</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  Paid
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-light">${totalPaid.toFixed(2)}</p>
                <p className="text-sm text-[#1A1A1A]/70">{paidPayments.length} payment(s)</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-primary-600" />
                  Total
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-light">
                  ${(totalPending + totalPaid).toFixed(2)}
                </p>
                <p className="text-sm text-[#1A1A1A]/70">All time</p>
              </CardContent>
            </Card>
          </div>

          {/* Pending Payments */}
          {pendingPayments.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-light mb-6">Pending Payments</h2>
              <div className="space-y-4">
                {pendingPayments.map((payment, index) => (
                  <motion.div
                    key={payment.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="border-amber-200">
                      <CardContent className="pt-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="font-medium text-[#1A1A1A] mb-2">
                              {payment.description || 'Payment'}
                            </h3>
                            <div className="flex items-center gap-4 text-sm text-[#1A1A1A]/70">
                              <span>
                                Amount: ${payment.amount.toFixed(2)} {payment.currency}
                              </span>
                              {payment.dueDate && (
                                <span>
                                  Due: {new Date(payment.dueDate).toLocaleDateString()}
                                </span>
                              )}
                            </div>
                          </div>
                          <Button size="sm">Pay Now</Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Payment History */}
          {paidPayments.length > 0 && (
            <div>
              <h2 className="text-2xl font-light mb-6">Payment History</h2>
              <div className="space-y-4">
                {paidPayments.map((payment) => (
                  <Card key={payment.id} className="opacity-75">
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-medium text-[#1A1A1A] mb-2">
                            {payment.description || 'Payment'}
                          </h3>
                          <div className="flex items-center gap-4 text-sm text-[#1A1A1A]/70">
                            <span>
                              ${payment.amount.toFixed(2)} {payment.currency}
                            </span>
                            {payment.paidAt && (
                              <span>
                                Paid: {new Date(payment.paidAt).toLocaleDateString()}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-green-700">
                          <CheckCircle className="w-4 h-4" />
                          <span className="text-sm">Paid</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {payments.length === 0 && (
            <Card>
              <CardContent className="py-12 text-center">
                <DollarSign className="w-12 h-12 text-primary-400 mx-auto mb-4" />
                <p className="text-[#1A1A1A]/70">No payments found</p>
              </CardContent>
            </Card>
          )}
        </div>
      </Section>
    </>
  )
}