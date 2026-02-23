<template>
  <div v-if="modelValue" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
    <div class="bg-white dark:bg-gray-800 rounded-lg w-full max-w-md p-6">
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">导出数据</h3>

      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            导出格式
          </label>
          <div class="flex gap-2">
            <button
              v-for="format in formats"
              :key="format.value"
              @click="selectedFormat = format.value"
              :class="[
                'px-4 py-2 rounded-lg text-sm font-medium transition-colors border-2',
                selectedFormat === format.value
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-500'
                  : 'border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-400'
              ]"
            >
              {{ format.label }}
            </button>
          </div>
        </div>

        <div class="flex justify-end gap-2">
          <button
            @click="$emit('update:modelValue', false)"
            class="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            取消
          </button>
          <button
            @click="handleExport"
            class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            导出
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { exportData } from '../utils/storage'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue'])

const formats = [
  { value: 'json', label: 'JSON' },
  { value: 'csv', label: 'CSV' }
]

const selectedFormat = ref('json')

const downloadFile = (content, filename, type) => {
  const blob = new Blob([content], { type })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}

const toCSV = (todos) => {
  const headers = ['ID', '标题', '描述', '状态', '优先级', '分类', '截止日期', '创建时间']
  const rows = todos.map(t => [
    t.id,
    `"${t.title.replace(/"/g, '""')}"`,
    `"${t.description?.replace(/"/g, '""') || ''}"`,
    t.completed ? '已完成' : '进行中',
    t.priority,
    t.categories.join(';'),
    t.dueDate || '',
    t.createdAt
  ])
  return [headers.join(','), ...rows.map(r => r.join(','))].join('\n')
}

const handleExport = () => {
  if (selectedFormat.value === 'json') {
    const content = exportData()
    downloadFile(content, `todo-backup-${new Date().toISOString().split('T')[0]}.json`, 'application/json')
  } else {
    const data = JSON.parse(exportData())
    const content = toCSV(data.todos)
    downloadFile(content, `todo-export-${new Date().toISOString().split('T')[0]}.csv`, 'text/csv')
  }
  emit('update:modelValue', false)
}
</script>
