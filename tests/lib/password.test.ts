import { describe, it, expect } from 'vitest'
import { hashPassword, verifyPassword } from '@/lib/password'

describe('password hashing', () => {
  it('hashPassword returns a bcrypt hash', async () => {
    const hash = await hashPassword('mySecret')
    expect(hash).toBeTruthy()
    expect(hash).not.toBe('mySecret')
    // bcrypt hashes start with $2a$ or $2b$
    expect(hash).toMatch(/^\$2[ab]\$/)
  })

  it('same password produces different hashes (salted)', async () => {
    const hash1 = await hashPassword('same')
    const hash2 = await hashPassword('same')
    expect(hash1).not.toBe(hash2)
  })

  it('verifyPassword returns true for correct password', async () => {
    const hash = await hashPassword('correct')
    const result = await verifyPassword('correct', hash)
    expect(result).toBe(true)
  })

  it('verifyPassword returns false for wrong password', async () => {
    const hash = await hashPassword('correct')
    const result = await verifyPassword('wrong', hash)
    expect(result).toBe(false)
  })

  it('verifyPassword returns false for empty password', async () => {
    const hash = await hashPassword('secret')
    const result = await verifyPassword('', hash)
    expect(result).toBe(false)
  })

  it('handles unicode passwords', async () => {
    const hash = await hashPassword('пароль123')
    expect(await verifyPassword('пароль123', hash)).toBe(true)
    expect(await verifyPassword('пароль124', hash)).toBe(false)
  })
})
