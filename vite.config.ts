import { defineConfig, loadEnv } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'


function figmaAssetResolver() {
  return {
    name: 'figma-asset-resolver',
    resolveId(id: string) {
      if (id.startsWith('figma:asset/')) {
        const filename = id.replace('figma:asset/', '')
        return path.resolve(__dirname, 'src/assets', filename)
      }
    },
  }
}

function siteMetaHtml(env: Record<string, string>) {
  const siteUrl = (env.VITE_SITE_URL || '').replace(/\/$/, '')
  return {
    name: 'site-meta-html',
    transformIndexHtml(html: string) {
      return html.replaceAll('__SITE_URL__', siteUrl)
    },
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [
      figmaAssetResolver(),
      react(),
      tailwindcss(),
      siteMetaHtml(env),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    assetsInclude: ['**/*.svg', '**/*.csv'],
    server: {
      host: true,
      port: 5173,
      strictPort: false,
      open: false,
    },
    preview: {
      host: true,
      port: 4173,
      strictPort: false,
    },
  }
})
