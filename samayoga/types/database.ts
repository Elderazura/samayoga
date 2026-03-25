// Database types - Supabase compatible

export type UserRole = 'STUDENT' | 'ADMIN'
export type UserStatus = 'PENDING' | 'APPROVED' | 'REJECTED'
export type ClassType = 'HATHA' | 'YIN' | 'BOTH'
export type ClassStatus = 'SCHEDULED' | 'ONGOING' | 'COMPLETED' | 'CANCELLED'
export type BookingStatus = 'CONFIRMED' | 'ATTENDED' | 'MISSED' | 'CANCELLED'
export type PaymentStatus = 'PENDING' | 'PAID' | 'FAILED' | 'REFUNDED'
export type ContentType = 'BLOG_POST' | 'RESOURCE' | 'ANNOUNCEMENT' | 'PRACTICE_GUIDE'

// Base types
export interface User {
  id: string
  name: string | null
  email: string
  emailVerified: string | null
  image: string | null
  password: string | null
  role: UserRole
  status: UserStatus
  createdAt: string
  updatedAt: string
}

export interface Registration {
  id: string
  userId: string
  experience: string | null
  goals: string | null
  injuries: string | null
  preferences: string | null
  availability: string | null
  additionalInfo: string | null
  submittedAt: string
  reviewedAt: string | null
  reviewedBy: string | null
}

export interface Class {
  id: string
  title: string
  description: string | null
  type: ClassType
  instructor: string
  date: string
  duration: number
  meetLink: string | null
  maxStudents: number
  status: ClassStatus
  createdAt: string
  updatedAt: string
}

export interface Booking {
  id: string
  userId: string
  classId: string
  status: BookingStatus
  reminderSent: boolean
  createdAt: string
  updatedAt: string
}

export interface Payment {
  id: string
  userId: string
  amount: number
  currency: string
  status: PaymentStatus
  method: string | null
  transactionId: string | null
  description: string | null
  dueDate: string | null
  paidAt: string | null
  createdAt: string
  updatedAt: string
}

export interface Progress {
  id: string
  userId: string
  metric: string
  value: number
  notes: string | null
  recordedAt: string
  createdAt: string
}

export interface Content {
  id: string
  type: ContentType
  title: string
  content: string
  published: boolean
  publishedAt: string | null
  createdBy: string | null
  createdAt: string
  updatedAt: string
}

export interface AIMemory {
  id: string
  key: string
  value: string
  context: string | null
  createdAt: string
  updatedAt: string
}

// Media types
export interface MediaVideo {
  id: string
  title: string
  description?: string
  src: string
  thumbnail?: string
}

export interface MediaImage {
  id: string
  src: string
  alt: string
  caption?: string
}

// Extended types with relations
export interface UserWithRelations extends User {
  registration?: Registration
  bookings?: Booking[]
  payments?: Payment[]
  progress?: Progress[]
}

export interface ClassWithBookings extends Class {
  bookings?: Booking[]
  bookingsCount?: number
}

export interface PaymentWithUser extends Payment {
  user?: {
    name: string | null
    email: string
  }
}

// Form data types
export interface QuestionnaireData {
  userId?: string
  height?: string
  weight?: string
  phone?: string
  yogaExperience?: string
  healthIssues?: string
  classType?: string
  preferredTimeSlot?: string
  experience?: string
  goals?: string
  injuries?: string
  preferences?: string
  availability?: string
}
