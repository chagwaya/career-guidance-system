'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  GraduationCap,
  Users,
  ClipboardList,
  MessageCircle,
  TrendingUp,
  BarChart3,
  Search,
  Filter,
  Download,
  ArrowLeft,
  Eye,
} from 'lucide-react'
import { cn } from '@/lib/utils'

// Demo data for admin dashboard
const demoStudents = [
  {
    id: '1',
    name: 'Jane Wanjiku',
    school: 'Kenya High School',
    county: 'Nairobi',
    grade: 'Form 4',
    assessmentCompleted: true,
    personalityType: 'Investigative',
    topRecommendation: 'Computer Science',
    registeredAt: '2024-01-15',
  },
  {
    id: '2',
    name: 'David Ochieng',
    school: 'Maranda High School',
    county: 'Kisumu',
    grade: 'Form 4',
    assessmentCompleted: true,
    personalityType: 'Social',
    topRecommendation: 'Medicine',
    registeredAt: '2024-01-18',
  },
  {
    id: '3',
    name: 'Faith Muthoni',
    school: 'Loreto High School',
    county: 'Kiambu',
    grade: 'Form 3',
    assessmentCompleted: false,
    personalityType: null,
    topRecommendation: null,
    registeredAt: '2024-01-20',
  },
  {
    id: '4',
    name: 'Brian Kipchoge',
    school: 'Moi Forces Academy',
    county: 'Nakuru',
    grade: 'Form 4',
    assessmentCompleted: true,
    personalityType: 'Enterprising',
    topRecommendation: 'Law',
    registeredAt: '2024-01-22',
  },
  {
    id: '5',
    name: 'Grace Achieng',
    school: 'Pangani Girls',
    county: 'Nairobi',
    grade: 'Form 4',
    assessmentCompleted: true,
    personalityType: 'Artistic',
    topRecommendation: 'Architecture',
    registeredAt: '2024-01-25',
  },
]

const stats = [
  {
    title: 'Total Students',
    value: '1,247',
    change: '+12%',
    icon: Users,
    color: 'bg-primary/10 text-primary',
  },
  {
    title: 'Assessments Completed',
    value: '892',
    change: '+8%',
    icon: ClipboardList,
    color: 'bg-secondary/10 text-secondary',
  },
  {
    title: 'Counselor Sessions',
    value: '456',
    change: '+15%',
    icon: MessageCircle,
    color: 'bg-chart-3/20 text-chart-3',
  },
  {
    title: 'Schools Reached',
    value: '48',
    change: '+5%',
    icon: GraduationCap,
    color: 'bg-chart-4/20 text-chart-4',
  },
]

const topCourses = [
  { name: 'Computer Science', count: 234, percentage: 26 },
  { name: 'Medicine', count: 189, percentage: 21 },
  { name: 'Engineering', count: 156, percentage: 17 },
  { name: 'Law', count: 134, percentage: 15 },
  { name: 'Business', count: 98, percentage: 11 },
]

const personalityDistribution = [
  { type: 'Investigative', count: 312, color: 'bg-primary' },
  { type: 'Social', count: 245, color: 'bg-secondary' },
  { type: 'Enterprising', count: 198, color: 'bg-chart-3' },
  { type: 'Artistic', count: 156, color: 'bg-chart-4' },
  { type: 'Realistic', count: 134, color: 'bg-chart-5' },
  { type: 'Conventional', count: 102, color: 'bg-muted-foreground' },
]

export default function AdminPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  const filteredStudents = demoStudents.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.school.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus =
      statusFilter === 'all' ||
      (statusFilter === 'completed' && student.assessmentCompleted) ||
      (statusFilter === 'pending' && !student.assessmentCompleted)
    return matchesSearch && matchesStatus
  })

  const totalPersonality = personalityDistribution.reduce((acc, p) => acc + p.count, 0)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
                <GraduationCap className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <span className="font-semibold text-foreground">CareerPath Kenya</span>
                <Badge variant="secondary" className="ml-2">
                  Admin
                </Badge>
              </div>
            </div>
          </div>
          <Button variant="outline" className="gap-2 bg-transparent">
            <Download className="h-4 w-4" />
            Export Report
          </Button>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
          <p className="mt-2 text-muted-foreground">
            Monitor student registrations, assessments, and system performance
          </p>
        </div>

        {/* Stats Grid */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <Card key={stat.title} className="border-border bg-card">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className={cn('flex h-12 w-12 items-center justify-center rounded-xl', stat.color)}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      <TrendingUp className="mr-1 h-3 w-3" />
                      {stat.change}
                    </Badge>
                  </div>
                  <div className="mt-4">
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Charts Row */}
        <div className="mb-8 grid gap-6 lg:grid-cols-2">
          {/* Top Course Recommendations */}
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-primary" />
                Top Course Recommendations
              </CardTitle>
              <CardDescription>Most recommended courses based on student assessments</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {topCourses.map((course, index) => (
                <div key={course.name} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2 text-foreground">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">
                        {index + 1}
                      </span>
                      {course.name}
                    </span>
                    <span className="text-muted-foreground">{course.count} students</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-primary transition-all"
                      style={{ width: `${course.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Personality Distribution */}
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                Personality Type Distribution
              </CardTitle>
              <CardDescription>Holland Code personality types across all students</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {personalityDistribution.map((item) => (
                  <div key={item.type} className="flex items-center gap-4">
                    <div className={cn('h-3 w-3 rounded-full', item.color)} />
                    <div className="flex-1">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-foreground">{item.type}</span>
                        <span className="text-muted-foreground">
                          {item.count} ({Math.round((item.count / totalPersonality) * 100)}%)
                        </span>
                      </div>
                      <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-muted">
                        <div
                          className={cn('h-full rounded-full transition-all', item.color)}
                          style={{ width: `${(item.count / totalPersonality) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Students Table */}
        <Card className="border-border bg-card">
          <CardHeader>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <CardTitle>Student Records</CardTitle>
                <CardDescription>View and manage student profiles and assessments</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search students..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-64 pl-9"
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-40">
                    <Filter className="mr-2 h-4 w-4" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Students</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>School</TableHead>
                    <TableHead>County</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Personality</TableHead>
                    <TableHead>Top Course</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStudents.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium text-foreground">{student.name}</p>
                          <p className="text-xs text-muted-foreground">{student.grade}</p>
                        </div>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{student.school}</TableCell>
                      <TableCell className="text-muted-foreground">{student.county}</TableCell>
                      <TableCell>
                        <Badge
                          variant={student.assessmentCompleted ? 'default' : 'secondary'}
                          className={
                            student.assessmentCompleted
                              ? 'bg-primary/10 text-primary hover:bg-primary/20'
                              : ''
                          }
                        >
                          {student.assessmentCompleted ? 'Completed' : 'Pending'}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {student.personalityType || '-'}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {student.topRecommendation || '-'}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" className="gap-1">
                          <Eye className="h-4 w-4" />
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {filteredStudents.length === 0 && (
              <div className="py-12 text-center">
                <p className="text-muted-foreground">No students found matching your criteria.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
