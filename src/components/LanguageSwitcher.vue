<template>
  <div class="relative">
    <!-- 桌面端按钮 -->
    <button
      @click="isOpen = !isOpen"
      class="hidden md:flex items-center gap-2 px-4 py-2 rounded-md transition-all duration-300 bg-[#685e59] text-[#F5F5F0] hover:bg-[#4A3728]"
    >
      {{ languages.find(lang => lang.code === locale)?.name || 'Language' }}
      <svg
        class="w-4 h-4 transition-transform duration-300"
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


    <!-- 移动端按钮 -->
    <button
      @click="isOpen = !isOpen"
      class="md:hidden flex items-center gap-1.5 px-3 py-1.5 rounded-md 
             bg-gray-50 hover:bg-gray-100 
             border border-gray-200 
             active:scale-95 transform transition-all duration-200
             shadow-sm hover:shadow
             text-[#2C1810]"
    >
      <svg 
        class="w-5 h-5" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path 
          stroke-linecap="round" 
          stroke-linejoin="round" 
          stroke-width="2" 
          d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
        />
      </svg>
      <span class="text-sm font-medium">
        {{ languages.find(lang => lang.code === locale)?.code.toUpperCase() }}
      </span>
      <!-- 添加下拉指示器 -->
      <svg
        class="w-4 h-4 transition-transform duration-200"
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

    <!-- 下拉菜单 -->
    <div 
      v-if="isOpen"
      class="absolute right-0 mt-2 bg-white border rounded-lg shadow-lg z-50 
             overflow-hidden min-w-[120px]"
    >
      <div class="py-1">
        <button
          v-for="lang in languages"
          :key="lang.code"
          @click="switchLanguage(lang.code)"
          class="w-full px-4 py-2.5 text-left text-sm 
                 hover:bg-gray-50 transition-colors 
                 flex items-center justify-between gap-2
                 active:bg-gray-100"
          :class="{ 
            'bg-gray-50 font-medium': lang.code === locale,
            'text-gray-700': lang.code !== locale
          }"
        >
          <span>{{ lang.name }}</span>
          <svg
            v-if="lang.code === locale"
            class="w-4 h-4 text-[#2C1810]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter, useRoute } from 'vue-router'

const { locale } = useI18n()
const router = useRouter()
const route = useRoute()
const isOpen = ref(false)

const languages = [
  { code: 'en', name: 'English' },
  { code: 'fr', name: 'Français' },
  { code: 'zh-CN', name: '中文' }
]

// 点击外部关闭下拉菜单
const handleClickOutside = (event) => {
  const dropdown = event.target.closest('.relative')
  if (!dropdown) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})

const switchLanguage = (langCode) => {
  locale.value = langCode
  isOpen.value = false
  
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

<style scoped>
/* 添加过渡动画 */
.absolute {
  transition: opacity 0.2s ease-in-out, transform 0.2s ease-in-out;
}

/* 可选：添加下拉菜单动画 */
@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.absolute {
  animation: slideDown 0.2s ease-out;
}
</style>