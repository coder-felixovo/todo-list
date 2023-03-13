const uuid = require('node-uuid/uuid')
const db = require('../db/config.js')
const { sqlGetMatrix, sqlGetMatrixTodo } = require('../db/sql/matrixSql')
const { handleQueryResult, printSqlError } = require('../util/public')
const { generateDatetime } = require('../util/time')

/**
 * 为用户创建默认四象限
 * @param {String} userid 
 */
module.exports.initializeMatrix = function (userid) {
  const createDefaultMatrixSql = `
    INSERT INTO todo_matrix(user_id, matrix_id, matrix_name, matrix_priority, create_time)
    VALUES
    ('${userid}', '${uuid().split('-').join('').slice(0, 15)}', '重要且紧急', 1, '${generateDatetime()}'),
    ('${userid}', '${uuid().split('-').join('').slice(0, 15)}', '重要不紧急', 2, '${generateDatetime()}'),
    ('${userid}', '${uuid().split('-').join('').slice(0, 15)}', '不重要但紧急', 3, '${generateDatetime()}'),
    ('${userid}', '${uuid().split('-').join('').slice(0, 15)}', '不重要不紧急', 4, '${generateDatetime()}');
  `
  db.query(createDefaultMatrixSql, (error, results) => {
    if (error) {
      console.log('initializeMatrix')
      console.log(error.sql)
      console.log(error.sqlMessage)
    }
  })
}

// 获取四象限 601
module.exports.getMatrixHandler = function (request, response) {
  const { userid } = request.auth
  const { responseResult } = request
  responseResult.operation = '获取待办事项四象限'
  db.query(sqlGetMatrix, userid, (error, results) => {
    if (error) {
      printSqlError('getMatrixHandler', error)
      responseResult.status = -1
      responseResult.message = '服务器内部出现错误'
      return response.send(responseResult)
    }
    const result = handleQueryResult(results)
    if (result.length === 0) {
      responseResult.status = 601
      responseResult.message = '查询成功，但是帐户没有四象限'
      response.send(responseResult)
      this.initializeMatrix(userid)
    } else {
      responseResult.status = 601
      responseResult.message = '查询成功'
      responseResult.data.matrixData = result
      response.send(responseResult)
    }
  })
}

// 获取四象限的待办事项 602
module.exports.getMatrixTodo = function (request, response) {
  const { userid } = request.auth
  const { responseResult } = request
  responseResult.operation = '获取四象限的待办事项'
  db.query(sqlGetMatrixTodo, userid, (error, results) => {
    if (error) {
      printSqlError('getMatrixTodo', error)
      responseResult.status = -1
      responseResult.message = '服务器跑路了'
      return response.send(responseResult)
    }
    const result = handleQueryResult(results)
    responseResult.data.matrixTodoData = []
    if (result.length === 0) {
      responseResult.status = 602
      responseResult.message = '查询成功，但四象限中暂无待办事项'
      response.send(responseResult)
    } else {
      responseResult.status = 602
      responseResult.message = '查询成功'
      responseResult.data.matrixTodoData = results
      response.send(responseResult)
    }
  })
}