import { describe, it, expect, beforeEach } from 'vitest'
import { prismaMock } from '../mocks/prisma'
import { createMockRequest } from '../helpers'
import { POST } from '@/app/api/auth/student-login/route'
import { hashPassword } from '@/lib/password'

beforeEach(() => {
  Object.values(prismaMock).forEach((model) =>
    Object.values(model).forEach((fn) => (fn as ReturnType<typeof import('vitest').vi.fn>).mockReset())
  )
})

describe('POST /api/auth/student-login', () => {
  it('returns student data on valid credentials', async () => {
    const hashed = await hashPassword('secret123')
    prismaMock.student.findUnique.mockResolvedValue({
      id: 's1',
      name: 'Jane',
      email: 'jane@test.com',
      password: hashed,
      school: 'Alliance',
      grade: 'Form 3',
      county: 'Kiambu',
      isKCSEGraduate: false,
      createdAt: new Date(),
    })

    const req = createMockRequest('/api/auth/student-login', {
      method: 'POST',
      body: { email: 'jane@test.com', password: 'secret123' },
    })
    const res = await POST(req)
    const data = await res.json()

    expect(res.status).toBe(200)
    expect(data.name).toBe('Jane')
    expect(data).not.toHaveProperty('password')
  })

  it('returns 400 when email or password missing', async () => {
    const req = createMockRequest('/api/auth/student-login', {
      method: 'POST',
      body: { email: 'jane@test.com' },
    })
    const res = await POST(req)
    expect(res.status).toBe(400)
  })

  it('returns 401 for non-existent student', async () => {
    prismaMock.student.findUnique.mockResolvedValue(null)

    const req = createMockRequest('/api/auth/student-login', {
      method: 'POST',
      body: { email: 'ghost@test.com', password: 'pass' },
    })
    const res = await POST(req)
    expect(res.status).toBe(401)
  })

  it('returns 401 for wrong password', async () => {
    const hashed = await hashPassword('correct')
    prismaMock.student.findUnique.mockResolvedValue({
      id: 's1',
      email: 'jane@test.com',
      password: hashed,
    })

    const req = createMockRequest('/api/auth/student-login', {
      method: 'POST',
      body: { email: 'jane@test.com', password: 'wrong' },
    })
    const res = await POST(req)
    expect(res.status).toBe(401)
  })

  it('returns 500 on database error', async () => {
    prismaMock.student.findUnique.mockRejectedValue(new Error('timeout'))

    const req = createMockRequest('/api/auth/student-login', {
      method: 'POST',
      body: { email: 'a@b.com', password: 'x' },
    })
    const res = await POST(req)
    expect(res.status).toBe(500)
  })
})
