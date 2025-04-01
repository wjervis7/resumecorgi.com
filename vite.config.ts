import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import { extractAndCopySwiftLaTeX } from './plugins/vite.swiftlatex'
import { copyPdfjsWorker } from './plugins/vite.pdfjs'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    copyPdfjsWorker(),
    extractAndCopySwiftLaTeX(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
