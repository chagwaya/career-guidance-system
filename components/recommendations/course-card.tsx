'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import type { CareerRecommendation } from '@/lib/types'
import { GraduationCap, Building2, Briefcase, ChevronRight, Trophy } from 'lucide-react'
import { cn } from '@/lib/utils'

interface CourseCardProps {
  course: CareerRecommendation
  rank: number
}

export function CourseCard({ course, rank }: CourseCardProps) {
  const [isOpen, setIsOpen] = useState(false)

  const getMatchColor = (score: number) => {
    if (score >= 40) return 'text-primary bg-primary/10'
    if (score >= 30) return 'text-secondary bg-secondary/10'
    return 'text-muted-foreground bg-muted'
  }

  const getRankBadge = (rank: number) => {
    if (rank === 1) return 'bg-yellow-500/20 text-yellow-700 border-yellow-500/30'
    if (rank === 2) return 'bg-gray-300/30 text-gray-700 border-gray-400/30'
    if (rank === 3) return 'bg-orange-400/20 text-orange-700 border-orange-400/30'
    return ''
  }

  return (
    <>
      <Card className="group relative border-border bg-card transition-shadow hover:shadow-lg">
        {rank <= 3 && (
          <div className="absolute -right-2 -top-2 z-10">
            <div className={cn('flex h-8 w-8 items-center justify-center rounded-full border', getRankBadge(rank))}>
              {rank === 1 ? (
                <Trophy className="h-4 w-4" />
              ) : (
                <span className="text-sm font-bold">{rank}</span>
              )}
            </div>
          </div>
        )}

        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-2">
            <Badge variant="outline" className="font-normal">
              {course.category}
            </Badge>
            <Badge className={cn('font-semibold', getMatchColor(course.matchScore))}>
              {course.matchScore}% Match
            </Badge>
          </div>
          <CardTitle className="mt-3 text-lg leading-tight text-foreground">
            {course.name}
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <p className="line-clamp-2 text-sm text-muted-foreground">{course.description}</p>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Building2 className="h-4 w-4 shrink-0" />
            <span className="truncate">{course.universities[0]}</span>
            {course.universities.length > 1 && (
              <span className="shrink-0 text-xs">+{course.universities.length - 1} more</span>
            )}
          </div>

          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="w-full gap-2 bg-transparent">
                View Details
                <ChevronRight className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
              <DialogHeader>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{course.category}</Badge>
                  <Badge className={cn('font-semibold', getMatchColor(course.matchScore))}>
                    {course.matchScore}% Match
                  </Badge>
                </div>
                <DialogTitle className="mt-2 text-xl">{course.name}</DialogTitle>
                <DialogDescription className="text-left">
                  {course.description}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6 pt-4">
                {/* Requirements */}
                <div>
                  <h4 className="mb-3 flex items-center gap-2 font-semibold text-foreground">
                    <GraduationCap className="h-5 w-5 text-primary" />
                    Entry Requirements
                  </h4>
                  <ul className="space-y-2">
                    {course.requirements.map((req, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-2 text-sm text-muted-foreground"
                      >
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Universities */}
                <div>
                  <h4 className="mb-3 flex items-center gap-2 font-semibold text-foreground">
                    <Building2 className="h-5 w-5 text-primary" />
                    Available at Universities
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {course.universities.map((uni) => (
                      <Badge key={uni} variant="secondary" className="font-normal">
                        {uni}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Career Paths */}
                <div>
                  <h4 className="mb-3 flex items-center gap-2 font-semibold text-foreground">
                    <Briefcase className="h-5 w-5 text-primary" />
                    Career Opportunities
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {course.careers.map((career) => (
                      <Badge key={career} variant="outline" className="font-normal">
                        {career}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>
    </>
  )
}
