import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // '@devtools-dash': '/src',
      '@devtools-dash': path.resolve(__dirname, './src'),
    }
  },
  server: {
    proxy: {
      '/api/level/network/level_n2_ws': {
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
