<template>
  <div class="todo-view-page">
    <div class="flex flex-col h-full">
      <div class="head flex">
        <el-menu
          :default-active="activeIndex"
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
          </template>
          <template v-else-if="routePath === '/b/view/day'"></template>
          <template v-else></template>
        </div>
      </div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { todoViewMenuData } from '@/assets/js/views/todoView.js'

export default {
  name: 'todo-view-comp',

  data () {
    return {
      todoViewMenu: todoViewMenuData,
      activeIndex: '/b/view/month'
    }
  },

  methods: {
    emitLastMonthEvent () {
      this.$bus.$emit('bus-update-calendar', 'lastMonth')
    },
    emitNextMonthEvent () {
      this.$bus.$emit('bus-update-calendar', 'nextMonth')
    }
  },

  created () {
  },

  computed: {
    routePath () {
      return this.$route.path
    },
    calendarDate () {
      return this.$store.state.calendarDate
    }
  }
}
</script>

<style lang="less" scoped>
@import "@/assets/css/views/todoView.less";
</style>
