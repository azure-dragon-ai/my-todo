import { exportData } from '../utils/storage'

export function useExport() {
  const downloadFile = (content, filename, mimeType) => {
    const blob = new Blob([content], { type: mimeType })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = filename
    link.click()
    URL.revokeObjectURL(url)
  }

  const exportToJSON = (filename = 'todo-export') => {
    const content = exportData()
    const timestamp = new Date().toISOString().split('T')[0]
    downloadFile(content, `${filename}-${timestamp}.json`, 'application/json')
  }

  const exportToCSV = (todos, filename = 'todo-export') => {
    const headers = ['ID', '标题', '描述', '状态', '优先级', '分类', '截止日期', '创建时间', '完成时间']

    const rows = todos.map(todo => [
      todo.id,
      `"${(todo.title || '').replace(/"/g, '""')}"`,
      `"${(todo.description || '').replace(/"/g, '""')}"`,
      todo.completed ? '已完成' : '进行中',
      todo.priority || '',
      (todo.categories || []).join(';'),
      todo.dueDate ? new Date(todo.dueDate).toLocaleDateString('zh-CN') : '',
      new Date(todo.createdAt).toLocaleDateString('zh-CN'),
      todo.completedAt ? new Date(todo.completedAt).toLocaleDateString('zh-CN') : ''
    ])

    const content = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n')

    const timestamp = new Date().toISOString().split('T')[0]
    downloadFile(content, `${filename}-${timestamp}.csv`, 'text/csv')
  }

  return {
    exportToJSON,
    exportToCSV
  }
}
