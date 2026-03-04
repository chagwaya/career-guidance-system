import { describe, it, expect, beforeEach } from 'vitest'
import { prismaMock } from '../mocks/prisma'
import { createMockRequest } from '../helpers'
import { GET } from '@/app/api/admin/students/route'

beforeEach(() => {
  Object.values(prismaMock).forEach((model) =>
    Object.values(model).forEach((fn) => (fn as ReturnType<typeof import('vitest').vi.fn>).mockReset())
  )
})

describe('GET /api/admin/students', () => {
  it('returns 401 when x-admin-email header is missing', async () => {
    const req = createMockRequest('/api/admin/students')
    const res = await GET(req)
    expect(res.status).toBe(401)
  })

  it('returns 401 when admin email not found in DB', async () => {
    prismaMock.admin.findUnique.mockResolvedValue(null)

    const req = createMockRequest('/api/admin/students', {
      headers: { 'x-admin-email': 'fake@test.com' },
    })
    const res = await GET(req)
    expect(res.status).toBe(401)
  })

  it('returns students when admin is authenticated', async () => {
    prismaMock.admin.findUnique.mockResolvedValue({
      id: 'a1',
      email: 'admin@cp.ke',
      name: 'Admin',
      role: 'admin',
    })
    prismaMock.student.findMany.mockResolvedValue([
      { id: 's1', name: 'Student 1', subjects: [], assessments: [], _count: { messages: 2 } },
    ])

    const req = createMockRequest('/api/admin/students', {
      headers: { 'x-admin-email': 'admin@cp.ke' },
    })
    const res = await GET(req)
    const data = await res.json()

    expect(res.status).toBe(200)
    expect(Array.isArray(data)).toBe(true)
    expect(data).toHaveLength(1)
  })
})
