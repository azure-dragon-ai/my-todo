<template>
  <div class="space-y-2">
    <div
      v-for="subtask in subtasks"
      :key="subtask.id"
      class="flex items-center gap-2 p-2 bg-gray-50 dark:bg-gray-700/50 rounded"
    >
      <button
        @click="$emit('toggle', subtask.id)"
        :class="[
          'flex-shrink-0 w-4 h-4 rounded border transition-colors',
          subtask.completed
            ? 'bg-green-500 border-green-500 text-white'
            : 'border-gray-300 dark:border-gray-600'
        ]"
      >
        <Icon v-if="subtask.completed" name="check" class="w-3 h-3" />
      </button>
      <span
        :class="[
          'flex-1 text-sm',
          subtask.completed ? 'line-through text-gray-400' : 'text-gray-700 dark:text-gray-300'
        ]"
      >
        {{ subtask.title }}
      </span>
      <button
        @click="$emit('delete', subtask.id)"
        class="p-1 text-gray-400 hover:text-red-500"
      >
        <Icon name="x" class="w-4 h-4" />
      </button>
    </div>
  </div>
</template>

<script setup>
import { Icon } from 'lucide-vue-next'

defineProps({
  subtasks: {
    type: Array,
    required: true
  }
})

defineEmits(['toggle', 'delete'])
</script>
