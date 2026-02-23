import { ref, computed } from 'vue'

export function useFilters(initialFilters = {}) {
  const filters = ref({
    status: 'all',
    priority: 'all',
    category: 'all',
    search: '',
    sortBy: 'createdAt',
    sortOrder: 'desc',
    ...initialFilters
  })

  const setFilter = (key, value) => {
    filters.value[key] = value
  }

  const clearFilters = () => {
    filters.value = {
      status: 'all',
      priority: 'all',
      category: 'all',
      search: '',
      sortBy: 'createdAt',
      sortOrder: 'desc'
    }
  }

  const hasActiveFilters = computed(() => {
    return (
      filters.value.status !== 'all' ||
      filters.value.priority !== 'all' ||
      filters.value.category !== 'all' ||
      filters.value.search !== ''
    )
  })

  return {
    filters,
    setFilter,
    clearFilters,
    hasActiveFilters
  }
}
