const STORAGE_KEY = 'my-todo-data'

export const loadTodos = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY)
    return data ? JSON.parse(data) : []
  } catch (e) {
    console.error('Failed to load todos from localStorage:', e)
    return []
  }
}

export const saveTodos = (todos) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  } catch (e) {
    console.error('Failed to save todos to localStorage:', e)
  }
}

export const clearTodos = () => {
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch (e) {
    console.error('Failed to clear todos:', e)
  }
}

export const exportData = () => {
  const data = {
    todos: loadTodos(),
    exportedAt: new Date().toISOString(),
    version: '1.0'
  }
  return JSON.stringify(data, null, 2)
}

export const importData = (jsonString) => {
  try {
    const data = JSON.parse(jsonString)
    if (data.todos && Array.isArray(data.todos)) {
      saveTodos(data.todos)
      return { success: true, count: data.todos.length }
    }
    return { success: false, error: 'Invalid data format' }
  } catch (e) {
    return { success: false, error: e.message }
  }
}
