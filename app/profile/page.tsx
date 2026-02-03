'use client'

import { useState } from 'react'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/landing/footer'
import { ProfileForm } from '@/components/profile/profile-form'
import { ProfileView } from '@/components/profile/profile-view'
import { useStudent } from '@/lib/student-context'
import { ProtectedRoute } from '@/components/auth/protected-route'
import { useAuth } from '@/lib/auth-context'
import { Shield } from 'lucide-react'

function ProfileContent() {
  const { student } = useStudent()
  const { user } = useAuth()
  const [isEditing, setIsEditing] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="px-4 py-12">
        <div className="mx-auto max-w-3xl">
          {/* Security Notice */}
          <div className="mb-6 flex items-start gap-3 rounded-lg border border-primary/20 bg-primary/5 p-4">
            <Shield className="h-5 w-5 text-primary mt-0.5" />
            <div className="text-sm">
              <p className="font-medium text-foreground">Your Data is Protected</p>
              <p className="text-muted-foreground">
                Logged in as {user?.email}. Your profile information is securely stored and only accessible to you and authorized administrators.
              </p>
            </div>
          </div>

          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground">Student Profile</h1>
            <p className="mt-2 text-muted-foreground">
              {student
                ? 'View and manage your profile information'
                : 'Create your profile to get personalized career guidance'}
            </p>
          </div>

          {!student || isEditing ? (
            <ProfileForm 
              existingStudent={student} 
              onComplete={() => setIsEditing(false)} 
            />
          ) : (
            <ProfileView onEdit={() => setIsEditing(true)} />
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default function ProfilePage() {
  return (
    <ProtectedRoute allowedRoles={['student', 'admin']} redirectTo="/login">
      <ProfileContent />
    </ProtectedRoute>
  )
}
