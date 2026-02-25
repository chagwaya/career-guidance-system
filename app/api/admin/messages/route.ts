import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function GET(request: NextRequest) {
  try {
    // Get all student messages grouped by student
    const messages = await prisma.counselorMessage.findMany({
      where: { fromStudent: true },
      include: {
        student: {
          select: {
            id: true,
            name: true,
            email: true,
            school: true,
            county: true,
          },
        },
      },
      orderBy: { timestamp: 'desc' },
    })

    // Get response counts for each student
    const responseMessages = await prisma.counselorMessage.findMany({
      where: { fromStudent: false },
    })

    // Group messages by student with response info
    const groupedMessages: Record<string, any> = {}
    
    messages.forEach((msg) => {
      const studentId = msg.studentId
      if (!groupedMessages[studentId]) {
        const responseCount = responseMessages.filter((r) => r.studentId === studentId).length
        groupedMessages[studentId] = {
          student: msg.student,
          messages: [],
          lastMessage: msg.timestamp,
          unreadCount: 1,
          hasResponded: responseCount > 0,
        }
      }
      groupedMessages[studentId].messages.push({
        id: msg.id,
        message: msg.message,
        timestamp: msg.timestamp,
      })
    })

    return NextResponse.json(Object.values(groupedMessages))
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch messages' }, { status: 500 })
  }
}
