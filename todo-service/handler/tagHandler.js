/* 标签 路由 处理函数 */

const uuid = require('node-uuid/uuid')
const db = require('../db/config')
const { sqlAddTag, sqlGetTag, sqlDeleteTag, sqlUpdateTagName } = require('../db/sql/tagSql.js')
const { handleQueryResult, printSqlError } = require('../util/public.js')
const { generateDatetime } = require('../util/time')

/* 路由 处理函数 */

// 创建标签 901
module.exports.addTagHandler = function (request, response) {
  const { userid } = request.auth
  const { tagName } = request.body
  const { responseResult } = request
  responseResult.operation = '创建标签'
  const tagId = uuid().split('-').join('').slice(0, 15)
  const createTime = generateDatetime()
  const sqlParams = [userid, tagId, tagName, createTime]
  db.query(sqlAddTag, sqlParams, (error, results) => {
    if (error) {
      printSqlError('addTagHandler', error)
      responseResult.status = -1
      responseResult.message = '服务器内部出现错误'
      return res.send(responseResult)
    }
    if (results.affectedRows === 1) {
      responseResult.status = 901
      responseResult.data.newTag = {
        tagId, tagName
      }
      return response.send(responseResult)
    } else {
      responseResult.status = -901
      responseResult.message = '创建失败，原因：无效的参数'
      return response.send(responseResult)
    }
  })
}

// 获取标签 902
module.exports.getTagHandler = function (request, response) {
  const { userid } = request.auth
  const { responseResult } = request
  responseResult.operation = '获取所有标签'
  db.query(sqlGetTag, userid, (error, results) => {
    if (error) {
      printSqlError('getTagHandler', error)
      responseResult.status = -1
      responseResult.message = '服务器内部出现错误'
      return response.send(responseResult)
    }
    responseResult.status = 902
    const queryResult = handleQueryResult(results)
    if (queryResult.length === 0) {
      responseResult.message = '您还未创建任何标签'
      responseResult.data.tagList = []
      return response.send(responseResult)
    } else {
      responseResult.message = '成功'
      responseResult.data.tagList = queryResult
      return response.send(responseResult)
    }
  })
}

// 删除标签 903
module.exports.deleteTagHandler = function (request, response) {
  const { userid } = request.auth
  const { tagId } = request.body
  const { responseResult } = request
  responseResult.operation = '删除标签'
  if (!tagId) {
    responseResult.status = -21
    responseResult.message = '失败，原因：参数tagId为空'
    return response.send(responseResult)
  }
  const sqlParams = [userid, tagId]
  db.query(sqlDeleteTag, sqlParams, (error, results) => {
    if (error) {
      printSqlError('deleteTagHandler', error)
      responseResult.status = -1
      responseResult.message = '服务器内部出现错误'
      return response.send(responseResult)
    }
    if (results.affectedRows === 1) {
      responseResult.status = 903
      responseResult.message = '成功'
      responseResult.data.tagId = tagId
      return response.send(responseResult)
    } else {
      responseResult.status = -903
      responseResult.message = '失败，原因：无效的参数'
      return response.send(responseResult)
    }
  })
}

// 修改标签名称 904
module.exports.updateTagNameHandler = function (request, response) {
  const { userid } = request.auth
  const { tagId, tagName } = request.body
  const { responseResult } = request
  responseResult.operation = '修改标签名称'
  if (!tagId) {
    responseResult.status = -21
    responseResult.message = '失败，原因：参数tagId为空'
    return response.send(responseResult)
  }
  const sqlParams = [tagName, userid, tagId]
  db.query(sqlUpdateTagName, sqlParams, (error, results) => {
    if (error) {
      printSqlError('updateTagNameHandler', error)
      responseResult.status = -1
      responseResult.message = '服务器内部出现错误'
      return response.send(responseResult)
    }
    if (results.affectedRows === 1) {
      responseResult.status = 904
      responseResult.message = '修改成功'
      responseResult.data.tagId = tagId
      responseResult.data.newTagName = tagName
      return response.send(responseResult)
    } else {
      responseResult.status = -904
      responseResult.message = '修改失败，原因：无效的参数'
      return response.send(responseResult)
    }
  })
}