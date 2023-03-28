<template>
  <div class="todo-calendar">
    <div class="day-of-week flex">
      <div
        class="item"
        v-for="e in dayName"
        :key="e.id"
      >
        <span>{{e.name}}</span>
      </div>
    </div>
    <div class="day-of-month">
      <div
        class="cell overflow-hidden"
        v-for="item in days"
        :key="item.id"
        :date="item.date"
        @click="clickEvent"
      >
        <span class="fs-14px">{{item.day}}</span>
        <template v-for="e in todoList">
          <TodoItem
            v-if="e.todoDeadline.includes(item.date)"
            :key="e.todoId"
            :todoProp="e"
          />
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { dayNameInWeek, updateCalendar } from '@/assets/js/public/timeUtils.js'
import { apiToggleTodoChecked, apiGetMonthTodo } from '@/assets/js/api/api'
import TodoItem from '@/component/TodoItem'
import { showMessage } from '@/assets/js/public/publicFunction'
export default {
  name: 'todo-month-view',

  components: { TodoItem },

  data () {
    return {
      dayName: dayNameInWeek,
      days: [],
      todoList: []
    }
  },

  methods: {
    preUpdateCalendar (value) {
      if (value === 'lastMonth') {
        this.lastMonth()
        return
      }
      if (value === 'nextMonth') {
        this.nextMonth()
      }
    },

    lastMonth () {
      let { year, month } = this.$store.state.calendarDate
      if (month === 0) {
        year--
        month = 11
      } else {
        month--
      }
      this.$store.commit('setCalendarDate', { year, month })
      this.days = updateCalendar({ year, month })
      const requestParams = {
        beginDate: this.days[0].date,
        endDate: this.days[this.days.length - 1].date
      }
      this.getMonthTodoRequest(requestParams)
    },

    nextMonth () {
      let { year, month } = this.$store.state.calendarDate
      if (month === 11) {
        year++
        month = 0
      } else {
        month++
      }
      this.$store.commit('setCalendarDate', { year, month })
      this.days = updateCalendar({ year, month })
      const requestParams = {
        beginDate: this.days[0].date,
        endDate: this.days[this.days.length - 1].date
      }
      this.getMonthTodoRequest({ context: this, requestParams })
    },

    async reqToggleTodoChecked (reqParam) {
      return new Promise((resolve, reject) => {
        this.$request.post(apiToggleTodoChecked, reqParam)
          .then(res => {
            if (res.status === 1004) {
              resolve(res.data)
            }
          })
          .catch(error => {
            if (error) {
              showMessage(this, '无效的操作', 'info', 800)
            }
          })
      })
    },

    async getMonthTodoRequest (requestParams) {
      this.$request.get(apiGetMonthTodo, requestParams)
        .then(res => {
          if (res.status === 501) {
            this.todoList = res.data.monthViewData
          }
        })
    },

    async clickEvent() {
      const clickDOM = event.composedPath()[0]
      if (!clickDOM) return
      if (clickDOM._prevClass.includes('bi-square')) {
        // 完成待办事项
        const todo = event.composedPath().find(element => element._prevClass.includes('todo-item')).__vue__.todo
        console.log(todo)
        const reqParam = {
          todoId: todo.todoId,
          originalChecked: todo.todoChecked,
          targetChecked: todo.todoChecked === 0 ? 1 : 0
        }
        const { todoId: _todoId } = await this.reqToggleTodoChecked(reqParam)
        const index = this.todoList.findIndex(element => element.todoId === _todoId)
        this.todoList.splice(index, 1)
      }
    }

  },

  created () {
    const dateObj = new Date()
    const year = dateObj.getFullYear()
    const month = dateObj.getMonth()
    this.$store.commit('setCalendarDate', { year, month })
    this.days = updateCalendar({ year, month })
    const requestParams = {
      beginDate: this.days[0].date,
      endDate: this.days[this.days.length - 1].date
    }
    this.getMonthTodoRequest(requestParams)
  },

  mounted () {
    this.$bus.$off('bus-update-calendar').$on('bus-update-calendar', this.preUpdateCalendar)
  }
}
</script>

<style lang="less" scoped>
@import "@/views/todo-view/index.less";
</style>
