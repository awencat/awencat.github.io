import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  base: './',
  plugins: [vue()],
  build: {
    // MdEditorV3 bundles editor, preview and syntax highlighters in a lazy route chunk.
    chunkSizeWarningLimit: 1100,
  },
  test: {
    environment: 'jsdom',
  },
})
