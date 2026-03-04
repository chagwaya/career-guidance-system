/**
 * Shared mock for @/lib/prisma used across all API route tests.
 *
 * Each model exposes vi.fn() stubs so individual tests can configure
 * return values with mockResolvedValue / mockRejectedValue.
 */
import { vi } from 'vitest'

export const prismaMock = {
  student: {
    findUnique: vi.fn(),
    findMany: vi.fn(),
    findFirst: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    count: vi.fn(),
  },
  admin: {
    findUnique: vi.fn(),
  },
  assessmentResult: {
    findFirst: vi.fn(),
    create: vi.fn(),
    count: vi.fn(),
  },
  counselorMessage: {
    findMany: vi.fn(),
    create: vi.fn(),
    count: vi.fn(),
  },
  subjectGrade: {
    findMany: vi.fn(),
  },
}

// Auto-mock the prisma module so every `import { prisma }` gets prismaMock
vi.mock('@/lib/prisma', () => ({ prisma: prismaMock }))
