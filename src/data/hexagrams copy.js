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
    number: 0,
    name: `Hexagramme {number}`,
    chineseName: "",
    pronunciation: "",
    overview: {
      description: "Désolé, cette interprétation n'est pas encore disponible.",
      keywords: [],
      structure: {
        upperTrigram: "",
        lowerTrigram: "",
        image: ""
      }
    },
    interpretation: {
      basic: {
        title: "Signification de base",
        content: "La signification de base n'est pas encore disponible."
      },
      reality: {
        situation: {
          title: "Analyse de la situation",
          content: "L'analyse de la situation n'est pas encore disponible."
        },
        trend: {
          title: "Tendance de développement",
          content: "La tendance de développement n'est pas encore disponible."
        }
      },
      suggestions: {
        actions: [
          "Les suggestions d'action ne sont pas encore disponibles."
        ],
        cautions: [
          "Les points d'attention ne sont pas encore disponibles."
        ]
      },
      reflections: [
        "Les questions de réflexion ne sont pas encore disponibles."
      ]
    }
  },
  en: {
    number: 0,
    name: `Hexagram {number}`,
    chineseName: "",
    pronunciation: "",
    overview: {
      description: "Sorry, this interpretation is not yet available.",
      keywords: [],
      structure: {
        upperTrigram: "",
        lowerTrigram: "",
        image: ""
      }
    },
    interpretation: {
      basic: {
        title: "Basic Meaning",
        content: "Basic meaning is not yet available."
      },
      reality: {
        situation: {
          title: "Current Situation",
          content: "Situation analysis is not yet available."
        },
        trend: {
          title: "Development Trend",
          content: "Development trend is not yet available."
        }
      },
      suggestions: {
        actions: [
          "Action suggestions are not yet available."
        ],
        cautions: [
          "Cautions are not yet available."
        ]
      },
      reflections: [
        "Reflection questions are not yet available."
      ]
    }
  },
  zh: {
    number: 0,
    name: `第{number}卦`,
    chineseName: "",
    pronunciation: "",
    overview: {
      description: "抱歉，该卦象的解释尚未提供。",
      keywords: [],
      structure: {
        upperTrigram: "",
        lowerTrigram: "",
        image: ""
      }
    },
    interpretation: {
      basic: {
        title: "基本含义",
        content: "基本含义尚未提供。"
      },
      reality: {
        situation: {
          title: "处境解析",
          content: "处境解析尚未提供。"
        },
        trend: {
          title: "发展趋势",
          content: "发展趋势尚未提供。"
        }
      },
      suggestions: {
        actions: [
          "行动建议尚未提供。"
        ],
        cautions: [
          "注意事项尚未提供。"
        ]
      },
      reflections: [
        "反思问题尚未提供。"
      ]
    }
  }
}

export function getHexagramData(number, locale = 'zh') {
  const currentLocaleData = hexagramsData[locale]
  
  const hexagram = currentLocaleData[number]
  if (!hexagram) {
    const defaultMessage = defaultMessages[locale]
    return {
      ...defaultMessage,
      number,
      name: defaultMessage.name.replace('{number}', number)
    }
  }
  
  // 确保返回完整的数据结构，用默认值填充缺失的字段
  return {
    ...defaultMessages[locale],
    ...hexagram,
    number
  }
}