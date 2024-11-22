import { createI18n } from 'vue-i18n'

// 导入基础翻译文件
import enBase from './locales/en'
import frBase from './locales/fr'
import zhBase from './locales/zh'

// 导入卦象翻译文件
import enHexagrams from './locales/hexagrams/en'
import frHexagrams from './locales/hexagrams/fr'
import zhHexagrams from './locales/hexagrams/zh'

// 首先声明 getBrowserLanguage 函数
export const getBrowserLanguage = () => {
  const browserLang = navigator.language || navigator.userLanguage
  const langMap = {
    'zh': 'zh-CN',
    'zh-CN': 'zh-CN',
    'zh-TW': 'zh-CN',
    'fr': 'fr',
    'fr-FR': 'fr',
    'en': 'en',
    'en-US': 'en',
    'en-GB': 'en'
  }
  
  return langMap[browserLang] || langMap[browserLang.split('-')[0]] || 'en'
}

// 合并相同语言的翻译内容
const en = {
  ...enBase,
  ...enHexagrams
}

const fr = {
  ...frBase,
  ...frHexagrams
}

const zh = {
  ...zhBase,
  ...zhHexagrams
}

// 从 localStorage 获取语言设置
const savedLocale = localStorage.getItem('user-locale');
const defaultLocale = savedLocale || getBrowserLanguage();

const i18n = createI18n({
  legacy: false,
  locale: defaultLocale,
  fallbackLocale: 'en',
  messages: {
    'en': en,
    'fr': fr,
    'zh-CN': zh
  }
})

export default i18n