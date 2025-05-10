import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'src': '/src',
    }
  },
  server: {
    proxy: {
      '/api/level_session/level_n2_ws': {
        target: 'ws://localhost:8000',
        rewriteWsOrigin: true,
        ws: true,
      },
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
      },
      '/openapi.json': {
        target: 'http://localhost:8000',
        changeOrigin: true,
      },
      '/docs': {
        target: 'http://localhost:8000',
        changeOrigin: true,
      }
    }
  },
})
