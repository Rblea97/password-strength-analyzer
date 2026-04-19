/// <reference types="vitest/config" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/password-strength-analyzer/',
  test: {
    environment: 'node',
    globals: true,
  },
})
