class Todo {
  constructor({ todoId, todoTitle, todoChecked, todoStatus, todoDeadline, groupId, matrixId, tagId, createTime, finishTime, groupName, matrixName, priority, tagName }) {
    this.todoId = todoId
    this.todoTitle = todoTitle
    this.todoChecked = todoChecked
    this.todoStatus = todoStatus
    this.todoDeadline = todoDeadline
    this.groupId = groupId
    this.matrixId = matrixId
    this.tagId = tagId
    this.createTime = createTime
    this.finishTime = finishTime
    this.groupName = groupName
    this.matrixName = matrixName
    this.priority = priority
    this.tagName = tagName
  }
}

module.exports.Todo = Todo