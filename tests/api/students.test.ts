import { describe, it, expect, beforeEach } from 'vitest'
import { prismaMock } from '../mocks/prisma'
import { createMockRequest } from '../helpers'
import { GET, PUT } from '@/app/api/students/route'

beforeEach(() => {
  Object.values(prismaMock).forEach((model) =>
    Object.values(model).forEach((fn) => (fn as ReturnType<typeof import('vitest').vi.fn>).mockReset())
  )
})

const mockStudent = {
  id: 's1',
  name: 'Alice',
  email: 'alice@test.com',
  password: '$2b$10$hash',
  school: 'Starehe',
  grade: 'Form 4',
  county: 'Nairobi',
  isKCSEGraduate: true,
  createdAt: new Date(),
  subjects: [
    { id: 'sg1', studentId: 's1', subject: 'Mathematics', grade: 'A' },
    { id: 'sg2', studentId: 's1', subject: 'English', grade: 'B+' },
  ],
}

describe('GET /api/students', () => {
  it('returns student by id (without password)', async () => {
    prismaMock.student.findUnique.mockResolvedValue(mockStudent)

    const req = createMockRequest('/api/students', { searchParams: { id: 's1' } })
    const res = await GET(req)
    const data = await res.json()

    expect(res.status).toBe(200)
    expect(data.name).toBe('Alice')
    expect(data.subjects).toHaveLength(2)
    expect(data).not.toHaveProperty('password')
  })

  it('returns student by email', async () => {
    prismaMock.student.findUnique.mockResolvedValue(mockStudent)

    const req = createMockRequest('/api/students', { searchParams: { email: 'alice@test.com' } })
    const res = await GET(req)
    expect(res.status).toBe(200)
  })

  it('returns 400 when no id or email', async () => {
    const req = createMockRequest('/api/students')
    const res = await GET(req)
    expect(res.status).toBe(400)
  })

  it('returns 404 for unknown student', async () => {
    prismaMock.student.findUnique.mockResolvedValue(null)

    const req = createMockRequest('/api/students', { searchParams: { id: 'nope' } })
    const res = await GET(req)
    expect(res.status).toBe(404)
  })
})

describe('PUT /api/students', () => {
  it('updates student and returns data without password', async () => {
    const updated = { ...mockStudent, name: 'Alice Updated' }
    prismaMock.student.update.mockResolvedValue(updated)

    const req = createMockRequest('/api/students', {
      method: 'PUT',
      body: {
        id: 's1',
        name: 'Alice Updated',
        email: 'alice@test.com',
        school: 'Starehe',
        grade: 'Form 4',
        county: 'Nairobi',
        isKCSEGraduate: true,
        subjects: [{ subject: 'Mathematics', grade: 'A' }],
      },
    })
    const res = await PUT(req)
    const data = await res.json()

    expect(res.status).toBe(200)
    expect(data.name).toBe('Alice Updated')
    expect(data).not.toHaveProperty('password')
  })

  it('returns 400 when id is missing', async () => {
    const req = createMockRequest('/api/students', {
      method: 'PUT',
      body: { name: 'Oops' },
    })
    const res = await PUT(req)
    expect(res.status).toBe(400)
  })

  it('returns 500 on database error', async () => {
    prismaMock.student.update.mockRejectedValue(new Error('constraint'))

    const req = createMockRequest('/api/students', {
      method: 'PUT',
      body: { id: 's1', name: 'Err' },
    })
    const res = await PUT(req)
    expect(res.status).toBe(500)
  })
})
