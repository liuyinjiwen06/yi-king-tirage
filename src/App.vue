<template>
  <nav class="bg-white shadow-md">
    <div class="max-w-7xl mx-auto px-4">
      <!-- 主导航容器 -->
      <div class="relative flex justify-between h-16">
        <!-- Logo 和标题 -->
        <div class="flex items-center">
          <router-link 
    :to="homeRoute" 
    @click="handleHomeClick"
    class="flex items-center space-x-2"
  >
    <img src="/yikingfavicon/96_96.png" alt="Yi King Tirage" class="w-9 h-9">
    <h1 class="hidden md:block text-xl font-bold text-[#2C1810]">
      {{ $t('header.title') }}
    </h1>
  </router-link>
        </div>

        <!-- 桌面端导航 -->
<div class="hidden md:flex items-center justify-center space-x-8 mx-4">
  <router-link 
    :to="homeRoute"
    @click="handleHomeClick"
    class="text-[#2C1810] hover:text-[#4A3728] transition-colors whitespace-nowrap"
  >
    {{ $t('nav.home') }}
  </router-link>
  
  <router-link 
    :to="{ name: 'HexagramsCenter', params: { locale: locale } }"
    class="text-[#2C1810] hover:text-[#4A3728] transition-colors whitespace-nowrap"
  >
    {{ $t('nav.hexagramsCenter') }}
  </router-link>

  <router-link 
    :to="{ name: 'About', params: { locale: locale } }"
    class="text-[#2C1810] hover:text-[#4A3728] transition-colors whitespace-nowrap"
  >
    {{ $t('nav.about') }}
  </router-link>
</div>

        <!-- 语言切换器 -->
        <div class="flex items-center">
          <LanguageSwitcher />
        </div>

        <!-- 移动端菜单按钮 -->
        <div v-show="isMenuOpen" class="md:hidden">
  <div class="px-2 pt-2 pb-3 space-y-1">
    <router-link 
      :to="homeRoute"
      @click="handleHomeClick"
      class="block px-3 py-2 rounded-md text-[#2C1810] hover:bg-gray-50"
    >
      {{ $t('nav.home') }}
    </router-link>
    
    <router-link 
      :to="{ name: 'HexagramsCenter', params: { locale: locale } }"
      class="block px-3 py-2 rounded-md text-[#2C1810] hover:bg-gray-50"
      @click="isMenuOpen = false"
    >
      {{ $t('nav.hexagramsCenter') }}
    </router-link>

    <router-link 
      :to="{ name: 'About', params: { locale: locale } }"
      class="block px-3 py-2 rounded-md text-[#2C1810] hover:bg-gray-50"
      @click="isMenuOpen = false"
    >
      {{ $t('nav.about') }}
    </router-link>
  </div>
</div>
      </div>

      <!-- 移动端菜单 -->
      <div 
        v-show="isMenuOpen" 
        class="md:hidden"
      >
        <div class="px-2 pt-2 pb-3 space-y-1">
          <router-link 
    :to="homeRoute"
    @click="handleHomeClick"
    class="text-[#2C1810] hover:text-[#4A3728] transition-colors whitespace-nowrap"
  >
    {{ $t('nav.home') }}
  </router-link>
          
          <router-link 
            to="/hexagrams_center" 
            class="block px-3 py-2 rounded-md text-[#2C1810] hover:bg-gray-50"
            @click="isMenuOpen = false"
          >
            {{ $t('nav.hexagramsCenter') }}
          </router-link>

          <router-link 
            to="/about" 
            class="block px-3 py-2 rounded-md text-[#2C1810] hover:bg-gray-50"
            @click="isMenuOpen = false"
          >
            {{ $t('nav.about') }}
          </router-link>
        </div>
      </div>
    </div>
  </nav>

  <!-- 路由出口 -->
  <router-view></router-view>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import LanguageSwitcher from './components/LanguageSwitcher.vue'

const router = useRouter()
const route = useRoute()
const { locale } = useI18n()
const isMenuOpen = ref(false)

// 计算 home 路由
const homeRoute = computed(() => ({
  name: 'Home',
  params: { locale: locale.value }
}))

// 处理点击事件
const handleHomeClick = async (event) => {
  event.preventDefault() // 阻止默认行为
  
  // 如果已经在首页，触发重置
  if (route.name === 'Home') {
    await router.push({
      name: 'Home',
      params: { locale: locale.value },
      query: { reset: Date.now() }
    })
  } else {
    // 如果不在首页，正常导航
    await router.push(homeRoute.value)
  }
  
  // 关闭移动端菜单（如果打开的话）
  isMenuOpen.value = false
}
</script>

<style scoped>
.router-link-active {
  color: #4A3728;
  font-weight: 600;
}
</style>