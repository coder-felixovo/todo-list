<template>
  <div id="web">
    <div class="main">
      <router-view></router-view>
    </div>
    <AddGroupDialog v-if="$store.state.isShowAddGroupDialog" />
    <AddTagDialog v-if="$store.state.isShowAddTagDialog" />
    <LogoutDialog v-if="$store.state.isShowLogoutDialog" />
    <GroupPicker v-if="$store.state.isShowGroupPicker" />
    <TodoItemMenu v-if="$store.state.isShowTodoItemMenu" />
    <GroupMenu v-if="$store.state.isShowGroupMenu" />
    <TagMenu v-if="$store.state.isShowTagMenu" />
    <AddTodoPopover v-if="$store.state.isShowAddTodoPopover" />
    <DateTimePicker v-if="$store.state.isShowDatetimePicker" />
    <SearchDialog v-if="$store.state.isShowSearchDialog" />
  </div>
</template>

<script>
import { showMessage } from '@/assets/js/public/publicFunction'

import AddGroupDialog from '@/component/dialog/AddGroupDialog.vue'
import AddTagDialog from '@/component/dialog/AddTagDialog.vue'
import DateTimePicker from '@/component/picker/DateTimePicker'
import GroupPicker from '@/component/picker/GroupPicker.vue'
import TodoItemMenu from '@/component/menu/TodoItemMenu.vue'
import LogoutDialog from '@/component/dialog/LogoutDialog.vue'
import GroupMenu from '@/component/menu/GroupMenu'
import TagMenu from '@/component/menu/TagMenu'
import AddTodoPopover from '@/component/popover/AddTodoPopover'
import SearchDialog from '@/component/search-dialog/SearchDialog'
export default {
  name: 'Web',

  components: {
    LogoutDialog,
    AddGroupDialog,
    AddTagDialog,
    GroupPicker,
    TodoItemMenu,
    DateTimePicker,
    GroupMenu,
    TagMenu,
    AddTodoPopover,
    SearchDialog
  },

  data () {
    return {
      vDelTrashAllDialog: false
    }
  },

  methods: {
    closeExitDialog () {
      this.$store.commit('setVisExitDialog', false)
    },
    signout () {
      this.$store.commit('setVisExitDialog', false)
      localStorage.clear()
      showMessage(this, '退出登录，欢迎下次再来', 'success', 2000)
      this.$router.push('/login')
    }
  },

  created () {

  },

  mounted () {}

}
</script>

<style lang="less" scoped>
@import "@/assets/css/views/app.less";
</style>
