'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import type { AssessmentResult } from '@/lib/types'
import { personalityDescriptions, getReadableLabel, getPersonalityArchetype } from '@/lib/career-data'
import {
  Brain,
  Target,
  Sparkles,
  ArrowRight,
  RefreshCw,
  CheckCircle2,
} from 'lucide-react'

interface AssessmentResultsProps {
  result: AssessmentResult
  onRetake: () => void
}

const scoreLabels = {
  realistic: 'Realistic',
  investigative: 'Investigative',
  artistic: 'Artistic',
  social: 'Social',
  enterprising: 'Enterprising',
  conventional: 'Conventional',
}

const scoreColors = {
  realistic: 'bg-chart-1',
  investigative: 'bg-chart-2',
  artistic: 'bg-chart-3',
  social: 'bg-chart-4',
  enterprising: 'bg-chart-5',
  conventional: 'bg-primary',
}

export function AssessmentResults({ result, onRetake }: AssessmentResultsProps) {
  const [showDetailedScores, setShowDetailedScores] = useState(false)
  const maxScore = Math.max(...Object.values(result.scores))
  const archetype = getPersonalityArchetype(result.scores)

  // Sort scores to get top 3
  const sortedScores = Object.entries(result.scores)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3)

  return (
    <div className="space-y-6">
      {/* Success Header */}
      <div className="rounded-xl border border-primary/20 bg-primary/5 p-6 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/20">
          <CheckCircle2 className="h-8 w-8 text-primary" />
        </div>
        <h1 className="text-2xl font-bold text-foreground md:text-3xl">
          Assessment Complete!
        </h1>
        <p className="mx-auto mt-2 max-w-lg text-muted-foreground">
          Based on your responses, we have identified your personality type, interests, and strengths.
        </p>
      </div>

      {/* Personality Type */}
      <Card className="border-border bg-card">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <Brain className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle>Your Personality Type</CardTitle>
              <CardDescription>Based on the Holland Code (RIASEC) model</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg bg-muted/50 p-4">
            <Badge variant="secondary" className="mb-2 font-semibold">
              {archetype.name}
            </Badge>
            <Badge className="mb-3 bg-primary text-lg text-primary-foreground">
              {result.personalityType}
            </Badge>
            <p className="mb-2 text-sm text-muted-foreground">{archetype.summary}</p>
            <p className="text-muted-foreground">
              {result.personalityType.includes('-') 
                ? `You have a balanced profile with strengths in ${result.personalityType.split('-').join(', ')} traits. This versatile combination allows you to excel in various fields.`
                : personalityDescriptions[result.personalityType]
              }
            </p>
          </div>

          <div className="mt-6 space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium text-foreground">Your RIASEC Profile</h4>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setShowDetailedScores((prev) => !prev)}
              >
                {showDetailedScores ? 'Hide Details' : 'Show Details'}
              </Button>
            </div>
            {showDetailedScores && Object.entries(result.scores).map(([key, value]) => (
              <div key={key} className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-foreground">{scoreLabels[key as keyof typeof scoreLabels]}</span>
                  <span className="text-muted-foreground">{Math.round(value)} pts</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                  <div
                    className={`h-full rounded-full transition-all ${scoreColors[key as keyof typeof scoreColors]}`}
                    style={{ width: `${maxScore > 0 ? (value / maxScore) * 100 : 0}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Top Traits */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Top Personality Traits */}
        <Card className="border-border bg-card">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary/10">
                <Target className="h-5 w-5 text-secondary" />
              </div>
              <CardTitle>Top Traits</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {sortedScores.map(([key, value], index) => (
                <div
                  key={key}
                  className="flex items-center justify-between rounded-lg border border-border bg-background p-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-medium text-primary">
                      {index + 1}
                    </div>
                    <span className="font-medium text-foreground">
                      {scoreLabels[key as keyof typeof scoreLabels]}
                    </span>
                  </div>
                  <Badge variant="secondary">{value} pts</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Interests & Strengths */}
        <Card className="border-border bg-card">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent">
                <Sparkles className="h-5 w-5 text-accent-foreground" />
              </div>
              <CardTitle>Your Profile</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="mb-2 text-sm font-medium text-foreground">Interests</h4>
              <div className="flex flex-wrap gap-2">
                {result.interests.map((interest, index) => (
                  <Badge key={index} variant="secondary" className="font-normal">
                    {getReadableLabel(interest)}
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <h4 className="mb-2 text-sm font-medium text-foreground">Strengths</h4>
              <div className="flex flex-wrap gap-2">
                {result.strengths.map((strength, index) => (
                  <Badge key={index} variant="outline" className="font-normal">
                    {getReadableLabel(strength)}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Next Steps */}
      <Card className="border-primary/20 bg-primary/5">
        <CardContent className="flex flex-col items-start justify-between gap-4 p-6 sm:flex-row sm:items-center">
          <div>
            <h3 className="font-semibold text-foreground">Ready to See Your Course Matches?</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              View personalized institution and training recommendations based on your assessment results
            </p>
          </div>
          <Link href="/recommendations">
            <Button className="gap-2">
              View Recommendations
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </CardContent>
      </Card>

      {/* Retake Option */}
      <div className="text-center">
        <Button variant="ghost" onClick={onRetake} className="gap-2 text-muted-foreground">
          <RefreshCw className="h-4 w-4" />
          Retake Assessment
        </Button>
      </div>
    </div>
  )
}
