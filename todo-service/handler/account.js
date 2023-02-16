const jwt = require('jsonwebtoken')
const uuid = require('node-uuid/uuid')
const db = require('../db/config.js')
const { jwtSecret } = require('./secret.js')
const { decrypt } = require('../util/encrypt')
const {
  sqlRegister, sqlQueryUsername, sqlQueryUser,
  sqlUpToken
} = require('../db/sql.js')
const { handleQueryResult, ServerResponseResult, handleDbQueryError } = require('../util/result')
const { generateDatetime } = require('../util/time')
const { initializeGroup } = require('./groupHandler')
const { initializeMatrix } = require('./todoMatirx')

/* 查询用户名是否存在 */
module.exports.queryUsernameHandler = function (req, res, next) {
  const username = req.path === '/register' ? req.body.username : req.query.queryUsername
  db.query(sqlQueryUsername, [username], (error, results) => {
    const responseResult = new ServerResponseResult()
    responseResult.operation = '查询用户名是否存在'
    if (error) {
      responseResult.status = -1
      responseResult.message = '服务器跑路了'
      responseResult.reason = error.message
      return res.send(responseResult)
    }
    const queryResult = handleQueryResult(results)
    if (queryResult.length === 0) {
      // 用户名不存在
      next()
    } else {
      // 用户名存在
      responseResult.meesage = req.path === '/register' ? '注册失败，用户名已存在' : '用户名已存在'
      responseResult.status = 101
      return res.send(responseResult)
    }
  })
}

module.exports.verifyUsernameHandler = function (req, res) {
  const responseResult = new ServerResponseResult()
  responseResult.status = 102
  responseResult.operation = '查询用户名是否存在'
  responseResult.message = '该用户名可以注册'
  return res.send(responseResult)
}

/* 注册 */
module.exports.registerHandler = function (req, res) {
  let { username, password } = req.body
  const responseResult = new ServerResponseResult()
  responseResult.operation = '注册'
  let userid = uuid().split('-').join('')
  let password2 = decrypt(password) // password2是明文密码，数据库中也保存一份
  const createTime = generateDatetime()
  const params = [userid, username, password, password2, 1, createTime]
  db.query(sqlRegister, params, (error, results) => {
    if (error) {
      responseResult.status = -1
      responseResult.message = '注册失败，服务器跑路了'
      responseResult.reason = error.message
      return res.send(responseResult)
    }
    if (results.affectedRows === 1) {
      responseResult.status = 100
      responseResult.message = '注册成功'
      res.send(responseResult)
      initializeGroup(userid)
      initializeMatrix(userid)
    }
  })
}




/* 登录 */
module.exports.loginHandler = function (req, res) {
  const { username, password, isKeepLogin } = req.body
  const responseResult = new ServerResponseResult()
  responseResult.operation = '登录'
  // 先查询用户名是否存在
  db.query(sqlQueryUsername, username, (error, results) => {
    if (error) {
      responseResult.status = -1
      responseResult.message = '登录失败'
      responseResult.reason = '服务器跑路了'
      return res.send(responseResult)
    }
    if (results.length === 0) {
      responseResult.status = 106
      responseResult.message = '登录失败'
      responseResult.reason = '帐号不存在'
      return res.send(responseResult)
    }
    // 用户名存在
    const param = [username, password]
    db.query(sqlQueryUser, param, (error, results) => {
      const result = handleQueryResult(results)
      if (result.length === 0) {
        responseResult.status = 107
        responseResult.message = '登录失败'
        responseResult.reason = '密码错误'
        return res.send(responseResult)
      }
      const { userid, token } = result[0]
      responseResult.status = 105
      responseResult.message = '登录成功'
      if (token) {
        try {
          jwt.verify(token, jwtSecret)
          responseResult.data = { token: token, isKeepLogin: isKeepLogin }
          return res.send(responseResult)
        } catch (error) {
          // token过期，重新签发
          // { expiresIn: 60 * 60 * 24 * 7 }
          const token = jwt.sign({ userid: userid }, jwtSecret)
          const param = [token, userid, username]
          db.query(sqlUpToken, param, (error, results) => {
            if (results.affectedRows === 1) {
              responseResult.message = '新的token'
              responseResult.data = { token: token, isKeepLogin: isKeepLogin }
              return res.send(responseResult)
            }
          })
        }
      } else {
        // 无token
        const token = jwt.sign({ userid: userid }, jwtSecret)
        const param = [token, userid, username]
        db.query(sqlUpToken, param, (error, results) => {
          if (results.affectedRows === 1) {
            responseResult.data = { token: token, isKeepLogin: isKeepLogin }
            return res.send(responseResult)
          }
        })
      }
    })
  })
}

