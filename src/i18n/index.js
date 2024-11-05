import { createI18n } from 'vue-i18n'
import fr from './locales/fr'    // 导入法语翻译
import zh from './locales/zh'    // 导入中文翻译
import en from './locales/en'    // 导入英文翻译

export const i18n = createI18n({
  legacy: false,           // 使用 Composition API 模式
  locale: 'zh',           // 设置默认语言（这里可以根据需求设置）
  fallbackLocale: 'en',   // 设置备用语言为英语
  messages: {
    fr,                   // 法语翻译
    zh,                   // 中文翻译
    en                    // 英文翻译
  },
  // 全局配置
  globalInjection: true,  // 允许在模板中直接使用 $t

  // 日期时间格式化配置
  datetimeFormats: {
    fr: {
      short: {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      }
    },
    zh: {
      short: {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric'
      }
    },
    en: {
      short: {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      }
    }
  },

  // 数字格式化配置
  numberFormats: {
    fr: {
      currency: {
        style: 'currency',
        currency: 'EUR'
      }
    },
    zh: {
      currency: {
        style: 'currency',
        currency: 'CNY',
        notation: 'standard'
      }
    },
    en: {
      currency: {
        style: 'currency',
        currency: 'USD'
      }
    }
  }
})