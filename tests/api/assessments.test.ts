import { describe, it, expect, beforeEach } from 'vitest'
import { prismaMock } from '../mocks/prisma'
import { createMockRequest } from '../helpers'
import { GET, POST } from '@/app/api/assessments/route'

beforeEach(() => {
  Object.values(prismaMock).forEach((model) =>
    Object.values(model).forEach((fn) => (fn as ReturnType<typeof import('vitest').vi.fn>).mockReset())
  )
})

const mockAssessment = {
  id: 'a1',
  studentId: 's1',
  personalityType: 'Investigative',
  interests: ['bio_health', 'math_stats'],
  strengths: ['analyze', 'research'],
  scores: { realistic: 5, investigative: 25, artistic: 10, social: 12, enterprising: 8, conventional: 15 },
  completedAt: new Date(),
}

describe('GET /api/assessments', () => {
  it('returns the latest assessment for a student', async () => {
    prismaMock.assessmentResult.findFirst.mockResolvedValue(mockAssessment)

    const req = createMockRequest('/api/assessments', { searchParams: { studentId: 's1' } })
    const res = await GET(req)
    const data = await res.json()

    expect(res.status).toBe(200)
    expect(data.personalityType).toBe('Investigative')
    expect(data.scores.investigative).toBe(25)
  })

  it('returns 400 when studentId is missing', async () => {
    const req = createMockRequest('/api/assessments')
    const res = await GET(req)
    expect(res.status).toBe(400)
  })

  it('returns 404 when no assessment found', async () => {
    prismaMock.assessmentResult.findFirst.mockResolvedValue(null)

    const req = createMockRequest('/api/assessments', { searchParams: { studentId: 'nobody' } })
    const res = await GET(req)
    expect(res.status).toBe(404)
  })
})

describe('POST /api/assessments', () => {
  it('creates a new assessment and returns 201', async () => {
    prismaMock.assessmentResult.create.mockResolvedValue(mockAssessment)

    const req = createMockRequest('/api/assessments', {
      method: 'POST',
      body: {
        studentId: 's1',
        personalityType: 'Investigative',
        interests: ['bio_health'],
        strengths: ['analyze'],
        scores: mockAssessment.scores,
      },
    })
    const res = await POST(req)

    expect(res.status).toBe(201)
    const data = await res.json()
    expect(data.studentId).toBe('s1')
  })

  it('returns 400 when required fields missing', async () => {
    const req = createMockRequest('/api/assessments', {
      method: 'POST',
      body: { studentId: 's1' }, // missing personalityType and scores
    })
    const res = await POST(req)
    expect(res.status).toBe(400)
  })

  it('returns 500 on database error', async () => {
    prismaMock.assessmentResult.create.mockRejectedValue(new Error('fk'))

    const req = createMockRequest('/api/assessments', {
      method: 'POST',
      body: {
        studentId: 's1',
        personalityType: 'Realistic',
        scores: { realistic: 10, investigative: 5, artistic: 5, social: 5, enterprising: 5, conventional: 5 },
      },
    })
    const res = await POST(req)
    expect(res.status).toBe(500)
  })
})
