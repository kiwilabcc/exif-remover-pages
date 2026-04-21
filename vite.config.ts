import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'path'
import { readdirSync, readFileSync, writeFileSync } from 'node:fs'

function injectScreenshotAssetHints() {
  return {
    name: 'inject-screenshot-asset-hints',
    closeBundle() {
      const distDir = resolve(__dirname, 'dist')
      const assetsDir = resolve(distDir, 'assets')
      const indexPath = resolve(distDir, 'index.html')

      const screenshotAssets = readdirSync(assetsDir)
        .filter((fileName) => /\.(png|jpg|jpeg|webp)$/i.test(fileName))
        .map((fileName) => `  <meta name="app-screenshot" content="/assets/${fileName}" />`)
        .join('\n')

      if (!screenshotAssets) {
        return
      }

      const indexHtml = readFileSync(indexPath, 'utf-8')
      if (indexHtml.includes('name="app-screenshot"')) {
        return
      }

      writeFileSync(
        indexPath,
        indexHtml.replace('</head>', `${screenshotAssets}\n  </head>`),
      )
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
    injectScreenshotAssetHints(),
  ],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        privacy: resolve(__dirname, 'privacy/index.html'),
        terms: resolve(__dirname, 'terms/index.html'),
        support: resolve(__dirname, 'support/index.html'),
      },
    },
  },
})
