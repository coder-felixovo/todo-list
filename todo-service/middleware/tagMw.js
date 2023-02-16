/* 标签 路由中间件 处理函数 */
const db = require('../db/config')
const { printSqlError, handleQueryResult } = require('../util/public.js')
const { sqlGetGivenTagName } = require('../db/sql/tagSql.js')


// 验证标签名称
module.exports.verifyTagName = function (request, response, next) {
  const { userid } = request.auth
  const { tagName } = request.body
  const { responseResult } = request
  responseResult.operation = '验证标签名称'
  if (!tagName) {
    // 标签名是空字符串
    responseResult.status = -21
    responseResult.message = '不通过，原因：参数tagName为空'
    return response.send(responseResult)
  }
  const tagNameLength = tagName.length
  if (tagNameLength > 15) {
    // 标签名字符长度大于15
    responseResult.status = -901
    responseResult.message = '不通过，原因：标签名称不应超过12个字符'
    responseResult.submitTagName = tagName
    responseResult.tagNameLength = tagNameLength
    return response.send(responseResult)
  }
  const sqlParams = [userid, tagName]
  db.query(sqlGetGivenTagName, sqlParams, (error, results) => {
    if (error) {
      printSqlError('verifyTagName', error)
      responseResult.status = -1
      responseResult.message = '服务器内部出现错误'
      return response.send(responseResult)
    }
    const queryResult = handleQueryResult(results)
    if (queryResult.length !== 0) {
      // 标签名重复
      responseResult.status = -901
      responseResult.message = '不通过，原因：重复的标签名称'
      responseResult.existedTagName = queryResult[0].tagName
      return response.send(responseResult)
    } else {
      // 允许创建该标签名，放行
      next()
    }
  })
}