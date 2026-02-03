'use client'

import { useState } from 'react'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/landing/footer'
import { ProfileForm } from '@/components/profile/profile-form'
import { ProfileView } from '@/components/profile/profile-view'
import { useStudent } from '@/lib/student-context'

export default function ProfilePage() {
  const { student } = useStudent()
  const [isEditing, setIsEditing] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="px-4 py-12">
        <div className="mx-auto max-w-3xl">
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
