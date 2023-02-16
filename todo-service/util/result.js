module.exports.ServerResponseResult = function () {
  this.status = 0
  this.operation = ''
  this.message = ''
  this.data = {}
}

module.exports.handleQueryResult = function (results) {
  return JSON.parse(JSON.stringify(results))
}

