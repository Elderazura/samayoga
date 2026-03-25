/**
 * Centralized error handling utilities
 * Prepares for Supabase migration
 */

export class AppError extends Error {
  constructor(
    message: string,
    public statusCode: number = 500,
    public code?: string
  ) {
    super(message)
    this.name = 'AppError'
    Error.captureStackTrace(this, this.constructor)
  }
}

export class ValidationError extends AppError {
  constructor(message: string) {
    super(message, 400, 'VALIDATION_ERROR')
    this.name = 'ValidationError'
  }
}

export class UnauthorizedError extends AppError {
  constructor(message: string = 'Unauthorized') {
    super(message, 401, 'UNAUTHORIZED')
    this.name = 'UnauthorizedError'
  }
}

export class NotFoundError extends AppError {
  constructor(message: string = 'Resource not found') {
    super(message, 404, 'NOT_FOUND')
    this.name = 'NotFoundError'
  }
}

/**
 * Safe error logging - only logs in development
 */
export function logError(error: unknown, context?: string): void {
  if (process.env.NODE_ENV === 'development') {
    const message = error instanceof Error ? error.message : 'Unknown error'
    const stack = error instanceof Error ? error.stack : undefined
    
    console.error(`[${context || 'Error'}]`, {
      message,
      stack,
      error
    })
  }
  // In production, you might want to send to error tracking service
}

/**
 * Format error for API response
 */
export function formatErrorResponse(error: unknown): { error: string; message?: string } {
  if (error instanceof AppError) {
    return {
      error: error.code || 'ERROR',
      message: error.message
    }
  }
  
  if (error instanceof Error) {
    return {
      error: 'INTERNAL_ERROR',
      message: process.env.NODE_ENV === 'development' ? error.message : 'An error occurred'
    }
  }
  
  return {
    error: 'UNKNOWN_ERROR',
    message: 'An unexpected error occurred'
  }
}
