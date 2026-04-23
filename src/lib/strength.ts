export type StrengthScore = 0 | 1 | 2 | 3 | 4

export type StrengthLabel = 'Very Weak' | 'Weak' | 'Fair' | 'Strong' | 'Very Strong'

export interface StrengthResult {
  readonly score: StrengthScore
  readonly label: StrengthLabel
  readonly entropy: number
  readonly feedback: readonly string[]
}

const LABELS = {
  0: 'Very Weak',
  1: 'Weak',
  2: 'Fair',
  3: 'Strong',
  4: 'Very Strong',
} as const satisfies Record<StrengthScore, StrengthLabel>

function computeCharsetSize(password: string): number {
  let size = 0
  if (/[a-z]/.test(password)) size += 26
  if (/[A-Z]/.test(password)) size += 26
  if (/[0-9]/.test(password)) size += 10
  if (/[^a-zA-Z0-9]/.test(password)) size += 32
  return size
}

function scoreFromEntropy(entropy: number): StrengthScore {
  if (entropy < 28) return 0
  if (entropy < 41) return 1
  if (entropy < 61) return 2
  if (entropy <= 100) return 3
  return 4
}

export function analyzePassword(password: string): StrengthResult {
  if (password.length === 0) {
    return { score: 0, label: LABELS[0], entropy: 0, feedback: ['Enter a password'] }
  }

  const charsetSize = computeCharsetSize(password)
  // Multiply logs to avoid overflow on very long passwords (log2(size^len) = len * log2(size))
  const entropy = password.length * Math.log2(charsetSize)
  const score = scoreFromEntropy(entropy)

  const feedback: string[] = []
  if (password.length < 8) feedback.push('Too short — use at least 8 characters')
  if (!/[A-Z]/.test(password)) feedback.push('Add uppercase letters')
  if (!/[0-9]/.test(password)) feedback.push('Add numbers')
  if (!/[^a-zA-Z0-9]/.test(password)) feedback.push('Add symbols (!@#$…)')

  return { score, label: LABELS[score], entropy, feedback }
}
