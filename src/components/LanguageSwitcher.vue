<!-- LanguageSwitcher.vue -->
<template>
    <div class="relative">
      <button
        @click="isOpen = !isOpen"
        class="px-4 py-2 rounded-md transition-all duration-300 bg-[#2C1810] text-[#F5F5F0] flex items-center gap-2"
      >
        {{ getCurrentLanguageLabel() }}
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
        class="absolute top-full mt-1 w-32 bg-white rounded-md shadow-lg py-1 z-50"
      >
        <button
          v-for="lang in languages"
          :key="lang.code"
          @click="selectLanguage(lang.code)"
          class="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
        >
          {{ lang.label }}
        </button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { useI18n } from 'vue-i18n'
  
  const { locale } = useI18n()
  const isOpen = ref(false)
  
  const languages = [
    { code: 'fr', label: 'Français' },
    { code: 'en', label: 'English' },
    { code: 'zh', label: '中文' }
  ]
  
  const getCurrentLanguageLabel = () => {
    return languages.find(lang => lang.code === locale.value)?.label
  }
  
  const selectLanguage = (langCode) => {
    locale.value = langCode
    isOpen.value = false
  }
  </script>