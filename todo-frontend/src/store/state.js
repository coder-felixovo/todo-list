export default {
  token: null,
  tempVueContext: null,

  isShowAddGroupDialog: false,
  isShowAddTagDialog: false,
  isShowLogoutDialog: false,
  isShowGroupPicker: false,
  isShowTodoItemMenu: false,
  isShowGroupMenu: false,
  isShowTagMenu: false,
  isShowAddTodoPopover: false,
  isShowDatetimePicker: false,
  isShowSearchDialog: false,
  isShowTextEditor: false,

  // 控制AddTodoPopover是添加还是编辑
  addOrEditFlag: '',

  groupList: null,
  tagList: null,
  matrixList: null,

  addTodoInGroup: {
    groupId: '',
    groupName: ''
  },

  selectedDateInDatePicker: {
    rawClassName: null,
    lastSelectedDate: '',
    lastSelectedYear: 0,
    lastSelectedMonth: 0
  },

  // 待办事项月视图
  calendarDate: {
    date: '',
    year: 0,
    month: 0
  },

  // 操作待办事项
  // 例如：获取待办事项详情、切换待办事项状态、删除待办事项等
  operatedTodo: null,

  searchGroup: [],
  searchTag: [],
  searchTodo: []

}
