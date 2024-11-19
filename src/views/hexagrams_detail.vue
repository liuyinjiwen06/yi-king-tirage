<template>
    <div class="min-h-screen bg-[#F5F5F0] py-12">
      <div class="max-w-4xl mx-auto px-4">
        <!-- 卦象标题区 -->
        <div class="text-center mb-12">
          <div class="text-6xl font-bold text-[#2C1810] mb-4">{{ hexagram.symbol }}</div>
          <h1 class="text-3xl font-bold text-[#2C1810] mb-2">{{ hexagram.name }}</h1>
          <p class="text-gray-600">{{ hexagram.pronunciation }}</p>
        </div>
  
        <!-- 卦象解读区 -->
        <div class="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 class="text-2xl font-bold text-[#2C1810] mb-4">{{ $t('hexagram.generalMeaning') }}</h2>
          <p class="text-gray-700 mb-6">{{ hexagram.meaning }}</p>
  
          <!-- 卦辞解读 -->
          <div class="mb-8">
            <h3 class="text-xl font-bold text-[#2C1810] mb-3">{{ $t('hexagram.mainText') }}</h3>
            <p class="text-gray-700">{{ hexagram.mainText }}</p>
          </div>
  
          <!-- 爻辞解读 -->
          <div>
            <h3 class="text-xl font-bold text-[#2C1810] mb-3">{{ $t('hexagram.lines') }}</h3>
            <div v-for="(line, index) in hexagram.lines" :key="index" class="mb-4">
              <h4 class="font-bold text-[#C8503C]">{{ $t('hexagram.line') }} {{ 6 - index }}</h4>
              <p class="text-gray-700">{{ line }}</p>
            </div>
          </div>
        </div>
  
        <!-- 现代解释区 -->
        <div class="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 class="text-2xl font-bold text-[#2C1810] mb-4">{{ $t('hexagram.modernInterpretation') }}</h2>
          
          <!-- 各领域解读 -->
          <div class="space-y-6">
            <div v-for="(interpretation, key) in hexagram.interpretations" :key="key">
              <h3 class="text-xl font-bold text-[#2C1810] mb-2">{{ $t(`hexagram.aspects.${key}`) }}</h3>
              <p class="text-gray-700">{{ interpretation }}</p>
            </div>
          </div>
        </div>
  
        <!-- 相关卦象 -->
        <div class="bg-white rounded-2xl shadow-lg p-8">
          <h2 class="text-2xl font-bold text-[#2C1810] mb-4">{{ $t('hexagram.relatedHexagrams') }}</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div v-for="related in hexagram.relatedHexagrams" :key="related.id" 
              class="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer"
              @click="navigateToHexagram(related.id)"
            >
              <div class="flex items-center space-x-3">
                <span class="text-2xl font-bold text-[#2C1810]">{{ related.symbol }}</span>
                <div>
                  <h4 class="font-bold text-[#2C1810]">{{ related.name }}</h4>
                  <p class="text-sm text-gray-600">{{ related.relationship }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  
  const route = useRoute()
  const router = useRouter()
  const hexagram = ref({})
  
  // 模拟数据 - 实际应用中应该从API获取
  onMounted(async () => {
    // 这里应该根据 route.params.id 从后端获取数据
    hexagram.value = {
      id: route.params.id,
      symbol: '☰',
      name: '乾卦',
      pronunciation: 'qián',
      meaning: '乾为天，象征纯阳刚健...',
      mainText: '元亨利贞...',
      lines: [
        '初九：潜龙勿用...',
        '九二：见龙在田...',
        '九三：君子终日乾乾...',
        '九四：或跃在渊...',
        '九五：飞龙在天...',
        '上九：亢龙有悔...'
      ],
      interpretations: {
        career: '事业发展正处上升期...',
        love: '感情方面主动积极...',
        health: '身体状况良好...',
        wealth: '财运旺盛...'
      },
      relatedHexagrams: [
        {
          id: 2,
          symbol: '☷',
          name: '坤卦',
          relationship: '相对卦'
        }
        // ... 其他相关卦象
      ]
    }
  })
  
  const navigateToHexagram = (id) => {
    router.push(`/hexagram/${id}`)
  }
  </script>
  
  <style scoped>
  /* 可以添加特定样式 */
  </style>