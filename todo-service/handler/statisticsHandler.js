const {
  dbGetTotalTodoNums, dbGetTotalDoneTodoNums, dbGetAccountCreateTime,
  dbGetTodayDoneTodoNums, dbGetTodayFocusTime, dbGetSevenDoneTodoNums,
  dbGetDoneTodoNumsOfTag, dbSevenFocusTime
} = require('../db/operation/statDb')

// 获取统计页面的总计数据 701
module.exports.getTotalStatHandler = async function (request, response) {
  const { userid } = request.auth
  const { responseResult } = request
  responseResult.operation = '获取统计页面总计数据'
  const p1 = await dbGetTotalTodoNums(userid)
  const p2 = await dbGetTotalDoneTodoNums(userid)
  const p3 = await dbGetAccountCreateTime(userid)
  responseResult.data.totalTodoNums = p1[0].totalTodoNums || 0
  responseResult.data.totalDoneTodoNums = p2[0].totalDoneTodoNums || 0
  const accountCreateTime = p3[0].accountCreateTime
  const joinDays = parseInt((Date.now() - new Date(accountCreateTime).getTime()) / 86400000)
  responseResult.data.joinDays = joinDays
  responseResult.status = 701
  responseResult.message = '成功'
  response.send(responseResult)
}

// 获取统计页面的今日数据 702
module.exports.getTodayStatHandler = async function (request, response) {
  const { userid } = request.auth
  const { responseResult } = request
  responseResult.operation = '获取统计页面今日数据'
  const date = new Date()
  const todayDate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
  const p1 = await dbGetTodayDoneTodoNums(userid, todayDate)
  const p2 = await dbGetTodayFocusTime(userid, todayDate)
  responseResult.data.todayDoneTodoNums = p1[0].todayDoneTodoNums || 0
  responseResult.data.todayFocusTime = p2[0].todayFocusTime || 0 // 单位：秒
  responseResult.status = 702
  response.send(responseResult)
}

// 获取以今天为准，最近七天完成任务数 703
module.exports.getLineSevenStatHandler = async function (request, response) {
  const { userid } = request.auth
  const { responseResult } = request
  responseResult.operation = '获取最近七天数据统计'
  responseResult.data.title = '最近七天'
  const p1 = await dbGetSevenDoneTodoNums(userid)
  responseResult.data.dataList = p1
  responseResult.status = 703
  response.send(responseResult)
}

// 获取不同标签类别下完成的任务数 704
module.exports.getPieDoneTodoNumsOfTag = async function (request, response) {
  const { userid } = request.auth
  const { responseResult } = request
  responseResult.operation = '获取不同标签类别下完成任务数'
  responseResult.data.title = '按标签统计完成任务数'
  const p1 = await dbGetDoneTodoNumsOfTag(userid)
  responseResult.data.data = p1
  responseResult.status = 704
  response.send(responseResult)
}

/**
 * 请求处理：
 * 获取最近七天专注时长
 * @param {object} request 
 * @param {object} response 
 */
module.exports.getSevenFocusTime = async function (request, response) {
  const { userid } = request.auth
  const { responseResult } = request
  responseResult.operation = '查询最近七天专注时长'
  responseResult.data.title = '最近七天专注时长'
  const result = await dbSevenFocusTime(userid)
  if (result instanceof Error) {
    responseResult.status = -1
    responseResult.message = '服务器跑路了'
    response.send(responseResult)
  } else {
    responseResult.data.list = result
    responseResult.status = 705
    response.send(responseResult)
  }
}

