/* 四象限页面 */

// 创建新的待办事项，处理响应结果
export function handleCreateTodo ({ context, todo }) {
  let _this = context // AddTodoPopover.vue context
  if (!_this) {
    console.error('无法检测到Vue上下文')
    return
  }
  const matrixVueContext = _this.$store.state.tempVueContext // Matrix.vue context
  _this = matrixVueContext || null
  if (!_this) {
    console.error('无法检测到Matrix.vue实例')
    return
  }
  _this.matrixTodoList.unshift(todo)
}

// 切换待办事项完成状态，处理响应结果
export function handleToggleTodoChecked ({ context, todoId }) {
  const _this = context // Matrix.vue
  if (!_this) {
    console.error('无法检测到Matrix.vue上下文')
  } else {
    const index = _this.matrixTodoList.findIndex(element => todoId === element.todoId)
    index === -1 ? console.log('无法找到对应的todo数据') : _this.matrixTodoList.splice(index, 1)
  }
}
