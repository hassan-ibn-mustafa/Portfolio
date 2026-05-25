import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [react()],
    // Set VITE_BASE_URL to '/your-repo-name/' for GitHub Pages
    // e.g., VITE_BASE_URL=/portfolio/ in your .env.production
    base: env.VITE_BASE_URL || '/',
  }
})
