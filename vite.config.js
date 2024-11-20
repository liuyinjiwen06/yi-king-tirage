import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  plugins: [
    vue(),
    {
      name: 'xml-content-type',
      configureServer(server) {
        return () => {
          server.middlewares.use((req, res, next) => {
            if (req.url.endsWith('sitemap.xml')) {
              res.setHeader('Content-Type', 'application/xml; charset=utf-8')
              // 强制设置正确的内容类型
              res.writeHead(200, { 'Content-Type': 'application/xml; charset=utf-8' })
            }
            next()
          })
        }
      },
      // 添加 transformIndexHtml 钩子
      transformIndexHtml(html, ctx) {
        if (ctx.path.endsWith('sitemap.xml')) {
          return {
            html,
            tags: [
              {
                tag: 'meta',
                attrs: {
                  'http-equiv': 'Content-Type',
                  content: 'application/xml; charset=utf-8'
                },
                injectTo: 'head'
              }
            ]
          }
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
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/xml; charset=utf-8'
    }
  }
})