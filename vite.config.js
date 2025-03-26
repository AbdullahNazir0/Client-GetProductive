import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), tailwindcss()],
  server: {
      historyApiFallback: true // Ensures SPA routing works
  },
  base: '/',  // Ensure correct base path
  build: {
    outDir: 'dist'
  }
})
