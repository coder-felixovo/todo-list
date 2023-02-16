<template>
  <div class="logout-dialog">
    <div class="head">
      <span class="color-primary fs-18px fw-600">退出登录</span>
    </div>
    <div class="tips color-primary fs-14px">
      <p>你是否确定退出登录？</p>
      <p class="mt-10px">Tips: 这将清除您的登录状态</p>
    </div>
    <div class="flex mt-10px justify-end">
      <el-button
        type="text"
        @click="cancel"
      >取消</el-button>
      <el-button
        type="text"
        @click="sure"
      >确定</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'logout-dialog-comp',
  methods: {
    cancel () {
      if (this.$store.state.isShowLogoutDialog) {
        this.$store.commit('toggleLogoutDialog')
      }
    },
    sure () {
      if (this.$store.state.isShowLogoutDialog) {
        this.$store.commit('toggleLogoutDialog')
        localStorage.clear()
        sessionStorage.clear()
        document.cookie = null
        this.$router.push('/login')
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import "@/assets/css/comp/dialog/logoutDialog";
</style>
