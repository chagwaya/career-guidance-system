'use client'

import { useState, type FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useStudent } from '@/lib/student-context'
import { counties, kcseSubjects, grades } from '@/lib/career-data'
import type { Student, SubjectGrade } from '@/lib/types'
import { Plus, Trash2, Save, ArrowRight } from 'lucide-react'

interface ProfileFormProps {
  existingStudent: Student | null
  onComplete: () => void
}

export function ProfileForm({ existingStudent, onComplete }: ProfileFormProps) {
  const router = useRouter()
  const { setStudent } = useStudent()

  const [formData, setFormData] = useState({
    name: existingStudent?.name || '',
    email: existingStudent?.email || '',
    school: existingStudent?.school || '',
    grade: existingStudent?.grade || '',
    county: existingStudent?.county || '',
    isKCSEGraduate: existingStudent?.isKCSEGraduate ?? false,
  })

  const [subjects, setSubjects] = useState<SubjectGrade[]>(
    existingStudent?.subjects || [
      { subject: 'Mathematics', grade: '' },
      { subject: 'English', grade: '' },
      { subject: 'Kiswahili', grade: '' },
    ]
  )

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitError, setSubmitError] = useState<string | null>(null)

  const addSubject = () => {
    if (subjects.length < 8) {
      setSubjects([...subjects, { subject: '', grade: '' }])
    }
  }

  const removeSubject = (index: number) => {
    if (subjects.length > 3) {
      setSubjects(subjects.filter((_, i) => i !== index))
    }
  }

  const updateSubject = (index: number, field: keyof SubjectGrade, value: string) => {
    const newSubjects = [...subjects]
    newSubjects[index] = { ...newSubjects[index], [field]: value }
    setSubjects(newSubjects)
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) newErrors.name = 'Name is required'
    if (!formData.email.trim()) newErrors.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email'
    }
    if (!formData.school.trim()) newErrors.school = 'School name is required'
    if (!formData.grade) newErrors.grade = 'Please select your class'
    if (!formData.county) newErrors.county = 'Please select your county'

    // Validate subjects based on KCSE graduate status
    if (formData.isKCSEGraduate) {
      // KCSE graduates must provide 7-8 subjects with grades
      const validSubjects = subjects.filter((s) => s.subject && s.grade)
      if (validSubjects.length < 7) {
        newErrors.subjects = 'KCSE graduates must provide at least 7 subjects with grades'
      }
    } else {
      // Current students must provide at least 3 subjects (grades optional)
      const validSubjects = subjects.filter((s) => s.subject.trim())
      if (validSubjects.length < 3) {
        newErrors.subjects = 'Please enter at least 3 subjects'
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const saveStudent = async (student: Student) => {
    const response = await fetch('/api/students', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(student),
    })

    if (!response.ok) {
      const data = await response.json().catch(() => ({}))
      throw new Error(data?.error || 'Failed to save profile')
    }

    return (await response.json()) as Student
  }

  const submitForm = async (onSuccess: (saved: Student) => void) => {
    if (!validateForm()) return

    setSubmitError(null)

    const filteredSubjects = subjects.filter((s) => s.subject.trim())

    const student: Student = {
      id: existingStudent?.id || crypto.randomUUID(),
      name: formData.name,
      email: formData.email,
      school: formData.school,
      grade: formData.grade,
      county: formData.county,
      subjects: filteredSubjects,
      isKCSEGraduate: formData.isKCSEGraduate,
      createdAt: existingStudent?.createdAt || new Date().toISOString(),
    }

    try {
      const savedStudent = await saveStudent(student)
      setStudent(savedStudent)
      onSuccess(savedStudent)
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Failed to save profile')
    }
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    await submitForm(() => onComplete())
  }

  const handleSubmitAndContinue = async (e: FormEvent) => {
    e.preventDefault()
    await submitForm(() => router.push('/assessment'))
  }

  const availableSubjects = kcseSubjects.filter(
    (sub) => !subjects.some((s) => s.subject === sub)
  )

  return (
    <form onSubmit={handleSubmit}>
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>Enter your basic details to create your profile</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="isKCSEGraduate"
                checked={formData.isKCSEGraduate}
                onChange={(e) => setFormData({ ...formData, isKCSEGraduate: e.target.checked })}
                className="h-4 w-4"
              />
              <Label htmlFor="isKCSEGraduate" className="cursor-pointer">
                I am a KCSE graduate
              </Label>
            </div>
            {formData.isKCSEGraduate && (
              <p className="text-sm text-muted-foreground">
                As a KCSE graduate, you must provide at least 7 subjects with grades.
              </p>
            )}
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
              {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="your.email@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                disabled={!!existingStudent?.email}
                className={existingStudent?.email ? "bg-muted cursor-not-allowed" : ""}
              />
              {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
              {existingStudent?.email && <p className="text-xs text-muted-foreground">Email cannot be changed</p>}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="school">School Name</Label>
            <Input
              id="school"
              placeholder="Enter your school name"
              value={formData.school}
              onChange={(e) => setFormData({ ...formData, school: e.target.value })}
            />
            {errors.school && <p className="text-sm text-destructive">{errors.school}</p>}
          </div>

          {submitError && (
            <p className="text-sm text-destructive">{submitError}</p>
          )}

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Current Class</Label>
              <Select
                value={formData.grade}
                onValueChange={(value) => setFormData({ ...formData, grade: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select your class" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Form 1">Form 1</SelectItem>
                  <SelectItem value="Form 2">Form 2</SelectItem>
                  <SelectItem value="Form 3">Form 3</SelectItem>
                  <SelectItem value="Form 4">Form 4</SelectItem>
                  <SelectItem value="KCSE Graduate">KCSE Graduate</SelectItem>
                </SelectContent>
              </Select>
              {errors.grade && <p className="text-sm text-destructive">{errors.grade}</p>}
            </div>

            <div className="space-y-2">
              <Label>County</Label>
              <Select
                value={formData.county}
                onValueChange={(value) => setFormData({ ...formData, county: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select your county" />
                </SelectTrigger>
                <SelectContent>
                  {counties.map((county) => (
                    <SelectItem key={county} value={county}>
                      {county}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.county && <p className="text-sm text-destructive">{errors.county}</p>}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mt-6 border-border bg-card">
        <CardHeader>
          <CardTitle>Academic Performance</CardTitle>
          <CardDescription>
            {formData.isKCSEGraduate 
              ? 'Enter at least 7 KCSE subjects with your grades' 
              : 'Enter your subjects (grades optional for current students)'}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {subjects.map((subject, index) => (
            <div key={index} className="flex items-start gap-3">
              <div className="flex-1">
                <Select
                  value={subject.subject}
                  onValueChange={(value) => updateSubject(index, 'subject', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select subject" />
                  </SelectTrigger>
                  <SelectContent>
                    {subject.subject && (
                      <SelectItem value={subject.subject}>{subject.subject}</SelectItem>
                    )}
                    {availableSubjects.map((sub) => (
                      <SelectItem key={sub} value={sub}>
                        {sub}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="w-28">
                <Select
                  value={subject.grade}
                  onValueChange={(value) => updateSubject(index, 'grade', value)}
                  disabled={!formData.isKCSEGraduate && !subject.grade}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={formData.isKCSEGraduate ? "Grade*" : "Grade"} />
                  </SelectTrigger>
                  <SelectContent>
                    {grades.map((grade) => (
                      <SelectItem key={grade} value={grade}>
                        {grade}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {subjects.length > 3 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeSubject(index)}
                  className="text-muted-foreground hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}

          {errors.subjects && <p className="text-sm text-destructive">{errors.subjects}</p>}

          {subjects.length < 8 && (
            <Button type="button" variant="outline" onClick={addSubject} className="gap-2 bg-transparent">
              <Plus className="h-4 w-4" />
              Add Subject
            </Button>
          )}
        </CardContent>
      </Card>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
        <Button type="submit" variant="outline" className="gap-2 bg-transparent">
          <Save className="h-4 w-4" />
          Save Profile
        </Button>
        <Button type="button" onClick={handleSubmitAndContinue} className="gap-2">
          Save & Start Assessment
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </form>
  )
}
