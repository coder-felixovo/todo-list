const {
  dbSearchIncludeStr, dbSearchGroup, dbSearchTag
} = require('../db/operation/searchDb')

// 搜索 100
module.exports.search = async function (request, response) {
  const { userid } = request.auth
  const { str } = request.query
  const { responseResult } = request
  const todoList = await dbSearchIncludeStr(userid, str)
  const groupList = await dbSearchGroup(userid, str)
  const tagList = await dbSearchTag(userid, str)
  responseResult.status = 100
  responseResult.message = '查询成功'
  responseResult.data.todoList = todoList
  responseResult.data.groupList = groupList
  responseResult.data.tagList = tagList
  response.send(responseResult)
}