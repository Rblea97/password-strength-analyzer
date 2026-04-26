import { useState, useId } from 'react'
import { analyzePassword } from './lib/strength'
import { StrengthMeter } from './components/StrengthMeter'

export default function App() {
  const [password, setPassword] = useState('')
  const [visible, setVisible] = useState(false)
  const inputId = useId()

  const result = analyzePassword(password)

  return (
    <main className="app">
      <div className="card">
        <h1 className="card-title">Password Strength</h1>

        <div className="input-group">
          <label htmlFor={inputId} className="input-label">
            Password
          </label>
          <div className="input-wrapper">
            <input
              id={inputId}
              className="password-input"
              type={visible ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Type a password…"
              autoComplete="new-password"
              spellCheck={false}
            />
            <button
              type="button"
              className="visibility-toggle"
              onClick={() => setVisible((v) => !v)}
              aria-label={visible ? 'Hide password' : 'Show password'}
            >
              {visible ? 'Hide' : 'Show'}
            </button>
          </div>
        </div>

        <StrengthMeter result={result} />
      </div>
    </main>
  )
}
