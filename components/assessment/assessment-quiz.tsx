'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import type { AssessmentQuestion } from '@/lib/types'
import { ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface AssessmentQuizProps {
  questions: AssessmentQuestion[]
  answers: Record<number, string[]>
  importance: Record<number, 1 | 2 | 3>
  onAnswer: (questionId: number, values: string[]) => void
  onImportanceChange: (questionId: number, importance: 1 | 2 | 3) => void
  onSubmit: () => void
}

export function AssessmentQuiz({
  questions,
  answers,
  importance,
  onAnswer,
  onImportanceChange,
  onSubmit,
}: AssessmentQuizProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [customAnswers, setCustomAnswers] = useState<Record<number, string>>({})
  const currentQuestion = questions[currentIndex]
  const currentImportance = importance[currentQuestion.id] ?? 2
  const progress = ((Object.keys(answers).length) / questions.length) * 100
  const isLastQuestion = currentIndex === questions.length - 1
  const allAnswered = Object.keys(answers).length === questions.length
  const customAnswerCount = (answers[currentQuestion.id] || []).filter(
    (ans) => !currentQuestion.options.find((opt) => opt.value === ans)
  ).length

  const handleToggleAnswer = (value: string) => {
    const currentAnswers = answers[currentQuestion.id] || []
    
    // If multipleAnswers is false or undefined, allow only single selection
    if (!currentQuestion.multipleAnswers) {
      onAnswer(currentQuestion.id, [value])
    } else {
      // Allow multiple selections
      const newAnswers = currentAnswers.includes(value)
        ? currentAnswers.filter((v) => v !== value)
        : [...currentAnswers, value]
      onAnswer(currentQuestion.id, newAnswers)
    }
  }

  const handleCustomAnswerChange = (value: string) => {
    setCustomAnswers({ ...customAnswers, [currentQuestion.id]: value })
  }

  const handleAddCustomAnswer = () => {
    const customValue = customAnswers[currentQuestion.id]?.trim()
    if (customValue) {
      const currentAnswers = answers[currentQuestion.id] || []
      if (!currentAnswers.includes(customValue)) {
        onAnswer(currentQuestion.id, [...currentAnswers, customValue])
      }
      setCustomAnswers({ ...customAnswers, [currentQuestion.id]: '' })
    }
  }

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
            {customAnswerCount > 0 && (
              <Badge variant="secondary" className="font-normal">
                {customAnswerCount} custom answer{customAnswerCount > 1 ? 's' : ''}
              </Badge>
            )}
          </div>
          <CardTitle className="mt-4 text-xl leading-relaxed text-foreground">
            {currentQuestion.question}
          </CardTitle>
          <p className="mt-2 text-sm text-muted-foreground">
            {currentQuestion.multipleAnswers 
              ? 'Select all that apply or add your own answer'
              : 'Choose one option that best describes you'}
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            {currentQuestion.options.map((option) => {
              const isChecked = (answers[currentQuestion.id] || []).includes(option.value)
              const isSingleAnswer = !currentQuestion.multipleAnswers
              
              return (
                <div key={option.value}>
                  <Label
                    htmlFor={`option-${option.value}`}
                    className={cn(
                      'flex cursor-pointer items-center gap-3 rounded-lg border p-4 transition-colors',
                      isChecked
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:bg-muted/50'
                    )}
                  >
                    {isSingleAnswer ? (
                      <input
                        type="radio"
                        id={`option-${option.value}`}
                        name={`question-${currentQuestion.id}`}
                        checked={isChecked}
                        onChange={() => handleToggleAnswer(option.value)}
                        className="h-4 w-4 shrink-0"
                      />
                    ) : (
                      <Checkbox
                        id={`option-${option.value}`}
                        checked={isChecked}
                        onCheckedChange={() => handleToggleAnswer(option.value)}
                        className="shrink-0"
                      />
                    )}
                    <span className="text-foreground">{option.text}</span>
                  </Label>
                </div>
              )
            })}
          </div>

          <div className="space-y-2 border-t border-border pt-4">
            <Label className="text-sm font-medium">How important is this question to you?</Label>
            <div className="flex gap-2">
              <Button
                type="button"
                size="sm"
                variant={currentImportance === 1 ? 'default' : 'outline'}
                onClick={() => onImportanceChange(currentQuestion.id, 1)}
              >
                Low
              </Button>
              <Button
                type="button"
                size="sm"
                variant={currentImportance === 2 ? 'default' : 'outline'}
                onClick={() => onImportanceChange(currentQuestion.id, 2)}
              >
                Medium
              </Button>
              <Button
                type="button"
                size="sm"
                variant={currentImportance === 3 ? 'default' : 'outline'}
                onClick={() => onImportanceChange(currentQuestion.id, 3)}
              >
                High
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Higher importance gives this response more influence in your personality and recommendation scoring.
            </p>
          </div>

          {/* Custom Answer Section */}
          <div className="space-y-2 border-t border-border pt-4">
            <Label htmlFor="custom-answer" className="text-sm font-medium">
              Or add your own answer:
            </Label>
            <div className="flex gap-2">
              <Input
                id="custom-answer"
                value={customAnswers[currentQuestion.id] || ''}
                onChange={(e) => handleCustomAnswerChange(e.target.value)}
                placeholder="Type your answer here..."
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    handleAddCustomAnswer()
                  }
                }}
              />
              <Button
                type="button"
                variant="outline"
                onClick={handleAddCustomAnswer}
                disabled={!customAnswers[currentQuestion.id]?.trim()}
              >
                Add
              </Button>
            </div>
          </div>

          {/* Display Custom Answers */}
          {(answers[currentQuestion.id] || []).filter(
            (ans) => !currentQuestion.options.find((opt) => opt.value === ans)
          ).length > 0 && (
            <div className="space-y-2">
              <Label className="text-sm font-medium">Your custom answers:</Label>
              <div className="flex flex-wrap gap-2">
                {(answers[currentQuestion.id] || [])
                  .filter((ans) => !currentQuestion.options.find((opt) => opt.value === ans))
                  .map((customAns, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="cursor-pointer hover:bg-destructive hover:text-destructive-foreground"
                      onClick={() => {
                        const newAnswers = (answers[currentQuestion.id] || []).filter(
                          (v) => v !== customAns
                        )
                        onAnswer(currentQuestion.id, newAnswers)
                      }}
                    >
                      {customAns} ×
                    </Badge>
                  ))}
              </div>
            </div>
          )}
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
