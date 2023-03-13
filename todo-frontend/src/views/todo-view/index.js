/*
  TodoView.vue
*/
import { apiGetMonthTodo } from '@/assets/js/api/todoViewAPI'

const routeMonth = '/b/view/month'
const routeWeek = '/b/view/week'
const routeDay = '/b/view/day'

export const todoViewMenuData = [
  { name: '月', route: routeMonth, key: 'month' },
  { name: '周', route: routeWeek, key: 'week' },
  { name: '天', route: routeDay, key: 'day' }
]

export function getMonthTodoReuest ({ context, requestParams }) {
  context.$request.get(apiGetMonthTodo, requestParams)
    .then(res => {
      if (res.status === 501) {
        context.todoList = res.data.monthViewData
      }
    })
}
