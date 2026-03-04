import { describe, it, expect, beforeEach } from 'vitest'
import { prismaMock } from '../mocks/prisma'
import { createMockRequest } from '../helpers'
import { GET } from '@/app/api/admin/stats/route'

beforeEach(() => {
  Object.values(prismaMock).forEach((model) =>
    Object.values(model).forEach((fn) => (fn as ReturnType<typeof import('vitest').vi.fn>).mockReset())
  )
})

describe('GET /api/admin/stats', () => {
  it('returns 401 without admin header', async () => {
    const req = createMockRequest('/api/admin/stats')
    const res = await GET(req)
    expect(res.status).toBe(401)
  })

  it('returns stats when authenticated', async () => {
    prismaMock.admin.findUnique.mockResolvedValue({ id: 'a1', email: 'admin@cp.ke' })
    prismaMock.student.count.mockResolvedValue(25)
    prismaMock.assessmentResult.count.mockResolvedValue(18)
    prismaMock.counselorMessage.count.mockResolvedValue(42)
    prismaMock.student.findMany
      .mockResolvedValueOnce([{ school: 'A' }, { school: 'B' }]) // schoolCount
      .mockResolvedValueOnce([{ id: 's1' }, { id: 's2' }]) // recentStudents

    const req = createMockRequest('/api/admin/stats', {
      headers: { 'x-admin-email': 'admin@cp.ke' },
    })
    const res = await GET(req)
    const data = await res.json()

    expect(res.status).toBe(200)
    expect(data.totalStudents).toBe(25)
    expect(data.completedAssessments).toBe(18)
    expect(data.totalMessages).toBe(42)
    expect(data.schoolCount).toBe(2)
  })
})
