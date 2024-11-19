<template>
  <div class="min-h-screen bg-[#F5F5F0]">
    <!-- 博客内容区域 -->
    <div class="max-w-7xl mx-auto px-4 py-12">
      <h2 class="text-3xl font-bold text-center mb-12 text-[#2C1810]">{{ $t('blog.title') }}</h2>
      
      <!-- 博客文章网格 -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <router-link 
          v-for="post in blogPosts" 
          :key="post.id"
          :to="{
            name: 'HexagramDetail',
            params: { id: post.id }
          }"
          class="block group"
        >
          <article class="bg-white rounded-2xl shadow-lg overflow-hidden transition-transform duration-300 hover:-translate-y-1">
            <!-- 卦象符号展示区 -->
            <div class="h-48 bg-[#2C1810] flex items-center justify-center">
              <span class="text-6xl font-bold text-[#F5F5F0]">{{ post.hexagram }}</span>
            </div>
            
            <div class="p-6">
              <div class="flex items-center mb-4">
                <span class="text-sm font-semibold text-[#C8503C]">{{ post.category }}</span>
                <span class="mx-2 text-gray-300">•</span>
                <span class="text-sm text-gray-500">{{ post.date }}</span>
              </div>
              
              <h3 class="text-xl font-bold text-[#2C1810] mb-3 line-clamp-2">
                {{ post.title }}
              </h3>
              
              <p class="text-gray-600 mb-4 line-clamp-3">
                {{ post.description }}
              </p>
              
              <div class="flex items-center justify-between text-sm text-gray-500">
                <span>{{ post.readTime }} {{ $t('blog.minuteRead') }}</span>
                <div class="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" 
                    class="h-5 w-5 mr-1" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path stroke-linecap="round" 
                      stroke-linejoin="round" 
                      stroke-width="2" 
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" 
                    />
                    <path stroke-linecap="round" 
                      stroke-linejoin="round" 
                      stroke-width="2" 
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" 
                    />
                  </svg>
                  {{ post.views }}
                </div>
              </div>
            </div>
          </article>
        </router-link>
      </div>

      <!-- 分页区域 -->
      <div class="mt-12 flex justify-center">
        <nav class="flex items-center space-x-2">
          <button 
            @click="changePage('prev')"
            :disabled="currentPage === 1"
            class="px-4 py-2 border rounded-lg text-[#2C1810] hover:bg-[#2C1810] hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {{ $t('blog.prevPage') }}
          </button>
          <button 
            v-for="page in totalPages" 
            :key="page"
            @click="currentPage = page"
            :class="[
              'px-4 py-2 rounded-lg transition-colors',
              currentPage === page 
                ? 'bg-[#2C1810] text-white' 
                : 'border text-[#2C1810] hover:bg-[#2C1810] hover:text-white'
            ]"
          >
            {{ page }}
          </button>
          <button 
            @click="changePage('next')"
            :disabled="currentPage === totalPages"
            class="px-4 py-2 border rounded-lg text-[#2C1810] hover:bg-[#2C1810] hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {{ $t('blog.nextPage') }}
          </button>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BlogCenter',
  data() {
    return {
      currentPage: 1,
      totalPages: 3,
      blogPosts: [
        {
          id: 1,
          category: "解卦技巧",
          title: "乾卦详解：领袖品格的象征",
          description: "乾为天，象征着纯阳刚健的品格。本文详细解读乾卦的卦象含义、现实启示与具体运用...",
          readTime: "12",
          date: "2024-03-15",
          views: "2.8K",
          hexagram: "乾"
        },
        {
          id: 2,
          category: "易经智慧",
          title: "坤卦解析：包容与滋养之道",
          description: "坤为地，代表着纯阴柔顺的特质。本文深入探讨坤卦对现代生活的指导意义...",
          readTime: "10",
          date: "2024-03-10",
          views: "2.3K",
          hexagram: "坤"
        },
        {
          id: 3,
          category: "生活应用",
          title: "屯卦：突破初始的困境",
          description: "屯卦象征着初创时期的艰难。本文讲解如何在事业起步阶段化解困境...",
          readTime: "8",
          date: "2024-03-05",
          views: "1.9K",
          hexagram: "屯"
        }
      ]
    }
  },
  methods: {
    changePage(direction) {
      if (direction === 'prev' && this.currentPage > 1) {
        this.currentPage--
      } else if (direction === 'next' && this.currentPage < this.totalPages) {
        this.currentPage++
      }
    }
  }
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>