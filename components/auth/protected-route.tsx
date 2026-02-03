"use client"

import React from "react"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth, type UserRole } from "@/lib/auth-context"
import { Loader2, ShieldAlert } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ProtectedRouteProps {
  children: React.ReactNode
  allowedRoles?: UserRole[]
  redirectTo?: string
}

export function ProtectedRoute({ 
  children, 
  allowedRoles = ["student", "admin", "counselor"],
  redirectTo = "/login"
}: ProtectedRouteProps) {
  const { user, isAuthenticated, isLoading, refreshSession } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push(redirectTo)
    }
  }, [isLoading, isAuthenticated, router, redirectTo])

  // Refresh session on user activity
  useEffect(() => {
    if (isAuthenticated) {
      const handleActivity = () => refreshSession()
      
      window.addEventListener("click", handleActivity)
      window.addEventListener("keydown", handleActivity)
      
      return () => {
        window.removeEventListener("click", handleActivity)
        window.removeEventListener("keydown", handleActivity)
      }
    }
  }, [isAuthenticated, refreshSession])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Verifying your session...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  // Check role-based access
  if (user && !allowedRoles.includes(user.role)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4 text-center max-w-md p-8">
          <div className="h-16 w-16 rounded-full bg-destructive/10 flex items-center justify-center">
            <ShieldAlert className="h-8 w-8 text-destructive" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">Access Denied</h1>
          <p className="text-muted-foreground">
            You do not have permission to access this page. This area is restricted to authorized personnel only.
          </p>
          <Button onClick={() => router.push("/")} className="mt-4">
            Return to Home
          </Button>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
