# Architecture

## Pattern

Clean separation: pure logic module → thin React presentation layer.

`src/lib/strength.ts` owns the entire domain — charset analysis, entropy calculation (`length × log₂(charsetSize)`), score thresholding, and feedback generation. It has no React imports and no side effects. The React layer (`App.tsx`, `StrengthMeter.tsx`) is purely presentational: it owns input state, calls `analyzePassword()`, and renders the result.

## Data Flow

```
App.tsx  →  analyzePassword(password)  →  StrengthResult
                                              ↓
                                      StrengthMeter.tsx
```

`App.tsx` owns `password: string` state. On every render it calls `analyzePassword()` inline and passes the `StrengthResult` to `StrengthMeter` as a prop. No effects, no async, no context.

## Why

This structure makes the algorithm independently testable (Vitest, no DOM required), independently readable, and trivially replaceable. If the scoring algorithm changes, no React files need to touch.

## Key Decision: Entropy-Based Scoring

Password strength is measured by Shannon entropy (bits) rather than heuristics. Entropy = `length × log₂(charsetSize)` gives a continuous score that correctly rewards both longer passwords and broader character diversity. The five score bands map to entropy thresholds:

| Score | Label | Entropy |
|---|---|---|
| 0 | Very Weak | < 28 bits |
| 1 | Weak | 28–40 bits |
| 2 | Fair | 41–60 bits |
| 3 | Strong | 61–100 bits |
| 4 | Very Strong | > 100 bits |

Heuristic checks (uppercase, digits, symbols, length) are used only for feedback messages — they explain *what to improve*, not *how strong the password is*.

## CSS Architecture

`src/index.css` uses `@layer reset, base, components` with native CSS nesting and `oklch()` color tokens. Strength meter colors are bound via `[style*='--strength-score: N']` attribute selectors — no JavaScript color logic at runtime.
