import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { hashPassword } from '@/lib/password'

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

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, password, school, grade, county, subjects, isKCSEGraduate } = body

    if (!name || !email || !school || !grade || !county) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Check if email already exists
    const existingStudent = await prisma.student.findUnique({
      where: { email }
    })

    if (existingStudent) {
      return NextResponse.json({ error: 'Email already registered' }, { status: 400 })
    }

    // Hash password if provided, otherwise generate a temporary one
    const hashedPassword = password ? await hashPassword(password) : await hashPassword('temp_' + Date.now())

    const student = await prisma.student.create({
      data: {
        name,
        email,
        password: hashedPassword,
        school,
        grade,
        county,
        isKCSEGraduate: isKCSEGraduate || false,
        subjects: {
          create: Array.isArray(subjects)
            ? subjects.map((s) => ({ 
                subject: s.subject || '', 
                grade: s.grade || '' 
              }))
            : [],
        },
      },
      include: { subjects: true },
    })

    const { password: _, ...studentData } = student
    return NextResponse.json(studentData, { status: 201 })
  } catch (error) {
    console.error('Failed to create student:', error)
    return NextResponse.json({ error: 'Failed to create student' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, name, email, password, school, grade, county, subjects, isKCSEGraduate } = body

    if (!id) {
      return NextResponse.json({ error: 'Missing id' }, { status: 400 })
    }

    const updateData: any = {
      name,
      email,
      school,
      grade,
      county,
    }

    // Update isKCSEGraduate if provided
    if (typeof isKCSEGraduate === 'boolean') {
      updateData.isKCSEGraduate = isKCSEGraduate
    }

    // Hash new password if provided
    if (password) {
      updateData.password = await hashPassword(password)
    }

    const updated = await prisma.student.update({
      where: { id },
      data: {
        ...updateData,
        subjects: {
          deleteMany: {},
          create: Array.isArray(subjects)
            ? subjects.map((s) => ({ 
                subject: s.subject || '', 
                grade: s.grade || '' 
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
