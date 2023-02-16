/* 分组 路由中间件 */

module.exports.prevUpdateGroupName = function (request, response, next) {
  const { groupId, newGroupName } = request.body
  const { responseResult } = request
  responseResult.operation = '修改分组名称'
  if (groupId && newGroupName) {
    next()
  } else {
    responseResult.status = -1033
    responseResult.message = '修改失败，原因：参数groupId或newGroupName为空'
    return response.send(responseResult)
  }
}

module.exports.prevDeleteGroup = function (request, response, next) {
  const { groupId } = request.body
  const { responseResult } = request
  responseResult.operation = '删除分组'
  if (groupId) {
    next()
  } else {
    responseResult.status = -1034
    responseResult.message = '修改失败，原因：参数groupId为空'
    return response.send(responseResult)
  }
}