import {
  apiGetAllTodo, apiGetCollectTodo, apiGetGroupTodo, apiGetTagTodo, apiGetCompletedTodo, apiGetBinTodo,
  apiGetTodayTodo, apiDelTrashAll, apiGetTomorrowTodo, apiToggleTodoStatus
} from '@/assets/js/public/api.js'

const getTodoFunctionMap = {
  '/a/all/todo': getAllTodoHandler,
  '/a/collect/todo': getCollectTodoHandler,
  '/a/today/todo': getTodayTodoHandler,
  '/a/tomorrow/todo': getTomorrowTodoHandler,
  '/a/completed/todo': getCompletedTodoHandler,
  '/a/trash/todo': getTrashTodoHandler
}

// 根据路由决定获取待办事项数据
export function dispatchGetTodo (context) {
  const _this = context // TodoList.vue
  const path = _this.$route.path
  if (getTodoFunctionMap[path]) {
    getTodoFunctionMap[path](_this)
    return
  }
  if (path.includes('tag')) {
    getTagTodoHandler(context)
    return
  }
  getGroupTodoHandler(context)
}

// 获取全部待办事项
export function getAllTodoHandler (context) {
  const _this = context // TodoList.vue
  _this.$request.get(apiGetAllTodo)
    .then(res => {
      if (res.status === 1021) {
        let { todoData } = res.data
        const uncheckedList = []
        const checkedList = []
        todoData.forEach(element => {
          if (element.todoChecked === 0) {
            uncheckedList.push(element)
          } else {
            checkedList.push(element)
          }
        })
        _this.uncheckedTodoList = uncheckedList
        _this.checkedTodoList = checkedList
      }
    })
}

// 获取收集箱待办事项
export function getCollectTodoHandler (context) {
  const _this = context // TodoList.vue
  const defaultGroup = JSON.parse(sessionStorage.getItem('defaultGroup'))
  if (!defaultGroup) {
    console.error('Data defaultGroup is null')
    return
  }
  const { groupId, groupName } = defaultGroup
  _this.$request.get(apiGetCollectTodo, {
    groupId,
    groupName
  })
    .then(res => {
      if (res.status === 1022) {
        _this.uncheckedTodoList = res.data.uncheckedTodoData
        _this.checkedTodoList = res.data.checkedTodoData
      }
    })
}

// 获取今天的待办事项
export function getTodayTodoHandler (context) {
  const _this = context
  _this.$request.get(apiGetTodayTodo)
    .then(res => {
      if (res.status === 1023) {
        if (res.data) {
          _this.uncheckedTodoList = res.data.uncheckedTodoData
          _this.checkedTodoList = res.data.checkedTodoData
        }
      }
    })
}

// 获取明天的待办事项
export function getTomorrowTodoHandler (context) {
  const _this = context
  _this.$request.get(apiGetTomorrowTodo)
    .then(res => {
      if (res.status === 1024) {
        if (res.data) {
          _this.uncheckedTodoList = res.data.uncheckedTodoData
          _this.checkedTodoList = res.data.checkedTodoData
        }
      }
    })
}

// 获取所有完成的待办事项
export function getCompletedTodoHandler (context) {
  const _this = context // TodoList.vue
  _this.$request.get(apiGetCompletedTodo)
    .then((res) => {
      if (res.status === 1025) {
        if (res.data) {
          _this.checkedTodoList = res.data.checkedTodoData
        }
      }
    })
}

// 获取回收站的待办事项
export function getTrashTodoHandler (context) {
  const _this = context
  _this.$request.get(apiGetBinTodo)
    .then((res) => {
      if (res.status === 1026) {
        if (res.data) {
          _this.uncheckedTodoList = res.data.uncheckedTodoData
          _this.checkedTodoList = res.data.checkedTodoData
        }
      }
    })
}

// 根据分组获取待办事项
export function getGroupTodoHandler (context) {
  const _this = context // TodoList.vue
  const groupId = _this.$route.params.id // 分组id
  _this.$request.get(apiGetGroupTodo, { groupId })
    .then(res => {
      if (res.status === 1027) {
        if (res.data) {
          _this.uncheckedTodoList = res.data.uncheckedTodoData
          _this.checkedTodoList = res.data.checkedTodoData
        }
      }
    })
}

// 根据标签获取待办事项
export function getTagTodoHandler (context) {
  const _this = context // TodoList.vue
  const tagId = _this.$route.params.id // 分组id
  _this.$request.get(apiGetTagTodo, { tagId })
    .then(res => {
      if (res.status === 1028) {
        if (res.data) {
          _this.uncheckedTodoList = res.data.uncheckedTodoData
          _this.checkedTodoList = res.data.checkedTodoData
        }
      }
    })
}
