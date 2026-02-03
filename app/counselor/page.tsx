'use client'

import React from "react"

import { useState, useRef, useEffect } from 'react'
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

// Simple AI-like responses based on keywords
function generateResponse(message: string, studentName: string): string {
  const lowerMessage = message.toLowerCase()

  if (lowerMessage.includes('mathematics') || lowerMessage.includes('math')) {
    return `Great question, ${studentName}! If you love mathematics, you have many exciting options. Consider courses like Engineering (Civil, Mechanical, Electrical), Actuarial Science, Statistics, Computer Science, or Economics. These fields heavily utilize mathematical skills. Based on your KCSE mathematics grade, I can help narrow down the best options for you.`
  }

  if (lowerMessage.includes('computer') || lowerMessage.includes('technology') || lowerMessage.includes('programming')) {
    return `Computer Science and IT are excellent fields with high demand in Kenya! Universities like JKUAT, University of Nairobi, and Strathmore offer strong programs. You'll need good grades in Mathematics and Physics. Career paths include Software Development, Data Science, Cybersecurity, and more.`
  }

  if (lowerMessage.includes('medicine') || lowerMessage.includes('doctor') || lowerMessage.includes('medical')) {
    return `Medicine is a noble and rewarding career path! To pursue MBChB in Kenya, you typically need a minimum mean grade of A- with strong performance in Biology, Chemistry, and Mathematics/Physics. Top medical schools include University of Nairobi, Kenyatta University, and Moi University. The program takes 6 years plus internship.`
  }

  if (lowerMessage.includes('university of nairobi') || lowerMessage.includes('uon')) {
    return `The University of Nairobi is Kenya's oldest and largest university. To apply, you need to register on the KUCCPS portal during the application period (usually January-April). Your KCSE grades determine which courses you qualify for. The university offers programs in Medicine, Engineering, Law, Business, Arts, and more.`
  }

  if (lowerMessage.includes('scholarship') || lowerMessage.includes('financial')) {
    return `There are several scholarship opportunities for Kenyan students: HELB (Higher Education Loans Board), university-specific scholarships, Equity Bank Wings to Fly, Mastercard Foundation Scholars Program, and government bursaries through your local CDF office. Maintain good grades and apply early!`
  }

  if (lowerMessage.includes('engineering')) {
    return `Engineering is a fantastic choice! Popular options include Civil, Mechanical, Electrical, and Computer Engineering. Requirements typically include a mean grade of B+ or higher with strong grades in Mathematics, Physics, and Chemistry. JKUAT, University of Nairobi, and Technical University of Kenya have excellent programs.`
  }

  if (lowerMessage.includes('business') || lowerMessage.includes('commerce') || lowerMessage.includes('accounting')) {
    return `Business and Commerce courses open doors to many careers in Kenya's growing economy. You can pursue BCom, BBA, Economics, or Accounting. These are offered at Strathmore, UoN, KU, and many other universities. Career paths include Banking, Consulting, Entrepreneurship, and Corporate Management.`
  }

  if (lowerMessage.includes('law') || lowerMessage.includes('lawyer') || lowerMessage.includes('advocate')) {
    return `Law is a prestigious profession in Kenya! LLB programs require a minimum of B+ mean grade with strong English. After your degree, you'll need to attend Kenya School of Law and pass Bar exams. Top law schools include UoN, KU, Strathmore, and Moi University.`
  }

  if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
    return `Hello ${studentName}! I'm your career guidance counselor. I'm here to help you explore university courses and career paths that match your interests and abilities. What would you like to know about? Feel free to ask about specific courses, universities, requirements, or career opportunities.`
  }

  if (lowerMessage.includes('thank')) {
    return `You're welcome, ${studentName}! I'm always here to help with your career guidance journey. Remember, choosing the right course is an important decision - take your time, do your research, and don't hesitate to ask more questions. Good luck with your future!`
  }

  return `Thank you for your question, ${studentName}. Career decisions are important, and I'm here to help. Could you tell me more about your interests, favorite subjects, or the specific area you'd like to explore? This will help me give you more targeted guidance.`
}

export default function CounselorPage() {
  const { student, messages, addMessage, assessmentResult } = useStudent()
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async (message: string) => {
    if (!message.trim() || !student) return

    // Add user message
    addMessage({
      studentId: student.id,
      message: message.trim(),
      fromStudent: true,
    })

    setInputValue('')
    setIsTyping(true)

    // Simulate typing delay
    setTimeout(() => {
      const response = generateResponse(message, student.name.split(' ')[0])
      addMessage({
        studentId: student.id,
        message: response,
        fromStudent: false,
      })
      setIsTyping(false)
    }, 1500)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleSendMessage(inputValue)
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
                    <CardTitle className="text-base">Career Guidance Assistant</CardTitle>
                    <CardDescription className="flex items-center gap-1">
                      <span className="h-2 w-2 rounded-full bg-green-500" />
                      Online
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
                      <p className="text-muted-foreground">
                        Start a conversation by asking a question about careers or courses
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

                  {isTyping && (
                    <div className="flex gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                        <Bot className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <div className="rounded-2xl bg-muted px-4 py-2">
                        <div className="flex gap-1">
                          <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/50" />
                          <span
                            className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/50"
                            style={{ animationDelay: '0.1s' }}
                          />
                          <span
                            className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/50"
                            style={{ animationDelay: '0.2s' }}
                          />
                        </div>
                      </div>
                    </div>
                  )}

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
                      disabled={isTyping}
                    />
                    <Button type="submit" disabled={!inputValue.trim() || isTyping}>
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
                      disabled={isTyping}
                      className="w-full rounded-lg border border-border bg-background p-3 text-left text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:opacity-50"
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
                        Our AI assistant responds instantly. For complex queries, consider consulting a human counselor at your school.
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
