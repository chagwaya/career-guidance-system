import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const runtime = 'nodejs'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const studentId = searchParams.get('studentId')

    if (!studentId) {
      return NextResponse.json({ error: 'Missing studentId' }, { status: 400 })
    }

    const assessment = await prisma.assessmentResult.findFirst({
      where: { studentId },
      orderBy: { completedAt: 'desc' },
    })

    if (!assessment) {
      return NextResponse.json({ error: 'Assessment not found' }, { status: 404 })
    }

    return NextResponse.json(assessment)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch assessment' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { studentId, personalityType, interests, strengths, scores } = body

    if (!studentId || !personalityType || !scores) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const assessment = await prisma.assessmentResult.create({
      data: {
        studentId,
        personalityType,
        interests: Array.isArray(interests) ? interests : [],
        strengths: Array.isArray(strengths) ? strengths : [],
        scores,
      },
    })

    return NextResponse.json(assessment, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create assessment' }, { status: 500 })
  }
}
