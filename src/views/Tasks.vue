<template>
  <div class="space-y-4">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white">待办事项</h1>
      <button
        @click="showCreateForm = true"
        class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
      >
        <Icon name="plus" class="w-5 h-5" />
        新建任务
      </button>
    </div>

    <!-- Search and Filter Toggle -->
    <div class="flex gap-2">
      <div class="flex-1">
        <SearchBar v-model="searchQuery" />
      </div>
      <button
        @click="showFilter = !showFilter"
        :class="[
          'px-4 py-2 rounded-lg border transition-colors flex items-center gap-2',
          showFilter
            ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-500 text-blue-500'
            : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
        ]"
      >
        <Icon name="filter" class="w-5 h-5" />
        筛选
      </button>
    </div>

    <!-- Filter Panel -->
    <FilterPanel
      v-if="showFilter"
      :status="filterStatus"
      :priority="filterPriority"
      :category="filterCategory"
      :sort-by="sortBy"
      :sort-order="sortOrder"
      @update:status="filterStatus = $event"
      @update:priority="filterPriority = $event"
      @update:category="filterCategory = $event"
      @update:sortBy="sortBy = $event"
      @update:sortOrder="sortOrder = $event"
      @clear="clearFilters"
    />

    <!-- Todo List -->
    <TodoList
      :todos="filteredTodos"
      @toggle="handleToggle"
      @edit="handleEdit"
      @delete="handleDelete"
    />

    <!-- Create/Edit Modal -->
    <div v-if="showCreateForm || editingTodo" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div class="bg-white dark:bg-gray-800 rounded-lg w-full max-w-lg max-h-[90vh] overflow-y-auto p-6">
        <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-4">
          {{ editingTodo ? '编辑任务' : '新建任务' }}
        </h2>
        <TodoForm
          :edit-todo="editingTodo"
          @submit="handleSubmit"
          @cancel="showCreateForm = false, editingTodo = null"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import Icon from '../components/Icon.vue'
import { useTodosStore } from '../stores/todos'
import SearchBar from '../components/SearchBar.vue'
import FilterPanel from '../components/FilterPanel.vue'
import TodoList from '../components/TodoList.vue'
import TodoForm from '../components/TodoForm.vue'

const todosStore = useTodosStore()

const showCreateForm = ref(false)
const showFilter = ref(false)
const editingTodo = ref(null)
const searchQuery = ref('')
const filterStatus = ref('all')
const filterPriority = ref('all')
const filterCategory = ref('all')
const sortBy = ref('createdAt')
const sortOrder = ref('desc')

// Update store filter
computed(() => {
  todosStore.filter.search = searchQuery.value
  todosStore.filter.status = filterStatus.value
  todosStore.filter.priority = filterPriority.value
  todosStore.filter.category = filterCategory.value
  todosStore.filter.sortBy = sortBy.value
  todosStore.filter.sortOrder = sortOrder.value
})

const filteredTodos = computed(() => todosStore.filteredTodos)

const clearFilters = () => {
  searchQuery.value = ''
  filterStatus.value = 'all'
  filterPriority.value = 'all'
  filterCategory.value = 'all'
  sortBy.value = 'createdAt'
  sortOrder.value = 'desc'
}

const handleToggle = (id) => {
  todosStore.toggleComplete(id)
}

const handleEdit = (todo) => {
  editingTodo.value = todo
}

const handleDelete = (id) => {
  if (confirm('确定要删除这个任务吗？')) {
    todosStore.deleteTodo(id)
  }
}

const handleSubmit = (todoData) => {
  if (editingTodo.value) {
    todosStore.updateTodo(editingTodo.value.id, todoData)
  } else {
    todosStore.createTodo(todoData)
  }
  showCreateForm.value = false
  editingTodo.value = null
}
</script>
