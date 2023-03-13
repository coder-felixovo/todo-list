const jwt = require('jsonwebtoken')
const uuid = require('node-uuid/uuid')
const db = require('../db/config.js')
const { jwtSecret } = require('./secret.js')
const { decrypt } = require('../util/encrypt')
const { sqlQueryUsername, sqlRegister, sqlQueryUser, sqlUpdateToken } = require('../db/sql/accountSql')
const { generateDatetime } = require('../util/time')

const { initializeMatrix } = require('./todoMatirx')

/* 操作数据库 */
/**
 * 在数据库中检索用户名是否存在
 * @param {string} username 
 */
async function retrieveUsername (username) {
  return new Promise((resolve, reject) => {
    db.query(sqlQueryUsername, username, (error, results) => {
      if (error) {
        console.log('In function retrieveUsername')
        console.log(error.sql)
        console.log(error.sqlMessage)
      } else {
        resolve(results)
      }
    })
  })
}

/**
 * 根据用户名和密码检索帐户
 * @param {string} username 
 * @param {string} password 
 */
async function queryUser (username, password) {
  return new Promise((resolve, reject) => {
    const sqlParams = [username, password]
    db.query(sqlQueryUser, sqlParams, (error, results) => {
      if (error) {
        console.log('queryUser')
        console.log(error.sql)
        console.log(error.sqlMessage)
      } else {
        resolve(results)
      }
    })
  })
}

/**
 * 更新token
 */
async function updateToken (token, userid) {
  return new Promise((resolve, reject) => {
    const sqlParams = [token, userid]
    db.query(sqlUpdateToken, sqlParams, (error, results) => {
      if (error) {
        console.log('login')
        console.log(error.sql)
        console.log(error.sqlMessage)
      }
      resolve(results)
    })
  })
}


/* 业务处理 */
/**
 * 检查用户名是否可以注册（用于用户名输入框失去焦点提交的请求）
 * @param {object} request 
 * @param {object} response 
 */
async function checkUsernameIsUsable (request, response) {
  const { username } = request.query
  const { responseResult } = request
  await retrieveUsername(username)
    .then(res => {
      if (res.length === 0) {
        responseResult.status = 101
        responseResult.message = '该帐户可以注册'
        response.send(responseResult)
      } else {
        responseResult.status = -101
        responseResult.message = '该帐户已注册'
        response.send(responseResult)
      }
    })
}

/**
 * 注册账户
 * @param {object} request 
 * @param {object} response 
 */
async function register (request, response) {
  const { username, password } = request.body
  const { responseResult } = request
  const userid = uuid().split('-').join('')
  const password2 = decrypt(password) // password2是明文密码
  const createTime = generateDatetime()
  const sqlParams = [userid, username, password, password2, 1, createTime]
  db.query(sqlRegister, sqlParams, (error, results) => {
    if (error) {
      console.log('register')
      console.log(error.sql)
      console.log(error.sqlMessage)
      responseResult.status = -1
      responseResult.message = '服务器跑路了'
      return response.send(responseResult)
    }
    if (results.affectedRows === 1) {
      responseResult.status = 100
      responseResult.message = '注册成功'
      response.send(responseResult)
      initializeMatrix(userid)
    }
  })
}




/**
 * 登录
 * @param {object} request 
 * @param {object} response 
 */
async function login (request, response) {
  const { userid, token } = request.queryUserResult
  const { responseResult } = request
  responseResult.status = 105
  if (token) {
    try {
      jwt.verify(token, jwtSecret)
      responseResult.data = { token: token }
      response.send(responseResult)
    } catch (error) {
      // token过期，重新签发
      // { expiresIn: 60 * 60 * 24 * 7 }
      const token = jwt.sign({ userid }, jwtSecret)
      await updateToken(token, userid)
        .then(res => {
          if (res.affectedRows === 1) {
            responseResult.message = '新的token'
            responseResult.data = { token }
            response.send(responseResult)
          }
        })
    }
  } else {
    // 无token
    const token = jwt.sign({ userid: userid }, jwtSecret)
    await updateToken(token, userid)
      .then(res => {
        if (res.affectedRows === 1) {
          responseResult.message = '新的token'
          responseResult.data = { token }
          response.send(responseResult)
        }
      })
  }
}


// 操作数据库
module.exports.retrieveUsername = retrieveUsername
module.exports.queryUser = queryUser
module.exports.updateToken = updateToken

// 业务处理
module.exports.checkUsernameIsUsable = checkUsernameIsUsable
module.exports.register = register
module.exports.login = login