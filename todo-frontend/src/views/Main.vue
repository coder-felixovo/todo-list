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
import { reqGetGroup } from '@/assets/js/request/groupRequest'
import { reqGetTag } from '@/assets/js/request/tagRequest'
import { reqGetMatrix } from '@/assets/js/request/matrixRequest'
import MainMenu from '@/component/menu/MainMenu.vue'
export default {
  components: { MainMenu },

  methods: {
    async getGroup () {
      const result = await reqGetGroup(this)
      if (result instanceof Error) {
        console.error('获取分组失败')
      } else {
        if (result.status === 1032) {
          const { groupData } = result.data
          localStorage.setItem('groupList', JSON.stringify(groupData))
          this.$store.commit('setGroupList', groupData)
        }
      }
    },
    async getTag() {
      const result = await reqGetTag(this)
      if (result instanceof Error) {
        console.error('获取标签失败')
      } else {
        if (result.status === 902) {
          const { tagList } = result.data
          localStorage.setItem('tagList', JSON.stringify(tagList))
          this.$store.commit('setTagList', tagList)
        }
      }
    },
    async getMatrix () {
      const result = await reqGetMatrix(this)
      if (result instanceof Error) {
        console.error('获取四象限失败')
      } else {
        if (result.status === 601) {
          const { matrixData } = result.data
          localStorage.setItem('matrixList', matrixData)
          this.$store.commit('setMatrixList', matrixData)
        }
      }
    }
  },

  created () {
    this.getGroup()
    this.getMatrix()
    this.getTag()
  }
}
</script>

<style lang="less" scoped>
</style>
