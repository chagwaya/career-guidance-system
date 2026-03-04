import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

/**
 * Validates that the request includes a valid admin session.
 * Expects an `x-admin-email` header set by the client from its stored session.
 * Returns the admin record on success, or a 401 NextResponse on failure.
 */
export async function requireAdmin(request: NextRequest) {
  const email = request.headers.get('x-admin-email')

  if (!email) {
    return NextResponse.json(
      { error: 'Unauthorized — admin email header missing' },
      { status: 401 },
    )
  }

  try {
    const admin = await prisma.admin.findUnique({ where: { email } })

    if (!admin) {
      return NextResponse.json(
        { error: 'Unauthorized — admin not found' },
        { status: 401 },
      )
    }

    return admin
  } catch {
    return NextResponse.json(
      { error: 'Authorization check failed' },
      { status: 500 },
    )
  }
}

/** Type guard to check if requireAdmin returned an error response. */
export function isAuthError(
  result: Awaited<ReturnType<typeof requireAdmin>>,
): result is NextResponse<{ error: string }> {
  return result instanceof NextResponse
}
