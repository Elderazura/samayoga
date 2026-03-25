'use client'

import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Quote } from 'lucide-react'

const testimonials = [
  {
    id: 1,
    quote: "Samyuktha's classes have helped me find balance in my busy life. Her gentle approach makes yoga accessible and meaningful. I feel stronger, more centered, and at peace after each session.",
    author: "Priya S.",
    location: "Mumbai, India"
  },
  {
    id: 2,
    quote: "I appreciate how she adapts the practice to what I need each day. Sometimes it's movement, sometimes it's stillness—and both feel perfect. Her guidance is clear, kind, and always supportive.",
    author: "Rahul M.",
    location: "Delhi, India"
  },
  {
    id: 3,
    quote: "As someone new to yoga, I was nervous at first. But Samyuktha creates such a welcoming space. She explains everything clearly and offers modifications that make every pose accessible. I'm so grateful I found her classes.",
    author: "Anjali K.",
    location: "Bangalore, India"
  },
  {
    id: 4,
    quote: "The online format works beautifully. I can practice from home, and the connection feels just as personal as an in-person class. Samyuktha's attention to detail and care for each student shines through.",
    author: "Meera R.",
    location: "Chennai, India"
  },
  {
    id: 5,
    quote: "Yin yoga with Samyuktha has been transformative. I've learned to slow down, breathe deeply, and release tension I didn't even know I was holding. Her classes are a gift.",
    author: "Arjun P.",
    location: "Pune, India"
  },
  {
    id: 6,
    quote: "I've practiced with many teachers, but Samyuktha's approach is special. She honors where you are, encourages without pushing, and creates a space where you can truly be yourself. Highly recommended.",
    author: "Kavya N.",
    location: "Hyderabad, India"
  },
]

export function Testimonials() {
  return (
    <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-8 sm:mb-12">
        <h2 className="text-3xl sm:text-4xl font-light mb-3 sm:mb-4">
          What Students Say
        </h2>
        <p className="text-base sm:text-lg text-[#1A1A1A]/70 max-w-2xl mx-auto">
          Real experiences from our yoga community
        </p>
      </div>
      
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={testimonial.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <Card className="h-full hover:shadow-lg transition-shadow duration-300 flex flex-col">
              <CardContent className="pt-6 flex-1 flex flex-col">
                <Quote className="w-8 h-8 text-primary-400 mb-4" />
                <p className="text-[#1A1A1A]/80 leading-relaxed mb-4 flex-1 italic">
                  &quot;{testimonial.quote}&quot;
                </p>
                <div className="mt-auto pt-4 border-t border-primary-100">
                  <p className="text-sm font-medium text-[#1A1A1A]">
                    {testimonial.author}
                  </p>
                  <p className="text-xs text-[#1A1A1A]/60">
                    {testimonial.location}
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
