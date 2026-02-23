<template>
  <div class="space-y-2">
    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">分类</label>
    <div class="flex flex-wrap gap-2">
      <button
        v-for="category in categories"
        :key="category.id"
        type="button"
        @click="toggleCategory(category.id)"
        :class="[
          'px-3 py-1.5 rounded-full text-sm font-medium transition-colors',
          isSelected(category.id)
            ? 'text-white ring-2 ring-offset-2'
            : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
        ]"
        :style="isSelected(category.id) ? { backgroundColor: category.color, ringColor: category.color } : {}"
      >
        {{ category.name }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useCategoriesStore } from '../stores/categories'

const props = defineProps({
  modelValue: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['update:modelValue'])

const categoriesStore = useCategoriesStore()
const categories = computed(() => categoriesStore.categories)

const isSelected = (id) => props.modelValue.includes(id)

const toggleCategory = (id) => {
  const newCategories = isSelected(id)
    ? props.modelValue.filter(c => c !== id)
    : [...props.modelValue, id]
  emit('update:modelValue', newCategories)
}
</script>
