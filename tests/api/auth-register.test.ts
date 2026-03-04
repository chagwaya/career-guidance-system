import { describe, it, expect, beforeEach } from 'vitest'
import { prismaMock } from '../mocks/prisma'
import { createMockRequest } from '../helpers'
import { POST } from '@/app/api/auth/register/route'

beforeEach(() => {
  Object.values(prismaMock).forEach((model) =>
    Object.values(model).forEach((fn) => (fn as ReturnType<typeof import('vitest').vi.fn>).mockReset())
  )
})

const validBody = {
  name: 'Test Student',
  email: 'test@example.com',
  password: 'password123',
  school: 'Nairobi High',
  grade: 'Form 4',
  county: 'Nairobi',
  isKCSEGraduate: false,
}

describe('POST /api/auth/register', () => {
  it('creates a new student and returns 201', async () => {
    prismaMock.student.findUnique.mockResolvedValue(null)
    prismaMock.student.create.mockResolvedValue({
      id: 'uuid-1',
      ...validBody,
      password: '$2b$10$hashedpassword',
      createdAt: new Date(),
    })

    const req = createMockRequest('/api/auth/register', { method: 'POST', body: validBody })
    const res = await POST(req)
    const data = await res.json()

    expect(res.status).toBe(201)
    expect(data.email).toBe('test@example.com')
    expect(data).not.toHaveProperty('password')
  })

  it('returns 400 when required fields are missing', async () => {
    const req = createMockRequest('/api/auth/register', {
      method: 'POST',
      body: { email: 'x@x.com' }, // missing other fields
    })
    const res = await POST(req)
    expect(res.status).toBe(400)
  })

  it('returns 400 when email is already registered', async () => {
    prismaMock.student.findUnique.mockResolvedValue({ id: 'existing' })

    const req = createMockRequest('/api/auth/register', { method: 'POST', body: validBody })
    const res = await POST(req)
    expect(res.status).toBe(400)
    const data = await res.json()
    expect(data.error).toMatch(/already registered/i)
  })

  it('returns 500 on unexpected error', async () => {
    prismaMock.student.findUnique.mockRejectedValue(new Error('DB down'))

    const req = createMockRequest('/api/auth/register', { method: 'POST', body: validBody })
    const res = await POST(req)
    expect(res.status).toBe(500)
  })
})
