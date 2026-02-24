'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
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
  LogOut,
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface AdminStudent {
  id: string
  name: string
  email: string
  school: string
  county: string
  grade: string
  createdAt: string
  subjects: Array<{ subject: string; grade: string }>
  assessments: Array<{
    personalityType: string
    completedAt: string
  }>
  _count: {
    messages: number
  }
}

export default function AdminPage() {
  const router = useRouter()
  const [admin, setAdmin] = useState<any>(null)
  const [students, setStudents] = useState<AdminStudent[]>([])
  const [stats, setStats] = useState<any>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check authentication
    const session = localStorage.getItem('admin_session')
    if (!session) {
      router.push('/admin/login')
      return
    }

    const adminData = JSON.parse(session)
    setAdmin(adminData)

    // Fetch data
    loadData()
  }, [router])

  const loadData = async () => {
    try {
      const [studentsRes, statsRes] = await Promise.all([
        fetch('/api/admin/students'),
        fetch('/api/admin/stats'),
      ])

      if (studentsRes.ok) {
        const studentsData = await studentsRes.json()
        setStudents(studentsData)
      }

      if (statsRes.ok) {
        const statsData = await statsRes.json()
        setStats(statsData)
      }
    } catch (error) {
      console.error('Failed to load data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('admin_session')
    router.push('/admin/login')
  }

  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.school.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus =
      statusFilter === 'all' ||
      (statusFilter === 'completed' && student.assessments.length > 0) ||
      (statusFilter === 'pending' && student.assessments.length === 0)
    return matchesSearch && matchesStatus
  })

  if (loading || !admin) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    )
  }

  const statsCards = [
    {
      title: 'Total Students',
      value: stats?.totalStudents || 0,
      icon: Users,
      color: 'bg-primary/10 text-primary',
    },
    {
      title: 'Assessments Completed',
      value: stats?.completedAssessments || 0,
      icon: ClipboardList,
      color: 'bg-secondary/10 text-secondary',
    },
    {
      title: 'Student Messages',
      value: stats?.totalMessages || 0,
      icon: MessageCircle,
      color: 'bg-chart-3/20 text-chart-3',
    },
    {
      title: 'Schools Reached',
      value: stats?.schoolCount || 0,
      icon: GraduationCap,
      color: 'bg-chart-4/20 text-chart-4',
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="outline" size="sm" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Home
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
                <GraduationCap className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <span className="font-semibold text-foreground">CareerPath Kenya</span>
                <Badge variant="secondary" className="ml-2">
                  {admin.role === 'admin' ? 'Admin' : 'Counselor'}
                </Badge>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">{admin.name}</span>
            <Link href="/counselor-dashboard">
              <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                <MessageCircle className="h-4 w-4" />
                Messages
              </Button>
            </Link>
            <Button variant="outline" size="sm" onClick={handleLogout} className="gap-2 bg-transparent">
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
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
          {statsCards.map((stat) => {
            const Icon = stat.icon
            return (
              <Card key={stat.title} className="border-border bg-card">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className={cn('flex h-12 w-12 items-center justify-center rounded-xl', stat.color)}>
                      <Icon className="h-6 w-6" />
                    </div>
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
                  {filteredStudents.map((student) => {
                    const hasAssessment = student.assessments && student.assessments.length > 0
                    return (
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
                            variant={hasAssessment ? 'default' : 'secondary'}
                            className={
                              hasAssessment
                                ? 'bg-primary/10 text-primary hover:bg-primary/20'
                                : ''
                            }
                          >
                            {hasAssessment ? 'Completed' : 'Pending'}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {hasAssessment ? student.assessments[0]?.personalityType : '-'}
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {student._count.messages > 0 ? `${student._count.messages} messages` : '-'}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm" className="gap-1">
                            <Eye className="h-4 w-4" />
                            View
                          </Button>
                        </TableCell>
                      </TableRow>
                    )
                  })}
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
