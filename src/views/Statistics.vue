<template>
  <div class="max-w-7xl mx-auto space-y-6">
    <h1 class="text-2xl font-bold text-gray-900 dark:text-white">统计</h1>

    <!-- Overview Cards -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
        <div class="text-2xl font-bold text-gray-900 dark:text-white">{{ stats.total }}</div>
        <div class="text-sm text-gray-500 dark:text-gray-400">总任务数</div>
      </div>
      <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
        <div class="text-2xl font-bold text-green-500">{{ stats.completed }}</div>
        <div class="text-sm text-gray-500 dark:text-gray-400">已完成</div>
      </div>
      <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
        <div class="text-2xl font-bold text-blue-500">{{ stats.active }}</div>
        <div class="text-sm text-gray-500 dark:text-gray-400">进行中</div>
      </div>
      <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
        <div class="text-2xl font-bold text-purple-500">{{ stats.completionRate }}%</div>
        <div class="text-sm text-gray-500 dark:text-gray-400">完成率</div>
      </div>
    </div>

    <!-- Completion Trend -->
    <StatsChart
      type="line"
      title="近 7 天完成情况"
      :data="trendData"
      :height="250"
    />

    <!-- Priority Distribution -->
    <div class="grid md:grid-cols-2 gap-4">
      <StatsChart
        type="bar"
        title="按优先级分布"
        :data="priorityData"
        :height="200"
      />
      <StatsChart
        v-if="hasCategories"
        type="pie"
        title="按分类分布"
        :data="categoryData"
        :height="200"
      />
    </div>

    <!-- Category List -->
    <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
      <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">分类详情</h2>
      <div class="space-y-2">
        <div
          v-for="[catId, count] in Object.entries(stats.categories)"
          :key="catId"
          class="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700/50 rounded"
        >
          <div class="flex items-center gap-2">
            <div
              class="w-3 h-3 rounded-full"
              :style="{ backgroundColor: getCategoryColor(catId) }"
            ></div>
            <span class="text-sm text-gray-700 dark:text-gray-300">{{ getCategoryName(catId) }}</span>
          </div>
          <span class="font-medium text-gray-900 dark:text-white">{{ count }}</span>
        </div>
        <div v-if="Object.keys(stats.categories).length === 0" class="text-center py-4 text-gray-500 dark:text-gray-400">
          暂无分类数据
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useTodosStore } from '../stores/todos'
import { useCategoriesStore } from '../stores/categories'
import StatsChart from '../components/StatsChart.vue'

const todosStore = useTodosStore()
const categoriesStore = useCategoriesStore()

const stats = computed(() => todosStore.stats)

const trendData = computed(() => {
  const last7Days = stats.value.last7Days
  return {
    labels: last7Days.map(d => {
      const date = new Date(d.date)
      return `${date.getMonth() + 1}/${date.getDate()}`
    }),
    datasets: [{
      label: '完成任务数',
      data: last7Days.map(d => d.count),
      borderColor: '#3B82F6',
      backgroundColor: 'rgba(59, 130, 246, 0.1)',
      tension: 0.3,
      fill: true
    }]
  }
})

const priorityData = computed(() => {
  const byPriority = stats.value.byPriority
  return {
    labels: ['高优先级', '中优先级', '低优先级', '无优先级'],
    datasets: [{
      label: '任务数量',
      data: [
        byPriority.high,
        byPriority.medium,
        byPriority.low,
        byPriority.none
      ],
      backgroundColor: ['#EF4444', '#F59E0B', '#3B82F6', '#6B7280']
    }]
  }
})

const categoryData = computed(() => {
  const categories = stats.value.categories
  return {
    labels: Object.keys(categories).map(id => getCategoryName(id)),
    datasets: [{
      label: '任务数量',
      data: Object.values(categories),
      backgroundColor: Object.keys(categories).map(id => getCategoryColor(id))
    }]
  }
})

const hasCategories = computed(() => Object.keys(stats.value.categories).length > 0)

const getCategoryName = (id) => {
  const cat = categoriesStore.categories.find(c => c.id === id)
  return cat ? cat.name : id
}

const getCategoryColor = (id) => {
  const cat = categoriesStore.categories.find(c => c.id === id)
  return cat ? cat.color : '#6B7280'
}
</script>
