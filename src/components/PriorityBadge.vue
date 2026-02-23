<template>
  <span :class="['px-2 py-1 rounded-full text-xs font-medium', classes]">
    {{ label }}
  </span>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  priority: {
    type: String,
    default: 'none',
    validator: (value) => ['high', 'medium', 'low', 'none'].includes(value)
  }
})

const priorityConfig = {
  high: { label: '高优先级', class: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' },
  medium: { label: '中优先级', class: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' },
  low: { label: '低优先级', class: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' },
  none: { label: '无优先级', class: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200' }
}

const classes = computed(() => priorityConfig[props.priority].class)
const label = computed(() => priorityConfig[props.priority].label)
</script>
