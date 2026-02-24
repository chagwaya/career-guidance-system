import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const runtime = 'nodejs'

export async function GET(request: NextRequest) {
  try {
    const [
      totalStudents,
      completedAssessments,
      totalMessages,
      schoolCount,
      recentStudents,
    ] = await Promise.all([
      prisma.student.count(),
      prisma.assessmentResult.count(),
      prisma.counselorMessage.count({ where: { fromStudent: true } }),
      prisma.student.findMany({ select: { school: true }, distinct: ['school'] }),
      prisma.student.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        include: {
          assessments: {
            orderBy: { completedAt: 'desc' },
            take: 1,
          },
        },
      }),
    ])

    const stats = {
      totalStudents,
      completedAssessments,
      totalMessages,
      schoolCount: schoolCount.length,
      recentStudents,
    }

    return NextResponse.json(stats)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 })
  }
}
