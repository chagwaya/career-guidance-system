'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/landing/footer'
import { useStudent } from '@/lib/student-context'
import { calculateRecommendations } from '@/lib/career-data'
import { CourseCard } from '@/components/recommendations/course-card'
import { CourseFilters } from '@/components/recommendations/course-filters'
import { ProtectedRoute } from '@/components/auth/protected-route'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { AlertCircle, ArrowRight, GraduationCap } from 'lucide-react'

function RecommendationsContent() {
  const { student, assessmentResult } = useStudent()
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [sortBy, setSortBy] = useState<'match' | 'name'>('match')

  const recommendations = useMemo(() => {
    if (!assessmentResult) return []
    return calculateRecommendations(assessmentResult.scores)
  }, [assessmentResult])

  const filteredRecommendations = useMemo(() => {
    let filtered = [...recommendations]

    if (selectedCategory !== 'all') {
      filtered = filtered.filter((r) => r.category === selectedCategory)
    }

    if (sortBy === 'name') {
      filtered.sort((a, b) => a.name.localeCompare(b.name))
    }

    return filtered
  }, [recommendations, selectedCategory, sortBy])

  const categories = useMemo(() => {
    const cats = new Set(recommendations.map((r) => r.category))
    return ['all', ...Array.from(cats)]
  }, [recommendations])

  // Show different states based on profile/assessment completion
  if (!student) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="px-4 py-12">
          <div className="mx-auto max-w-3xl">
            <Card className="border-border bg-card">
              <CardContent className="flex flex-col items-center p-12 text-center">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                  <AlertCircle className="h-8 w-8 text-muted-foreground" />
                </div>
                <h1 className="text-2xl font-bold text-foreground">Profile Required</h1>
                <p className="mx-auto mt-2 max-w-md text-muted-foreground">
                  Please create your profile first to see personalized course recommendations.
                </p>
                <Link href="/profile">
                  <Button className="mt-6 gap-2">
                    Create Profile
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (!assessmentResult) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="px-4 py-12">
          <div className="mx-auto max-w-3xl">
            <Card className="border-border bg-card">
              <CardContent className="flex flex-col items-center p-12 text-center">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <GraduationCap className="h-8 w-8 text-primary" />
                </div>
                <h1 className="text-2xl font-bold text-foreground">Complete Assessment First</h1>
                <p className="mx-auto mt-2 max-w-md text-muted-foreground">
                  Take the career assessment to discover university courses that match your
                  personality, interests, and strengths.
                </p>
                <Link href="/assessment">
                  <Button className="mt-6 gap-2">
                    Start Assessment
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="px-4 py-12">
        <div className="mx-auto max-w-6xl">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground">Your Course Recommendations</h1>
            <p className="mt-2 text-muted-foreground">
              Based on your {assessmentResult.personalityType} personality type and assessment results
            </p>
          </div>

          {/* Filters */}
          <CourseFilters
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            sortBy={sortBy}
            onSortChange={setSortBy}
            resultCount={filteredRecommendations.length}
          />

          {/* Results Grid */}
          <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredRecommendations.map((course, index) => (
              <CourseCard key={course.id} course={course} rank={index + 1} />
            ))}
          </div>

          {filteredRecommendations.length === 0 && (
            <Card className="border-border bg-card">
              <CardContent className="p-12 text-center">
                <p className="text-muted-foreground">No courses found in this category.</p>
              </CardContent>
            </Card>
          )}

          {/* CTA */}
          <Card className="mt-8 border-primary/20 bg-primary/5">
            <CardContent className="flex flex-col items-start justify-between gap-4 p-6 sm:flex-row sm:items-center">
              <div>
                <h3 className="font-semibold text-foreground">Need More Guidance?</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Connect with a career counselor to discuss your options and get personalized advice
                </p>
              </div>
              <Link href="/counselor">
                <Button className="gap-2">
                  Talk to Counselor
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default function RecommendationsPage() {
  return (
    <ProtectedRoute allowedRoles={['student', 'admin']} redirectTo="/login">
      <RecommendationsContent />
    </ProtectedRoute>
  )
}
