<template>
  <div class="relative">
    <button
      @click="isOpen = !isOpen"
      class="px-4 py-2 rounded-md transition-all duration-300 bg-[#2C1810] text-[#F5F5F0] flex items-center gap-2"
    >
    {{ languages.find(lang => lang.code === locale)?.name || 'Language' }}
      <svg
        class="w-4 h-4"
        :class="{ 'rotate-180': isOpen }"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M19 9l-7 7-7-7"
        />
      </svg>
    </button>
    <div 
      v-if="isOpen"
      class="absolute right-0 mt-1 bg-white border rounded shadow-lg"
    >
      <button
        v-for="lang in languages"
        :key="lang.code"
        @click="switchLanguage(lang.code)"
        class="block w-full px-4 py-2 text-left hover:bg-gray-100"
        :class="{ 'bg-gray-50': lang.code === locale }"
      >
        {{ lang.name }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter, useRoute } from 'vue-router'  // 添加这行

const { locale } = useI18n()
const router = useRouter()  // 添加这行
const route = useRoute()    // 添加这行

const languages = [
  { code: 'en', name: 'English' },
  { code: 'fr', name: 'Français' },
  { code: 'zh-CN', name: '中文' }
]

const isOpen = ref(false)

const switchLanguage = (langCode) => {
  locale.value = langCode
  isOpen.value = false
  
  // 添加这部分：更新 URL 中的语言参数
  const currentRoute = router.currentRoute.value
  router.push({
    ...currentRoute,
    params: { 
      ...currentRoute.params, 
      locale: langCode 
    }
  })
}
</script>