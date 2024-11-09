<template>
  <div class="min-h-screen bg-[#F5F5F0]">
    <!-- 顶部导航 -->
    <nav class="bg-white shadow-md">
      <div class="max-w-7xl mx-auto px-4">
        <div class="flex justify-between h-16">
          <div class="flex items-center">
            <h1 class="text-xl font-bold text-[#2C1810]">{{ $t('header.title') }}</h1>
          </div>
          <div class="flex items-center space-x-4">
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </nav>

    <!-- 主内容区域 -->
    <div class="max-w-4xl mx-auto px-4 py-8">
      <!-- 占卦区域 -->
      <div class="bg-white rounded-2xl shadow-lg p-8 mb-8">
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
                class="relative w-32 h-32 rounded-full  overflow-hidden transition-transform duration-500 hover:scale-110 cursor-pointer"
                @click="performReading"
              >
            <img 
  src="../asset/coin.png" 
  :alt="$t('divination.coinAlt')"
  class="w-full h-full object-cover"
/>
              </div>
            </div>
            <p class="mt-4 text-gray-600">
              {{ $t('divination.coinInstruction') }}
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
        class="bg-white rounded-2xl shadow-lg p-8 transition-all duration-500"
        :class="{ 'opacity-0 translate-y-4': !showResult, 'opacity-100 translate-y-0': showResult }"
      >
        <!-- 卦象标题 -->
        <div class="text-center mb-8">
          <h2 class="text-3xl font-bold mb-2 text-[#2C1810]">
            {{ currentHexagram.name }}
          </h2>
          <div class="text-lg text-gray-600 mb-2">
            {{ $t('hexagram.number', { number: hexagram }) }}
          </div>
          <div class="text-xl text-[#C8503C]">
            {{ currentHexagram.chineseName }} ({{ currentHexagram.pronunciation }})
          </div>
        </div>

        <!-- 解释内容 -->
        <div class="space-y-6">
          <!-- 总体解释 -->
          <div class="bg-white rounded-lg p-4 shadow-sm">
            <h4 class="text-lg font-semibold mb-2 text-[#C8503C]">{{ $t('hexagram.interpretation.overview') }}</h4>
            <p class="text-gray-700">{{ hexagramInterpretation.general }}</p>
          </div>

          <!-- 结构信息 -->
          <div class="bg-white rounded-lg p-4 shadow-sm">
            <h4 class="text-lg font-semibold mb-2 text-[#C8503C]">{{ $t('hexagram.interpretation.structure.title') }}</h4>
            <div class="space-y-2">
              <p class="text-gray-700">
                <span class="font-medium">{{ $t('hexagram.interpretation.structure.trigrams') }}:</span> 
                <template v-if="$i18n.locale === 'zh'">
      "{{ hexagramInterpretation.structure.upperTrigram }}"在
      "{{ hexagramInterpretation.structure.lowerTrigram }}"上
    </template>
    <template v-else-if="$i18n.locale === 'en'">
      {{ hexagramInterpretation.structure.upperTrigram }} over
      {{ hexagramInterpretation.structure.lowerTrigram }}
    </template>
    <template v-else>
      {{ hexagramInterpretation.structure.upperTrigram }} sur
      {{ hexagramInterpretation.structure.lowerTrigram }}
    </template>
              </p>
              <p class="text-gray-700">
                <span class="font-medium">{{ $t('hexagram.interpretation.structure.image') }}:</span> 
                {{ hexagramInterpretation.structure.image }}
              </p>
              <p class="text-gray-700">{{ hexagramInterpretation.structure.meaning }}</p>
            </div>
          </div>

          <!-- 详细解释 -->
          <div class="bg-white rounded-lg p-4 shadow-sm">
            <h4 class="text-lg font-semibold mb-2 text-[#C8503C]">{{ $t('hexagram.interpretation.details.title') }}</h4>
            <div class="space-y-3">
              <p class="text-gray-700">
                <span class="font-medium">{{ $t('hexagram.interpretation.details.situation') }}:</span> 
                {{ hexagramInterpretation.interpretation.situation }}
              </p>
              <p class="text-gray-700">
                <span class="font-medium">{{ $t('hexagram.interpretation.details.evolution') }}:</span> 
                {{ hexagramInterpretation.interpretation.evolution }}
              </p>
              <p class="text-gray-700">
                <span class="font-medium">{{ $t('hexagram.interpretation.details.advice') }}:</span> 
                {{ hexagramInterpretation.interpretation.advice }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- 信息内容区域 -->
      <div v-if="!isReading" class="bg-[#F5F5F0] pt-8 pb-16 max-w-4xl mx-auto">
        <!-- 历史与传统 -->
        <section class="max-w-4xl mx-auto px-4 py-12 bg-white rounded-2xl shadow-lg mb-8">
          <h2 class="text-2xl font-bold mb-6 text-[#2C1810]">{{ $t('information.history.title') }}</h2>
          <p class="text-gray-700 leading-relaxed">{{ $t('information.history.content') }}</p>
        </section>

        <!-- 算卦方法说明 -->
        <section class="max-w-4xl mx-auto px-4 py-12 bg-white rounded-2xl shadow-lg mb-8">
          <h2 class="text-2xl font-bold mb-6 text-[#2C1810]">{{ $t('information.method.title') }}</h2>
          <p class="text-gray-700 leading-relaxed mb-6">{{ $t('information.method.description') }}</p>
          <div class="bg-[#2C1810]/5 p-6 rounded-lg">
            <h3 class="font-semibold mb-4 text-[#2C1810]">{{ $t('information.method.process.title') }}</h3>
            <ul class="space-y-3 text-gray-700">
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
            </ul>
          </div>
        </section>

        <!-- 使用指南 -->
        <section class="max-w-4xl mx-auto px-4 py-12 bg-white rounded-2xl shadow-lg mb-8">
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
        </section>

        <!-- FAQ -->
        <section class="max-w-4xl mx-auto px-4 py-12 bg-white rounded-2xl shadow-lg">
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
  </div>
</section>



      </div>

      
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'  // 添加 watch 的导入

import { useI18n } from 'vue-i18n'
import LanguageSwitcher from './components/LanguageSwitcher.vue'
import { getHexagramData } from './data/hexagrams'

const { t, locale } = useI18n()  // 获取 locale

// 监听语言变化
watch(locale, (newLocale) => {
  // 如果当前有显示卦象，则更新其内容
  if (hexagram.value) {
    currentHexagram.value = getHexagramData(hexagram.value, newLocale)
    hexagramName.value = currentHexagram.value.name
    hexagramInterpretation.value = currentHexagram.value.interpretation
  }
})

// 响应式状态
const readings = ref([])
const hexagram = ref(null)
const hexagramName = ref('')
const hexagramInterpretation = ref(null)
const currentHexagram = ref(null)
const isReading = ref(false)
const showResult = ref(false)
const showCoins = ref(false)

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
const performReading = () => {
  if (readings.value.length < 6) {
    const lines = ["yin", "yang"]
    const newReading = lines[Math.floor(Math.random() * 2)]
    readings.value.push(newReading)
    
    if (readings.value.length === 6) {
      calculateHexagram()
      showResult.value = true
      showCoins.value = false
    }
  }
}

// 计算卦象
const calculateHexagram = () => {
  const binaryString = readings.value.map(r => r === 'yang' ? '1' : '0').join('')
  const hexagramNumber = parseInt(binaryString, 2) + 1
  hexagram.value = hexagramNumber
  // 传入当前语言
  currentHexagram.value = getHexagramData(hexagramNumber, locale.value)
  hexagramName.value = currentHexagram.value.name
  hexagramInterpretation.value = currentHexagram.value.interpretation
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
</style>
