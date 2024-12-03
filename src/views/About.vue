<template>
    <div class="min-h-screen bg-[#F5F5F0] text-gray-800">
      <main class="max-w-4xl mx-auto px-4 py-8">
        <h1 class="text-3xl font-bold text-[#2C1810] my-12 text-center">{{ $t('about.title') }}</h1>
        
        <div class="bg-white rounded-2xl shadow-lg py-8 px-12 mb-8">
        <section >
          <h2 class="text-2xl font-semibold text-[#C8503C] mb-4 hidden">{{ $t('about.section1.title') }}</h2>
          <p class="mb-4 leading-relaxed">
            {{ $t('about.section1.paragraph1') }}
          </p>
          <p class="mb-4 leading-relaxed">
            {{ $t('about.section1.paragraph2') }}
          </p>
        </section>
  
        <section class="pt-12">
          <h2 class="text-2xl font-semibold text-[#C8503C] mb-4">{{ $t('about.section2.title') }}</h2>
          <p class="mb-4 leading-relaxed">
            {{ $t('about.section2.paragraph1') }}
          </p>
          <p class="mb-4 leading-relaxed">
            {{ $t('about.section2.paragraph2') }}
          </p>
        </section>
  
        <section class="pt-12">
          <h2 class="text-2xl font-semibold text-[#C8503C] mb-4">{{ $t('about.section3.title') }}</h2>
          <p class="mb-4 leading-relaxed">
            {{ $t('about.section3.paragraph1') }}
          </p>
          <p class="mb-4 leading-relaxed">
            {{ $t('about.section3.paragraph2') }}
          </p>
        </section>
  
        <section class="pt-12">
          <h2 class="text-2xl font-semibold text-[#C8503C] mb-4">{{ $t('about.section4.title') }}</h2>
          <p class="mb-4 leading-relaxed">
            {{ $t('about.section4.paragraph1') }}
          </p>
          <p class="mb-4 leading-relaxed">
            {{ $t('about.section4.paragraph2') }}
          </p>
        </section>
  
    </div>

        <!-- <div class="text-center mt-8">
          <a href="#" class="inline-block px-6 py-3 bg-[#2C1810] text-[#F5F5F0] rounded-lg hover:bg-[#3D291D] transition-colors duration-300">
            {{ $t('about.backToHome') }}
          </a>
        </div> -->
      </main>
    </div>
  </template>
  
  <script>
  export default {
    name: 'AboutPage',
    // 如果需要的话，这里可以添加组件逻辑
  }
  </script>
  
  <style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@400;700&display=swap');
  
  body {
    font-family: 'Noto Serif SC', serif;
  }
  </style>