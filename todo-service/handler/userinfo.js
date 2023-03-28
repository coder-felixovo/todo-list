const db = require('../db/config') // 数据库配置
const { handleQueryResult, ServerResponseResult } = require('../util/result')
const { updateNicknameSql, updateContactSql, updateEmailSql, getUserInfoSql } = require('../db/sql/accountSql') // sql语句

/**
 * @description 获取用户信息
 * @param {*} req 
 * @param {*} res 
 */
module.exports.getUserInfoHandler = function (req, res) {
  const { userid } = req.auth
  const responseResult = new ServerResponseResult()
  responseResult.operation = '获取用户信息'
  db.query(getUserInfoSql, [userid], (error, results) => {
    if (error) {
      responseResult.status = -1
      responseResult.message = '失败'
      responseResult.reason = '服务器内部发生错误'
      return res.send(responseResult)
    }
    const queryResult = handleQueryResult(results)
    const { username, nickname, contact, email } = queryResult
    responseResult.status = 100
    responseResult.message = '成功'
    responseResult.data = {
      username,
      nickname,
      contact,
      email
    }
    return res.send(responseResult)
  })
}

/* 修改昵称 */
module.exports.updateNicknameHandler = function (req, res) {
  console.log('@ 更新昵称')
  const { nickname } = req.body
  const { userid } = req.auth
  try {
    db.query(updateNicknameSql, [nickname, userid], (error, results) => {
      if (results.affectedRows === 1) {
        return res.send(responseResult(userinfo.updateNicknameSuccess.status, userinfo.updateNicknameSuccess.msg, null))
      } else {
        return res.send(responseResult(userinfo.updateNicknameFailure.status, userinfo.updateNicknameFailure.msg, null))
      }
    })
  } catch (err) {
    console.log('Error: ' + err)
  }
}
/* 修改手机号码 */
module.exports.updateContactHandler = function (req, res) {
  console.log('@ 修改手机号码')
  try {
    const { contact } = req.body
    const { userid } = req.auth
    db.query(updateContactSql, [contact, userid], (error, results) => {
      if (results.affectedRows === 1) {
        return res.send(responseResult(userinfo.updateContactSuccess.status, userinfo.updateContactSuccess.msg, null))
      } else {
        return res.send(responseResult(userinfo.updateContactFailure.status, userinfo.updateContactFailure.msg, null))
      }
    })
  } catch (error) {
    console.error('updateContactHandler函数内出现错误，原因：' + error.message)
  }
}
/* 修改邮箱 */
module.exports.updateEmailHandler = function (req, res) {
  console.log('@ 修改邮箱')
  try {
    const { email } = req.body
    const { userid } = req.auth
    db.query(updateEmailSql, [email, userid], (error, results) => {
      if (error) {
        throw error
      }
      if (results.affectedRows === 1) {
        const { status, msg } = userinfo.updateEmailSuccess
        return res.send(responseResult(status, msg, null))
      } else {
        const { status, msg } = userinfo.updateEmailFailure
        return res.send(responseResult(status, msg))
      }
    })
  } catch (error) {
    console.error('updateEmailHandler函数内出现错误，原因：' + error.message)
  }
}