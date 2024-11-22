<template>
    <div class="min-h-screen bg-[#F5F5F0]">

  
      <!-- 主内容区域 -->
      <div class="max-w-4xl mx-auto px-4 py-8">
        
        <!-- 占卦区域 -->
        <div class="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div class="w-60 mx-auto mb-12"><img src="@/assets/yiking.webp"></div>
          <div class="text-center">
            <h2 class="text-2xl font-semibold mb-6 text-[#2C1810]">
              {{ $t('divination.title') }}
            </h2>
            
            <!-- 引导文字 -->
            <div class="mb-6 text-gray-600" v-if="!isReading">
              {{ $t('divination.guide') }}
            </div>
  
            <!-- 开始按钮 -->
            <button 
              v-if="!isReading"
              @click="startReading" 
              class="px-8 py-4 rounded-lg text-lg transition-all duration-500 bg-[#2C1810] text-[#F5F5F0] hover:bg-[#3D291D]"
            >
              {{ $t('divination.start') }}
            </button>
  
<!-- 铜币显示区域 -->
<div v-if="showCoins" class="my-8">
  <div class="grid grid-cols-3 gap-8 justify-items-center items-center">
    <div 
      v-for="i in 3" 
      :key="i" 
      class="relative md:w-24 md:h-24 w-20 h-20 rounded-full overflow-visible"
      :class="{ 'animate-coin': isFlipping[i-1] }"
      @click="flipCoin(i-1)"
    >
      <img 
        :ref="el => coinRefs[i-1] = el"
        src="@/assets/coin_fit.webp" 
        :alt="$t('divination.coinAlt')"
        class="w-full h-full object-cover transition-transform duration-500" 
        :class="{ 'coin-flip': isFlipping[i-1] }"
      />
    </div>
  </div>
  <p class="mt-4 text-gray-600">
    {{ t('divination.coinInstruction') }}
  </p>
</div>
  
            <!-- 卦象显示 -->
            <div class="mt-8 flex justify-center" v-if="readings.length > 0">
              <div class="w-[160px]">
                <TransitionGroup 
                  name="line" 
                  tag="div" 
                  class="space-y-4"
                >
                  <div 
                    v-for="(reading, index) in readings" 
                    :key="index"
                    class="w-full"
                  >
                    <!-- 阳爻 -->
                    <template v-if="reading === 'yang'">
                      <div 
                        class="w-full h-3 bg-[#2C1810] rounded-sm line-animation"
                      ></div>
                    </template>
                    <!-- 阴爻 -->
                    <template v-else>
                      <div class="flex justify-between w-full">
                        <div class="w-[70px] h-3 bg-[#2C1810] rounded-sm line-animation"></div>
                        <div class="w-[70px] h-3 bg-[#2C1810] rounded-sm line-animation"></div>
                      </div>
                    </template>
                  </div>
                </TransitionGroup>
              </div>
            </div>
          </div>
        </div>
        
  <!-- 结果显示区域 -->
  <div 
    v-if="currentHexagram && showResult" 
    class="space-y-6 py-4 max-w-4xl mx-auto"
  >
    <!-- 卦象总览 -->
    <div class="bg-white rounded-2xl p-6 shadow-sm">
      <div class="flex items-center space-x-2 mb-4">
        <h3 class="text-xl font-semibold text-[#C8503C]">{{ t('results.generalReading') }}</h3>
        <span class="text-gray-500 text-sm">{{ t('results.hexagramNumber', { number: currentHexagram.number }) }}</span>
      </div>
      <div class="grid md:grid-cols-3 gap-6">
        <div class="md:col-span-2">
          <h4 class="font-medium text-gray-900 mb-2">
            {{ currentHexagram.name }} ({{ currentHexagram.pronunciation }})
          </h4>
          <p class="text-gray-600 mb-4">
            {{ currentHexagram.interpretation.general.overview }}
          </p>
  
  <!-- keywords 部分 -->
  <div class="flex flex-wrap gap-2">
    <span class="px-2 py-1 bg-gray-100 text-gray-600 rounded text-sm">
      {{ t(`${currentHexagram.number}.keywords[0]`) }}
    </span>
    <span class="px-2 py-1 bg-gray-100 text-gray-600 rounded text-sm">
      {{ t(`${currentHexagram.number}.keywords[1]`) }}
    </span>
    <span class="px-2 py-1 bg-gray-100 text-gray-600 rounded text-sm">
      {{ t(`${currentHexagram.number}.keywords[2]`) }}
    </span>
    <span class="px-2 py-1 bg-gray-100 text-gray-600 rounded text-sm">
      {{ t(`${currentHexagram.number}.keywords[3]`) }}
    </span>
  </div>
  
        </div>
        <div class="border-l pl-6">
          <h4 class="font-medium text-gray-900 mb-2">{{ t('results.structures') }}</h4>
          <div class="space-y-2 text-gray-600">
            <p>{{ t('results.structure.upperTrigram') }}：{{ currentHexagram.interpretation.structure.upperTrigram }}</p>
            <p>{{ t('results.structure.lowerTrigram') }}：{{ currentHexagram.interpretation.structure.lowerTrigram }}</p>
            <p>{{ t('results.structure.image') }}：{{ currentHexagram.interpretation.structure.image }}</p>
          </div>
        </div>
      </div>
    </div>
  
    <!-- 卦象详解 -->
    <div class="bg-white rounded-2xl p-6 shadow-sm">
      <h3 class="text-xl font-semibold text-[#C8503C] mb-4">{{ t('results.interpretation.title') }}</h3>
      <div class="space-y-6">
        <!-- 基本含义 -->
        <div>
          <h4 class="font-bold text-gray-900 mb-2">{{ t('results.interpretation.basicMeaning') }}</h4>
          <div class="pl-4 border-l-2 border-gray-200">
            <p class="text-gray-600">
              {{ currentHexagram.interpretation.structure.meaning }}
            </p>
          </div>
        </div>
  
        <!-- 现实启示 -->
        <div>
          <h4 class="font-bold text-gray-900 mb-2">{{ t('results.interpretation.realityImplications') }}</h4>
          <div class="grid md:grid-cols-2 gap-4">
            <!-- 处境解析 -->
            <div class="bg-gray-50 p-4 rounded">
              <h5 class="font-medium text-gray-700 mb-2">{{ t('results.interpretation.situationAnalysis') }}</h5>
              <p class="text-gray-600">
                {{ currentHexagram.interpretation.general.principle }}
              </p>
            </div>
            <!-- 发展趋势 -->
            <div class="bg-gray-50 p-4 rounded">
              <h5 class="font-medium text-gray-700 mb-2">{{ t('results.interpretation.developmentTrend') }}</h5>
              <p class="text-gray-600">
                {{ currentHexagram.interpretation.general.warning }}
              </p>
            </div>
          </div>
        </div>
  
        <!-- 生活指引 -->
        <div>
          <h4 class="font-bold text-gray-900 mb-2">{{ t('results.lifeAspects') }}</h4>
          <div class="space-y-4">
            <!-- 事业发展 -->
            <div class="bg-gray-50 p-4 rounded">
              <h5 class="font-medium text-[#C8503C] mb-2">{{ currentHexagram.interpretation.lifeAspects.career.title }}</h5>
              <p class="text-gray-600 mb-2">{{ t('results.lifeGuidance.situation') }}：{{ currentHexagram.interpretation.lifeAspects.career.situation }}</p>
              <p class="text-gray-600 mb-2">{{ t('results.lifeGuidance.guidance') }}：{{ currentHexagram.interpretation.lifeAspects.career.guidance }}</p>
              <p class="text-gray-600 mb-2">{{ t('results.lifeGuidance.advice') }}：{{ currentHexagram.interpretation.lifeAspects.career.advice }}</p>
              <p class="text-gray-600">{{ t('results.lifeGuidance.warning') }}：{{ currentHexagram.interpretation.lifeAspects.career.warning }}</p>
            </div>
  
            <!-- 财富管理 -->
            <div class="bg-gray-50 p-4 rounded">
              <h5 class="font-medium text-[#C8503C] mb-2">{{ currentHexagram.interpretation.lifeAspects.wealth.title }}</h5>
              <p class="text-gray-600 mb-2">{{ t('results.lifeGuidance.situation') }}：{{ currentHexagram.interpretation.lifeAspects.wealth.situation }}</p>
              <p class="text-gray-600 mb-2">{{ t('results.lifeGuidance.guidance') }}：{{ currentHexagram.interpretation.lifeAspects.wealth.guidance }}</p>
              <p class="text-gray-600 mb-2">{{ t('results.lifeGuidance.advice') }}：{{ currentHexagram.interpretation.lifeAspects.wealth.advice }}</p>
              <p class="text-gray-600">{{ t('results.lifeGuidance.warning') }}：{{ currentHexagram.interpretation.lifeAspects.wealth.warning }}</p>
            </div>
  
            <!-- 人际关系 -->
            <div class="bg-gray-50 p-4 rounded">
              <h5 class="font-medium text-[#C8503C] mb-2">{{ currentHexagram.interpretation.lifeAspects.relationships.title }}</h5>
              <p class="text-gray-600 mb-2">{{ t('results.lifeGuidance.situation') }}：{{ currentHexagram.interpretation.lifeAspects.relationships.situation }}</p>
              <p class="text-gray-600 mb-2">{{ t('results.lifeGuidance.guidance') }}：{{ currentHexagram.interpretation.lifeAspects.relationships.guidance }}</p>
              <p class="text-gray-600 mb-2">{{ t('results.lifeGuidance.advice') }}：{{ currentHexagram.interpretation.lifeAspects.relationships.advice }}</p>
              <p class="text-gray-600">{{ t('results.lifeGuidance.warning') }}：{{ currentHexagram.interpretation.lifeAspects.relationships.warning }}</p>
            </div>
  
            <!-- 健康养生 -->
            <div class="bg-gray-50 p-4 rounded">
              <h5 class="font-medium text-[#C8503C] mb-2">{{ currentHexagram.interpretation.lifeAspects.health.title }}</h5>
              <p class="text-gray-600 mb-2">{{ t('results.lifeGuidance.situation') }}：{{ currentHexagram.interpretation.lifeAspects.health.situation }}</p>
              <p class="text-gray-600 mb-2">{{ t('results.lifeGuidance.guidance') }}：{{ currentHexagram.interpretation.lifeAspects.health.guidance }}</p>
              <p class="text-gray-600 mb-2">{{ t('results.lifeGuidance.advice') }}：{{ currentHexagram.interpretation.lifeAspects.health.advice }}</p>
              <p class="text-gray-600">{{ t('results.lifeGuidance.warning') }}：{{ currentHexagram.interpretation.lifeAspects.health.warning }}</p>
            </div>
          </div>
        </div>
  
        <!-- 具体建议 -->
        <div >
          <h4 class="font-bold text-gray-900 mb-2">{{ t('results.suggestions') }}</h4>
          <div class="grid md:grid-cols-2 gap-4">
            <div class="bg-gray-50 p-4 rounded">
              <h5 class="text-gray-700 mb-2">{{ t('results.actions') }}</h5>
              <ul class="list-disc list-inside space-y-2">
      <li>{{ t(`${currentHexagram.number}.interpretation.suggestions.actions[0]`) }}</li>
      <li>{{ t(`${currentHexagram.number}.interpretation.suggestions.actions[1]`) }}</li>
      <li>{{ t(`${currentHexagram.number}.interpretation.suggestions.actions[2]`) }}</li>
      <li>{{ t(`${currentHexagram.number}.interpretation.suggestions.actions[3]`) }}</li>
    </ul>
            </div>
            <div class="bg-gray-50 p-4 rounded">
              <h5 class="text-gray-700 mb-2">{{ t('results.cautions') }}</h5>
              <ul class="list-disc list-inside space-y-2">
      <li>{{ t(`${currentHexagram.number}.interpretation.suggestions.cautions[0]`) }}</li>
      <li>{{ t(`${currentHexagram.number}.interpretation.suggestions.cautions[1]`) }}</li>
      <li>{{ t(`${currentHexagram.number}.interpretation.suggestions.cautions[2]`) }}</li>
      <li>{{ t(`${currentHexagram.number}.interpretation.suggestions.cautions[3]`) }}</li>
    </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  
    <!-- 反思问题 -->
    <div class="bg-white rounded-2xl p-6 shadow-sm">
      <h3 class="text-xl font-semibold text-[#C8503C] mb-4">{{ t('results.reflections') }}</h3>
      <ul class="list-disc list-inside space-y-2">
      <li>{{ t(`${currentHexagram.number}.interpretation.reflections[0]`) }}</li>
      <li>{{ t(`${currentHexagram.number}.interpretation.reflections[1]`) }}</li>
      <li>{{ t(`${currentHexagram.number}.interpretation.reflections[2]`) }}</li>
      <li>{{ t(`${currentHexagram.number}.interpretation.reflections[3]`) }}</li>
    </ul>
    </div>

    <!-- AI分析 -->
<!-- AI分析 -->
<div class="bg-white rounded-2xl p-4 md:p-6 shadow-sm mt-6 md:mt-8">
  <h3 class="text-lg md:text-xl font-semibold text-[#C8503C] mb-3 md:mb-4">
    {{ t('airesults.aiConsultation.title') }}
  </h3>
  
  <!-- 问题输入区域 -->
  <div class="space-y-3 md:space-y-4">
    <textarea 
      v-model="userQuestion"
      :placeholder="t('airesults.aiConsultation.placeholder')"
      class="w-full p-3 md:p-4 border rounded-lg text-sm md:text-base min-h-[100px] md:min-h-[120px]"
      :class="{ 'border-red-500': error }"
    ></textarea>
    
    <!-- 错误提示 -->
    <p v-if="error" class="text-red-500 text-xs md:text-sm">{{ error }}</p>
    
    <!-- 提交按钮 -->
    <button 
      @click="getAIResponse"
      :disabled="isLoading"
      class="w-full md:w-auto px-4 md:px-6 py-2 md:py-3 rounded-lg text-sm md:text-base transition-all duration-300 bg-[#2C1810] text-[#F5F5F0] hover:bg-[#3D291D] disabled:opacity-50"
    >
      {{ isLoading ? t('airesults.aiConsultation.analyzing') : t('airesults.aiConsultation.submit') }}
    </button>
  </div>

  <!-- AI 回复区域 -->
  <div v-if="aiResponse" class="mt-4 md:mt-6 p-3 md:p-4 bg-gray-50 rounded-lg">
    <div class="prose prose-sm md:prose-base max-w-none">
      <div class="whitespace-pre-wrap text-sm md:text-base leading-relaxed">
        {{ aiResponse }}
      </div>
    </div>
  </div>

  <!-- 错误提示 -->
  <!-- <div v-if="error" class="text-red-500 mt-2">
    {{ error }}
  </div> -->
</div>

  </div>
         
      
        <!-- 信息内容区域 -->
        <div v-if="!isReading" class="bg-[#F5F5F0] pt-8 pb-16 max-w-4xl mx-auto">
          <!-- 历史与传统 -->
          <section class="max-w-4xl mx-auto px-4 py-12 bg-white rounded-2xl shadow-lg mb-8">
            <h2 class="text-2xl font-bold mb-6 text-[#2C1810] px-4 md:px-12">{{ $t('information.history.title') }}</h2>
            <p class="text-gray-700 leading-relaxed px-4 md:px-12">{{ $t('information.history.content1') }}</p>
            <br>
            <p class="text-gray-700 leading-relaxed px-4 md:px-12">{{ $t('information.history.content2') }}</p>
            <br>
            <p class="text-gray-700 leading-relaxed px-4 md:px-12">{{ $t('information.history.content3') }}</p>
          </section>
  
          <!-- 算卦方法说明 -->
          <section class="max-w-4xl mx-auto px-4 py-12 bg-white rounded-2xl shadow-lg mb-8">
            <div class="px-4 md:px-12">
            <h2 class="text-2xl font-bold mb-6 text-[#2C1810]">{{ $t('information.method.title') }}</h2>
            <p class="text-gray-700 leading-relaxed mb-6">{{ $t('information.method.description') }}</p>
            <div class="bg-[#2C1810]/5 p-6 rounded-lg">
              <h3 class="font-semibold mb-4 text-[#2C1810]">{{ $t('information.method.process.title') }}</h3>
              <ul class="space-y-3 text-gray-700 ">
                <li class="flex items-start">
                  <span class="text-[#C8503C] mr-3">•</span>
                  <span>{{ $t('information.method.process.steps[0]') }}</span>
                </li>
                <li class="flex items-start">
                  <span class="text-[#C8503C] mr-3">•</span>
                  <span>{{ $t('information.method.process.steps[1]') }}</span>
                </li>
                <li class="flex items-start">
                  <span class="text-[#C8503C] mr-3">•</span>
                  <span>{{ $t('information.method.process.steps[2]') }}</span>
                </li>
                <li class="flex items-start">
                  <span class="text-[#C8503C] mr-3">•</span>
                  <span>{{ $t('information.method.process.steps[3]') }}</span>
                </li>
              </ul>
            </div>
            </div>
          </section>
  
          <!-- 使用指南 -->
          <section class="max-w-4xl mx-auto px-4 py-12 bg-white rounded-2xl shadow-lg mb-8">
            <div class="px-4 md:px-12">
            <h2 class="text-2xl font-bold mb-6 text-[#2C1810]">{{ $t('information.guide.title') }}</h2>
            <div class="grid md:grid-cols-3 gap-6">
              <div class="bg-[#2C1810]/5 p-6 rounded-lg">
                <div class="text-[#C8503C] font-bold text-xl mb-3">{{ $t('information.guide.steps.preparation.number') }}</div>
                <h3 class="font-semibold mb-2 text-[#2C1810]">{{ $t('information.guide.steps.preparation.title') }}</h3>
                <p class="text-gray-700 text-sm">{{ $t('information.guide.steps.preparation.content') }}</p>
              </div>
              <div class="bg-[#2C1810]/5 p-6 rounded-lg">
                <div class="text-[#C8503C] font-bold text-xl mb-3">{{ $t('information.guide.steps.consultation.number') }}</div>
                <h3 class="font-semibold mb-2 text-[#2C1810]">{{ $t('information.guide.steps.consultation.title') }}</h3>
                <p class="text-gray-700 text-sm">{{ $t('information.guide.steps.consultation.content') }}</p>
              </div>
              <div class="bg-[#2C1810]/5 p-6 rounded-lg">
                <div class="text-[#C8503C] font-bold text-xl mb-3">{{ $t('information.guide.steps.reflection.number') }}</div>
                <h3 class="font-semibold mb-2 text-[#2C1810]">{{ $t('information.guide.steps.reflection.title') }}</h3>
                <p class="text-gray-700 text-sm">{{ $t('information.guide.steps.reflection.content') }}</p>
              </div>
            </div>
        </div>
          </section>
  
          <!-- FAQ -->
          <section class="max-w-4xl mx-auto px-4 py-12 bg-white rounded-2xl shadow-lg">
            <div class="px-4 md:px-12">
    <h2 class="text-2xl font-bold mb-6 text-[#2C1810]">{{ $t('information.faq.title') }}</h2>
    <div class="space-y-6">
      <div class="border-b border-gray-200 pb-6">
        <h3 class="font-bold mb-3 text-[#2C1810]">{{ $t('information.faq.questions.0.question') }}</h3>
        <p class="text-gray-700">{{ $t('information.faq.questions.0.answer') }}</p>
      </div>
      <div class="border-b border-gray-200 pb-6">
        <h3 class="font-bold mb-3 text-[#2C1810]">{{ $t('information.faq.questions.1.question') }}</h3>
        <p class="text-gray-700">{{ $t('information.faq.questions.1.answer') }}</p>
      </div>
      <div class="border-b border-gray-200 pb-6">
        <h3 class="font-bold mb-3 text-[#2C1810]">{{ $t('information.faq.questions.2.question') }}</h3>
        <p class="text-gray-700">{{ $t('information.faq.questions.2.answer') }}</p>
      </div>
      <div class="border-b border-gray-200 pb-6">
        <h3 class="font-bold mb-3 text-[#2C1810]">{{ $t('information.faq.questions.3.question') }}</h3>
        <p class="text-gray-700">{{ $t('information.faq.questions.3.answer') }}</p>
      </div>
      <div class="border-b border-gray-200 pb-6">
        <h3 class="font-bold mb-3 text-[#2C1810]">{{ $t('information.faq.questions.4.question') }}</h3>
        <p class="text-gray-700">{{ $t('information.faq.questions.4.answer') }}</p>
      </div>
      <div class="border-b border-gray-200 pb-6">
        <h3 class="font-bold mb-3 text-[#2C1810]">{{ $t('information.faq.questions.5.question') }}</h3>
        <p class="text-gray-700">{{ $t('information.faq.questions.5.answer') }}</p>
      </div>
    </div>
    </div>
  </section>
  
  
  
  
        </div>
  
        
      </div>
    </div>
  </template>
  
  <script setup>
 import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
// 修改导入路径，使用正确的相对路径
import LanguageSwitcher from '../components/LanguageSwitcher.vue'
import { getHexagramData } from '../data/hexagrams'  // 这个也需要修改路径
  
  const { t, locale } = useI18n()
  
  // 响应式状态
  const readings = ref([])
  const hexagram = ref(null)
  const currentHexagram = ref(null)
  const isReading = ref(false)
  const showResult = ref(false)
  const showCoins = ref(false)
  
  // 监听语言变化
  watch(locale, (newLocale) => {
    console.log('Language changed to:', newLocale)
    if (hexagram.value) {
      updateHexagramData(hexagram.value)
    }
  })
  
  import { onMounted } from 'vue'
  
  onMounted(() => {
    console.log(t('1.name'))
    console.log(t('1.interpretation.general.overview'))
  })
  
  // 更新卦象数据
  // updateHexagramData函数
  const updateHexagramData = (hexagramNumber) => {
    const hexagramData = getHexagramData(hexagramNumber)
    currentHexagram.value = {
      number: hexagramData.number,
      name: t(`${hexagramNumber}.name`),
      chineseName: t(`${hexagramNumber}.chineseName`),
      pronunciation: t(`${hexagramNumber}.pronunciation`),
      keywords: hexagramData.keywords,
      interpretation: {
        general: {
          overview: t(`${hexagramNumber}.interpretation.general.overview`),
          principle: t(`${hexagramNumber}.interpretation.general.principle`),
          warning: t(`${hexagramNumber}.interpretation.general.warning`)
        },
        structure: {
          upperTrigram: t(`${hexagramNumber}.interpretation.structure.upperTrigram`),
          lowerTrigram: t(`${hexagramNumber}.interpretation.structure.lowerTrigram`),
          image: t(`${hexagramNumber}.interpretation.structure.image`),
          meaning: t(`${hexagramNumber}.interpretation.structure.meaning`)
        },
        lifeAspects: {
          career: {
            title: t(`${hexagramNumber}.interpretation.lifeAspects.career.title`),
            situation: t(`${hexagramNumber}.interpretation.lifeAspects.career.situation`),
            guidance: t(`${hexagramNumber}.interpretation.lifeAspects.career.guidance`),
            advice: t(`${hexagramNumber}.interpretation.lifeAspects.career.advice`),
            warning: t(`${hexagramNumber}.interpretation.lifeAspects.career.warning`)
          },
          wealth: {
            title: t(`${hexagramNumber}.interpretation.lifeAspects.wealth.title`),
            situation: t(`${hexagramNumber}.interpretation.lifeAspects.wealth.situation`),
            guidance: t(`${hexagramNumber}.interpretation.lifeAspects.wealth.guidance`),
            advice: t(`${hexagramNumber}.interpretation.lifeAspects.wealth.advice`),
            warning: t(`${hexagramNumber}.interpretation.lifeAspects.wealth.warning`)
          },
          relationships: {
            title: t(`${hexagramNumber}.interpretation.lifeAspects.relationships.title`),
            situation: t(`${hexagramNumber}.interpretation.lifeAspects.relationships.situation`),
            guidance: t(`${hexagramNumber}.interpretation.lifeAspects.relationships.guidance`),
            advice: t(`${hexagramNumber}.interpretation.lifeAspects.relationships.advice`),
            warning: t(`${hexagramNumber}.interpretation.lifeAspects.relationships.warning`)
          },
          health: {
            title: t(`${hexagramNumber}.interpretation.lifeAspects.health.title`),
            situation: t(`${hexagramNumber}.interpretation.lifeAspects.health.situation`),
            guidance: t(`${hexagramNumber}.interpretation.lifeAspects.health.guidance`),
            advice: t(`${hexagramNumber}.interpretation.lifeAspects.health.advice`),
            warning: t(`${hexagramNumber}.interpretation.lifeAspects.health.warning`)
          }
        },
        suggestions: {
          actions: t(`${hexagramNumber}.interpretation.suggestions.actions`, [], { array: true }),
          cautions: t(`${hexagramNumber}.interpretation.suggestions.cautions`, [], { array: true })
        },
        reflections: t(`${hexagramNumber}.interpretation.reflections`, [], { array: true })
      }
    }
  }
  
  
  
  // 开始占卦
  const startReading = () => {
    isReading.value = true
    readings.value = []
    showResult.value = false
    currentHexagram.value = null
    showCoins.value = true
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }
  
  // 执行占卦
//   const performReading = () => {
//     if (readings.value.length < 6) {
//       const lines = ["yin", "yang"]
//       const newReading = lines[Math.floor(Math.random() * 2)]
//       readings.value.push(newReading)
      
//       if (readings.value.length === 6) {
//         calculateHexagram()
//         showResult.value = true
//         showCoins.value = false
//       }
//     }
//   }
  
  // 计算卦象
  const calculateHexagram = () => {
    const binaryString = readings.value.map(r => r === 'yang' ? '1' : '0').join('')
    const hexagramNumber = parseInt(binaryString, 2) + 1
    hexagram.value = hexagramNumber
    updateHexagramData(hexagramNumber)
  }


  // 在 script setup 部分添加
const userQuestion = ref('')
const aiResponse = ref('')
const isLoading = ref(false)
const error = ref('')

const getAIResponse = async () => {
  // 检查问题是否为空
  if (!userQuestion.value.trim()) {
    error.value = t('results.aiConsultation.errorEmptyQuestion')
    return
  }

  // 设置加载状态和清除错误
  isLoading.value = true
  error.value = ''

  try {
    const API_URL = import.meta.env.VITE_API_URL || '';
    console.log('API URL:', API_URL); // 添加这行来调试

    // 如果 API_URL 为空，使用当前域名
    const baseUrl = API_URL || window.location.origin;
    console.log('Base URL being used:', baseUrl); // 添加这行来调试

      // 确保使用正确的 API 地址
    const apiEndpoint = `${API_URL}/api/ai-consultation`;
    console.log('Making request to:', apiEndpoint); // 调试用

    const response = await fetch(`${API_URL}/api/ai-consultation`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        question: userQuestion.value,
        hexagram: currentHexagram.value.number,
        hexagramName: currentHexagram.value.name,
        interpretation: currentHexagram.value.interpretation.general.overview,
        language: locale.value 
      })
    });

    if (!response.ok) {
      throw new Error(t('results.aiConsultation.errorGeneric'))
    }

    const data = await response.json()
    aiResponse.value = data.response
  } catch (err) {
    console.error('API error:', err)
    error.value = err.message || t('results.aiConsultation.errorGeneric')
  } finally {
    isLoading.value = false
  }
}

// 硬币动画
// 删除这些重复的定义
const isFlipping = ref([false, false, false])
const coinRefs = ref([])

// 保留这一个版本的 performReading
const performReading = () => {
  if (readings.value.length < 6) {
    const lines = ["yin", "yang"]
    const newReading = lines[Math.floor(Math.random() * 2)]
    readings.value.push(newReading)
    
    if (readings.value.length === 6) {
      setTimeout(() => {
        calculateHexagram()
        showResult.value = true
        showCoins.value = false
        // 滚动到结果区域
        setTimeout(() => {
          const resultElement = document.querySelector('.results-section')
          if (resultElement) {
            resultElement.scrollIntoView({ behavior: 'smooth' })
          }
        }, 500)
      }, 500) // 给一点延迟让用户看清最后的结果
    }
  }
}

// 保留这一个版本的 flipCoin
const flipCoin = async (index) => {
  // 如果有任何硬币正在翻转，则不响应点击
  if (isFlipping.value.some(flipping => flipping)) return

  // 将所有硬币设置为翻转状态
  isFlipping.value = [true, true, true]
  
  // 为每个硬币设置略微不同的随机延迟，使动画更自然
  const delays = [
    Math.random() * 100,
    Math.random() * 100 + 50,
    Math.random() * 100 + 100
  ]
  
  // 播放硬币声音
  const coinSound = new Audio('/coin-flip.mp3')
  coinSound.play().catch(() => {})
  
  // 为每个硬币设置动画结束时间
  delays.forEach((delay, i) => {
    setTimeout(() => {
      setTimeout(() => {
        isFlipping.value[i] = false
        
        // 当所有硬币都完成翻转时执行占卦
        if (isFlipping.value.every(flipping => !flipping)) {
          performReading()
        }
      }, 1000) // 动画持续时间
    }, delay) // 开始延迟
  })
}
  </script>
  

  <style scoped>
  .line-enter-active {
    transition: all 0.5s ease-out;
  }
  
  .line-enter-from {
    opacity: 0;
    transform: translateX(-20px);
  }
  
  .line-animation {
    animation: lineGrow 0.5s ease-out forwards;
    transform-origin: left;
    will-change: transform;
  }
  
  @keyframes lineGrow {
    from {
      transform: scaleX(0);
    }
    to {
      transform: scaleX(1);
    }
  }
  
  .prose {
    max-width: 65ch;
    margin: 0 auto;
  }
  
  /* 确保Tailwind类正确应用 */
  .w-\[160px\] {
    width: 160px;
  }
  
  .w-\[70px\] {
    width: 70px;
  }
  
  /* 优化动画性能 */
  * {
    backface-visibility: hidden;
    -webkit-font-smoothing: antialiased;
  }

  @keyframes flip {
  0% {
    transform: rotateY(0) translateY(0);
  }
  25% {
    transform: rotateY(90deg) translateY(-20px);
  }
  75% {
    transform: rotateY(270deg) translateY(-20px);
  }
  100% {
    transform: rotateY(360deg) translateY(0);
  }
}

/* 硬币弹跳动画 */
@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-15px);
  }
}

/* 应用动画的类 */
.animate-coin {
  animation: bounce 0.3s ease-in-out;
}

.coin-flip {
  animation: flip 1s ease-in-out;
  transform-style: preserve-3d;
  backface-visibility: hidden;
}

/* 硬币悬停效果 */
.rounded-full {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

/* 只在非翻转状态下显示悬停效果 */
.rounded-full:not(.animate-coin):hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  cursor: pointer;
}

/* 翻转时禁用鼠标交互 */
.animate-coin {
  pointer-events: none;
}

/* 确保动画性能优化 */
.coin-flip, .animate-coin {
  will-change: transform;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
}
  </style>
  