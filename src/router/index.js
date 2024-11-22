import { createRouter, createWebHistory } from 'vue-router'
import About from '../views/About.vue'

const routes = [
    {
      path: '/:locale?',
      children: [
        {
          path: '',
          name: 'Home',
          component: () => import('../views/Home.vue'),
          meta: {
            title: {
              fr: "Tirage Yi King Gratuit - Yi King Interprétation",
              'zh-CN': "易经在线占卜 - 周易卦象解读",
              en: "I Ching Reading Free- I Ching Divination Online"
            },
            description: {
              fr: "Découvrez votre avenir avec notre Yi King tirage en ligne gratuit. Consultez l'oracle millénaire du I-Ching pour obtenir des conseils précis et une guidance spirituelle authentique.",
              'zh-CN': "在线易经占卜与卦象解读，探索易经的智慧。获得生活指引，洞察未来。立即开始您的易经之旅！",
              en: "Discover your future with our free online I Ching reading. Consult the ancient Chinese oracle for accurate guidance and authentic spiritual insights."
            }
          }
        },
        {
          path: 'hexagrams_center',
          name: 'HexagramsCenter',
          component: () => import('../views/hexagrams_center.vue'),
          meta: {
            title: {
              fr: "Centre des Hexagrammes - Yi King",
              'zh-CN': "卦象中心 - 易经",
              en: "Hexagrams Center - I Ching"
            },
           "description": {
    "fr": "Explorez tous les hexagrammes du Yi King. Découvrez leur signification profonde, leur symbolisme et leur sagesse ancienne pour guider votre vie quotidienne.",
    "zh-CN": "探索易经六十四卦。了解每一卦的深层含义、象征和古老智慧，获得生活指引。轻松解读卦象，助您洞察人生。",
    "en": "Explore all I Ching hexagrams. Uncover their deep meanings, symbolism, and ancient wisdom to guide your daily life. Easy-to-understand interpretations await."
  }
          }
        },
        {
          path: 'hexagram/:id',
          name: 'HexagramDetail',
          component: () => import('../views/hexagram_detail.vue'),  // 修改为正确的文件名
          "meta": {
            "title": {
              "fr": "Hexagramme {id} - Yi King",
              "zh-CN": "第{id}卦 - 易经",
              "en": "Hexagram {id} - I Ching"
            },
            "description": {
              "fr": "Interprétation détaillée de l'hexagramme {id} du Yi King. Découvrez sa signification, son symbolisme et ses conseils pour votre vie.",
              "zh-CN": "第{id}卦详细解读。探索这一卦象的含义、象征和智慧，获得生活指引。",
              "en": "Detailed interpretation of I Ching hexagram {id}. Explore its meaning, symbolism, and wisdom for guidance in your life."
            }
          }
        },
        {
          path: '/about',
          name: 'About',
          component: About,
          "meta": {
            "title": {
              "fr": "À Propos | Comprendre et Appliquer le Yi King",
              "zh-CN": "关于 | 理解与应用易经占卜",
              "en": "About | Understanding and Applying I Ching Divination"
            },
            "description": {
              "fr": "Découvrez comment comprendre et appliquer la sagesse du Yi King dans votre vie quotidienne. Apprenez les principes fondamentaux de la divination par le Yi King et son interprétation.",
              "zh-CN": "探索如何理解和运用易经占卜的智慧来指导日常生活。学习易经占卜的基本原理，掌握解读技巧，获得生活启示。",
              "en": "Learn how to understand and apply I Ching wisdom in your daily life. Explore the fundamental principles of I Ching divination and interpretation for personal guidance."
            }
          }
          
        }
        // 删除重复的路由配置
      ]
    }
  ]

const router = createRouter({
  history: createWebHistory(),
  routes
})

import { getBrowserLanguage } from '../i18n'  // 导入现有函数

router.beforeEach((to, from, next) => {
    // 1. 获取保存的语言设置
    const savedLocale = localStorage.getItem('user-locale');
    
    // 2. 确定要使用的语言
    let targetLocale = savedLocale;
    
    // 3. 如果 URL 中有语言参数且与保存的语言不同，更新保存的语言
    if (to.params.locale) {
      if (to.params.locale !== savedLocale) {
        localStorage.setItem('user-locale', to.params.locale);
        targetLocale = to.params.locale;
      }
    } else if (!targetLocale) {
      // 4. 如果没有保存的语言也没有 URL 语言参数，使用浏览器语言
      targetLocale = getBrowserLanguage();
      localStorage.setItem('user-locale', targetLocale);
    }
  
    // 5. 如果当前路径没有语言前缀，添加语言前缀
    if (!to.params.locale) {
      return next(`/${targetLocale}${to.fullPath}`);
    }
  
    // 6. 如果语言前缀与目标语言不匹配，重定向到正确的语言路径
    if (to.params.locale !== targetLocale) {
      const newPath = to.fullPath.replace(`/${to.params.locale}/`, `/${targetLocale}/`);
      return next(newPath);
    }
  
    const currentMeta = to.meta;
    
    // 设置页面标题
    if (currentMeta?.title?.[targetLocale]) {
      let title = currentMeta.title[targetLocale];
      if (to.params.id) {
        title = title.replace('{id}', to.params.id);
      }
      document.title = title;
    }
    
    // 设置页面描述
    if (currentMeta?.description?.[targetLocale]) {
      let description = currentMeta.description[targetLocale];
      if (to.params.id) {
        description = description.replace('{id}', to.params.id);
      }
      document.querySelector('meta[name="description"]')
        ?.setAttribute('content', description);
    }
    
    next();
  });
  
  export default router;