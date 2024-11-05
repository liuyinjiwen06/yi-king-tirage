// 导入卦象翻译
import frHexagrams from '../i18n/locales/hexagrams/fr'
import enHexagrams from '../i18n/locales/hexagrams/en'
import zhHexagrams from '../i18n/locales/hexagrams/zh'

const hexagramsData = {
  fr: frHexagrams,
  en: enHexagrams,
  zh: zhHexagrams
}

const defaultMessages = {
    fr: {
      name: `Hexagramme {number}`,
      chineseName: "",
      pronunciation: "",
      keywords: [],
      interpretation: {
        general: "Désolé, cette interprétation n'est pas encore disponible.",
        structure: {
          upperTrigram: "",
          lowerTrigram: "",
          image: "",
          meaning: ""
        },
        interpretation: {
          situation: "Les informations ne sont pas encore disponibles.",
          evolution: "",
          advice: "Les conseils ne sont pas encore disponibles."
        }
      }
    },
    en: {
      name: `Hexagram {number}`,
      chineseName: "",
      pronunciation: "",
      keywords: [],
      interpretation: {
        general: "Sorry, this interpretation is not yet available.",
        structure: {
          upperTrigram: "",
          lowerTrigram: "",
          image: "",
          meaning: ""
        },
        interpretation: {
          situation: "Information is not yet available.",
          evolution: "",
          advice: "Advice is not yet available."
        }
      }
    },
    zh: {
      name: `第{number}卦`,
      chineseName: "",
      pronunciation: "",
      keywords: [],
      interpretation: {
        general: "抱歉，该卦象的解释尚未提供。",
        structure: {
          upperTrigram: "",
          lowerTrigram: "",
          image: "",
          meaning: ""
        },
        interpretation: {
          situation: "相关信息尚未提供。",
          evolution: "",
          advice: "相关建议尚未提供。"
        }
      }
    }
  }

export function getHexagramData(number, locale) {
  const currentLocaleData = hexagramsData[locale]
  
  const hexagram = currentLocaleData[number]
  if (!hexagram) {
    const defaultMessage = defaultMessages[locale]
    return {
      ...defaultMessage,
      name: defaultMessage.name.replace('{number}', number)
    }
  }
  return hexagram
}





