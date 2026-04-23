import { describe, it, expect } from 'vitest'
import { analyzePassword } from './strength'

describe('analyzePassword', () => {
  describe('empty input', () => {
    it('returns score 0, entropy 0, and enter-password feedback', () => {
      const result = analyzePassword('')
      expect(result.score).toBe(0)
      expect(result.entropy).toBe(0)
      expect(result.label).toBe('Very Weak')
      expect(result.feedback).toEqual(['Enter a password'])
    })
  })

  describe('score 0 — Very Weak', () => {
    it('"abc": entropy ~14 bits, score 0, includes Too short feedback', () => {
      const result = analyzePassword('abc')
      expect(result.score).toBe(0)
      expect(result.entropy).toBeCloseTo(14.1, 0)
      expect(result.feedback).toContain('Too short — use at least 8 characters')
    })
  })

  describe('score 1 — Weak', () => {
    it('"password": entropy ~38 bits, score 1, missing uppercase/numbers/symbols feedback', () => {
      const result = analyzePassword('password')
      expect(result.score).toBe(1)
      expect(result.entropy).toBeCloseTo(37.6, 0)
      expect(result.feedback).toContain('Add uppercase letters')
      expect(result.feedback).toContain('Add numbers')
      expect(result.feedback).toContain('Add symbols (!@#$…)')
    })
  })

  describe('score 2 — Fair', () => {
    it('"P@ssw0rd": entropy ~52 bits, score 2, no feedback', () => {
      const result = analyzePassword('P@ssw0rd')
      expect(result.score).toBe(2)
      expect(result.entropy).toBeCloseTo(52.4, 0)
      expect(result.feedback).toHaveLength(0)
    })
  })

  describe('score 3 — Strong', () => {
    it('"X9$mK#2pQr": entropy ~66 bits, score 3, no feedback', () => {
      const result = analyzePassword('X9$mK#2pQr')
      expect(result.score).toBe(3)
      expect(result.entropy).toBeCloseTo(65.5, 0)
      expect(result.feedback).toHaveLength(0)
    })
  })

  describe('score 4 — Very Strong', () => {
    it('"X9$mK#2pQrL!vN8@zW": entropy ~118 bits, score 4, no feedback', () => {
      const result = analyzePassword('X9$mK#2pQrL!vN8@zW')
      expect(result.score).toBe(4)
      expect(result.entropy).toBeCloseTo(117.97, 0)
      expect(result.feedback).toHaveLength(0)
    })
  })

  describe('individual feedback triggers', () => {
    it('triggers only "Add uppercase letters" when only uppercase is missing', () => {
      const result = analyzePassword('abc123!@#')
      expect(result.feedback).toContain('Add uppercase letters')
      expect(result.feedback).not.toContain('Add numbers')
      expect(result.feedback).not.toContain('Add symbols (!@#$…)')
      expect(result.feedback).not.toContain('Too short — use at least 8 characters')
    })

    it('triggers only "Add numbers" when only digits are missing', () => {
      const result = analyzePassword('Abcdef!@#')
      expect(result.feedback).toContain('Add numbers')
      expect(result.feedback).not.toContain('Add uppercase letters')
      expect(result.feedback).not.toContain('Add symbols (!@#$…)')
    })

    it('triggers only "Add symbols" when only symbols are missing', () => {
      const result = analyzePassword('Abcdef12')
      expect(result.feedback).toContain('Add symbols (!@#$…)')
      expect(result.feedback).not.toContain('Add uppercase letters')
      expect(result.feedback).not.toContain('Add numbers')
    })

    it('triggers "Too short" for passwords under 8 characters', () => {
      expect(analyzePassword('Ab1!').feedback).toContain('Too short — use at least 8 characters')
    })
  })

  describe('label matches score', () => {
    it('returns correct label for each score', () => {
      expect(analyzePassword('').label).toBe('Very Weak')
      expect(analyzePassword('password').label).toBe('Weak')
      expect(analyzePassword('P@ssw0rd').label).toBe('Fair')
      expect(analyzePassword('X9$mK#2pQr').label).toBe('Strong')
      expect(analyzePassword('X9$mK#2pQrL!vN8@zW').label).toBe('Very Strong')
    })
  })
})
