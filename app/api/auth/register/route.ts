import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { hashPassword, verifyPassword } from '@/lib/password'

export const runtime = 'nodejs'

// Register new student
export async function POST(request: NextRequest) {
  try {
    const { email, password, name, school, grade, county, isKCSEGraduate } = await request.json()

    if (!email || !password || !name || !school || !grade || !county) {
      return NextResponse.json({ error: 'All fields required' }, { status: 400 })
    }

    // Check if student already exists
    const existingStudent = await prisma.student.findUnique({
      where: { email }
    })

    if (existingStudent) {
      return NextResponse.json({ error: 'Email already registered' }, { status: 400 })
    }

    // Hash password
    const hashedPassword = await hashPassword(password)

    // Create student
    const student = await prisma.student.create({
      data: {
        email,
        password: hashedPassword,
        name,
        school,
        grade,
        county,
        isKCSEGraduate: isKCSEGraduate || false
      }
    })

    const { password: _, ...studentData } = student
    return NextResponse.json(studentData, { status: 201 })
  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json({ error: 'Registration failed' }, { status: 500 })
  }
}
