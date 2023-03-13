/* todo 路由 处理函数 */
const uuid = require('node-uuid/uuid')
const db = require('../db/config')
const { printSqlError } = require('../util/public.js')
const { handleQueryResult } = require('../util/public')
const { generateDatetime, formatDateObject } = require('../util/time')
const { Todo } = require('../model/todo')

const {
  sqlAddTodo, sqlCreateTodo, sqlMoveTodoInBin, sqlDeleteTodo, sqlToggleTodoCompletionStatus, sqlRegainTodo,
  sqlSaveTodoDetail, sqlGetTodoDetail, sqlUpdateTodoTitle, sqlGetAllTodo, sqlGetCollectTodo,
  sqlGetCompletedTodo, sqlGetBinTodo, sqlGetTodoByDate, sqlGetGroupTodo, sqlDeleteAllTodo,
  sqlEdit, sqlGetTagTodo
} = require('../db/sql/todoSql.js')

// 添加待办事项 1001
module.exports.addTodoHandler = function (request, response) {
  const { userid } = request.auth
  const { todoTitle, todoDate, todoTime, todoGroupId, todoGroupName, } = request.body
  const { responseResult } = request
  const todoId = uuid().split('-').join('').slice(0, 15)
  const createTime = generateDatetime()
  let todoDeadline
  if (todoDate) {
    if (todoTime) {
      todoDeadline = todoDate + ' ' + todoTime
    } else {
      todoDeadline = todoDate + ' ' + '00:00:00'
    }
  } else {
    todoDeadline = null
  }
  const sqlParams = [userid, todoId, todoTitle, 0, 1, todoDeadline, todoGroupId, createTime]
  db.query(sqlAddTodo, sqlParams, (error, results) => {
    if (error) {
      console.log(error.sql + '\n' + error.sqlMessage)
      responseResult.status = -1
      responseResult.message = '服务器内部出现错误'
      return response.send(responseResult)
    }
    if (results.affectedRows === 1) {
      responseResult.status = 1001
      responseResult.message = '成功'
      responseResult.data.newTodo = {
        todoId,
        todoTitle,
        todoChecked: 0,
        todoDeadline,
        todoGroupId,
        todoGroupName,
        createTime
      }
      return response.send(responseResult)
    }
  })
}

// 将待办事项移入回收站 1002
module.exports.moveTodoInBinHandler = function (request, response) {
  const { userid } = request.auth
  const { todoId } = request.body
  const { responseResult } = request
  const sqlParams = [userid, todoId]
  db.query(sqlMoveTodoInBin, sqlParams, (error, results) => {
    if (error) {
      printSqlError('moveTodoInBinHandler', error)
      responseResult.status = -1
      responseResult.message = '服务器内部出现错误'
      return response.send(responseResult)
    }
    if (results.affectedRows === 1) {
      responseResult.status = 1002
      responseResult.message = '成功'
      return response.send(responseResult)
    } else {
      responseResult.status = -1002
      responseResult.message = '失败，原因：参数不匹配'
      return response.send(responseResult)
    }
  })
}

// 删除待办事项（在回收站操作）  1003
module.exports.deleteTodoHandler = function (request, response) {
  const { userid } = request.auth
  const { todoId, todoTitle } = request.body
  const { responseResult } = request
  const sqlParams = [userid, todoId]
  db.query(sqlDeleteTodo, sqlParams, (error, results) => {
    if (error) {
      printSqlError('deleteTodoHandler', error)
      responseResult.status = -1
      responseResult.message = '服务器内部出现错误'
      return response.send(responseResult)
    }
    if (results.affectedRows === 1) {
      responseResult.status = 1003
      responseResult.message = '成功'
      responseResult.data.deletedTodoId = todoId
      responseResult.data.deletedTodoTitle = todoTitle
      return response.send(responseResult)
    } else {
      responseResult.status = -1003
      responseResult.message = '失败，原因：无效的参数todoId'
      return response.send(responseResult)
    }
  })
}

// 切换待办事项完成状态 1004
module.exports.toggleTodoCompletionStatusHandler = function (request, response) {
  const { userid } = request.auth
  const { todoId, todoTitle, originalChecked, targetChecked } = request.body
  const { responseResult } = request
  const sqlParams = [targetChecked, null, userid, todoId]
  if (targetChecked === 1) {
    sqlParams[1] = generateDatetime()
  }
  db.query(sqlToggleTodoCompletionStatus, sqlParams, (error, results) => {
    if (error) {
      printSqlError('toggleTodoCompletionStatusHandler', error)
      responseResult.status = -1
      responseResult.message = '服务器内部出现错误'
      return response.send(responseResult)
    }
    if (results.affectedRows === 1) {
      responseResult.status = 1004
      responseResult.message = '成功'
      responseResult.data = {
        todoId,
        originalChecked,
        nowChecked: targetChecked
      }
      return response.send(responseResult)
    } else {
      responseResult.status = -1004
      responseResult.message = '失败，原因：无效的参数todoId、originalChecked或targetChecked'
      return response.send(responseResult)
    }
  })
}

// 恢复待办事项至原先分组（在回收站操作） 1005
module.exports.regainTodoHandler = function (request, response) {
  const { userid } = request.auth
  const { todoId } = request.body
  const { responseResult } = request
  const sqlParams = [userid, todoId]
  db.query(sqlRegainTodo, sqlParams, (error, results) => {
    if (error) {
      printSqlError('regainTodoHandler', error)
      responseResult.status = -1
      responseResult.message = '服务器内部出现错误'
      return response.send(responseResult)
    }
    if (results.affectedRows === 1) {
      responseResult.status = 1005
      responseResult.message = '成功'
      return response.send(responseResult)
    } else {
      responseResult.status = -1005
      responseResult.message = '失败，原因：无效的参数todoId'
      return response.send(responseResult)
    }
  })
}

// 保存待办事项详情 1006
module.exports.saveTodoDetailHandler = function (request, response) {
  const { userid } = request.auth
  const { todoId, todoContent } = request.body
  const { responseResult } = request
  const sqlParams = [todoContent, userid, todoId]
  db.query(sqlSaveTodoDetail, sqlParams, (error, results) => {
    if (error) {
      printSqlError('saveTodoDetailHandler', error)
      responseResult.status = -1
      responseResult.message = '服务器内部出现错误'
      return response.send()
    }
    if (results.affectedRows === 1) {
      responseResult.status = 1006
      responseResult.message = '保存成功'
      return response.send(responseResult)
    } else {
      responseResult.status = -1006
      responseResult.message = '保存失败，原因：无效的参数todoId'
      return response.send(responseResult)
    }
  })
}

// 获取待办事项详情 1007
module.exports.getTodoDetailHandler = function (request, response) {
  const { userid } = request.auth
  const { todoId } = request.query
  const { responseResult } = request
  const sqlParams = [userid, todoId]
  db.query(sqlGetTodoDetail, sqlParams, (error, results) => {
    if (error) {
      printSqlError('getTodoDetailHandler', error)
      responseResult.status = -1
      responseResult.message = '服务器内部出现错误'
      return response.send(responseResult)
    }
    const queryResult = handleQueryResult(results)
    if (queryResult.length === 0) {
      responseResult.status = -1007
      responseResult.message = '查询失败，无效的参数todoId'
      return response.send(responseResult)
    }
    const { todoContent } = queryResult[0]
    responseResult.data.todoContent = todoContent
    if (!todoContent) {
      responseResult.status = 1007
      responseResult.message = '查询成功，但是该待办事项还未记录详情信息'
      return response.send(responseResult)
    }
    responseResult.status = 1007
    responseResult.message = '查询成功'
    return response.send(responseResult)
  })
}

// 修改待办事项标题 1008
module.exports.updateTodoTitleHandler = function (request, response) {
  const { userid } = request.auth
  const { todoId, newTodoTitle } = request.body
  const { responseResult } = request
  const sqlParams = [newTodoTitle, userid, todoId]
  db.query(sqlUpdateTodoTitle, sqlParams, (error, results) => {
    if (error) {
      printSqlError('updateTodoTitleHandler', error)
      responseResult.status = -1
      responseResult.message = '服务器内部出现错误'
      response.send(results)
    }
    console.log(results)
    if (results.affectedRows === 1) {
      responseResult.status = 1008
      responseResult.message = '修改成功'
      return response.send(responseResult)
    } else {
      responseResult.status = -1008
      responseResult.message = '修改失败，原因：无效的参数todoTitle或todoId'
      return response.send(responseResult)
    }
  })
}

// 删除全部待办事项（在回收站操作）1009
module.exports.deleteAllTodoHandler = function (request, response) {
  const { userid } = request.auth
  const { responseResult } = request
  responseResult.operation = '删除全部待办事项'
  db.query(sqlDeleteAllTodo, userid, (error, results) => {
    if (error) {
      printSqlError('deleteAllTodoHandler', error)
      responseResult.status = -1
      responseResult.message = '服务器内部出现错误'
      return response.send(responseResult)
    }
    if (results.affectedRows !== 0) {
      responseResult.status = 1009
      responseResult.message = '删除成功'
      return response.send(responseResult)
    } else {
      responseResult.status = -1009
      responseResult.message = '删除失败，原因：无效的参数或没有可删除的待办事项'
      return response.send(responseResult)
    }
  })
}

// 编辑 1010
module.exports.edit = function (request, response) {
  const { userid } = request.auth
  const { todoId, todoTitle, groupId, tagId, matrixId } = request.body
  const { responseResult } = request
  let { todoDeadline } = request.body
  todoDeadline = todoDeadline ? formatDateObject(new Date(todoDeadline)) : null
  responseResult.operation = '编辑'
  const sqlParams = [todoTitle, todoDeadline, groupId, tagId, matrixId, userid, todoId]
  db.query(sqlEdit, sqlParams, (error, results) => {
    if (error) {
      printSqlError('edit', error)
      responseResult.status = -1
      responseResult.message = '服务器内部出现错误'
      return response.send(responseResult)
    }
    if (results.affectedRows === 1) {
      responseResult.status = 1010
      responseResult.message = '更新成功'
      return response.send(responseResult)
    } else {
      responseResult.status = -1010
      responseResult.message = '更新失败，原因：无效的参数'
      return response.send(responseResult)
    }
  })
}

// 创建新的待办事项
module.exports.createTodoHandler = function (request, response) {
  const { userid } = request.auth
  const { todoTitle, groupId, tagId, matrixId, groupName, matrixName, priority, tagName } = request.body
  let { todoDeadline } = request.body
  todoDeadline = todoDeadline ? formatDateObject(new Date(request.body.todoDeadline)) : null
  const { responseResult } = request
  const todoId = uuid().split('-').join('').slice(0, 15)
  const createTime = generateDatetime()
  const sqlParams = [userid, todoId, todoTitle, 0, 1, todoDeadline, groupId, matrixId, tagId, createTime]
  db.query(sqlCreateTodo, sqlParams, (error, results) => {
    if (error) {
      printSqlError('createTodoHandler', error)
      responseResult.status = -1
      responseResult.message = '服务器跑路了'
      return response.send(responseResult)
    }
    if (results.affectedRows === 1) {
      responseResult.status = 1001
      responseResult.message = '创建成功'
      const todo = new Todo({
        todoId,
        todoTitle,
        todoChecked: 0,
        todoStatus: 1,
        todoDeadline: todoDeadline || '',
        groupId: groupId || '',
        matrixId: matrixId || '',
        tagId: tagId || '',
        createTime,
        finishTime: '',
        groupName: groupName || '',
        matrixName: matrixName || '',
        priority: priority || 0,
        tagName: tagName || ''
      })
      responseResult.data.todo = todo
      return response.send(responseResult)
    } else {
      responseResult.status = -1001
      responseResult.message = '参数无效'
      return response.send(responseResult)
    }
  })
}

// 获取全部待办事项 1021
module.exports.getAllTodoHandler = function (request, response) {
  const { userid } = request.auth
  const { responseResult } = request
  responseResult.operation = '获取全部待办事项数据'
  db.query(sqlGetAllTodo, [userid], (error, results) => {
    if (error) {
      printSqlError('getAllTodoHandler', error)
      responseResult.status = -1
      responseResult.message = '服务器跑路了'
      return response.send(responseResult)
    }
    responseResult.status = 1021
    responseResult.data = {
      uncheckedTodoData: [],
      checkedTodoData: []
    }
    const queryResult = handleQueryResult(results)
    if (queryResult.length === 0) {
      responseResult.message = '查询成功，但您未添加任何待办事项'
      return response.send(responseResult)
    }
    queryResult.forEach(element => {
      if (element.todoChecked === 0) {
        responseResult.data.uncheckedTodoData.push(element)
      } else {
        responseResult.data.checkedTodoData.push(element)
      }
    })
    return response.send(responseResult)
  })
}

// 获取收集箱待办事项 1022
module.exports.getCollectTodoHandler = function (request, response) {
  const { userid } = request.auth
  const { groupId, groupName } = request.query
  const { responseResult } = request
  responseResult.operation = '获取收集箱的待办事项'
  const sqlParams = [userid, groupId]
  db.query(sqlGetCollectTodo, sqlParams, (error, results) => {
    if (error) {
      printSqlError('getCollectTodoHandler', error)
      responseResult.status = -1
      responseResult.message = '服务器内部出现错误'
      return response.send(responseResult)
    }
    const queryResult = handleQueryResult(results)
    responseResult.status = 1022
    responseResult.data = {
      uncheckedTodoData: [],
      checkedTodoData: []
    }
    if (queryResult.length === 0) {
      responseResult.message = '成功，但是收集箱里没有待办事项'
      return response.send(responseResult)
    }
    queryResult.forEach(element => {
      if (element.todoChecked === 0) {
        responseResult.data.uncheckedTodoData.push(element)
      } else {
        responseResult.data.checkedTodoData.push(element)
      }
    })
    return response.send(responseResult)
  })
}

// 获取今天的待办事项 1023
module.exports.getTodayTodoHandler = function (request, response) {
  const { userid } = request.auth
  const { responseResult } = request
  const dateObj = new Date()
  const queryDate = dateObj.getFullYear() + '-' + (dateObj.getMonth() + 1) + '-' + dateObj.getDate()
  responseResult.operation = '获取今天的待办事项'
  const sqlParams = [userid, queryDate]
  db.query(sqlGetTodoByDate, sqlParams, (error, results) => {
    if (error) {
      printSqlError('getTodayTodoHandler', error)
      responseResult.status = -1
      responseResult.message = '服务器内部出现错误'
      return response.send(responseResult)
    }
    const queryResult = handleQueryResult(results)
    responseResult.status = 1023
    responseResult.data = {
      uncheckedTodoData: [],
      checkedTodoData: []
    }
    if (queryResult.length === 0) {
      responseResult.message = '查询成功，但没有待办事项截止日期为今天'
      return response.send(responseResult)
    }
    queryResult.forEach(element => {
      if (element.todoChecked === 0) {
        responseResult.data.uncheckedTodoData.push(element)
      } else {
        responseResult.data.checkedTodoData.push(element)
      }
    })
    return response.send(responseResult)
  })
}

// 获取明天的待办事项 1024
module.exports.getTomorrowTodoHandler = function (request, response) {
  const { userid } = request.auth
  const { responseResult } = request
  const date = new Date()
  const queryDate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + (date.getDate() + 1)
  responseResult.operation = '获取明天的待办事项'
  const sqlParams = [userid, queryDate]
  db.query(sqlGetTodoByDate, sqlParams, (error, results) => {
    if (error) {
      printSqlError('getTomorrowTodoHandler', error)
      responseResult.status = -1
      responseResult.message = '服务器内部出现错误'
      return response.send(responseResult)
    }
    const queryResult = handleQueryResult(results)
    responseResult.status = 1024
    if (queryResult.length === 0) {
      responseResult.message = '查询成功，但没有待办事项截止日期为明天'
      return response.send(responseResult)
    }
    responseResult.data = {
      uncheckedTodoData: [],
      checkedTodoData: []
    }
    queryResult.forEach(element => {
      if (element.todoChecked === 0) {
        responseResult.data.uncheckedTodoData.push(element)
      } else {
        responseResult.data.checkedTodoData.push(element)
      }
    })
    return response.send(responseResult)
  })
}

// 获取所有完成的待办事项 1025
module.exports.getCompletedTodoHandler = function (request, response) {
  const { userid } = request.auth
  const { responseResult } = request
  responseResult.operation = '获取所有完成的待办事项'
  db.query(sqlGetCompletedTodo, userid, (error, results) => {
    if (error) {
      printSqlError('getCompletedTodoHandler', error)
      responseResult.status = -1
      responseResult.message = '服务器内部出现错误'
      return response.send(responseResult)
    }
    const queryResult = handleQueryResult(results)
    responseResult.status = 1025
    if (queryResult.length === 0) {
      responseResult.message = '查询成功，但您还没完成任何创建的待办事项'
      return response.send(responseResult)
    }
    responseResult.data = {
      checkedTodoData: []
    }
    queryResult.forEach(element => {
      responseResult.data.checkedTodoData.push(element)
    })
    return response.send(responseResult)
  })
}

// 获取回收站的待办事项 1026
module.exports.getBinTodoHandler = function (request, response) {
  const { userid } = request.auth
  const { responseResult } = request
  responseResult.operation = '获取回收站的待办事项'
  db.query(sqlGetBinTodo, [userid], (error, results) => {
    if (error) {
      printSqlError('getBinTodoHandler', error)
      responseResult.status = -1
      responseResult.message = '服务器内部出现错误'
      return response.send(responseResult)
    }
    const queryResult = handleQueryResult(results)
    responseResult.status = 1026
    responseResult.data = {
      uncheckedTodoData: [],
      checkedTodoData: []
    }
    if (queryResult.length === 0) {
      responseResult.message = '查询成功，回收站中暂无数据'
      return response.send(responseResult)
    }
    queryResult.forEach(element => {
      if (element.todoChecked === 0) {
        responseResult.data.uncheckedTodoData.push(element)
      } else {
        responseResult.data.checkedTodoData.push(element)
      }
    })
    return response.send(responseResult)
  })
}

// 根据分组获取待办事项 1027
module.exports.getGroupTodoHandler = function (request, response) {
  const { userid } = request.auth
  const { groupId, groupName } = request.query
  const { responseResult } = request
  responseResult.operation = '获取分组中的待办事项'
  db.query(sqlGetGroupTodo, [userid, groupId], (error, results) => {
    if (error) {
      printSqlError('getGroupTodoHandler', error)
      responseResult.status = -1
      responseResult.message = '服务器内部出现错误'
      return response.send(responseResult)
    }
    const queryResult = handleQueryResult(results)
    responseResult.status = 1027
    if (queryResult.length === 0) {
      responseResult.message = '查询成功，但该分组中暂无待办事项'
      return response.send(responseResult)
    }
    responseResult.data = {
      groupName,
      uncheckedTodoData: [],
      checkedTodoData: []
    }
    queryResult.forEach(element => {
      if (element.todoChecked === 0) {
        responseResult.data.uncheckedTodoData.push(element)
      } else {
        responseResult.data.checkedTodoData.push(element)
      }
    })
    return response.send(responseResult)
  })
}

// 根据标签获取待办事项 1028
module.exports.getTagTodoHandler = function (request, response) {
  const { userid } = request.auth
  const { tagId } = request.query
  const { responseResult } = request
  const sqlParams = [userid, tagId]
  db.query(sqlGetTagTodo, sqlParams, (error, results) => {
    if (error) {
      printSqlError('getTagTodoHandler', error)
      responseResult.status = -1
      responseResult.message = '服务器内部出现错误'
      return response.send(responseResult)
    }
    const queryResult = handleQueryResult(results)
    responseResult.status = 1028
    responseResult.data = {
      uncheckedTodoData: [],
      checkedTodoData: []
    }
    if (queryResult.length === 0) {
      responseResult.message = '查询成功，但是该标签下暂无待办事项'
      return response.send(responseResult)
    } else {
      responseResult.message = '查询成功'
      queryResult.forEach(element => {
        if (element.todoChecked === 0) {
          responseResult.data.uncheckedTodoData.push(element)
        } else {
          responseResult.data.checkedTodoData.push(element)
        }
      })
      return response.send(responseResult)
    }
  })
}



module.exports.getMonthTodoHandler = function (request, response) {
  const { userid } = request.auth
  const { beginDate, endDate } = request.query
  db.query()
}
