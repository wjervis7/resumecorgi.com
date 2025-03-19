import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import { extractAndCopySwiftLaTeX } from './vite.swiftlatex'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    extractAndCopySwiftLaTeX()
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
