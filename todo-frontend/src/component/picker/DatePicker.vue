<template>
  <div class="date-picker-container">
    <div class="date-title">
      <div
        class="date-year-prev"
        @click.stop="prevYear"
      >
        &lt;&lt; </div>
      <div
        class="date-prev"
        @click.stop="prevMonth"
      >
        &lt; </div>
      <div class="date-time">{{this.currentYear}}年 {{this.currentMonth + 1}}月</div>
      <div
        class="date-next"
        @click.stop="nextMonth"
      > > </div>
      <div
        class="date-year-next"
        @click.stop="nextYear"
      > >> </div>
    </div>
    <div class="date-week">
      <div>一</div>
      <div>二</div>
      <div>三</div>
      <div>四</div>
      <div>五</div>
      <div>六</div>
      <div>日</div>
    </div>
    <div
      class="date-day"
      ref="dateWrapRef"
      @click.stop="selectDate($event)"
    >
      <div
        v-for="e in dateInMonth"
        :date="e.date"
        :key="e.id"
        :class="e.class"
      >{{e.date.split('-')[2]}}</div>
    </div>
    <div class="flex">
      <el-button @click="sure">确定</el-button>
      <el-button>取消</el-button>
      <el-button @click.stop="clear">清除</el-button>
    </div>
  </div>
</template>

<script>
import { updateCalendar } from '@/assets/js/public/timeUtils'
export default {
  name: 'date-picker-comp',
  data () {
    return {
      currentYear: 9999,
      currentMonth: 0,
      selectedDate: '',
      dateInMonth: [],
      dateInLastMonthClass: 'date-item disable last lh-40',
      dateInMonthClass: 'date-item lh-40',
      dateInNextMonthClass: 'date-item disable next lh-40'
    }
  },
  methods: {
    initialize () {
      const date = new Date()
      const year = date.getFullYear()
      const month = date.getMonth()
      this.currentYear = year
      this.currentMonth = month
      this.dateInMonth = updateCalendar({ year, month })
      this.initializeDateClass()
    },
    initializeDateClass () {
      this.dateInMonth.forEach(e => {
        if (e.isLastMonth) {
          e.class = this.dateInLastMonthClass
        } else if (e.isNextMonth) {
          e.class = this.dateInNextMonthClass
        } else {
          e.class = this.dateInMonthClass
        }
      })
    },
    prevYear () {
      this.currentYear -= 1
      this.dateInMonth = updateCalendar({ year: this.currentYear, month: this.currentMonth })
      this.initializeDateClass()
    },
    nextYear () {
      this.currentYear += 1
      this.dateInMonth = updateCalendar({ year: this.currentYear, month: this.currentMonth })
      this.initializeDateClass()
    },
    prevMonth () {
      if (this.currentMonth === 0) {
        this.currentMonth = 11
        this.currentYear -= 1
      } else {
        this.currentMonth -= 1
      }
      this.dateInMonth = updateCalendar({ year: this.currentYear, month: this.currentMonth })
      this.initializeDateClass()
    },
    nextMonth () {
      if (this.currentMonth === 11) {
        this.currentMonth = 0
        this.currentYear += 1
      } else {
        this.currentMonth += 1
      }
      this.dateInMonth = updateCalendar({ year: this.currentYear, month: this.currentMonth })
      this.initializeDateClass()
    },
    selectDate (event) {
      const { rawClassName, lastSelectedDate } = this.$store.state.selectedDateInDatePicker
      // 去掉上一次选中日期的样式
      if (lastSelectedDate) {
        Array.from(this.$refs.dateWrapRef.children).some(dom => {
          if (dom.className.includes('select')) {
            dom.className = rawClassName
            return true
          }
          return false
        })
      }
      // 为选中日期添加样式
      if (event.target.className.includes('date-item')) {
        const dateYouCliked = event.target.attributes[1].nodeValue
        const selectedDate = {
          rawClassName: event.target.className,
          lastSelectedDate: dateYouCliked,
          lastSelectedYear: this.currentYear,
          lastSelectedMonth: this.currentMonth
        }
        this.selectedDate = selectedDate
        event.target.className = event.target.className + ' select'
      }
    },
    sure () {
      this.$store.commit('setSelectedDateInDatePicker', this.selectedDate)
      this.$bus.$emit('bus-send-date', this.selectedDate)
    },
    clear () {

    }
  },
  created () {
    const { lastSelectedDate, lastSelectedYear, lastSelectedMonth } = this.$store.state.selectedDateInDatePicker
    if (lastSelectedDate) {
      // 有记录选择日期
      this.dateInMonth = updateCalendar({ year: lastSelectedYear, month: lastSelectedMonth })
      this.currentYear = lastSelectedYear
      this.currentMonth = lastSelectedMonth
      this.initializeDateClass()
    } else {
      // 没有记录
      this.initialize()
    }
  },
  beforeMount () {
    const { lastSelectedDate } = this.$store.state.selectedDateInDatePicker
    if (lastSelectedDate) {
      this.$nextTick(() => {
        Array.from(this.$refs.dateWrapRef.children).some(dom => {
          if (lastSelectedDate === dom.attributes[1].nodeValue) {
            dom.className += ' select'
            return true
          }
          return false
        })
      })
    }
  },
  mounted () {
  },
  beforeUpdate () {
  },
  beforeDestroy () {
  }
}
</script>

<style lang="less" scoped>
@import "@/assets/css/comp/picker/datePicker.less";
</style>
