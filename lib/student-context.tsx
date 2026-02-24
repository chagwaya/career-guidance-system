'use client'

import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import type { Student, AssessmentResult, CounselorMessage } from './types'

interface StudentContextType {
  student: Student | null
  setStudent: (student: Student | null) => void
  assessmentResult: AssessmentResult | null
  setAssessmentResult: (result: AssessmentResult | null) => void
  messages: CounselorMessage[]
  addMessage: (message: Omit<CounselorMessage, 'id' | 'timestamp'>) => Promise<CounselorMessage | null>
  clearData: () => void
}

const StudentContext = createContext<StudentContextType | undefined>(undefined)

export function StudentProvider({ children }: { children: ReactNode }) {
  const [student, setStudentState] = useState<Student | null>(null)
  const [assessmentResult, setAssessmentResultState] = useState<AssessmentResult | null>(null)
  const [messages, setMessages] = useState<CounselorMessage[]>([])
  const [isHydrated, setIsHydrated] = useState(false)

  // Hydrate from backend on mount using stored student session
  useEffect(() => {
    const loadData = async () => {
      const sessionStr = localStorage.getItem('student_session')
      
      if (!sessionStr) {
        // Clear all data if no session
        setStudentState(null)
        setAssessmentResultState(null)
        setMessages([])
        setIsHydrated(true)
        return
      }

      try {
        const session = JSON.parse(sessionStr)
        const params = new URLSearchParams()
        if (session.id) {
          params.set('id', session.id)
        } else if (session.email) {
          params.set('email', session.email)
        }

        const studentResponse = await fetch(`/api/students?${params.toString()}`)
        if (!studentResponse.ok) {
          // Clear data if student not found
          setStudentState(null)
          setAssessmentResultState(null)
          setMessages([])
          localStorage.removeItem('student_session')
          setIsHydrated(true)
          return
        }

        const studentData: Student = await studentResponse.json()
        setStudentState(studentData)
        localStorage.setItem('student_session', JSON.stringify(studentData))

        const [assessmentResponse, messagesResponse] = await Promise.all([
          fetch(`/api/assessments?studentId=${studentData.id}`),
          fetch(`/api/messages?studentId=${studentData.id}`),
        ])

        if (assessmentResponse.ok) {
          const assessmentData: AssessmentResult = await assessmentResponse.json()
          setAssessmentResultState(assessmentData)
        } else {
          // Clear assessment if not found for this student
          setAssessmentResultState(null)
        }

        if (messagesResponse.ok) {
          const messagesData: CounselorMessage[] = await messagesResponse.json()
          setMessages(messagesData)
        } else {
          // Clear messages if not found for this student
          setMessages([])
        }
      } catch (error) {
        // Clear data on error
        setStudentState(null)
        setAssessmentResultState(null)
        setMessages([])
      } finally {
        setIsHydrated(true)
      }
    }

    loadData()
  }, [])

  const setStudent = (newStudent: Student | null) => {
    setStudentState(newStudent)
    if (newStudent) {
      localStorage.setItem('student_session', JSON.stringify(newStudent))
    } else {
      localStorage.removeItem('student_session')
    }
  }

  const setAssessmentResult = (result: AssessmentResult | null) => {
    setAssessmentResultState(result)
  }

  const addMessage = async (message: Omit<CounselorMessage, 'id' | 'timestamp'>) => {
    try {
      const response = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(message),
      })

      if (!response.ok) {
        return null
      }

      const saved: CounselorMessage = await response.json()
      setMessages((prev) => [...prev, saved])
      return saved
    } catch (error) {
      return null
    }
  }

  const clearData = () => {
    setStudentState(null)
    setAssessmentResultState(null)
    setMessages([])
    localStorage.removeItem('student_session')
  }

  // Prevent hydration mismatch by not rendering until hydrated
  if (!isHydrated) {
    return null
  }

  return (
    <StudentContext.Provider
      value={{
        student,
        setStudent,
        assessmentResult,
        setAssessmentResult,
        messages,
        addMessage,
        clearData,
      }}
    >
      {children}
    </StudentContext.Provider>
  )
}

export function useStudent() {
  const context = useContext(StudentContext)
  if (context === undefined) {
    throw new Error('useStudent must be used within a StudentProvider')
  }
  return context
}
