<template>
  <div class="max-w-7xl mx-auto space-y-6">
    <!-- Welcome -->
    <div class="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-6 text-white">
      <h1 class="text-2xl font-bold">欢迎回来！</h1>
      <p class="mt-2 opacity-90">今天是你完成任务的第 {{ streak }} 天</p>
    </div>

    <!-- Stats Overview -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
        <div class="text-2xl font-bold text-gray-900 dark:text-white">{{ stats.total }}</div>
        <div class="text-sm text-gray-500 dark:text-gray-400">总任务数</div>
      </div>
      <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
        <div class="text-2xl font-bold text-blue-500">{{ stats.active }}</div>
        <div class="text-sm text-gray-500 dark:text-gray-400">进行中</div>
      </div>
      <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
        <div class="text-2xl font-bold text-green-500">{{ stats.completed }}</div>
        <div class="text-sm text-gray-500 dark:text-gray-400">已完成</div>
      </div>
      <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
        <div class="text-2xl font-bold text-purple-500">{{ stats.completionRate }}%</div>
        <div class="text-sm text-gray-500 dark:text-gray-400">完成率</div>
      </div>
    </div>

    <!-- Priority Overview -->
    <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
      <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">优先级概览</h2>
      <div class="space-y-3">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <div class="w-3 h-3 rounded-full bg-red-500"></div>
            <span class="text-sm text-gray-600 dark:text-gray-400">高优先级</span>
          </div>
          <span class="font-medium text-gray-900 dark:text-white">{{ stats.byPriority.high }}</span>
        </div>
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <div class="w-3 h-3 rounded-full bg-yellow-500"></div>
            <span class="text-sm text-gray-600 dark:text-gray-400">中优先级</span>
          </div>
          <span class="font-medium text-gray-900 dark:text-white">{{ stats.byPriority.medium }}</span>
        </div>
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <div class="w-3 h-3 rounded-full bg-blue-500"></div>
            <span class="text-sm text-gray-600 dark:text-gray-400">低优先级</span>
          </div>
          <span class="font-medium text-gray-900 dark:text-white">{{ stats.byPriority.low }}</span>
        </div>
      </div>
    </div>

    <!-- Recent Activity Chart -->
    <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
      <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">近 7 天完成情况</h2>
      <StatsChart
        v-if="chartData.labels.length > 0"
        type="line"
        title=""
        :data="chartData"
        :height="200"
      />
    </div>

    <!-- Quick Actions -->
    <div class="flex gap-2">
      <RouterLink
        to="/tasks"
        class="flex-1 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-center font-medium"
      >
        查看所有任务
      </RouterLink>
      <RouterLink
        to="/statistics"
        class="flex-1 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-center font-medium"
      >
        查看详细统计
      </RouterLink>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useTodosStore } from '../stores/todos'
import StatsChart from '../components/StatsChart.vue'

const todosStore = useTodosStore()
const stats = computed(() => todosStore.stats)

const streak = computed(() => {
  // Simple streak calculation
  let count = 0
  const today = new Date()
  for (let i = 0; i < 365; i++) {
    const date = new Date(today)
    date.setDate(date.getDate() - i)
    const dateStr = date.toISOString().split('T')[0]
    const completedToday = todosStore.todos.some(t =>
      t.completedAt && t.completedAt.startsWith(dateStr)
    )
    if (completedToday) {
      count++
    } else if (i > 0) {
      break
    }
  }
  return count
})

const chartData = computed(() => {
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
</script>
