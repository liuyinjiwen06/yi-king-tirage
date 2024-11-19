<template>
  <div class="min-h-screen bg-[#F5F5F0] py-12">
    <div class="max-w-4xl mx-auto px-4">
      <!-- 卦象标题 -->
      <div class="text-center mb-12">
        <h1 class="text-3xl font-bold text-[#2C1810] mb-2">{{ $t(`blog.hexagrams.${id}.name`) }}</h1>
        <p class="text-gray-600">{{ $t(`blog.hexagrams.${id}.chineseName`) }}</p>
      </div>

      <!-- 卦象解读 -->
      <div class="bg-white rounded-2xl shadow-lg p-8 mb-8">
        <h2 class="text-2xl font-bold text-[#2C1810] mb-4">卦象解读</h2>
        <p class="text-gray-700">{{ $t(`blog.hexagrams.${id}.interpretation.general.overview`) }}</p>
      </div>

      <!-- 事业、财富、关系、健康 -->
      <div class="bg-white rounded-2xl shadow-lg p-8">
        <div class="space-y-6">
          <!-- 事业 -->
          <div>
            <h3 class="text-xl font-bold text-[#2C1810] mb-2">
              {{ $t(`blog.hexagrams.${id}.interpretation.lifeAspects.career.title`) }}
            </h3>
            <p class="text-gray-700">{{ $t(`blog.hexagrams.${id}.interpretation.lifeAspects.career.guidance`) }}</p>
          </div>

          <!-- 财富 -->
          <div>
            <h3 class="text-xl font-bold text-[#2C1810] mb-2">
              {{ $t(`blog.hexagrams.${id}.interpretation.lifeAspects.wealth.title`) }}
            </h3>
            <p class="text-gray-700">{{ $t(`blog.hexagrams.${id}.interpretation.lifeAspects.wealth.guidance`) }}</p>
          </div>

          <!-- 人际关系 -->
          <div>
            <h3 class="text-xl font-bold text-[#2C1810] mb-2">
              {{ $t(`blog.hexagrams.${id}.interpretation.lifeAspects.relationships.title`) }}
            </h3>
            <p class="text-gray-700">{{ $t(`blog.hexagrams.${id}.interpretation.lifeAspects.relationships.guidance`) }}</p>
          </div>

          <!-- 健康 -->
          <div>
            <h3 class="text-xl font-bold text-[#2C1810] mb-2">
              {{ $t(`blog.hexagrams.${id}.interpretation.lifeAspects.health.title`) }}
            </h3>
            <p class="text-gray-700">{{ $t(`blog.hexagrams.${id}.interpretation.lifeAspects.health.guidance`) }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HexagramDetail',
  data() {
    return {
      id: parseInt(this.$route.params.id)
    }
  }
}
</script>