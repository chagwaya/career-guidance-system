'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/landing/footer'
import { AssessmentIntro } from '@/components/assessment/assessment-intro'
import { AssessmentQuiz } from '@/components/assessment/assessment-quiz'
import { AssessmentResults } from '@/components/assessment/assessment-results'
import { useStudent } from '@/lib/student-context'
import { assessmentQuestions, getPersonalityType } from '@/lib/career-data'
import type { AssessmentResult } from '@/lib/types'

type Stage = 'intro' | 'quiz' | 'results'

export default function AssessmentPage() {
  const router = useRouter()
  const { student, assessmentResult, setAssessmentResult } = useStudent()
  const [stage, setStage] = useState<Stage>(assessmentResult ? 'results' : 'intro')
  const [answers, setAnswers] = useState<Record<number, string>>({})

  const handleStartAssessment = () => {
    if (!student) {
      router.push('/profile')
      return
    }
    setStage('quiz')
  }

  const handleAnswer = (questionId: number, value: string) => {
    setAnswers({ ...answers, [questionId]: value })
  }

  const handleSubmitAssessment = () => {
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
      const answer = answers[question.id]
      if (answer) {
        const option = question.options.find((o) => o.value === answer)
        if (option?.scores) {
          Object.entries(option.scores).forEach(([key, value]) => {
            scores[key as keyof typeof scores] += value
          })
        }
      }
    })

    // Determine interests and strengths based on answers
    const interests: string[] = []
    const strengths: string[] = []

    assessmentQuestions.forEach((question) => {
      const answer = answers[question.id]
      if (answer) {
        const option = question.options.find((o) => o.value === answer)
        if (option) {
          if (question.category === 'interest') {
            interests.push(option.text)
          } else if (question.category === 'strength') {
            strengths.push(option.text)
          }
        }
      }
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

    setAssessmentResult(result)
    setStage('results')
  }

  const handleRetakeAssessment = () => {
    setAnswers({})
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
              onAnswer={handleAnswer}
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
