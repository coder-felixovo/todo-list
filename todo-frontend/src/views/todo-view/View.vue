/* 待办事项视图页面 */
<template>
  <div class="todo-view-page">
    <div class="flex flex-col h-full">
      <div class="head flex">
        <el-menu
          :default-active="$route.path"
          mode="horizontal"
          active-text-color="#409eff"
          router
        >
          <el-menu-item
            v-for="e in todoViewMenu"
            :index="e.route"
            :key="e.id"
          >{{e.name}}</el-menu-item>
        </el-menu>
        <div class="right">
          <template v-if="routePath === '/b/view/month'">
            <div class="toggle-month">
              <i
                class="el-icon-arrow-left"
                @click="emitLastMonthEvent"
              ></i>
              <span class="date-text">{{calendarDate.date}}</span>
              <i
                class="el-icon-arrow-right"
                @click="emitNextMonthEvent"
              ></i>
            </div>
          </template>
          <template v-else-if="routePath === '/b/view/week'">
            <i
              class="el-icon-arrow-left"
              @click="emitLastWeekEvent"
            ></i>
            <span class="date-text">{{weekDateRange.begin}} - {{weekDateRange.end}}</span>
            <i
              class="el-icon-arrow-right"
              @click="emitNextWeekEvent"
            ></i>
          </template>
          <template v-else-if="routePath === '/b/view/day'"></template>
          <template v-else></template>
        </div>
      </div>
      <router-view :key="$route.path"></router-view>
    </div>
  </div>
</template>

<script>
const routeMonth = '/b/view/month'
const routeWeek = '/b/view/week'
const routeDay = '/b/view/day'

export const todoViewMenuData = [
  { name: '月', route: routeMonth, key: 'month' },
  { name: '周', route: routeWeek, key: 'week' }
  // { name: '天', route: routeDay, key: 'day' }
]

export default {
  name: 'todo-view-comp',

  data () {
    return {
      todoViewMenu: todoViewMenuData,
      weekDateRange: {
        begin: '',
        end: ''
      }
    }
  },

  methods: {
    emitLastMonthEvent () {
      this.$bus.$emit('bus-update-calendar', 'lastMonth')
    },
    emitNextMonthEvent () {
      this.$bus.$emit('bus-update-calendar', 'nextMonth')
    },
    emitLastWeekEvent() {
      this.$bus.$emit('bus-last-week')
    },
    emitNextWeekEvent () {
      this.$bus.$emit('bus-next-week')
    },
    setDateRange (busData) {
      const { begin, end } = busData
      this.weekDateRange.begin = begin
      this.weekDateRange.end = end
    }
  },

  computed: {
    routePath () {
      return this.$route.path
    },
    calendarDate () {
      return this.$store.state.calendarDate
    }
  },

  mounted () {
    // 来自Week.vue
    this.$bus.$off('bus-date-range').$on('bus-date-range', this.setDateRange)
  }
}
</script>

<style lang="less" scoped>
@import "@/views/todo-view/index.less";
</style>
