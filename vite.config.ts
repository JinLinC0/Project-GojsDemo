import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/Project-GojsDemo/',
  build: {
    outDir: 'docs'
  },
  plugins: [vue()],
})
