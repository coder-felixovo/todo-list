const db = require('../config')
const { sqlFocusDetail } = require('../sql/focusSql')

/**
 * 数据库操作：获取专注详情
 * @param {string} userid 
 * @returns 
 */
module.exports.dbFocusDetail = async function (userid, focusId) {
  const sqlParams = [userid, focusId]
  console.log(sqlParams)
  return new Promise((resolve, reject) => {
    db.query(sqlFocusDetail, sqlParams, (error, results) => {
      error ? reject(error) : resolve(results)
    })
  })
}