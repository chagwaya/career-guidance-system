'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/landing/footer'
import { AssessmentIntro } from '@/components/assessment/assessment-intro'
import { AssessmentQuiz } from '@/components/assessment/assessment-quiz'
import { AssessmentResults } from '@/components/assessment/assessment-results'
import { useStudent } from '@/lib/student-context'
import { assessmentQuestions, getPersonalityType, inferCustomAnswerScores } from '@/lib/career-data'
import type { AssessmentResult } from '@/lib/types'

type Stage = 'intro' | 'quiz' | 'results'

export default function AssessmentPage() {
  const router = useRouter()
  const { student, assessmentResult, setAssessmentResult } = useStudent()
  const [stage, setStage] = useState<Stage>(assessmentResult ? 'results' : 'intro')
  const [answers, setAnswers] = useState<Record<number, string[]>>({})
  const [questionImportance, setQuestionImportance] = useState<Record<number, 1 | 2 | 3>>({})
  const [isChecking, setIsChecking] = useState(true)

  useEffect(() => {
    const session = localStorage.getItem('student_session')
    if (!session) {
      router.push('/student-login')
    } else {
      setIsChecking(false)
    }
  }, [])

  if (isChecking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    )
  }

  const handleStartAssessment = () => {
    if (!student) {
      router.push('/profile')
      return
    }
    setStage('quiz')
  }

  const handleAnswer = (questionId: number, values: string[]) => {
    setAnswers({ ...answers, [questionId]: values })
  }

  const handleImportanceChange = (questionId: number, importance: 1 | 2 | 3) => {
    setQuestionImportance({ ...questionImportance, [questionId]: importance })
  }

  const handleSubmitAssessment = async () => {
    // Calculate scores from answers
    const scores = {
      realistic: 0,
      investigative: 0,
      artistic: 0,
      social: 0,
      enterprising: 0,
      conventional: 0,
    }

    assessmentQuestions.forEach((question) => {
      const answerValues = answers[question.id] || []
      const importanceFactor = questionImportance[question.id] ?? 2

      answerValues.forEach((answer) => {
        const option = question.options.find((o) => o.value === answer)
        if (option?.scores) {
          Object.entries(option.scores).forEach(([key, value]) => {
            scores[key as keyof typeof scores] += value * importanceFactor
          })
        } else {
          const inferred = inferCustomAnswerScores(answer, question.category)
          const customBoost = importanceFactor * 1.25
          Object.entries(inferred).forEach(([key, value]) => {
            scores[key as keyof typeof scores] += (value || 0) * customBoost
          })
        }
      })
    })

    // Determine interests and strengths based on answers
    const interests: string[] = []
    const strengths: string[] = []

    assessmentQuestions.forEach((question) => {
      const answerValues = answers[question.id] || []
      answerValues.forEach((answer) => {
        const option = question.options.find((o) => o.value === answer)
        if (option) {
          if (question.category === 'interest') {
            interests.push(option.text)
          } else if (question.category === 'strength') {
            strengths.push(option.text)
          }
        } else {
          // Custom answer
          if (question.category === 'interest') {
            interests.push(answer)
          } else if (question.category === 'strength') {
            strengths.push(answer)
          }
        }
      })
    })

    const result: AssessmentResult = {
      id: crypto.randomUUID(),
      studentId: student?.id || '',
      personalityType: getPersonalityType(scores) as AssessmentResult['personalityType'],
      interests,
      strengths,
      completedAt: new Date().toISOString(),
      scores,
    }

    try {
      if (student?.id) {
        const response = await fetch('/api/assessments', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            studentId: student.id,
            personalityType: result.personalityType,
            interests: result.interests,
            strengths: result.strengths,
            scores: result.scores,
          }),
        })

        if (response.ok) {
          const saved: AssessmentResult = await response.json()
          setAssessmentResult(saved)
          setStage('results')
          return
        }
      }
    } catch (error) {
      // Fall back to local result
    }

    setAssessmentResult(result)
    setStage('results')
  }

  const handleRetakeAssessment = () => {
    setAnswers({})
    setQuestionImportance({})
    setAssessmentResult(null)
    setStage('intro')
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="px-4 py-12">
        <div className="mx-auto max-w-4xl">
          {stage === 'intro' && <AssessmentIntro onStart={handleStartAssessment} />}

          {stage === 'quiz' && (
            <AssessmentQuiz
              questions={assessmentQuestions}
              answers={answers}
              importance={questionImportance}
              onAnswer={handleAnswer}
              onImportanceChange={handleImportanceChange}
              onSubmit={handleSubmitAssessment}
            />
          )}

          {stage === 'results' && assessmentResult && (
            <AssessmentResults result={assessmentResult} onRetake={handleRetakeAssessment} />
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
