module.exports.ServerResponseResult = function () {
  this.status = 0
  this.operation = ''
  this.message = ''
  this.data = {}
}

module.exports.handleQueryResult = function (results) {
  return JSON.parse(JSON.stringify(results))
}

module.exports.printSqlError = function (functionName, error) {
  console.log(`Sql error occured in function \`${functionName}\``)
  console.log(error.sql + '\n' + error.sqlMessage)
}

module.exports.setServerErrorReponseResult = function (responseResult) {
  responseResult.status = -1
  responseResult.message = '服务器跑路了'
}