# Password Strength Analyzer

Real-time password strength scoring based on Shannon entropy — see exactly how secure your password is as you type.

[![CI](https://github.com/Rblea97/password-strength-analyzer/actions/workflows/ci.yml/badge.svg)](https://github.com/Rblea97/password-strength-analyzer/actions)
[![Live Demo](https://img.shields.io/badge/Live_Demo-blue?logo=github&logoColor=white)](https://Rblea97.github.io/password-strength-analyzer/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

![Password Strength Analyzer demo](src/assets/hero.png)

## Features

- Type a password and watch the strength score update instantly
- A 5-level meter (Very Weak → Very Strong) shows where you stand at a glance
- Get specific tips on which character classes to add to improve your score
- Toggle password visibility while you type
- Fully keyboard-navigable and screen-reader compatible

## Tech Stack

![React 19](https://img.shields.io/badge/React_19-20232A?logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)
![Vitest](https://img.shields.io/badge/Vitest-6E9F18?logo=vitest&logoColor=white)
![Native CSS](https://img.shields.io/badge/Native_CSS-1572B6?logo=css3&logoColor=white)

**React 19** — `useId()` for accessible label binding; compiler-ready, no manual memoization needed.  
**TypeScript** — strict + `noUncheckedIndexedAccess` + `exactOptionalPropertyTypes` catches class-level bugs at compile time.  
**Vite** — sub-second HMR, native ESM, zero config overhead.  
**Vitest** — shares Vite's transform pipeline; no separate test runner setup.  
**Native CSS** — `@layer`, `oklch()` color tokens, native nesting — no preprocessor or CSS-in-JS.

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
