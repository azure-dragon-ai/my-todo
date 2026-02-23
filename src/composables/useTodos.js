import { computed } from 'vue'
import { useTodosStore } from '../stores/todos'

export function useTodos() {
  const todosStore = useTodosStore()

  const activeTodos = computed(() =>
    todosStore.todos.filter(t => !t.completed)
  )

  const completedTodos = computed(() =>
    todosStore.todos.filter(t => t.completed)
  )

  const getTodoById = (id) => {
    return todosStore.todos.find(t => t.id === id)
  }

  const getOverdueTodos = computed(() => {
    const now = new Date()
    return activeTodos.value.filter(t =>
      t.dueDate && new Date(t.dueDate) < now
    )
  })

  const getTodayTodos = computed(() => {
    const today = new Date().toISOString().split('T')[0]
    return activeTodos.value.filter(t =>
      t.dueDate && t.dueDate.startsWith(today)
    )
  })

  return {
    todos: computed(() => todosStore.todos),
    filteredTodos: computed(() => todosStore.filteredTodos),
    stats: computed(() => todosStore.stats),
    activeTodos,
    completedTodos,
    getTodoById,
    getOverdueTodos,
    getTodayTodos,
    createTodo: todosStore.createTodo,
    updateTodo: todosStore.updateTodo,
    deleteTodo: todosStore.deleteTodo,
    toggleComplete: todosStore.toggleComplete,
    addSubtask: todosStore.addSubtask,
    toggleSubtask: todosStore.toggleSubtask,
    deleteSubtask: todosStore.deleteSubtask
  }
}
