export default {
  setToken (state, value) {
    state.token = value
  },
  setTempVueContext (state, value) {
    state.tempVueContext = value
  },

  // 设置菜单、对话框、弹出框等的显示与隐藏
  toggleAddGroupDialog (state, value) {
    state.isShowAddGroupDialog = !state.isShowAddGroupDialog
  },
  toggleAddTagDialog (state, value) {
    state.isShowAddTagDialog = !state.isShowAddTagDialog
  },
  toggleLogoutDialog (state, value) {
    state.isShowLogoutDialog = value || !state.isShowLogoutDialog
  },
  toggleGroupPicker (state, value) {
    state.isShowGroupPicker = !state.isShowGroupPicker
  },
  toggleTodoItemMenu (state, value) {
    state.isShowTodoItemMenu = !state.isShowTodoItemMenu
  },
  toggleGroupMenu (state, value) {
    state.isShowGroupMenu = !state.isShowGroupMenu
  },
  toggleTagMenu (state, value) {
    state.isShowTagMenu = !state.isShowTagMenu
  },
  toggleAddTodoPopover (state, value) {
    state.isShowAddTodoPopover = !state.isShowAddTodoPopover
  },
  toggleDatetimePicker (state, value) {
    state.isShowDatetimePicker = !state.isShowDatetimePicker
  },

  setTodoPopoverMode (state, value) {
    state.addOrEditFlag = value
  },
  setGroupList (state, value) {
    state.groupList = value || []
  },
  updateGroupName (state, value) {
    const { groupId, newGroupName } = value
    const index = state.groupList.findIndex(element => groupId === element.groupId)
    index === -1 ? console.error('修改分组名称失败') : state.groupList[index].groupName = newGroupName
  },
  deleteGroup (state, value) {
    const { deletedGroupId } = value
    const index = state.groupList.findIndex(element => deletedGroupId === element.groupId)
    index === -1 ? console.error('删除分组失败') : state.groupList.splice(index, 1)
  },
  unshiftNewGroup (state, value) {
    state.groupList.unshift(value)
  },
  setMatrixList (state, value) {
    state.matrixList = Array.isArray(value) ? value : []
  },
  setTagList (state, value) {
    state.tagList = Array.isArray(value) ? value : []
  },

  /* 变更一些数据状态 */
  setSelectedDateInDatePicker (state, value) {
    state.selectedDateInDatePicker.rawClassName = value.rawClassName
    state.selectedDateInDatePicker.lastSelectedDate = value.lastSelectedDate
    state.selectedDateInDatePicker.lastSelectedYear = value.lastSelectedYear
    state.selectedDateInDatePicker.lastSelectedMonth = value.lastSelectedMonth
  },
  setCalendarDate (state, value) {
    const { year, month } = value
    state.calendarDate.date = year + '-' + (month + 1)
    state.calendarDate.year = year
    state.calendarDate.month = month
  },
  setAddTodoInGroup (state, value) {
    state.addTodoInGroup.groupId = value.id
    state.addTodoInGroup.groupName = value.name
  },

  // 操作待办事项
  setOperatedTodo (state, value) {
    state.operatedTodo = value
  }

}
