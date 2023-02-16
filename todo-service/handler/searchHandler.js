const db = require('../db/config')
const { sqlSearch } = require('../db/sql/searchSql')
const { handleQueryResult, printSqlError } = require('../util/public')


// 按xx字符开头搜索
async function strBeginSearch (userid, searchContent) {
  const sqlParams = [userid, searchContent + '%']
  return new Promise((resolve, reject) => [
    db.query(sqlSearch, sqlParams, (error, results) => {
      if (error) {
        printSqlError('strBeginSearch', error)
      } else {
        resolve(handleQueryResult(results))
      }
    })
  ])
}

// 包含xx字符搜索
async function searchIncludeStr (userid, searchContent) {
  const sqlParams = [userid, '%' + searchContent + '%']
  return new Promise((resolve, reject) => [
    db.query(sqlSearch, sqlParams, (error, results) => {
      if (error) {
        printSqlError('strBeginSearch', error)
      } else {
        resolve(handleQueryResult(results))
      }
    })
  ])
}

// 

// 搜索 100
module.exports.search = async function (request, response) {
  const { userid } = request.auth
  const { str } = request.query
  const { responseResult } = request
  const queryResult = await searchIncludeStr(userid, str)
  if (queryResult.length === 0) {
    responseResult.status = 100
    responseResult.message = '查询成功，但未能搜索到相关内容'
    return response.send(responseResult)
  } else {
    responseResult.status = 100
    responseResult.message = '查询成功'
    responseResult.data.searchData = queryResult
    return response.send(responseResult)
  }
}