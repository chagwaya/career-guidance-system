'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/landing/footer'
import { ProfileForm } from '@/components/profile/profile-form'
import { ProfileView } from '@/components/profile/profile-view'
import { useStudent } from '@/lib/student-context'

export default function ProfilePage() {
  const router = useRouter()
  const { student, setStudent } = useStudent()
  const [isEditing, setIsEditing] = useState(false)
  const [isChecking, setIsChecking] = useState(true)

  useEffect(() => {
    const checkAuthAndFetchStudent = async () => {
      const session = localStorage.getItem('student_session')
      if (!session) {
        router.push('/student-login')
        return
      }

      try {
        const sessionData = JSON.parse(session)
        // Fetch full student data from API using email
        const response = await fetch(`/api/students?email=${encodeURIComponent(sessionData.email)}`)
        if (response.ok) {
          const studentData = await response.json()
          setStudent(studentData)
        }
      } catch (error) {
        console.error('Error fetching student:', error)
      } finally {
        setIsChecking(false)
      }
    }

    checkAuthAndFetchStudent()
  }, [])

  if (isChecking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    )
  }

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
