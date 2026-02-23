import { defineStore } from 'pinia'
import { ref, onMounted } from 'vue'

export const useSettingsStore = defineStore('settings', () => {
  const darkMode = ref(false)
  const defaultView = ref('dashboard')
  const itemsPerPage = ref(10)

  // Load saved preferences on mount
  onMounted(() => {
    const savedDarkMode = localStorage.getItem('darkMode')
    if (savedDarkMode !== null) {
      darkMode.value = savedDarkMode === 'true'
      if (darkMode.value) {
        document.documentElement.classList.add('dark')
      }
    }
  })

  const toggleDarkMode = () => {
    darkMode.value = !darkMode.value
    localStorage.setItem('darkMode', darkMode.value.toString())
    if (darkMode.value) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  return {
    darkMode,
    defaultView,
    itemsPerPage,
    toggleDarkMode
  }
})
