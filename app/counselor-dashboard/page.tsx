'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import {
  MessageCircle,
  ArrowLeft,
  LogOut,
  GraduationCap,
  Search,
  Clock,
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface StudentMessageGroup {
  student: {
    id: string
    name: string
    email: string
    school: string
    county: string
  }
  messages: Array<{
    id: string
    message: string
    timestamp: string
  }>
  lastMessage: string
  hasResponded: boolean
}

export default function CounselorDashboardPage() {
  const router = useRouter()
  const [admin, setAdmin] = useState<any>(null)
  const [messageGroups, setMessageGroups] = useState<StudentMessageGroup[]>([])
  const [selectedStudent, setSelectedStudent] = useState<StudentMessageGroup | null>(null)
  const [responseMessage, setResponseMessage] = useState('')
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    const session = localStorage.getItem('admin_session')
    if (!session) {
      router.push('/admin/login')
      return
    }

    const adminData = JSON.parse(session)
    setAdmin(adminData)
    loadMessages()
  }, [router])

  const loadMessages = async () => {
    try {
      const response = await fetch('/api/admin/messages')
      if (response.ok) {
        const data = await response.json()
        setMessageGroups(data)
        if (data.length > 0) {
          setSelectedStudent(data[0])
        }
      }
    } catch (error) {
      console.error('Failed to load messages:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSendResponse = async () => {
    if (!responseMessage.trim() || !selectedStudent) return

    try {
      const response = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentId: selectedStudent.student.id,
          message: responseMessage,
          fromStudent: false,
        }),
      })

      if (response.ok) {
        setResponseMessage('')
        loadMessages()
      }
    } catch (error) {
      console.error('Failed to send response:', error)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('admin_session')
    router.push('/admin/login')
  }

  const filteredGroups = messageGroups.filter(
    (group) =>
      group.student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      group.student.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      group.student.school.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const unresolvedCount = messageGroups.filter((g) => !g.hasResponded).length

  if (loading || !admin) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 w-full">
          <div className="flex items-center gap-4">
            <Link href="/admin">
              <Button variant="outline" size="sm" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
                <MessageCircle className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <span className="font-semibold text-foreground">Counselor Messages</span>
                <Badge variant="secondary" className="ml-2">
                  {unresolvedCount} unresolved
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

      <main className="flex flex-1 gap-6 p-6">
        {/* Message List */}
        <div className="w-full max-w-sm space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search students..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>

          <div className="space-y-2">
            {filteredGroups.length === 0 ? (
              <Card className="border-border bg-card">
                <CardContent className="flex flex-col items-center justify-center p-8 text-center">
                  <MessageCircle className="mb-4 h-12 w-12 text-muted-foreground/50" />
                  <p className="text-sm text-muted-foreground">No messages yet</p>
                </CardContent>
              </Card>
            ) : (
              filteredGroups.map((group) => (
                <Card
                  key={group.student.id}
                  className={cn(
                    'border-border bg-card cursor-pointer transition-colors hover:bg-muted/50',
                    selectedStudent?.student.id === group.student.id && 'border-primary bg-primary/5'
                  )}
                  onClick={() => setSelectedStudent(group)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-foreground truncate">{group.student.name}</p>
                        <p className="text-xs text-muted-foreground truncate">{group.student.school}</p>
                        <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                          {group.messages[0]?.message || 'No messages'}
                        </p>
                      </div>
                      {!group.hasResponded && (
                        <Badge variant="default" className="shrink-0">New</Badge>
                      )}
                    </div>
                    <p className="mt-2 text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {new Date(group.lastMessage).toLocaleDateString()}
                    </p>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>

        {/* Message Detail */}
        {selectedStudent ? (
          <div className="flex-1 flex flex-col">
            <Card className="flex-1 border-border bg-card flex flex-col">
              <CardHeader className="border-b border-border">
                <div>
                  <CardTitle>{selectedStudent.student.name}</CardTitle>
                  <CardDescription>{selectedStudent.student.email}</CardDescription>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {selectedStudent.student.school} • {selectedStudent.student.county}
                  </p>
                </div>
              </CardHeader>

              <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
                {selectedStudent.messages.map((msg) => (
                  <div
                    key={msg.id}
                    className="rounded-lg bg-muted p-3"
                  >
                    <p className="text-sm text-foreground">{msg.message}</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {new Date(msg.timestamp).toLocaleString()}
                    </p>
                  </div>
                ))}
              </CardContent>

              <div className="border-t border-border p-4 space-y-2">
                <label className="text-sm font-medium text-foreground">Send Response</label>
                <div className="flex gap-2">
                  <textarea
                    value={responseMessage}
                    onChange={(e) => setResponseMessage(e.target.value)}
                    placeholder="Type your response..."
                    className="flex-1 rounded-lg border border-border bg-background p-3 text-base leading-6 text-foreground placeholder:text-muted-foreground resize-y min-h-[140px] max-h-[320px]"
                    rows={6}
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  Tip: Drag the bottom edge of the message box to resize it while typing.
                </p>
                <Button
                  onClick={handleSendResponse}
                  disabled={!responseMessage.trim()}
                  className="w-full"
                >
                  Send Response
                </Button>
              </div>
            </Card>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <Card className="border-border bg-card">
              <CardContent className="flex flex-col items-center justify-center p-12 text-center">
                <MessageCircle className="mb-4 h-12 w-12 text-muted-foreground/50" />
                <p className="text-sm text-muted-foreground">Select a student to view messages</p>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  )
}
