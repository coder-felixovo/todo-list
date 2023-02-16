<template>
  <el-row class="h-full">
    <el-col
      class="h-full"
      :span="1"
    >
      <MainMenu />
    </el-col>
    <el-col
      class="h-full"
      :span="23"
    >
      <router-view></router-view>
    </el-col>
  </el-row>
</template>

<script>
import { getGroupRequest } from '@/assets/js/request/groupRequest'
import { getMatrixRequest } from '@/assets/js/request/matrixRequest'
import { getTagRequest } from '@/assets/js/request/tagRequest'
import MainMenu from '@/component/menu/MainMenu.vue'
export default {
  components: { MainMenu },

  created () {
    getGroupRequest({ context: this })
    getMatrixRequest({ context: this })
    getTagRequest({ context: this })
  }
}
</script>

<style lang="less" scoped>
</style>
