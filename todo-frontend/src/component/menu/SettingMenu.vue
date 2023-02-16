<template>
  <el-menu router>
    <el-menu-item
      v-for="e in settingMenu"
      :key="e.id"
      :index="e.route"
    >
      <i :class="e.iconClass"></i>
      <span slot="title">{{e.name}}</span>
    </el-menu-item>
  </el-menu>
</template>

<script>

export const settingMenuData = [
  { id: 'safety', name: '账号安全', iconClass: 'el-icon-star-on', route: '/setting/account' },
  { id: 'back', name: '返回主页', iconClass: 'el-icon-star-on', route: '/a/collect/todo' }
]

export default {
  name: 'setting-menu-comp',
  data () {
    return {
      settingMenu: settingMenuData
    }
  },
  methods: {}
}
</script>

<style lang="less" scoped>
.el-menu {
  height: 100%;
  background-color: var(--bg-color-main);
}
.el-menu-item:hover {
  background-color: var(--bg-color-menu-hover);
}
</style>
