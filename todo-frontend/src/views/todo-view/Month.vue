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
    <div
      class="day-of-month"
      @click.right="onRightClickEvent"
    >
      <div
        class="cell"
        v-for="item in days"
        :key="item.id"
        :date="item.date"
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
import { getMonthTodoReuest } from '@/views/todo-view/index.js'
import TodoItem from '@/component/TodoItem'
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
      getMonthTodoReuest({ context: this, requestParams })
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
      getMonthTodoReuest({ context: this, requestParams })
    },

    onRightClickEvent () {}
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
    getMonthTodoReuest({ context: this, requestParams })
  },

  mounted () {
    this.$bus.$off('bus-update-calendar').$on('bus-update-calendar', this.preUpdateCalendar)
  }
}
</script>

<style lang="less" scoped>
@import "@/views/todo-view/index.less";
</style>
