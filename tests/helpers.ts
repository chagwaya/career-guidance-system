/**
 * Helper to build a NextRequest usable in route handler tests.
 */
import { NextRequest } from 'next/server'

interface RequestOptions {
  method?: string
  body?: unknown
  searchParams?: Record<string, string>
  headers?: Record<string, string>
}

export function createMockRequest(url: string, opts: RequestOptions = {}): NextRequest {
  const { method = 'GET', body, searchParams, headers = {} } = opts

  const base = new URL(url, 'http://localhost:3000')
  if (searchParams) {
    Object.entries(searchParams).forEach(([k, v]) => base.searchParams.set(k, v))
  }

  const init: RequestInit = { method, headers }
  if (body !== undefined) {
    init.body = JSON.stringify(body)
    ;(init.headers as Record<string, string>)['Content-Type'] = 'application/json'
  }

  return new NextRequest(base, init)
}
