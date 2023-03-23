<template>
  <div class="main-menu-container">
    <el-menu
      router
      :default-active="$router.path"
    >
      <el-menu-item
        v-for="e in mainMenu"
        :key="e.id"
        :index="e.route"
      >
        <i :class="e.iconClass"></i>
      </el-menu-item>
    </el-menu>
    <el-menu>
      <el-menu-item @click="openSearchDialog">
        <i class="el-icon-search"></i>
      </el-menu-item>
      <el-menu-item @click="openLogoutDialog">
        <i class="el-icon-switch-button"></i>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
//   { id: 'setting', iconClass: 'el-icon-setting', route: '/setting' }
//   { id: 'search', iconClass: 'el-icon-search', route: '/d/search' },
const mainMenuData = [
  { id: 'todo', iconClass: 'el-icon-tickets', route: '/a/all/todo' },
  { id: 'calendar', iconClass: 'el-icon-date', route: '/b/view/month' },
  { id: 'matrix', iconClass: 'el-icon-menu', route: '/c/matrix' },
  { id: 'time', iconClass: 'el-icon-timer', route: '/time' },
  { id: 'chart', iconClass: 'el-icon-s-data', route: '/statistics' }
]

export default {
  name: 'Menu',
  data () {
    return {
      mainMenu: mainMenuData
    }
  },
  methods: {
    openLogoutDialog () {
      this.$store.commit('toggleLogoutDialog')
    },
    openSearchDialog () {
      this.$store.commit('toggleSearchDialog')
    }
  }
}
</script>

<style lang="less" scoped>
@import "@/assets/css/comp/menu/mainMenu.less";
</style>
