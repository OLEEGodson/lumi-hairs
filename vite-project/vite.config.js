import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'

// Serve-from path. Change this one value to host the app under a sub-path
// (e.g. '/lumi-hairs/' for GitHub Pages); both Vite's `base` and the router
// basename follow it.
const BASE = '/'

// https://vite.dev/config/
export default defineConfig({
  base: BASE,
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  define: {
    __BASE_PATH__: JSON.stringify(BASE),
  },
})
