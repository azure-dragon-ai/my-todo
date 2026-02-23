<template>
  <div class="space-y-3">
    <TodoItem
      v-for="todo in todos"
      :key="todo.id"
      :todo="todo"
      @toggle="$emit('toggle', $event)"
      @edit="$emit('edit', $event)"
      @delete="$emit('delete', $event)"
    />
    <div v-if="todos.length === 0" class="text-center py-12">
      <Icon name="inbox" class="w-12 h-12 mx-auto text-gray-400" />
      <p class="mt-4 text-gray-500 dark:text-gray-400">暂无待办事项</p>
    </div>
  </div>
</template>

<script setup>
import Icon from './Icon.vue'
import TodoItem from './TodoItem.vue'

defineProps({
  todos: {
    type: Array,
    required: true
  }
})

defineEmits(['toggle', 'edit', 'delete'])
</script>
