import { describe, it, expect } from 'vitest'
import { cn } from '@/lib/utils'

describe('cn (className merge utility)', () => {
  it('merges simple class names', () => {
    expect(cn('foo', 'bar')).toBe('foo bar')
  })

  it('handles conditional classes via clsx', () => {
    expect(cn('base', false && 'hidden', 'active')).toBe('base active')
  })

  it('resolves tailwind conflicts (last wins)', () => {
    const result = cn('p-4', 'p-2')
    expect(result).toBe('p-2')
  })

  it('keeps non-conflicting tailwind classes', () => {
    const result = cn('px-4', 'py-2')
    expect(result).toBe('px-4 py-2')
  })

  it('handles empty / undefined / null inputs', () => {
    expect(cn('')).toBe('')
    expect(cn(undefined)).toBe('')
    expect(cn(null)).toBe('')
    expect(cn()).toBe('')
  })

  it('accepts object syntax', () => {
    expect(cn({ 'text-red-500': true, hidden: false })).toBe('text-red-500')
  })

  it('accepts array syntax', () => {
    expect(cn(['flex', 'items-center'])).toBe('flex items-center')
  })
})
