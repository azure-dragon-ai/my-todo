<template>
  <div class="space-y-6">
    <h1 class="text-2xl font-bold text-gray-900 dark:text-white">设置</h1>

    <!-- Appearance -->
    <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
      <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">外观</h2>
      <div class="flex items-center justify-between">
        <div>
          <div class="font-medium text-gray-900 dark:text-white">深色模式</div>
          <div class="text-sm text-gray-500 dark:text-gray-400">切换深色/浅色主题</div>
        </div>
        <button
          @click="toggleDarkMode"
          :class="[
            'relative w-12 h-6 rounded-full transition-colors',
            darkMode ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'
          ]"
        >
          <div
            :class="[
              'absolute top-1 w-4 h-4 bg-white rounded-full transition-transform',
              darkMode ? 'left-7' : 'left-1'
            ]"
          />
        </button>
      </div>
    </div>

    <!-- Data Management -->
    <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
      <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">数据管理</h2>
      <div class="space-y-3">
        <button
          @click="showExportModal = true"
          class="w-full py-2 px-4 bg-blue-50 dark:bg-blue-900/20 text-blue-500 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors text-left font-medium"
        >
          导出数据
        </button>
        <button
          @click="triggerImport"
          class="w-full py-2 px-4 bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors text-left font-medium"
        >
          导入数据
        </button>
        <input
          ref="fileInput"
          type="file"
          accept=".json"
          @change="handleImport"
          class="hidden"
        />
        <button
          @click="handleClearAll"
          class="w-full py-2 px-4 bg-red-50 dark:bg-red-900/20 text-red-500 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors text-left font-medium"
        >
          清除所有数据
        </button>
      </div>
    </div>

    <!-- About -->
    <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
      <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">关于</h2>
      <div class="text-sm text-gray-500 dark:text-gray-400 space-y-1">
        <p>版本：1.0.0</p>
        <p>技术栈：Vue 3 + Vite + TailwindCSS + Chart.js</p>
        <p>数据存储：LocalStorage</p>
      </div>
    </div>

    <!-- Export Modal -->
    <ExportModal v-model="showExportModal" />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useSettingsStore } from '../stores/settings'
import { useTodosStore } from '../stores/todos'
import { exportData, importData, clearTodos } from '../utils/storage'
import ExportModal from '../components/ExportModal.vue'

const settingsStore = useSettingsStore()
const todosStore = useTodosStore()

const darkMode = computed(() => settingsStore.darkMode)
const showExportModal = ref(false)
const fileInput = ref(null)

const toggleDarkMode = () => {
  settingsStore.toggleDarkMode()
}

const triggerImport = () => {
  fileInput.value?.click()
}

const handleImport = (event) => {
  const file = event.target.files?.[0]
  if (!file) return

  const reader = new FileReader()
  reader.onload = (e) => {
    const result = importData(e.target.result)
    if (result.success) {
      alert(`成功导入 ${result.count} 个任务`)
      location.reload()
    } else {
      alert('导入失败：' + result.error)
    }
  }
  reader.readAsText(file)
  event.target.value = ''
}

const handleClearAll = () => {
  if (confirm('确定要清除所有数据吗？此操作不可恢复！')) {
    clearTodos()
    location.reload()
  }
}
</script>
