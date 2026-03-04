'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { useStudent } from '@/lib/student-context'
import { ClipboardList, Clock, Brain, Target, Sparkles, AlertCircle } from 'lucide-react'

interface AssessmentIntroProps {
  onStart: () => void
}

export function AssessmentIntro({ onStart }: AssessmentIntroProps) {
  const { student } = useStudent()

  return (
    <div className="space-y-8">
      <div className="text-center">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary">
          <ClipboardList className="h-4 w-4" />
          Career Assessment
        </div>
        <h1 className="text-3xl font-bold text-foreground md:text-4xl">
          Discover Your Ideal Career Path
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
          This assessment will help identify your personality type, interests, and strengths
          to match you with suitable university courses and career paths.
        </p>
      </div>

      {!student && (
        <Card className="border-secondary/30 bg-secondary/5">
          <CardContent className="flex items-start gap-4 p-6">
            <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-secondary" />
            <div>
              <h3 className="font-semibold text-foreground">Profile Required</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Please create your profile first to save your assessment results and get personalized recommendations.
              </p>
              <Link href="/profile">
                <Button className="mt-4" size="sm">
                  Create Profile
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-border bg-card">
          <CardContent className="p-6 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <Brain className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold text-foreground">Personality Type</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Discover your Holland Code personality type based on the RIASEC model
            </p>
          </CardContent>
        </Card>

        <Card className="border-border bg-card">
          <CardContent className="p-6 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-secondary/10">
              <Target className="h-6 w-6 text-secondary" />
            </div>
            <h3 className="font-semibold text-foreground">Interest Mapping</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Identify activities and subjects that motivate and engage you
            </p>
          </CardContent>
        </Card>

        <Card className="border-border bg-card">
          <CardContent className="p-6 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-accent">
              <Sparkles className="h-6 w-6 text-accent-foreground" />
            </div>
            <h3 className="font-semibold text-foreground">Strength Analysis</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Uncover your unique abilities and natural talents
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-border bg-card">
        <CardContent className="p-6">
          <h3 className="mb-4 text-lg font-semibold text-foreground">Before You Begin</h3>
          <ul className="space-y-3 text-muted-foreground">
            <li className="flex items-start gap-3">
              <Clock className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
              <span>The assessment takes approximately 5-10 minutes to complete</span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardList className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
              <span>There are 8 questions covering personality, interests, and strengths</span>
            </li>
            <li className="flex items-start gap-3">
              <Brain className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
              <span>Answer honestly based on your true preferences, not what you think is expected</span>
            </li>
            <li className="flex items-start gap-3">
              <Target className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
              <span>There are no right or wrong answers - each response reveals your unique profile</span>
            </li>
          </ul>
        </CardContent>
      </Card>

      <div className="text-center">
        <Button
          size="lg"
          className="px-8"
          onClick={onStart}
          disabled={!student}
        >
          Start Assessment
        </Button>
      </div>
    </div>
  )
}
