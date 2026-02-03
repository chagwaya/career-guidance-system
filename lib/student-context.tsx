'use client'

import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import type { Student, AssessmentResult, CounselorMessage } from './types'

interface StudentContextType {
  student: Student | null
  setStudent: (student: Student | null) => void
  assessmentResult: AssessmentResult | null
  setAssessmentResult: (result: AssessmentResult | null) => void
  messages: CounselorMessage[]
  addMessage: (message: Omit<CounselorMessage, 'id' | 'timestamp'>) => void
  clearData: () => void
}

const StudentContext = createContext<StudentContextType | undefined>(undefined)

export function StudentProvider({ children }: { children: ReactNode }) {
  const [student, setStudentState] = useState<Student | null>(null)
  const [assessmentResult, setAssessmentResultState] = useState<AssessmentResult | null>(null)
  const [messages, setMessages] = useState<CounselorMessage[]>([])
  const [isHydrated, setIsHydrated] = useState(false)

  // Hydrate from localStorage on mount
  useEffect(() => {
    const savedStudent = localStorage.getItem('careerpath_student')
    const savedAssessment = localStorage.getItem('careerpath_assessment')
    const savedMessages = localStorage.getItem('careerpath_messages')

    if (savedStudent) {
      setStudentState(JSON.parse(savedStudent))
    }
    if (savedAssessment) {
      setAssessmentResultState(JSON.parse(savedAssessment))
    }
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages))
    }
    setIsHydrated(true)
  }, [])

  const setStudent = (newStudent: Student | null) => {
    setStudentState(newStudent)
    if (newStudent) {
      localStorage.setItem('careerpath_student', JSON.stringify(newStudent))
    } else {
      localStorage.removeItem('careerpath_student')
    }
  }

  const setAssessmentResult = (result: AssessmentResult | null) => {
    setAssessmentResultState(result)
    if (result) {
      localStorage.setItem('careerpath_assessment', JSON.stringify(result))
    } else {
      localStorage.removeItem('careerpath_assessment')
    }
  }

  const addMessage = (message: Omit<CounselorMessage, 'id' | 'timestamp'>) => {
    const newMessage: CounselorMessage = {
      ...message,
      id: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
    }
    const updatedMessages = [...messages, newMessage]
    setMessages(updatedMessages)
    localStorage.setItem('careerpath_messages', JSON.stringify(updatedMessages))
  }

  const clearData = () => {
    setStudentState(null)
    setAssessmentResultState(null)
    setMessages([])
    localStorage.removeItem('careerpath_student')
    localStorage.removeItem('careerpath_assessment')
    localStorage.removeItem('careerpath_messages')
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
