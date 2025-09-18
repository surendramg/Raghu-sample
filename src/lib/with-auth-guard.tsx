import { Suspense } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from './auth-context'

export const withAuthGuard = (Page: React.ComponentType) => {
  return function AuthGuardedPage() {
    const { user, loading } = useAuth()

    if (loading) {
      return (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      )
    }

    if (!user) {
      return <Navigate to="/auth/login" replace />
    }

    return (
      <Suspense
        fallback={
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        }
      >
        <Page />
      </Suspense>
    )
  }
}