const db = require('../db/config')

const {
  ServerResponseResult, handleQueryResult, printSqlError
} = require('../util/public')
const {
  sqlGetTodoSum, sqlGetFinishedTodoSum, sqlGetAccountCreateTime,
  sqlGetTodayDoneTodoCount, sqlGetTodayFocus,
  sqlLatestSevenDays
} = require('../db/sql/statisticsSql')

// 获取统计页面的总计数据 701
module.exports.getTjTotalHandler = function (request, response) {
  const { userid } = request.auth
  const { responseResult } = request
  responseResult.operation = '获取统计页面总计数据'
  const p1 = new Promise((resolve, reject) => {
    db.query(sqlGetTodoSum, userid, (error, results) => {
      if (error) {
        printSqlError('getTjTotalHandler, in Promise 1', error)
      } else {
        const queryResult = handleQueryResult(results)
        const resolveResult = {
          todoSum: queryResult[0].todoSum
        }
        resolve(resolveResult)
      }
    })
  })
  const p2 = new Promise((resolve, reject) => {
    db.query(sqlGetFinishedTodoSum, userid, (error, results) => {
      if (error) {
        printSqlError('getTjTotalHandler, in Promise 2', error)
      } else {
        const queryResult = handleQueryResult(results)
        const resolveResult = {
          finishedTodoSum: queryResult[0].finishedTodoSum
        }
        resolve(resolveResult)
      }
    })
  })
  const p3 = new Promise((resolve, reject) => {
    db.query(sqlGetAccountCreateTime, [userid], (error, results) => {
      if (error) {
        printSqlError('getTjTotalHandler, in Promise 3', error)
      } else {
        const queryResult = handleQueryResult(results)
        const accountCreateTime = queryResult[0].accountCreateTime
        const joinDays = parseInt((Date.now() - new Date(accountCreateTime).getTime()) / 86400000)
        const resolveResult = {
          joinDays
        }
        resolve(resolveResult)
      }
    })
  })
  Promise.allSettled([p1, p2, p3])
    .then(res => {
      const responseResultData = {}
      res.forEach(element => {
        for (let propName in element.value) {
          responseResultData[propName] = element.value[propName]
        }
      })
      responseResult.status = 701
      responseResult.message = '成功'
      responseResult.data = responseResultData
      return response.send(responseResult)
    })
}

// 获取统计页面的今日数据 702
module.exports.getTjTodayHandler = function (request, response) {
  const { userid } = request.auth

  const date = new Date()
  const todayDate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()

  const responseResult = new ServerResponseResult()
  responseResult.operation = '获取统计页面今日数据'

  const p1 = new Promise((resolve, reject) => {
    const sqlParams = [userid, todayDate]
    db.query(sqlGetTodayDoneTodoCount, sqlParams, (error, results) => {
      if (error) {
        printSqlError('getTjTodayHandler', error)
      } else {
        const queryResult = handleQueryResult(results)
        const resolveResult = {
          todayDoneTodoCount: queryResult[0].todayDoneTodoCount
        }
        resolve(resolveResult)
      }
    })
  })

  const p2 = new Promise((resolve, reject) => {
    db.query(sqlGetTodayFocus, todayDate, (error, results) => {
      if (error) {
        console.log(error.sql + '\n' + error.message)
      } else {
        const queryResult = handleQueryResult(results)
        const todayFocusSeconds = queryResult[0].todayFocus // 今日任务专注总秒数
        const todayFocusMinuteStr = (todayFocusSeconds / 60).toFixed() // 抹去小数的分钟字符串
        const todayFocusHours = (parseInt(todayFocusMinuteStr) / 60).toFixed() // 抹去小数的小时，string
        const todayFocusMinute = (parseInt(todayFocusMinuteStr) % 60).toString() // 分钟:string
        const resolveResult = {
          todayFocusHours,
          todayFocusMinute
        }
        resolve(resolveResult)
      }
    })
  })

  Promise.allSettled([p1, p2])
    .then(res => {
      const responseResultData = {}
      res.forEach(element => {
        for (let prop in element.value) {
          responseResultData[prop] = element.value[prop]
        }
      })
      responseResult.status = 702
      responseResult.data = responseResultData
      return response.send(responseResult)
    })
}

// 获取以今天为准，最近七天的数据 703
module.exports.getLatestSevenDays = function (request, response) {
  const { userid } = request.auth
  const { responseResult } = request
  responseResult.operation = '获取最近七天数据统计'
  db.query(sqlLatestSevenDays, userid, (error, results) => {
    if (error) {
      printSqlError('getLatestSevenDays', error)
      responseResult.status = -1
      responseResult.message = '服务器内部出现错误'
      return response.send(responseResult)
    }
    const queryResult = handleQueryResult(results)
    responseResult.status = 703
    responseResult.data = {
      title: '最近七天',
      dataList: []
    }
    if (queryResult.length === 0) {
      responseResult.message = '查询成功，但最近七天暂无数据记录'
      response.send(responseResult)
    } else {
      responseResult.data.dataList = queryResult
      response.send(responseResult)
    }
  })
}

