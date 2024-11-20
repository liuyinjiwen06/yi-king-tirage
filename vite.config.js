import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

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
    // 开发服务器配置
    middlewareMode: false,
    cors: true,
    open: true, // 自动打开浏览器
    port: 5173  // 指定端口
  }
})