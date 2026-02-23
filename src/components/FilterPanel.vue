<template>
  <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 space-y-4">
    <!-- Status Filter -->
    <div>
      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">状态</label>
      <div class="flex gap-2">
        <button
          v-for="option in statusOptions"
          :key="option.value"
          @click="$emit('update:status', option.value)"
          :class="[
            'px-3 py-1.5 rounded-lg text-sm font-medium transition-colors',
            status === option.value
              ? 'bg-blue-500 text-white'
              : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
          ]"
        >
          {{ option.label }}
        </button>
      </div>
    </div>

    <!-- Priority Filter -->
    <div>
      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">优先级</label>
      <select
        :value="priority"
        @change="$emit('update:priority', $event.target.value)"
        class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
      >
        <option value="all">全部</option>
        <option value="high">高优先级</option>
        <option value="medium">中优先级</option>
        <option value="low">低优先级</option>
        <option value="none">无优先级</option>
      </select>
    </div>

    <!-- Category Filter -->
    <div>
      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">分类</label>
      <select
        :value="category"
        @change="$emit('update:category', $event.target.value)"
        class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
      >
        <option value="all">全部分类</option>
        <option v-for="cat in categories" :key="cat.id" :value="cat.id">
          {{ cat.name }}
        </option>
      </select>
    </div>

    <!-- Sort -->
    <div>
      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">排序</label>
      <div class="flex gap-2">
        <select
          :value="sortBy"
          @change="$emit('update:sortBy', $event.target.value)"
          class="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
        >
          <option value="createdAt">创建时间</option>
          <option value="dueDate">截止日期</option>
          <option value="priority">优先级</option>
        </select>
        <button
          @click="$emit('update:sortOrder', sortOrder === 'asc' ? 'desc' : 'asc')"
          class="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600"
        >
          <Icon :name="sortOrder === 'asc' ? 'arrow-up' : 'arrow-down'" class="w-5 h-5" />
        </button>
      </div>
    </div>

    <!-- Clear Filters -->
    <button
      @click="$emit('clear')"
      class="w-full py-2 text-sm text-blue-500 hover:text-blue-600"
    >
      清除所有筛选
    </button>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import Icon from './Icon.vue'
import { useCategoriesStore } from '../stores/categories'

const props = defineProps({
  status: { type: String, default: 'all' },
  priority: { type: String, default: 'all' },
  category: { type: String, default: 'all' },
  sortBy: { type: String, default: 'createdAt' },
  sortOrder: { type: String, default: 'desc' }
})

const emit = defineEmits(['update:status', 'update:priority', 'update:category', 'update:sortBy', 'update:sortOrder', 'clear'])

const categoriesStore = useCategoriesStore()
const categories = computed(() => categoriesStore.categories)

const statusOptions = [
  { value: 'all', label: '全部' },
  { value: 'active', label: '进行中' },
  { value: 'completed', label: '已完成' }
]
</script>
