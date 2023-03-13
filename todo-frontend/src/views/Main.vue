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
import { apiGetMatrix } from '@/assets/js/public/api.js'
import { getGroupRequest } from '@/assets/js/request/groupRequest'
import { getTagRequest } from '@/assets/js/request/tagRequest'
import MainMenu from '@/component/menu/MainMenu.vue'
export default {
  components: { MainMenu },

  methods: {
    async getMatrixRequest () {
      this.$request.get(apiGetMatrix)
        .then(res => {
          if (res.status === 601) {
            this.$store.commit('setMatrixList', res.data.matrixData)
          }
        })
    }
  },

  created () {
    getGroupRequest({ context: this })
    this.getMatrixRequest()
    getTagRequest({ context: this })
  }
}
</script>

<style lang="less" scoped>
</style>
