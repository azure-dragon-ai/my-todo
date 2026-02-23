<template>
  <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
    <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">{{ title }}</h3>
    <component :is="chartComponent" :options="chartOptions" :data="chartData" class="w-full" :style="{ height: height + 'px' }" />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { Bar, Pie, Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
)

const props = defineProps({
  type: {
    type: String,
    default: 'bar',
    validator: (v) => ['bar', 'pie', 'line'].includes(v)
  },
  title: {
    type: String,
    required: true
  },
  data: {
    type: Object,
    required: true
  },
  height: {
    type: Number,
    default: 200
  }
})

const chartComponent = computed(() => {
  switch (props.type) {
    case 'bar': return Bar
    case 'pie': return Pie
    case 'line': return Line
    default: return Bar
  }
})

const chartOptions = computed(() => ({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: props.type === 'pie' ? 'bottom' : 'top'
    }
  }
}))

const chartData = computed(() => ({
  labels: props.data.labels,
  datasets: props.data.datasets
}))
</script>
