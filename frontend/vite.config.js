import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Build straight into backend/static so the FastAPI server serves the SPA
// (single origin: no CORS needed in production).
export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    outDir: '../backend/static',
    emptyOutDir: true,
  },
  server: {
    port: 5173,
    proxy: {
      '/api': 'http://localhost:8000',
    },
  },
})
