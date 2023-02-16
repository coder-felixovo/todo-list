<template>
  <div class="add-group-dialog">
    <h1 class="mb-10px color-primary fs-16px fw-700">添加新的清单</h1>
    <el-input
      placeholder="请输入清单名称"
      prefix-icon="el-icon-collection-tag"
      v-model="groupName"
      ref="inputRef"
    ></el-input>
    <div class="mt-20px">
      <el-button
        type="primary"
        class="fr sure"
        @click="sure"
      >确定</el-button>
      <el-button
        type="primary"
        class="fr cancel"
        @click="cancel"
      >取消</el-button>
    </div>
  </div>
</template>

<script>
import { apiAddGroup } from '@/assets/js/public/api.js'
export default {
  name: 'add-group-dialog',
  data () {
    return {
      groupName: '',
      groupIcon: ''
    }
  },
  methods: {
    cancel () {
      this.$store.commit('toggleAddGroupDialog')
    },

    sure () {
      if (!this.groupName) {
        this.$refs.inputRef.focus()
        return
      }
      this.$store.commit('toggleAddGroupDialog')
      const data = {
        groupName: this.groupName,
        groupIcon: this.groupIcon
      }
      this.$request.post(apiAddGroup, data)
        .then((res) => {
          if (res.status === 1031) {
            if (res.data) {
              this.$store.commit('unshiftNewGroup', res.data.newGroup)
            }
          }
        })
    }
  }
}
</script>

<style lang="less" scoped>
@import "@/assets/css/comp/dialog/addGroupDialog.less";
</style>
