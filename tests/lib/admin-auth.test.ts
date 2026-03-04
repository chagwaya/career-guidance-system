import { describe, it, expect, beforeEach } from 'vitest'
import { NextResponse } from 'next/server'
import { prismaMock } from '../mocks/prisma'
import { createMockRequest } from '../helpers'
import { requireAdmin, isAuthError } from '@/lib/admin-auth'

beforeEach(() => {
  Object.values(prismaMock).forEach((model) =>
    Object.values(model).forEach((fn) => (fn as ReturnType<typeof import('vitest').vi.fn>).mockReset())
  )
})

describe('requireAdmin', () => {
  it('returns 401 when x-admin-email header is missing', async () => {
    const req = createMockRequest('/api/admin/test')
    const result = await requireAdmin(req)
    expect(result).toBeInstanceOf(NextResponse)
    expect(isAuthError(result)).toBe(true)
  })

  it('returns 401 when admin not found in DB', async () => {
    prismaMock.admin.findUnique.mockResolvedValue(null)

    const req = createMockRequest('/api/admin/test', {
      headers: { 'x-admin-email': 'unknown@test.com' },
    })
    const result = await requireAdmin(req)
    expect(isAuthError(result)).toBe(true)
  })

  it('returns admin record on success', async () => {
    const admin = { id: 'a1', email: 'admin@cp.ke', name: 'Admin', role: 'admin' }
    prismaMock.admin.findUnique.mockResolvedValue(admin)

    const req = createMockRequest('/api/admin/test', {
      headers: { 'x-admin-email': 'admin@cp.ke' },
    })
    const result = await requireAdmin(req)
    expect(isAuthError(result)).toBe(false)
    expect(result).toEqual(admin)
  })

  it('returns 500 when DB throws', async () => {
    prismaMock.admin.findUnique.mockRejectedValue(new Error('DB down'))

    const req = createMockRequest('/api/admin/test', {
      headers: { 'x-admin-email': 'admin@cp.ke' },
    })
    const result = await requireAdmin(req)
    expect(isAuthError(result)).toBe(true)
  })
})

describe('isAuthError', () => {
  it('returns true for NextResponse instances', () => {
    const res = NextResponse.json({ error: 'nope' }, { status: 401 })
    // Cast to match the expected type
    expect(isAuthError(res as Awaited<ReturnType<typeof requireAdmin>>)).toBe(true)
  })

  it('returns false for plain objects', () => {
    const admin = { id: 'a1', email: 'x', password: 'h', name: 'A', role: 'admin', createdAt: new Date() }
    expect(isAuthError(admin)).toBe(false)
  })
})
