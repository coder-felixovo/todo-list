import {
  apiCreateTodo, apiToggleTodoChecked, apiMoveBin, apiDeleteTodo, apiRegainTodo
} from '../api/api'
import { showMessage } from '../public/publicFunction'

// 请求：切换事项完成状态
export function toggleTodoCheckedRequest ({ context, requestParams }) {
  return new Promise((resolve, reject) => {
    context.$request.post(apiToggleTodoChecked, requestParams)
      .then(res => {
        if (res.status === 1004) {
          resolve(res.data)
        }
      })
      .catch(err => {
        showMessage(context, '请求出现错误', 'info', 800)
      })
  })
}

/**
 * 请求：创建新的事项
 * @param {Vue} context
 * @param {object} requestParams
 * @returns
 */
export function reqCreateTodo (context, requestParams) {
  return new Promise((resolve, reject) => {
    context.$request.post(apiCreateTodo, requestParams)
      .then(res => resolve(res))
      .catch(err => reject(err))
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
