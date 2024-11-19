import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import i18n from './i18n/index.js'
import './style.css' 

// 创建应用实例
const app = createApp(App)

// 开启性能追踪
app.config.performance = true

// 使用插件
app.use(router)
app.use(i18n)

// 挂载应用
app.mount('#app')