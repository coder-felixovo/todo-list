const { response } = require('express')
const db = require('../db/config')
const { sqlGetTodoByDateRange } = require('../db/sql')
const { ServerResponseResult, handleQueryResult, printSqlError } = require('../util/public')

// 获取月视图待办事项
module.exports.getTodoMonthHandler = function (request, response) {
  const { userid } = request.auth
  const { beginDate, endDate } = request.query
  const sqlParams = [userid, beginDate, endDate]
  const responseResult = new ServerResponseResult()
  responseResult.operation = '获取月视图待办事项'
  db.query(sqlGetTodoByDateRange, sqlParams, (error, results) => {
    if (error) {
      printSqlError('getTodoMonthHandler', error)
      return res.send()
    }
    const result = handleQueryResult(results)
    responseResult.status = 501
    responseResult.data = {
      beginDate,
      endDate,
      monthViewData: []
    }
    if (result.length === 0) {
      responseResult.message = '查询成功，但是本月没有相关记录'
      response.send(responseResult)
    } else {
      responseResult.message = '查询成功'
      responseResult.data.monthViewData = result
      response.send(responseResult)
    }
  })
}
module.exports.getTodoInWeekViewHandler = function (req, res) { }
module.exports.getTodoInDayViewHandler = function (req, res) { }