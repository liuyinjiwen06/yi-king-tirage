<template>
  <!-- 顶部导航 -->
  <nav class="bg-white shadow-md">
    <div class="max-w-7xl mx-auto px-4">
      <div class="flex justify-between h-16">
        <div class="flex items-center space-x-28">
          <h1 class="text-xl font-bold text-[#2C1810]">{{ $t('header.title') }}</h1>
          
          <!-- 导航链接 -->
          <div class="flex items-center space-x-8 ">
            <router-link 
              to="/" 
              class="text-[#2C1810] hover:text-[#4A3728] transition-colors"
            >
              {{ $t('nav.home') }}
            </router-link>
            
            <router-link 
              to="/hexagrams_center" 
              class="text-[#2C1810] hover:text-[#4A3728] transition-colors"
            >
              {{ $t('nav.hexagramsCenter') }}
            </router-link>

            <router-link 
              to="/about" 
              class="text-[#2C1810] hover:text-[#4A3728] transition-colors"
            >
              {{ $t('nav.about') }}
            </router-link>
          </div>
        </div>
        
        <div class="flex items-center space-x-4">
          <LanguageSwitcher />
        </div>
      </div>
    </div>
  </nav>

  <!-- 路由出口 -->
  <router-view></router-view>
</template>

<script setup>
import LanguageSwitcher from './components/LanguageSwitcher.vue'
</script>