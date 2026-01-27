'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { PageHeader } from '@/components/PageHeader'
import { Section } from '@/components/Section'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Loader2, CheckCircle, Clock } from 'lucide-react'

export default function PendingApprovalPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin')
    } else if (status === 'authenticated' && session?.user?.status === 'APPROVED') {
      router.push('/dashboard')
    }
  }, [status, session, router])

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary-600" />
      </div>
    )
  }

  if (!session) {
    return null
  }

  return (
    <>
      <PageHeader
        title="Registration Pending"
        description="Your registration is being reviewed"
      />

      <Section>
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-primary-700" />
              </div>
              <CardTitle>Thank You for Registering!</CardTitle>
              <CardDescription>
                Your registration has been submitted and is awaiting approval.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-primary-50/50 rounded-lg p-6 space-y-4">
                <h3 className="font-medium text-[#1A1A1A]">What happens next?</h3>
                <ol className="space-y-3 text-sm text-[#1A1A1A]/80">
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-200 flex items-center justify-center text-xs font-medium text-primary-700">
                      1
                    </span>
                    <span>We review your registration and questionnaire</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-200 flex items-center justify-center text-xs font-medium text-primary-700">
                      2
                    </span>
                    <span>You&apos;ll receive an email notification once your account is approved</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-200 flex items-center justify-center text-xs font-medium text-primary-700">
                      3
                    </span>
                    <span>Once approved, you can access your student dashboard and book classes</span>
                  </li>
                </ol>
              </div>

              <div className="pt-4 border-t border-primary-200">
                <p className="text-sm text-[#1A1A1A]/70 text-center">
                  This usually takes 24-48 hours. We&apos;ll notify you as soon as your account is ready!
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </Section>
    </>
  )
}