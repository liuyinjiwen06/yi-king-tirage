// 导入各语言的卦象翻译
import zhHexagrams from '../i18n/locales/hexagrams/zh'
import enHexagrams from '../i18n/locales/hexagrams/en'
import frHexagrams from '../i18n/locales/hexagrams/fr'

// 使用正确的语言数据
const hexagramsData = {
  zh: zhHexagrams,
  en: enHexagrams,
  fr: frHexagrams
}

const defaultMessages = {
  zh: {
    number: 0,
    name: `第{number}卦`,
    chineseName: "",
    pronunciation: "",
    keywords: [],
    interpretation: {
      general: {
        overview: "抱歉，该卦象的解释尚未提供。",
        principle: "原则说明尚未提供。",
        warning: "警示信息尚未提供。"
      },
      structure: {
        upperTrigram: "",
        lowerTrigram: "",
        image: "",
        meaning: ""
      },
      lifeAspects: {
        career: {
          title: "事业运势",
          guidance: "",
          advice: "",
          warning: ""
        },
        wealth: {
          title: "财富运势",
          guidance: "",
          advice: "",
          warning: ""
        },
        relationships: {
          title: "人际关系",
          guidance: "",
          advice: "",
          warning: ""
        },
        health: {
          title: "健康运势",
          guidance: "",
          advice: "",
          warning: ""
        }
      },
      suggestions: {
        actions: [],
        cautions: []
      },
      reflections: []
    }
  }
}

// 为英文和法文创建默认消息
defaultMessages.en = {
  ...defaultMessages.zh,
  name: `Hexagram {number}`,
  interpretation: {
    ...defaultMessages.zh.interpretation,
    general: {
      overview: "Sorry, the interpretation for this hexagram is not available yet.",
      principle: "Principle explanation is not available yet.",
      warning: "Warning information is not available yet."
    },
    lifeAspects: {
      ...defaultMessages.zh.interpretation.lifeAspects,
      career: { ...defaultMessages.zh.interpretation.lifeAspects.career, title: "Career Prospects" },
      wealth: { ...defaultMessages.zh.interpretation.lifeAspects.wealth, title: "Wealth Outlook" },
      relationships: { ...defaultMessages.zh.interpretation.lifeAspects.relationships, title: "Relationships" },
      health: { ...defaultMessages.zh.interpretation.lifeAspects.health, title: "Health Outlook" }
    }
  }
}

defaultMessages.fr = {
  ...defaultMessages.zh,
  name: `Hexagramme {number}`,
  interpretation: {
    ...defaultMessages.zh.interpretation,
    general: {
      overview: "Désolé, l'interprétation de cet hexagramme n'est pas encore disponible.",
      principle: "L'explication du principe n'est pas encore disponible.",
      warning: "L'information d'avertissement n'est pas encore disponible."
    },
    lifeAspects: {
      ...defaultMessages.zh.interpretation.lifeAspects,
      career: { ...defaultMessages.zh.interpretation.lifeAspects.career, title: "Perspectives de carrière" },
      wealth: { ...defaultMessages.zh.interpretation.lifeAspects.wealth, title: "Perspectives financières" },
      relationships: { ...defaultMessages.zh.interpretation.lifeAspects.relationships, title: "Relations" },
      health: { ...defaultMessages.zh.interpretation.lifeAspects.health, title: "Perspectives de santé" }
    }
  }
}

export function getHexagramData(number, locale = 'zh') {
  const hexagram = hexagramsData[locale][number]
  if (!hexagram) {
    const defaultMessage = defaultMessages[locale]
    return {
      ...defaultMessage,
      number,
      name: defaultMessage.name.replace('{number}', number)
    }
  }
  return {
    number,
    name: hexagram.name,
    chineseName: hexagram.chineseName,
    pronunciation: hexagram.pronunciation,
    keywords: hexagram.keywords,
    interpretation: {
      general: hexagram.interpretation.general,
      structure: hexagram.interpretation.structure,
      lifeAspects: hexagram.interpretation.lifeAspects,
      suggestions: hexagram.interpretation.suggestions,
      reflections: hexagram.interpretation.reflections
    }
  }
}
