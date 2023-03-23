const db = require('../config')
const { sqlSearch, sqlSearchGroup, sqlSearchTag } = require('../sql/searchSql')

// 包含xx字符搜索
module.exports.dbSearchIncludeStr = async function (userid, searchContent) {
  const sqlParams = [userid, '%' + searchContent + '%']
  return new Promise((resolve, reject) => [
    db.query(sqlSearch, sqlParams, (error, results) => {
      error ? reject(error) : resolve(results)
    })
  ])
}



/**
 * 搜索分组
 * @param {string} userid 
 * @param {string} searchContent 
 */
module.exports.dbSearchGroup = async function (userid, searchContent) {
  const sqlParams = [userid, '%' + searchContent + '%']
  return new Promise((resolve, reject) => {
    db.query(sqlSearchGroup, sqlParams, (error, results) => {
      error ? reject(error) : resolve(results)
    })
  })
}



/**
 * 搜索标签
 * @param {string} userid 
 * @param {string} searchContent 
 */
module.exports.dbSearchTag = async function (userid, searchContent) {
  const sqlParams = [userid, '%' + searchContent + '%']
  return new Promise((resolve, reject) => {
    db.query(sqlSearchTag, sqlParams, (error, results) => {
      error ? reject(error) : resolve(results)
    })
  })
}