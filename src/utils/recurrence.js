/**
 * 计算下一次重复任务的日期
 * @param {Date} currentDate - 当前日期
 * @param {string} type - 重复类型 (daily, weekly, monthly, yearly)
 * @param {number} interval - 重复间隔
 * @returns {Date} 下一次重复日期
 */
export function getNextRecurrenceDate(currentDate, type, interval = 1) {
  const date = new Date(currentDate)

  switch (type) {
    case 'daily':
      date.setDate(date.getDate() + interval)
      break
    case 'weekly':
      date.setDate(date.getDate() + interval * 7)
      break
    case 'monthly':
      date.setMonth(date.getMonth() + interval)
      break
    case 'yearly':
      date.setFullYear(date.getFullYear() + interval)
      break
    default:
      return date
  }

  return date
}

/**
 * 获取重复类型的中文标签
 * @param {string} type - 重复类型
 * @returns {string} 中文标签
 */
export function getRecurrenceLabel(type) {
  const labels = {
    daily: '每日',
    weekly: '每周',
    monthly: '每月',
    yearly: '每年',
    custom: '自定义'
  }
  return labels[type] || type
}

/**
 * 生成重复任务的描述
 * @param {Object} recurrence - 重复配置对象
 * @returns {string} 重复描述
 */
export function formatRecurrence(recurrence) {
  if (!recurrence) return ''

  const { type, interval = 1 } = recurrence

  if (interval === 1) {
    return getRecurrenceLabel(type)
  }

  switch (type) {
    case 'daily':
      return `每 ${interval} 天`
    case 'weekly':
      return `每 ${interval} 周`
    case 'monthly':
      return `每 ${interval} 月`
    case 'yearly':
      return `每 ${interval} 年`
    default:
      return ''
  }
}

/**
 * 获取工作日（周一至周五）
 * @returns {number[]} 工作日数组 [1,2,3,4,5]
 */
export function getWeekdays() {
  return [1, 2, 3, 4, 5] // Monday to Friday
}

/**
 * 检查日期是否是工作日
 * @param {Date} date - 要检查的日期
 * @returns {boolean} 是否是工作日
 */
export function isWeekday(date) {
  const day = date.getDay()
  return day >= 1 && day <= 5
}
