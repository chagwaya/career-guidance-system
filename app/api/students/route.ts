import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const runtime = 'nodejs'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    const email = searchParams.get('email')

    if (!id && !email) {
      return NextResponse.json({ error: 'Missing id or email' }, { status: 400 })
    }

    const student = await prisma.student.findUnique({
      where: id ? { id } : { email: email! },
      include: { subjects: true },
    })

    if (!student) {
      return NextResponse.json({ error: 'Student not found' }, { status: 404 })
    }

    // Exclude password from response
    const { password: _, ...studentData } = student
    return NextResponse.json(studentData)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch student' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, name, email, school, grade, county, subjects, isKCSEGraduate } = body

    if (!id) {
      return NextResponse.json({ error: 'Missing id' }, { status: 400 })
    }

    const updateData: Record<string, unknown> = {
      name,
      email,
      school,
      grade,
      county,
    }

    if (typeof isKCSEGraduate === 'boolean') {
      updateData.isKCSEGraduate = isKCSEGraduate
    }

    const updated = await prisma.student.update({
      where: { id },
      data: {
        ...updateData,
        subjects: {
          deleteMany: {},
          create: Array.isArray(subjects)
            ? subjects.map((s: { subject?: string; grade?: string }) => ({
                subject: s.subject || '',
                grade: s.grade || '',
              }))
            : [],
        },
      },
      include: { subjects: true },
    })

    const { password: _, ...studentData } = updated
    return NextResponse.json(studentData)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update student' }, { status: 500 })
  }
}
