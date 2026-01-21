import 'next-auth'
import 'next-auth/jwt'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      email: string
      name?: string | null
      image?: string | null
      role: 'STUDENT' | 'ADMIN'
      status: 'PENDING' | 'APPROVED' | 'REJECTED'
    }
  }

  interface User {
    role: 'STUDENT' | 'ADMIN'
    status: 'PENDING' | 'APPROVED' | 'REJECTED'
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    role: 'STUDENT' | 'ADMIN'
    status: 'PENDING' | 'APPROVED' | 'REJECTED'
  }
}