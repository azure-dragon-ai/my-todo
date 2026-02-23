<template>
  <form @submit.prevent="handleSubmit" class="space-y-4">
    <!-- Title -->
    <div>
      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        标题 <span class="text-red-500">*</span>
      </label>
      <input
        v-model="form.title"
        type="text"
        required
        placeholder="输入任务标题..."
        class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
    </div>

    <!-- Description -->
    <div>
      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        描述
      </label>
      <textarea
        v-model="form.description"
        rows="3"
        placeholder="添加任务描述..."
        class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
    </div>

    <!-- Priority -->
    <div>
      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        优先级
      </label>
      <div class="flex gap-2">
        <button
          v-for="p in priorities"
          :key="p.value"
          type="button"
          @click="form.priority = p.value"
          :class="[
            'px-3 py-2 rounded-lg text-sm font-medium transition-colors border-2',
            form.priority === p.value
              ? p.selectedClass
              : 'border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
          ]"
        >
          {{ p.label }}
        </button>
      </div>
    </div>

    <!-- Category Selector -->
    <CategorySelector v-model="form.categories" />

    <!-- Due Date -->
    <div>
      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        截止日期
      </label>
      <input
        v-model="form.dueDate"
        type="datetime-local"
        class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
    </div>

    <!-- Recurrence -->
    <div>
      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        重复规则
      </label>
      <select
        v-model="form.recurrenceType"
        class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      >
        <option value="">不重复</option>
        <option value="daily">每日</option>
        <option value="weekly">每周</option>
        <option value="monthly">每月</option>
        <option value="yearly">每年</option>
      </select>
    </div>

    <!-- Subtasks -->
    <div v-if="editingTodo" class="space-y-2">
      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
        子任务
      </label>
      <div class="space-y-2">
        <div
          v-for="(subtask, index) in editingTodo.subtasks"
          :key="subtask.id"
          class="flex items-center gap-2"
        >
          <input
            type="text"
            :value="subtask.title"
            @change="updateSubtask(index, $event.target.value)"
            class="flex-1 px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
          />
          <button
            type="button"
            @click="removeSubtask(index)"
            class="p-1 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded"
          >
            <Icon name="x" class="w-4 h-4" />
          </button>
        </div>
      </div>
      <button
        type="button"
        @click="addSubtask"
        class="text-sm text-blue-500 hover:text-blue-600 flex items-center gap-1"
      >
        <Icon name="plus" class="w-4 h-4" />
        添加子任务
      </button>
    </div>

    <!-- Actions -->
    <div class="flex justify-end gap-2 pt-4 border-t dark:border-gray-700">
      <button
        type="button"
        @click="$emit('cancel')"
        class="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
      >
        取消
      </button>
      <button
        type="submit"
        class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
      >
        {{ editingTodo ? '更新' : '创建' }}
      </button>
    </div>
  </form>
</template>

<script setup>
import { reactive, computed, watch } from 'vue'
import Icon from './Icon.vue'
import CategorySelector from './CategorySelector.vue'

const props = defineProps({
  editTodo: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['submit', 'cancel'])

const priorities = [
  { value: 'none', label: '无', selectedClass: 'bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-500' },
  { value: 'low', label: '低', selectedClass: 'bg-blue-100 dark:bg-blue-900 border-blue-500 text-blue-800 dark:text-blue-200' },
  { value: 'medium', label: '中', selectedClass: 'bg-yellow-100 dark:bg-yellow-900 border-yellow-500 text-yellow-800 dark:text-yellow-200' },
  { value: 'high', label: '高', selectedClass: 'bg-red-100 dark:bg-red-900 border-red-500 text-red-800 dark:text-red-200' }
]

const form = reactive({
  title: '',
  description: '',
  priority: 'none',
  categories: [],
  dueDate: '',
  recurrenceType: ''
})

const editingTodo = computed(() => props.editTodo)

const initForm = () => {
  if (props.editTodo) {
    form.title = props.editTodo.title
    form.description = props.editTodo.description
    form.priority = props.editTodo.priority
    form.categories = props.editTodo.categories
    form.dueDate = props.editTodo.dueDate ? props.editTodo.dueDate.slice(0, 16) : ''
    form.recurrenceType = props.editTodo.recurrence?.type || ''
  } else {
    form.title = ''
    form.description = ''
    form.priority = 'none'
    form.categories = []
    form.dueDate = ''
    form.recurrenceType = ''
  }
}

const handleSubmit = () => {
  const todoData = {
    ...form,
    recurrence: form.recurrenceType ? { type: form.recurrenceType, interval: 1 } : null
  }
  emit('submit', todoData)
}

const addSubtask = () => {
  if (!editingTodo.value) return
  emit('add-subtask', { title: '新子任务' })
}

const updateSubtask = (index, title) => {
  if (!editingTodo.value) return
  emit('update-subtask', { index, title })
}

const removeSubtask = (index) => {
  if (!editingTodo.value) return
  emit('remove-subtask', index)
}

// Watch for editTodo changes
watch(() => props.editTodo, initForm, { immediate: true })
</script>
