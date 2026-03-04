import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { AssessmentQuiz } from '@/components/assessment/assessment-quiz'
import type { AssessmentQuestion } from '@/lib/types'

const sampleQuestions: AssessmentQuestion[] = [
  {
    id: 1,
    question: 'I enjoy working with tools.',
    category: 'personality',
    options: [
      { text: 'Strongly Agree', value: 'strongly_agree', scores: { realistic: 5 } },
      { text: 'Agree', value: 'agree', scores: { realistic: 4 } },
      { text: 'Neutral', value: 'neutral', scores: { realistic: 3 } },
    ],
  },
  {
    id: 2,
    question: 'Pick subjects you enjoy.',
    category: 'interest',
    multipleAnswers: true,
    options: [
      { text: 'Math', value: 'math_stats' },
      { text: 'Biology', value: 'bio_health' },
      { text: 'Art', value: 'creative_arts' },
    ],
  },
]

describe('AssessmentQuiz', () => {
  const onAnswer = vi.fn()
  const onSubmit = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders the first question', () => {
    render(
      <AssessmentQuiz
        questions={sampleQuestions}
        answers={{}}
        onAnswer={onAnswer}
        onSubmit={onSubmit}
      />
    )

    expect(screen.getByText('I enjoy working with tools.')).toBeInTheDocument()
    expect(screen.getByText('Question 1 of 2')).toBeInTheDocument()
  })

  it('shows Personality badge for personality category', () => {
    render(
      <AssessmentQuiz
        questions={sampleQuestions}
        answers={{}}
        onAnswer={onAnswer}
        onSubmit={onSubmit}
      />
    )

    expect(screen.getByText('Personality')).toBeInTheDocument()
  })

  it('calls onAnswer when a radio option is clicked', () => {
    render(
      <AssessmentQuiz
        questions={sampleQuestions}
        answers={{}}
        onAnswer={onAnswer}
        onSubmit={onSubmit}
      />
    )

    fireEvent.click(screen.getByText('Strongly Agree'))
    expect(onAnswer).toHaveBeenCalledWith(1, ['strongly_agree'])
  })

  it('navigates to next question when Next is clicked', () => {
    render(
      <AssessmentQuiz
        questions={sampleQuestions}
        answers={{ 1: ['agree'] }}
        onAnswer={onAnswer}
        onSubmit={onSubmit}
      />
    )

    fireEvent.click(screen.getByText('Next'))
    expect(screen.getByText('Pick subjects you enjoy.')).toBeInTheDocument()
  })

  it('shows Submit button on last question', () => {
    render(
      <AssessmentQuiz
        questions={sampleQuestions}
        answers={{ 1: ['agree'], 2: ['math_stats'] }}
        onAnswer={onAnswer}
        onSubmit={onSubmit}
      />
    )

    // Navigate to last question
    fireEvent.click(screen.getByText('Next'))
    expect(screen.getByText('Submit Assessment')).toBeInTheDocument()
  })

  it('disables Submit when not all questions answered', () => {
    render(
      <AssessmentQuiz
        questions={sampleQuestions}
        answers={{ 1: ['agree'] }} // only 1 of 2 answered
        onAnswer={onAnswer}
        onSubmit={onSubmit}
      />
    )

    // Navigate to last question
    fireEvent.click(screen.getByText('Next'))
    const submitBtn = screen.getByText('Submit Assessment').closest('button')
    expect(submitBtn).toBeDisabled()
  })

  it('calls onSubmit when all answers provided and Submit clicked', () => {
    render(
      <AssessmentQuiz
        questions={sampleQuestions}
        answers={{ 1: ['agree'], 2: ['math_stats'] }}
        onAnswer={onAnswer}
        onSubmit={onSubmit}
      />
    )

    fireEvent.click(screen.getByText('Next'))
    fireEvent.click(screen.getByText('Submit Assessment'))
    expect(onSubmit).toHaveBeenCalled()
  })

  it('shows progress percentage', () => {
    render(
      <AssessmentQuiz
        questions={sampleQuestions}
        answers={{ 1: ['agree'] }}
        onAnswer={onAnswer}
        onSubmit={onSubmit}
      />
    )

    expect(screen.getByText('50% Complete')).toBeInTheDocument()
  })
})
