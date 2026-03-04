'use client'

import React from "react"

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/landing/footer'
import { useStudent } from '@/lib/student-context'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  AlertCircle,
  ArrowRight,
  MessageCircle,
  Send,
  User,
  Bot,
  Clock,
  HelpCircle,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const suggestedQuestions = [
  'What course should I take if I love mathematics?',
  'How do I apply to University of Nairobi?',
  'What careers can I pursue with a Computer Science degree?',
  'What are the requirements for Medicine at Kenyatta University?',
  'How can I improve my chances of getting a scholarship?',
]

export default function CounselorPage() {
  const router = useRouter()
  const { student, messages, addMessage, assessmentResult } = useStudent()
  const [inputValue, setInputValue] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [isChecking, setIsChecking] = useState(true)

  useEffect(() => {
    const session = localStorage.getItem('student_session')
    if (!session) {
      router.push('/student-login')
    } else {
      setIsChecking(false)
    }
  }, [])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async (message: string) => {
    if (!message.trim() || !student) return

    // Add user message
    await addMessage({
      studentId: student.id,
      message: message.trim(),
      fromStudent: true,
    })

    setInputValue('')
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleSendMessage(inputValue)
  }

  if (isChecking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    )
  }

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
                  Please create your profile first to chat with a career counselor.
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

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navigation />
      <main className="flex flex-1 flex-col px-4 py-6">
        <div className="mx-auto flex w-full max-w-4xl flex-1 flex-col">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-foreground">Career Counselor</h1>
            <p className="mt-1 text-muted-foreground">
              Get personalized guidance on university courses and career paths
            </p>
          </div>

          <div className="grid flex-1 gap-6 lg:grid-cols-3">
            {/* Chat Area */}
            <Card className="flex flex-col border-border bg-card lg:col-span-2">
              <CardHeader className="border-b border-border pb-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <Bot className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-base">Career Counselor</CardTitle>
                    <CardDescription className="flex items-center gap-1">
                      <span className="h-2 w-2 rounded-full bg-green-500" />
                      Available
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="flex flex-1 flex-col p-0">
                {/* Messages */}
                <div className="flex-1 space-y-4 overflow-y-auto p-4" style={{ maxHeight: '400px' }}>
                  {messages.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-8 text-center">
                      <MessageCircle className="mb-4 h-12 w-12 text-muted-foreground/50" />
                      <p className="font-medium text-foreground">Welcome to Career Counseling</p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Send a message and a counselor will respond to your questions
                      </p>
                    </div>
                  )}

                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={cn(
                        'flex gap-3',
                        msg.fromStudent ? 'flex-row-reverse' : 'flex-row'
                      )}
                    >
                      <div
                        className={cn(
                          'flex h-8 w-8 shrink-0 items-center justify-center rounded-full',
                          msg.fromStudent ? 'bg-primary' : 'bg-muted'
                        )}
                      >
                        {msg.fromStudent ? (
                          <User className="h-4 w-4 text-primary-foreground" />
                        ) : (
                          <Bot className="h-4 w-4 text-muted-foreground" />
                        )}
                      </div>
                      <div
                        className={cn(
                          'max-w-[80%] rounded-2xl px-4 py-2',
                          msg.fromStudent
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted text-foreground'
                        )}
                      >
                        <p className="text-sm">{msg.message}</p>
                        <p
                          className={cn(
                            'mt-1 text-xs',
                            msg.fromStudent ? 'text-primary-foreground/70' : 'text-muted-foreground'
                          )}
                        >
                          {new Date(msg.timestamp).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </p>
                      </div>
                    </div>
                  ))}

                  <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <form
                  onSubmit={handleSubmit}
                  className="border-t border-border p-4"
                >
                  <div className="flex gap-2">
                    <Input
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder="Ask about courses, careers, or universities..."
                      className="flex-1"
                    />
                    <Button type="submit" disabled={!inputValue.trim()}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* Sidebar */}
            <div className="space-y-4">
              {/* Student Info */}
              <Card className="border-border bg-card">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">Your Profile</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Name</span>
                    <span className="font-medium text-foreground">{student.name}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">School</span>
                    <span className="font-medium text-foreground">{student.school}</span>
                  </div>
                  {assessmentResult && (
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Personality</span>
                      <Badge variant="secondary">{assessmentResult.personalityType}</Badge>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Suggested Questions */}
              <Card className="border-border bg-card">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-sm">
                    <HelpCircle className="h-4 w-4" />
                    Suggested Questions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {suggestedQuestions.map((question, index) => (
                    <button
                      key={index}
                      onClick={() => handleSendMessage(question)}
                      className="w-full rounded-lg border border-border bg-background p-3 text-left text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                    >
                      {question}
                    </button>
                  ))}
                </CardContent>
              </Card>

              {/* Info */}
              <Card className="border-primary/20 bg-primary/5">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <Clock className="mt-0.5 h-5 w-5 text-primary" />
                    <div className="text-sm">
                      <p className="font-medium text-foreground">Response Time</p>
                      <p className="text-muted-foreground">
                        Messages are reviewed by a career counselor who will reply with personalized guidance.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
