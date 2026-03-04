import { describe, it, expect, beforeEach } from 'vitest'
import { prismaMock } from '../mocks/prisma'
import { createMockRequest } from '../helpers'
import { GET, POST } from '@/app/api/messages/route'

beforeEach(() => {
  Object.values(prismaMock).forEach((model) =>
    Object.values(model).forEach((fn) => (fn as ReturnType<typeof import('vitest').vi.fn>).mockReset())
  )
})

describe('GET /api/messages', () => {
  it('returns messages for a student', async () => {
    prismaMock.counselorMessage.findMany.mockResolvedValue([
      { id: 'm1', studentId: 's1', message: 'Hello', fromStudent: true, timestamp: new Date() },
      { id: 'm2', studentId: 's1', message: 'Hi there', fromStudent: false, timestamp: new Date() },
    ])

    const req = createMockRequest('/api/messages', { searchParams: { studentId: 's1' } })
    const res = await GET(req)
    const data = await res.json()

    expect(res.status).toBe(200)
    expect(data).toHaveLength(2)
  })

  it('returns 400 when studentId missing', async () => {
    const req = createMockRequest('/api/messages')
    const res = await GET(req)
    expect(res.status).toBe(400)
  })
})

describe('POST /api/messages', () => {
  it('creates a message and returns 201', async () => {
    const saved = { id: 'm3', studentId: 's1', message: 'Need help', fromStudent: true, timestamp: new Date() }
    prismaMock.counselorMessage.create.mockResolvedValue(saved)

    const req = createMockRequest('/api/messages', {
      method: 'POST',
      body: { studentId: 's1', message: 'Need help', fromStudent: true },
    })
    const res = await POST(req)

    expect(res.status).toBe(201)
    const data = await res.json()
    expect(data.message).toBe('Need help')
  })

  it('returns 400 when fields missing', async () => {
    const req = createMockRequest('/api/messages', {
      method: 'POST',
      body: { studentId: 's1', message: 'hi' }, // missing fromStudent
    })
    const res = await POST(req)
    expect(res.status).toBe(400)
  })

  it('returns 400 when fromStudent is not a boolean', async () => {
    const req = createMockRequest('/api/messages', {
      method: 'POST',
      body: { studentId: 's1', message: 'hi', fromStudent: 'yes' },
    })
    const res = await POST(req)
    expect(res.status).toBe(400)
  })
})
