/* todo 路由中间件 处理函数 */
const { formatDateObject } = require('../util/time')

// 预处理：添加待办事项
module.exports.prevAddTodo = function (request, response, next) {
  const { todoGroupId, todoTitle } = request.body
  const { responseResult } = request
  responseResult.operation = '添加待办事项'
  if (todoGroupId && todoTitle) {
    next()
  } else {
    responseResult.status = -1001
    responseResult.message = '失败，原因：参数todoGroupId或todoTitle为空'
    return response.send(responseResult)
  }
}

// 预处理：将待办事项移入回收站 √
module.exports.prevMoveTodoInBin = function (request, response, next) {
  const { todoId } = request.body
  const { responseResult } = request
  responseResult.operation = '将待办事项移入回收站'
  if (todoId) {
    next()
  } else {
    responseResult.status = -1002
    responseResult.message = '失败，原因：参数todoId为空'
    return response.send(responseResult)
  }
}

// 预处理：删除待办事项 √
module.exports.prevDeleteTodo = function (request, response, next) {
  const { todoId } = request.body
  const { responseResult } = request
  responseResult.operation = '删除待办事项'
  if (todoId) {
    next()
  } else {
    responseResult.status = -1003
    responseResult.message = '失败，原因：参数todoId为空'
    response.send(responseResult)
  }
}

// 预处理：切换待办事项完成状态 √
module.exports.prevToggleTodoCompletionStatus = function (request, response, next) {
  const { todoId } = request.body
  const { responseResult } = request
  responseResult.operation = '切换待办事项完成状态'
  if (todoId) {
    next()
  } else {
    responseResult.status = -1004
    responseResult.message = '失败，原因：参数todoId为空'
    return response.send(responseResult)
  }
}

// 预先处理：恢复待办事项至原先分组（在回收站操作） √
module.exports.prevRegainTodo = function (request, response, next) {
  const { todoId } = request.body
  const { responseResult } = request
  responseResult.operation = '恢复待办事项至原先分组'
  if (todoId) {
    next()
  } else {
    responseResult.status = -1005
    responseResult.message = '失败，原因：参数todoId为空'
    return response.send(responseResult)
  }
}

// 预先处理：保存待办事项详情
module.exports.prevSaveTodoDetail = function (request, response, next) {
  const { todoId } = request.body
  const { responseResult } = request
  responseResult.operation = '保存待办事项详情'
  if (todoId) {
    next()
  } else {
    responseResult.status = -1006
    responseResult.message = '保存失败，原因：参数todoId为空'
    response.send(responseResult)
  }
}

// 预先处理：获取待办事项详情
module.exports.prevGetTodoDetail = function (request, response, next) {
  const { todoId } = request.query
  const { responseResult } = request
  responseResult.operation = '获取待办事项详情'
  if (todoId) {
    next()
  } else {
    responseResult.status = -1007
    responseResult.message = '查询失败，原因：参数todoId为空'
    response.send(responseResult)
  }

}

// 预先处理：修改待办事项标题
module.exports.prevUpdateTodoTitle = function (request, response, next) {
  const { todoId, newTodoTitle } = request.body
  const { responseResult } = request
  responseResult.operation = '修改待办事项标题'
  if (todoId && newTodoTitle) {
    next()
  } else {
    responseResult.status = -1008
    responseResult.message = '修改失败，原因：参数todoId或newTodoTitle为空'
    response.send(responseResult)
  }
}

// 预处理：编辑
module.exports.prevEdit = function (request, response, next) {
  const { todoId, todoTitle } = request.body
  const { responseResult } = request
  if (todoId && todoTitle) {
    next()
  } else {
    responseResult.status = -1010
    responseResult.message = '更新失败，原因：参数为空'
    return response.send(responseResult)
  }
}

// 预处理：获取标签下的待办事项
module.exports.prevGetTagTodo = function (request, response, next) {
  const { tagId } = request.query
  const { responseResult } = request
  responseResult.operation = '获取标签下的待办事项'
  if (tagId) {
    next()
  } else {
    responseResult.status = -1028
    responseResult.message = '查询失败，原因：参数tagId为空'
    return response.send(responseResult)
  }
}

// 中间件：创建新的待办事项，参数验证
module.exports.prevCreateTodo = function (request, response, next) {
  const { todoTitle } = request.body
  const { responseResult } = request
  responseResult.operation = '创建新的待办事项'
  if (todoTitle) {
    next()
  } else {
    responseResult.status = -1001
    responseResult.message = '创建失败，原因：参数todoTitle为空'
    return response.send(responseResult)
  }
}