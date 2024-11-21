import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { fileURLToPath } from 'url'

// 添加 ESM 支持的 __dirname 替代方案
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default defineConfig({
  plugins: [
    vue(),
    {
      name: 'content-type-handler',
      configureServer(server) {
        return () => {
          server.middlewares.use((req, res, next) => {
            // 处理 sitemap.xml
            if (req.url.endsWith('sitemap.xml')) {
              res.setHeader('Content-Type', 'application/xml; charset=utf-8')
            }
            // 处理 JavaScript 模块
            else if (req.url.endsWith('.js')) {
              res.setHeader('Content-Type', 'text/javascript; charset=utf-8')
            }
            // 处理 HTML
            else if (req.url === '/' || req.url.endsWith('.html')) {
              res.setHeader('Content-Type', 'text/html; charset=utf-8')
            }
            next()
          })
        }
      }
    }
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  build: {
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]'
      }
    }
  },
  server: {
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    middlewareMode: false,
    cors: true,
    open: true,
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:5173',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
}
})