import { describe, it, expect, beforeEach } from 'vitest'
import { prismaMock } from '../mocks/prisma'
import { createMockRequest } from '../helpers'
import { POST } from '@/app/api/auth/login/route'
import { hashPassword } from '@/lib/password'

beforeEach(() => {
  Object.values(prismaMock).forEach((model) =>
    Object.values(model).forEach((fn) => (fn as ReturnType<typeof import('vitest').vi.fn>).mockReset())
  )
})

describe('POST /api/auth/login (admin)', () => {
  it('returns admin data on valid credentials', async () => {
    const hashed = await hashPassword('admin123')
    prismaMock.admin.findUnique.mockResolvedValue({
      id: 'a1',
      name: 'Admin',
      email: 'admin@careerpath.ke',
      password: hashed,
      role: 'admin',
      createdAt: new Date(),
    })

    const req = createMockRequest('/api/auth/login', {
      method: 'POST',
      body: { email: 'admin@careerpath.ke', password: 'admin123' },
    })
    const res = await POST(req)
    const data = await res.json()

    expect(res.status).toBe(200)
    expect(data.email).toBe('admin@careerpath.ke')
    expect(data.role).toBe('admin')
    expect(data).not.toHaveProperty('password')
  })

  it('returns 400 when email or password missing', async () => {
    const req = createMockRequest('/api/auth/login', {
      method: 'POST',
      body: { email: 'admin@test.com' },
    })
    const res = await POST(req)
    expect(res.status).toBe(400)
  })

  it('returns 401 for non-existent admin', async () => {
    prismaMock.admin.findUnique.mockResolvedValue(null)

    const req = createMockRequest('/api/auth/login', {
      method: 'POST',
      body: { email: 'nobody@test.com', password: 'pass' },
    })
    const res = await POST(req)
    expect(res.status).toBe(401)
  })

  it('returns 401 for wrong password', async () => {
    const hashed = await hashPassword('correct')
    prismaMock.admin.findUnique.mockResolvedValue({
      id: 'a1',
      email: 'admin@test.com',
      password: hashed,
    })

    const req = createMockRequest('/api/auth/login', {
      method: 'POST',
      body: { email: 'admin@test.com', password: 'wrong' },
    })
    const res = await POST(req)
    expect(res.status).toBe(401)
  })
})
