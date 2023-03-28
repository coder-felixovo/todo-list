<template>
  <div class="group-menu">
    <el-popover
      placement="right"
      trigger="manual"
      width="200"
      v-model="visibleUpdate"
      title="新的组名"
    >
      <el-input
        ref="groupNameInputRef"
        v-model="groupNameInput"
      ></el-input>
      <div style="text-align: right; margin: 0">
        <el-button
          type="text"
          @click="cancelUpdate"
        >取消</el-button>
        <el-button
          type="text"
          @click="sureUpdate"
        >确定</el-button>
      </div>
      <div
        class="menu-item flex items-center"
        @click.stop="openUpdatePopover"
        slot="reference"
      >
        <i class="el-icon-edit"></i>
        <span class="ml-10px color-grey">修改分组名称</span>
      </div>
    </el-popover>
    <el-popover
      placement="right"
      trigger="manual"
      width="200"
      v-model="visibleDelete"
      title="你确定删除该分组吗？"
    >
      <p class="color-info fs-12px">提示：这不会删除该标签下的待办事项</p>
      <div style="text-align: right; margin: 0">
        <el-button
          type="text"
          @click="cancelDelete"
        >取消</el-button>
        <el-button
          type="primary"
          size="mini"
          @click="sureDelete"
        >确定</el-button>
      </div>
      <div
        class="menu-item flex items-center"
        @click.stop="openDeletePopover"
        slot="reference"
      >
        <i class="el-icon-delete"></i>
        <span class="ml-10px color-grey">删除分组</span>
      </div>
    </el-popover>
  </div>
</template>

<script>
import { updateGroupNameRequest, deleteGroupRequest } from '@/assets/js/request/groupRequest'
const groupMenuData = [
  { id: 'update', name: '修改名称', icon: 'el-icon-edit' },
  { id: 'delete', name: '删除分组', icon: 'el-icon-delete' }
]
export default {
  name: 'group-menu-comp',

  data () {
    return {
      groupMenuList: groupMenuData,
      groupNameInput: '',
      visibleUpdate: false,
      visibleDelete: false
    }
  },

  methods: {
    openUpdatePopover () {
      if (!this.visibleDelete) {
        this.visibleUpdate = true
      }
    },
    openDeletePopover () {
      if (!this.visibleUpdate) {
        this.visibleDelete = true
      }
    },
    cancelUpdate () {
      this.visibleUpdate = false
      this.$store.commit('toggleGroupMenu')
    },
    cancelDelete () {
      this.visibleDelete = false
      this.$store.commit('toggleGroupMenu')
    },
    sureUpdate () {
      this.visibleUpdate = false
      this.$store.commit('toggleGroupMenu')
      const { groupId, groupName } = JSON.parse(sessionStorage.getItem('tempGroup'))
      sessionStorage.removeItem('tempGroup')
      const requestParams = {
        groupId,
        groupName,
        newGroupName: this.groupNameInput
      }
      updateGroupNameRequest({ context: this, requestParams })
    },
    sureDelete () {
      this.visibleDelete = false
      this.$store.commit('toggleGroupMenu')
      const { groupId, groupName } = JSON.parse(sessionStorage.getItem('tempGroup'))
      sessionStorage.removeItem('tempGroup')
      const requestParams = {
        groupId,
        groupName
      }
      deleteGroupRequest({ context: this, requestParams })
    }
  }
}
</script>

<style lang="less" scoped>
@import "@/assets/css/comp/menu/groupMenu.less";
</style>
