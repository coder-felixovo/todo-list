const db = require('../config')
const {
  sqlGetAllTodo
} = require('../sql/todoSql')

// 获取全部待办事项数据（除了回收站和已放弃的）
module.exports.dbGetAllTodo = function (userid) {
  return new Promise((resolve, reject) => {
    db.query(sqlGetAllTodo, userid, (error, results) => {
      error ? reject(error) : resolve(results)
    })
  })
}