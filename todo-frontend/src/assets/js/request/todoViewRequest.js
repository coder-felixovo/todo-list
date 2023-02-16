// 在视图页面需要发送的请求

import { apiGetMonthTodo } from '@/assets/js/api/todoViewAPI'

// {

// }
export function getMonthTodoReuest ({ context, requestParams }) {
  context.$request.get(apiGetMonthTodo, requestParams)
    .then(res => {
      if (res.status === 501) {
        context.todoList = res.data.monthViewData
      }
    })
}
