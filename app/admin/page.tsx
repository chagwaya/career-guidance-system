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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  GraduationCap,
  Users,
  ClipboardList,
  MessageCircle,
  ArrowLeft,
  Eye,
  LogOut,
  Send,
  X,
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
    interests: any
    strengths: any
  }>
  _count: {
    messages: number
  }
}

interface StudentMessage {
  id: string
  message: string
  fromStudent: boolean
  timestamp: string
}

export default function AdminDashboardPage() {
  const router = useRouter()
  const [admin, setAdmin] = useState<any>(null)
  const [students, setStudents] = useState<AdminStudent[]>([])
  const [stats, setStats] = useState<any>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(true)
  const [selectedStudent, setSelectedStudent] = useState<AdminStudent | null>(null)
  const [studentMessages, setStudentMessages] = useState<StudentMessage[]>([])
  const [replyMessage, setReplyMessage] = useState('')
  const [activeTab, setActiveTab] = useState<'overview' | 'messages'>('overview')

  useEffect(() => {
    const session = localStorage.getItem('admin_session')
    if (!session) {
      router.push('/admin/login')
      return
    }

    const adminData = JSON.parse(session)
    setAdmin(adminData)
    loadData(adminData.email)
  }, [router])

  const loadData = async (email?: string) => {
    const adminEmail = email || admin?.email
    if (!adminEmail) return

    const headers = { 'x-admin-email': adminEmail }

    try {
      const [studentsRes, statsRes] = await Promise.all([
        fetch('/api/admin/students', { headers }),
        fetch('/api/admin/stats', { headers }),
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

  const handleViewStudent = async (student: AdminStudent) => {
    setSelectedStudent(student)
    setActiveTab('overview')
    try {
      const res = await fetch(`/api/messages?studentId=${student.id}`)
      if (res.ok) {
        const messages = await res.json()
        setStudentMessages(messages)
      }
    } catch (error) {
      console.error('Failed to load messages:', error)
    }
  }

  const handleSendReply = async () => {
    if (!replyMessage.trim() || !selectedStudent) return

    try {
      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentId: selectedStudent.id,
          message: replyMessage,
          fromStudent: false,
        }),
      })

      if (res.ok) {
        setReplyMessage('')
        // Refresh messages
        const messagesRes = await fetch(`/api/messages?studentId=${selectedStudent.id}`)
        if (messagesRes.ok) {
          const messages = await messagesRes.json()
          setStudentMessages(messages)
        }
        // Refresh students list to update message count
        loadData()
      }
    } catch (error) {
      console.error('Failed to send reply:', error)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('admin_session')
    router.push('/admin/login')
  }

  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.school.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesSearch
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
    },
    {
      title: 'Assessments Completed',
      value: stats?.completedAssessments || 0,
      icon: ClipboardList,
    },
    {
      title: 'Student Messages',
      value: stats?.totalMessages || 0,
      icon: MessageCircle,
    },
    {
      title: 'Schools Reached',
      value: stats?.schoolCount || 0,
      icon: GraduationCap,
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
                  Admin Counselor
                </Badge>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">{admin.name}</span>
            <Button variant="outline" size="sm" onClick={handleLogout} className="gap-2 bg-transparent">
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 py-8">
        {/* Statistics */}
        <div className="mb-8 grid gap-4 md:grid-cols-4">
          {statsCards.map((stat) => {
            const Icon = stat.icon
            return (
              <Card key={stat.title}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                  <Icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Search */}
        <div className="mb-6 flex gap-2">
          <Input
            placeholder="Search students by name, email, or school..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1"
          />
        </div>

        {/* Students Table */}
        <Card>
          <CardHeader>
            <CardTitle>Students</CardTitle>
            <CardDescription>View student profiles and manage counseling</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>School</TableHead>
                    <TableHead>Assessment</TableHead>
                    <TableHead>Messages</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStudents.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell className="font-medium">{student.name}</TableCell>
                      <TableCell className="text-sm">{student.email}</TableCell>
                      <TableCell>{student.school}</TableCell>
                      <TableCell>
                        {student.assessments.length > 0 ? (
                          <Badge variant="default" className="bg-green-600">
                            {student.assessments[0].personalityType}
                          </Badge>
                        ) : (
                          <Badge variant="secondary">Pending</Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{student._count.messages}</Badge>
                      </TableCell>
                      <TableCell>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleViewStudent(student)}
                          className="gap-2"
                        >
                          <Eye className="h-4 w-4" />
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Student Details Modal */}
      <Dialog open={!!selectedStudent} onOpenChange={() => setSelectedStudent(null)}>
        <DialogContent className="max-h-[90vh] overflow-y-auto max-w-2xl">
          {selectedStudent && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedStudent.name}</DialogTitle>
                <DialogDescription>{selectedStudent.email}</DialogDescription>
              </DialogHeader>

              {/* Tabs */}
              <div className="flex gap-2 border-b mb-4">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={cn(
                    'px-4 py-2 text-sm font-medium border-b-2 -mb-px',
                    activeTab === 'overview'
                      ? 'border-primary text-primary'
                      : 'border-transparent text-muted-foreground hover:text-foreground'
                  )}
                >
                  Overview
                </button>
                <button
                  onClick={() => setActiveTab('messages')}
                  className={cn(
                    'px-4 py-2 text-sm font-medium border-b-2 -mb-px',
                    activeTab === 'messages'
                      ? 'border-primary text-primary'
                      : 'border-transparent text-muted-foreground hover:text-foreground'
                  )}
                >
                  Messages ({studentMessages.length})
                </button>
              </div>

              {/* Overview Tab */}
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  {/* Personal Info */}
                  <div>
                    <h3 className="font-semibold mb-3">Personal Information</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Name</p>
                        <p className="font-medium">{selectedStudent.name}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Email</p>
                        <p className="font-medium">{selectedStudent.email}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">School</p>
                        <p className="font-medium">{selectedStudent.school}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">County</p>
                        <p className="font-medium">{selectedStudent.county}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Grade</p>
                        <p className="font-medium">{selectedStudent.grade}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Joined</p>
                        <p className="font-medium">{new Date(selectedStudent.createdAt).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </div>

                  {/* Subject Grades */}
                  {selectedStudent.subjects.length > 0 && (
                    <div>
                      <h3 className="font-semibold mb-3">Subject Grades</h3>
                      <div className="grid grid-cols-2 gap-2">
                        {selectedStudent.subjects.map((subject, idx) => (
                          <div key={idx} className="flex justify-between p-2 rounded bg-secondary/50">
                            <span className="text-sm">{subject.subject}</span>
                            <Badge>{subject.grade}</Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Assessment Results */}
                  {selectedStudent.assessments.length > 0 && (
                    <div>
                      <h3 className="font-semibold mb-3">Assessment Results</h3>
                      {selectedStudent.assessments.map((assessment, idx) => (
                        <div key={idx} className="border rounded-lg p-4">
                          <div className="flex items-center justify-between mb-3">
                            <Badge className="bg-blue-600">{assessment.personalityType}</Badge>
                            <span className="text-xs text-muted-foreground">
                              {new Date(assessment.completedAt).toLocaleDateString()}
                            </span>
                          </div>
                          <div className="space-y-2">
                            <div>
                              <p className="text-sm font-medium text-muted-foreground">Interests:</p>
                              <p className="text-sm">{JSON.stringify(assessment.interests).replace(/["\[\]]/g, '')}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-muted-foreground">Strengths:</p>
                              <p className="text-sm">{JSON.stringify(assessment.strengths).replace(/["\[\]]/g, '')}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Messages Tab */}
              {activeTab === 'messages' && (
                <div className="space-y-4">
                  {/* Messages List */}
                  <div className="border rounded-lg p-4 min-h-[300px] max-h-[400px] overflow-y-auto bg-secondary/30 space-y-3">
                    {studentMessages.length > 0 ? (
                      studentMessages.map((msg) => (
                        <div
                          key={msg.id}
                          className={cn(
                            'p-3 rounded-lg text-sm',
                            msg.fromStudent
                              ? 'bg-blue-100 text-blue-900 dark:bg-blue-900 dark:text-blue-100 ml-8'
                              : 'bg-green-100 text-green-900 dark:bg-green-900 dark:text-green-100 mr-8'
                          )}
                        >
                          <p className="font-medium mb-1">
                            {msg.fromStudent ? 'Student' : 'You'}
                          </p>
                          <p>{msg.message}</p>
                          <p className="text-xs opacity-70 mt-1">
                            {new Date(msg.timestamp).toLocaleString()}
                          </p>
                        </div>
                      ))
                    ) : (
                      <p className="text-muted-foreground text-center py-8">No messages yet</p>
                    )}
                  </div>

                  {/* Reply Input */}
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Type your reply..."
                      value={replyMessage}
                      onChange={(e) => setReplyMessage(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          handleSendReply()
                        }
                      }}
                      className="flex-1 px-3 py-2 border border-input rounded-md bg-background text-sm"
                    />
                    <Button
                      onClick={handleSendReply}
                      disabled={!replyMessage.trim()}
                      size="sm"
                      className="gap-2"
                    >
                      <Send className="h-4 w-4" />
                      Send
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
