import { describe, it, expect, vi } from 'vitest'
import { createMockRequest } from '../helpers'
import { POST } from '@/app/api/recommendations/route'

describe('POST /api/recommendations', () => {
  it('returns sorted recommendations', async () => {
    const scores = {
      realistic: 10,
      investigative: 30,
      artistic: 5,
      social: 15,
      enterprising: 10,
      conventional: 10,
    }

    const req = createMockRequest('/api/recommendations', {
      method: 'POST',
      body: { scores },
    })
    const res = await POST(req)
    const data = await res.json()

    expect(res.status).toBe(200)
    expect(Array.isArray(data)).toBe(true)
    expect(data.length).toBeGreaterThan(0)

    // Verify sorted descending by matchScore
    for (let i = 1; i < data.length; i++) {
      expect(data[i - 1].matchScore).toBeGreaterThanOrEqual(data[i].matchScore)
    }
  })

  it('returns 400 when scores missing', async () => {
    const req = createMockRequest('/api/recommendations', {
      method: 'POST',
      body: {},
    })
    const res = await POST(req)
    expect(res.status).toBe(400)
  })
})
