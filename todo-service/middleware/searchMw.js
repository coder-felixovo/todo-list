module.exports.checkSearchContent = function (request, response, next) {
  const { str } = request.query
  const { responseResult } = request
  responseResult.operation = '搜索'
  if (str) {
    next()
  } else {
    responseResult.status = -100
    responseResult.message = '搜索内容为空'
    return response.send(responseResult)
  }
}