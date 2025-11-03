import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // Dev server proxy to avoid CORS during development. Requests to /api/* will be
  // forwarded to the backend running on localhost:5000.
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
        // cookieDomainRewrite: "localhost" // enable if you need to rewrite cookie domain
      }
    }
  }
})
