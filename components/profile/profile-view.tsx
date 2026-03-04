'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useStudent } from '@/lib/student-context'
import {
  User,
  Mail,
  School,
  MapPin,
  GraduationCap,
  Pencil,
  ArrowRight,
  CheckCircle2,
  Clock,
} from 'lucide-react'

interface ProfileViewProps {
  onEdit: () => void
}

export function ProfileView({ onEdit }: ProfileViewProps) {
  const { student, assessmentResult } = useStudent()

  if (!student) return null

  return (
    <div className="space-y-6">
      {/* Status Banner */}
      <div className="rounded-xl border border-border bg-card p-4">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-xl font-bold text-primary">
              {student.name.charAt(0)}
            </div>
            <div>
              <h2 className="font-semibold text-foreground">{student.name}</h2>
              <p className="text-sm text-muted-foreground">{student.school}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {assessmentResult ? (
              <Badge className="gap-1 bg-primary/10 text-primary hover:bg-primary/20">
                <CheckCircle2 className="h-3 w-3" />
                Assessment Completed
              </Badge>
            ) : (
              <Badge variant="secondary" className="gap-1">
                <Clock className="h-3 w-3" />
                Assessment Pending
              </Badge>
            )}
          </div>
        </div>
      </div>

      {/* Profile Details */}
      <Card className="border-border bg-card">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>Your profile details</CardDescription>
          </div>
          <Button variant="outline" size="sm" onClick={onEdit} className="gap-2 bg-transparent">
            <Pencil className="h-4 w-4" />
            Edit
          </Button>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex items-center gap-3 rounded-lg bg-muted/50 p-3">
              <User className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Full Name</p>
                <p className="font-medium text-foreground">{student.name}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-lg bg-muted/50 p-3">
              <Mail className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Email</p>
                <p className="font-medium text-foreground">{student.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-lg bg-muted/50 p-3">
              <School className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">School</p>
                <p className="font-medium text-foreground">{student.school}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-lg bg-muted/50 p-3">
              <GraduationCap className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Class</p>
                <p className="font-medium text-foreground">{student.grade}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-lg bg-muted/50 p-3 sm:col-span-2">
              <MapPin className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">County</p>
                <p className="font-medium text-foreground">{student.county}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Academic Performance */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle>Academic Performance</CardTitle>
          <CardDescription>
            {student.isKCSEGraduate 
              ? 'Your KCSE subjects and grades' 
              : 'Your subjects and grades'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {student.subjects && student.subjects.length > 0 ? (
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {student.subjects.map((subject, index) => (
              <div
                key={index}
                className="flex items-center justify-between rounded-lg border border-border bg-background p-3"
              >
                <span className="text-sm text-foreground">{subject.subject}</span>
                <Badge
                  variant={
                    subject.grade.startsWith('A')
                      ? 'default'
                      : subject.grade.startsWith('B')
                        ? 'secondary'
                        : 'outline'
                  }
                  className={
                    subject.grade.startsWith('A')
                      ? 'bg-primary/90'
                      : ''
                  }
                >
                  {subject.grade}
                </Badge>
              </div>
            ))}
            </div>
          ) : (
            <div className="rounded-lg border border-dashed border-border p-6 text-center">
              <p className="text-sm text-muted-foreground">
                No subjects added yet. Click Edit to add your subjects and grades.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Next Steps */}
      <Card className="border-primary/20 bg-primary/5">
        <CardContent className="flex flex-col items-start justify-between gap-4 p-6 sm:flex-row sm:items-center">
          <div>
            <h3 className="font-semibold text-foreground">
              {assessmentResult ? 'View Your Recommendations' : 'Complete Your Assessment'}
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              {assessmentResult
                ? 'See university courses matched to your profile and interests'
                : 'Take the career assessment to get personalized course recommendations'}
            </p>
          </div>
          <Link href={assessmentResult ? '/recommendations' : '/assessment'}>
            <Button className="gap-2">
              {assessmentResult ? 'View Recommendations' : 'Start Assessment'}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}
