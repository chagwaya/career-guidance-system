import { describe, it, expect, beforeEach } from 'vitest'
import { prismaMock } from '../mocks/prisma'
import { createMockRequest } from '../helpers'
import { GET } from '@/app/api/admin/messages/route'

beforeEach(() => {
  Object.values(prismaMock).forEach((model) =>
    Object.values(model).forEach((fn) => (fn as ReturnType<typeof import('vitest').vi.fn>).mockReset())
  )
})

describe('GET /api/admin/messages', () => {
  it('returns 401 without admin header', async () => {
    const req = createMockRequest('/api/admin/messages')
    const res = await GET(req)
    expect(res.status).toBe(401)
  })

  it('returns grouped messages when authenticated', async () => {
    prismaMock.admin.findUnique.mockResolvedValue({ id: 'a1', email: 'admin@cp.ke' })

    const now = new Date()
    prismaMock.counselorMessage.findMany
      .mockResolvedValueOnce([ // student messages (fromStudent: true)
        {
          id: 'm1',
          studentId: 's1',
          message: 'Help me',
          fromStudent: true,
          timestamp: now,
          student: { id: 's1', name: 'Jane', email: 'j@t.com', school: 'Stare', county: 'Nairobi' },
        },
      ])
      .mockResolvedValueOnce([ // response messages (fromStudent: false)
        { id: 'm2', studentId: 's1', message: 'Sure', fromStudent: false, timestamp: now },
      ])

    const req = createMockRequest('/api/admin/messages', {
      headers: { 'x-admin-email': 'admin@cp.ke' },
    })
    const res = await GET(req)
    const data = await res.json()

    expect(res.status).toBe(200)
    expect(Array.isArray(data)).toBe(true)
    expect(data).toHaveLength(1)
    expect(data[0].student.name).toBe('Jane')
    expect(data[0].hasResponded).toBe(true)
  })
})
