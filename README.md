# Password Strength Analyzer

Real-time password strength analyzer — estimates entropy in bits and gives actionable feedback. Built as a React 19 + TypeScript portfolio project exercising a full CI/CD lifecycle.

**[Live Demo](https://Rblea97.github.io/password-strength-analyzer/)**

![CI](https://github.com/Rblea97/password-strength-analyzer/actions/workflows/ci.yml/badge.svg)

## Tech Stack

| Tool | Version | Why |
|---|---|---|
| React 19 | 19.x | Latest stable; `useId`, `useState` — compiler-ready, no manual memoization |
| TypeScript | 6.x | `strict` + `noUncheckedIndexedAccess` + `exactOptionalPropertyTypes` |
| Vite | 8.x | Sub-second HMR, native ESM, zero config |
| Vitest | 4.x | Native Vite integration, inline config, no test runner overhead |
| CSS | Native | `@layer`, `oklch()`, native nesting — no preprocessor or CSS-in-JS |

## Features

- Real-time entropy calculation (bits) as you type
- 5-segment visual strength meter with smooth color transitions
- Actionable feedback for every missing character class
- Show/hide password toggle
- Fully accessible: `role="meter"`, `aria-live` feedback list, `useId()` label binding

## Quick Start

```bash
pnpm install
pnpm dev
```

Open `http://localhost:5173/password-strength-analyzer/`

## Challenges + Solutions

**Overflow-safe entropy:** `Math.log2(charsetSize ** length)` overflows to `Infinity` for long passwords. Fixed by rewriting as `length * Math.log2(charsetSize)` — mathematically equivalent and numerically stable for any input length.

**CSS color progression without JS:** Strength level colors (red → green) are driven entirely by a `--strength-score` CSS custom property set inline on the meter element. Attribute selectors (`[style*='--strength-score: N']`) bind each score to its `oklch()` color token — zero JS needed for color transitions, no runtime style injection.

## Architecture

Pure logic/UI separation: `src/lib/strength.ts` is a dependency-free TypeScript module with zero React coupling — the entire scoring and feedback algorithm lives there and is unit-tested in isolation. React is a thin display layer. See [ARCHITECTURE.md](./ARCHITECTURE.md).

## License

MIT
