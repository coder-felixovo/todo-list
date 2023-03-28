/**
 * 构造"任务专注记录"实体
 */
export class TodoFocusRecord {
  /**
   * @param {Object} init
   */
  constructor(init) {
    const { focusId, todoId, todoTitle, focusTime, createTime, note } = init
    this.focusId = focusId || ''
    this.todoId = todoId || ''
    this.todoTitle = todoTitle || ''
    this.focusTime = focusTime || 0
    this.createTime = createTime || ''
    this.note = note || ''
  }
}

/**
 * 将专注时间转换为相应的文本显示
 * @param {number} time 秒
 */
export function convertTimeToText (time) {
  if (typeof time !== 'number') return '0'
  if (Number.isNaN(time)) return '0'
  let leftSeconds = 0
  let seconds = time
  if (seconds < 60) {
    return seconds + 's'
  } else if (seconds < 3600) {
    const minutes = Math.floor(seconds / 60)
    leftSeconds = seconds - minutes * 60
    return leftSeconds === 0 ? minutes + 'min' : minutes + 'min' + leftSeconds + 's'
  } else {
    const hours = Math.floor(seconds / 3600)
    leftSeconds = seconds - hours * 3600
    if (leftSeconds === 0) {
      return hours + 'h'
    }
    const minutes = Math.floor(leftSeconds / 60)
    leftSeconds = leftSeconds - minutes * 60
    if (leftSeconds === 0) {
      return hours + 'h' + minutes + 'min'
    } else {
      return hours + 'h' + minutes + 'min' + leftSeconds + 's'
    }
  }
}
