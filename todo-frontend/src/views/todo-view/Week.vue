<template>
  <div class="week-view">
    <div class="week-name">
      <div
        class="week-item"
        v-for="item in weekData"
        :key="item.id"
      >{{item.name}}</div>
    </div>
    <div class="week-main">
      <div
        class="week-list"
        v-for="i in 7"
        :key="i"
      >
        <ul>
          <li
            v-for="item in weekData[i - 1].list"
            :key="item.todoId"
            class="todo-item"
          >
            <div>
              <span>{{item.todoTitle}}</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { formatDate } from '@/assets/js/public/timeUtils'
export default {
  name: 'week-view',
  data () {
    return {
      weekData: [
        { id: 'mon', name: '星期一', date: '', list: [] },
        { id: 'tue', name: '星期二', date: '', list: [] },
        { id: 'wed', name: '星期三', date: '', list: [] },
        { id: 'thu', name: '星期四', date: '', list: [] },
        { id: 'fri', name: '星期五', date: '', list: [] },
        { id: 'sat', name: '星期六', date: '', list: [] },
        { id: 'sun', name: '星期天', date: '', list: [] }
      ],
      height: 0,
      curWeekMon: 0 // 当前周 周一 毫秒表示
    }
  },

  methods: {
    init () {
      const weekDOM = document.getElementsByClassName('week-main')[0]
      this.height = weekDOM.clientHeight
      this.getWeek()
      this.reqWeekTodo()
    },
    // 获取一周的日期
    getWeek () {
      // 首先将今天置为0时0分0秒0毫秒，获取今天是星期几
      const dateObj = new Date()
      dateObj.setHours(0)
      dateObj.setMinutes(0)
      dateObj.setSeconds(0)
      dateObj.setMilliseconds(0)
      const whatDay = dateObj.getDay() // 今天星期几
      let before // 前面还有几天
      if (whatDay === 0) {
        // 0表示星期天，则前面还有6天
        before = 6
      } else {
        before = whatDay - 1
      }
      const oneDayMs = 24 * 60 * 60 * 1000
      const monMs = dateObj.getTime() - before * oneDayMs
      for (let i = 1; i <= 7; i++) {
        const tempDateObj = new Date(monMs + oneDayMs * (i - 1))
        const date = formatDate(tempDateObj)
        this.weekData[i - 1].date = date
        if (tempDateObj.getDay() === 1) {
          this.curWeekMon = tempDateObj.getTime()
        }
      }
      this.busSendDateRange()
    },
    lastWeek () {
      console.log('last week')
      const oneDayMs = 24 * 60 * 60 * 1000
      this.curWeekMon -= 7 * oneDayMs
      for (let i = 1; i <= 7; i++) {
        const tempDateObj = new Date(this.curWeekMon + oneDayMs * (i - 1))
        const date = formatDate(tempDateObj)
        this.weekData[i - 1].date = date
      }
      this.busSendDateRange()
      // 重新请求数据
      this.reqWeekTodo()
    },
    nextWeek () {
      console.log('next week')
      const oneDayMs = 24 * 60 * 60 * 1000
      this.curWeekMon += 7 * oneDayMs
      for (let i = 1; i <= 7; i++) {
        const tempDateObj = new Date(this.curWeekMon + oneDayMs * (i - 1))
        const date = formatDate(tempDateObj)
        this.weekData[i - 1].date = date
      }
      this.busSendDateRange()
      // 重新请求数据
      this.reqWeekTodo()
    },
    busSendDateRange () {
      const sendDate = {
        begin: this.weekData[0].date,
        end: this.weekData[6].date
      }
      this.$bus.$emit('bus-date-range', sendDate)
    },
    async reqWeekTodo () {
      const reqParam = {
        begin: this.weekData[0].date,
        end: this.weekData[6].date
      }
      this.$request.get('/api/week_todo', reqParam)
        .then(res => {
          if (res.status === 502) {
            const { weekTodo } = res.data
            const len = weekTodo.length
            if (len === 0) {
              this.weekData.forEach(element => {
                element.list = []
              })
              return
            }
            weekTodo.forEach(element => {
              this.weekData.forEach(item => {
                if (element.todoDeadline.includes(item.date)) {
                  item.list.push(element)
                }
              })
            })
          }
        })
    }
  },

  created () {
  },

  mounted () {
    this.init()
    this.$bus.$off('bus-last-week').$on('bus-last-week', this.lastWeek)
    this.$bus.$off('bus-next-week').$on('bus-next-week', this.nextWeek)
  }
}
</script>

<style lang="less" scoped>
@import "@/views/todo-view/index.less";
</style>
