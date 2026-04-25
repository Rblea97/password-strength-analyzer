import type { CSSProperties } from 'react'
import type { StrengthResult } from '../lib/strength'

interface Props {
  result: StrengthResult
}

const SEGMENT_COUNT = 5

export function StrengthMeter({ result }: Props) {
  const { score, label, entropy, feedback } = result
  // filledCount: 0 for empty input (entropy=0), otherwise score+1 so meter fully fills at max strength
  const filledCount = entropy === 0 ? 0 : score + 1

  return (
    <div
      className="strength-meter"
      style={{ '--strength-score': score } as CSSProperties}
      role="meter"
      aria-valuenow={score}
      aria-valuemin={0}
      aria-valuemax={4}
      aria-label="Password strength"
    >
      <div className="strength-segments">
        {Array.from({ length: SEGMENT_COUNT }, (_, i) => (
          <div
            key={i}
            className="strength-segment"
            data-active={i < filledCount ? 'true' : 'false'}
          />
        ))}
      </div>

      <p className="strength-label">
        {entropy > 0 ? `${label} — ${entropy.toFixed(1)} bits` : ' '}
      </p>

      <ul className="feedback-list" aria-live="polite" aria-atomic="false">
        {feedback.map((msg) => (
          <li key={msg}>{msg}</li>
        ))}
      </ul>
    </div>
  )
}
