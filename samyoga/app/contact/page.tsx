'use client'

import { useState, FormEvent } from 'react'
import { PageHeader } from '@/components/PageHeader'
import { Section } from '@/components/Section'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Mail, Phone } from 'lucide-react'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission (no backend yet)
    // In a real app, this would send to an API
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Show success message
    setShowSuccess(true)
    setFormData({ name: '', email: '', message: '' })
    setIsSubmitting(false)

    // Hide success message after 5 seconds
    setTimeout(() => setShowSuccess(false), 5000)

    // Fallback: create mailto link
    const mailtoLink = `mailto:info@samayoga.com?subject=Contact from ${formData.name}&body=${encodeURIComponent(formData.message)}`
    window.open(mailtoLink, '_blank')
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <>
      <PageHeader
        title="Contact"
        description="Get in touch to join a class, request a private session, or ask questions."
      />

      <Section>
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6 sm:gap-8">
          {/* Contact Form */}
          <Card>
            <CardHeader>
              <CardTitle>Send a Message</CardTitle>
              <CardDescription>
                Fill out the form below and we'll get back to you soon.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {showSuccess && (
                <div className="mb-6 p-4 bg-primary-50 rounded-lg border border-primary-200">
                  <p className="text-sm text-primary-800">
                    Thank you for your message! We'll be in touch soon. 
                    A mailto window should have opened as a fallback.
                  </p>
                </div>
              )}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-[#1A1A1A] mb-2"
                  >
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3.5 rounded-lg border border-primary-200 bg-white focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent transition-colors text-base"
                    placeholder="Your name"
                    aria-required="true"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-[#1A1A1A] mb-2"
                  >
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3.5 rounded-lg border border-primary-200 bg-white focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent transition-colors text-base"
                    placeholder="your.email@example.com"
                    aria-required="true"
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-[#1A1A1A] mb-2"
                  >
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    className="w-full px-4 py-3.5 rounded-lg border border-primary-200 bg-white focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent transition-colors resize-none text-base"
                    placeholder="Tell us how we can help..."
                    aria-required="true"
                  />
                </div>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full min-h-[48px] text-base"
                  size="lg"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Info */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Get in Touch</CardTitle>
                <CardDescription>
                  We're here to help with questions about classes, private sessions, 
                  or anything else.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-4">
                  <Mail className="w-5 h-5 text-primary-700 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-[#1A1A1A] mb-1">Email</p>
                    <a
                      href="mailto:info@samayoga.com"
                      className="text-sm text-primary-700 hover:text-primary-800 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2 rounded-md px-1"
                    >
                      info@samayoga.com
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Class Types</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm text-[#1A1A1A]/80">
                  <strong>Hatha Yoga:</strong> Active practice for strength and flexibility
                </p>
                <p className="text-sm text-[#1A1A1A]/80">
                  <strong>Yin Yoga:</strong> Passive practice for deep release and restoration
                </p>
                <p className="text-sm text-[#1A1A1A]/80 mt-4">
                  Classes are conducted online via Google Meet.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>What Happens Next?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-[#1A1A1A]/80">
                <p>1. Send us a message</p>
                <p>2. We'll respond within 24-48 hours</p>
                <p>3. We'll schedule your session</p>
                <p>4. You'll receive a Google Meet link</p>
                <p>5. Join us for practice!</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </Section>
    </>
  )
}