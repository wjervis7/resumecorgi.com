import fs from 'fs'
import path from 'path'
import type { Plugin } from 'vite'

export function copyPdfjsWorker(): Plugin {
  return {
    name: 'copy-pdfjs-worker',
    async buildStart() {
      const sourcePath = path.resolve('node_modules/pdfjs-dist/build/pdf.worker.min.mjs')
      const destPath = path.resolve('public', 'pdf.worker.min.mjs')

      try {
        if (fs.existsSync(sourcePath)) {
          if (!fs.existsSync(path.resolve('public'))) {
            fs.mkdirSync(path.resolve('public'), { recursive: true })
          }
          
          fs.copyFileSync(sourcePath, destPath)
          console.log(`Copied PDF.js worker to public directory`)
        } else {
          console.warn(`PDF.js worker not found at ${sourcePath}`)
        }
      } catch (error) {
        console.error('Error during extraction or copying:', error)
      }
    }
  }
}