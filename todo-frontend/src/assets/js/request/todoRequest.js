import {
  apiToggleTodoChecked, apiCreateTodo, apiMoveBin, apiDeleteTodo, apiRegainTodo
} from '@/assets/js/api/todoAPI'
import { showMessage } from '../public/publicFunction'

// 切换事项完成状态
export function toggleTodoCheckedRequest ({ context, requestParams }) {
  return new Promise((resolve, reject) => {
    context.$request.post(apiToggleTodoChecked, requestParams)
      .then(res => {
        if (res.status === 1004) {
          resolve(res.data)
        } else {
          console.error('切换待办事项状态失败')
        }
      })
  })
}

// 请求：创建新的待办事项
export function createTodoRequest ({ context, requestParams }) {
  return new Promise((resolve, reject) => {
    context.$request.post(apiCreateTodo, requestParams)
      .then(res => {
        if (res.status === 1001) {
          resolve(res.data.todo)
        } else if (res.status === -1001) {
          showMessage(context, '标题不能为空', 'info', 800)
        }
      })
  })
}

// 将待办事项移入回收站
export function moveTodoBinRequest ({ context, requestParams }) {
  return new Promise((resolve, reject) => {
    context.$request.post(apiMoveBin, requestParams)
      .then(res => {
        resolve(res)
      })
  })
}

// 删除待办事项
export function deleteTodoRequest ({ context, requestParams }) {
  return new Promise((resolve, reject) => {
    context.$request.post(apiDeleteTodo, requestParams)
      .then(res => {
        resolve(res)
      })
  })
}

// 恢复待办事项（从回收站移出）
export function regainTodoRequest ({ context, requestParams }) {
  return new Promise((resolve, reject) => {
    context.$request.post(apiRegainTodo, requestParams)
      .then(res => {
        resolve(res)
      })
  })
}
