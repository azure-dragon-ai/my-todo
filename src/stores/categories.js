import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCategoriesStore = defineStore('categories', () => {
  const categories = ref([
    { id: 'work', name: '工作', color: '#3B82F6' },
    { id: 'personal', name: '个人', color: '#10B981' },
    { id: 'shopping', name: '购物', color: '#F59E0B' },
    { id: 'health', name: '健康', color: '#EF4444' },
    { id: 'learning', name: '学习', color: '#8B5CF6' },
    { id: 'finance', name: '财务', color: '#06B6D4' }
  ])

  const addCategory = (category) => {
    categories.value.push({
      id: Date.now().toString(36),
      ...category
    })
  }

  const removeCategory = (id) => {
    const index = categories.value.findIndex(c => c.id === id)
    if (index !== -1) {
      categories.value.splice(index, 1)
    }
  }

  const updateCategory = (id, updates) => {
    const category = categories.value.find(c => c.id === id)
    if (category) {
      Object.assign(category, updates)
    }
  }

  return {
    categories,
    addCategory,
    removeCategory,
    updateCategory
  }
})
