'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import type { AssessmentQuestion } from '@/lib/types'
import { ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface AssessmentQuizProps {
  questions: AssessmentQuestion[]
  answers: Record<number, string>
  onAnswer: (questionId: number, value: string) => void
  onSubmit: () => void
}

export function AssessmentQuiz({
  questions,
  answers,
  onAnswer,
  onSubmit,
}: AssessmentQuizProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const currentQuestion = questions[currentIndex]
  const progress = ((Object.keys(answers).length) / questions.length) * 100
  const isLastQuestion = currentIndex === questions.length - 1
  const allAnswered = Object.keys(answers).length === questions.length

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'personality':
        return 'Personality'
      case 'interest':
        return 'Interests'
      case 'strength':
        return 'Strengths'
      default:
        return category
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'personality':
        return 'bg-primary/10 text-primary'
      case 'interest':
        return 'bg-secondary/20 text-secondary'
      case 'strength':
        return 'bg-accent text-accent-foreground'
      default:
        return 'bg-muted text-muted-foreground'
    }
  }

  return (
    <div className="space-y-6">
      {/* Progress Header */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">
            Question {currentIndex + 1} of {questions.length}
          </span>
          <span className="font-medium text-foreground">
            {Math.round(progress)}% Complete
          </span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Question Navigation Pills */}
      <div className="flex flex-wrap gap-2">
        {questions.map((q, index) => (
          <button
            key={q.id}
            onClick={() => setCurrentIndex(index)}
            className={cn(
              'flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium transition-colors',
              currentIndex === index
                ? 'bg-primary text-primary-foreground'
                : answers[q.id]
                  ? 'bg-primary/20 text-primary'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
            )}
          >
            {answers[q.id] ? <CheckCircle2 className="h-4 w-4" /> : index + 1}
          </button>
        ))}
      </div>

      {/* Question Card */}
      <Card className="border-border bg-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <Badge className={cn('font-normal', getCategoryColor(currentQuestion.category))}>
              {getCategoryLabel(currentQuestion.category)}
            </Badge>
          </div>
          <CardTitle className="mt-4 text-xl leading-relaxed text-foreground">
            {currentQuestion.question}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={answers[currentQuestion.id] || ''}
            onValueChange={(value) => onAnswer(currentQuestion.id, value)}
            className="space-y-3"
          >
            {currentQuestion.options.map((option) => (
              <div key={option.value}>
                <Label
                  htmlFor={`option-${option.value}`}
                  className={cn(
                    'flex cursor-pointer items-center gap-3 rounded-lg border p-4 transition-colors',
                    answers[currentQuestion.id] === option.value
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:bg-muted/50'
                  )}
                >
                  <RadioGroupItem
                    value={option.value}
                    id={`option-${option.value}`}
                    className="shrink-0"
                  />
                  <span className="text-foreground">{option.text}</span>
                </Label>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
      </Card>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={() => setCurrentIndex(currentIndex - 1)}
          disabled={currentIndex === 0}
          className="gap-2"
        >
          <ChevronLeft className="h-4 w-4" />
          Previous
        </Button>

        {isLastQuestion ? (
          <Button
            onClick={onSubmit}
            disabled={!allAnswered}
            className="gap-2"
          >
            Submit Assessment
            <CheckCircle2 className="h-4 w-4" />
          </Button>
        ) : (
          <Button
            onClick={() => setCurrentIndex(currentIndex + 1)}
            className="gap-2"
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        )}
      </div>

      {!allAnswered && isLastQuestion && (
        <p className="text-center text-sm text-muted-foreground">
          Please answer all questions to submit the assessment
        </p>
      )}
    </div>
  )
}
