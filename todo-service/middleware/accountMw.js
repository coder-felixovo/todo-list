/* 帐户 路由中间件 处理函数 */
const { decrypt, encrypt } = require('../util/encrypt')
const { retrieveUsername, queryUser } = require('../handler/accountHandler')

const usernameRegExp = /^[a-zA-Z0-9_]{6,18}$/
const passwordRegExp = /^[a-zA-Z0-9_.]{8,18}$/

/**
 * 检索用户名是否已经注册（用于提交了注册请求，第一个中间件）
 * @param {Object} request 
 * @param {Object} response 
 * @param {Function} next 
 */
async function checkUserNameIsRegistered (request, response, next) {
  const { username } = request.body
  const { responseResult } = request
  responseResult.operation = '注册帐户'
  if (username) {
    await retrieveUsername(username)
      .then(res => {
        if (res.length !== 0) {
          // 用户名已注册
          responseResult.status = -100
          responseResult.message = '注册失败，原因：该用户名已注册'
          response.send(responseResult)
        } else {
          // 用户名未注册，放行，前往验证用户名
          next()
        }
      })
  } else {
    responseResult.status = -100
    responseResult.message = '注册失败，原因：参数username为空'
    response.send(responseResult)
  }
}

/**
 * 检查用户名是否符合要求（注册流程第二个中间件）
 * @param {Object} request 
 * @param {Object} response 
 * @param {Function} next 
 */
function verifyUsername (request, response, next) {
  const { username } = request.body
  const { responseResult } = request
  const isValidUsername = usernameRegExp.test(username)
  if (isValidUsername) {
    // 用户名验证通过，放行，前往验证密码
    next()
  } else {
    responseResult.status = -100
    responseResult.message = '注册失败，原因：无效的用户名，其长度应为6~18位字符，可包含数字和字母'
    response.send(responseResult)
  }
}

/**
 * 检查密码是否符合要求（注册流程第三个中间件）
 * @param {Object} request 
 * @param {Object} response 
 * @param {Function} next 
 */
function verifyPassword (request, response, next) {
  const { password } = request.body
  const { responseResult } = request
  const isValidPassword = passwordRegExp.test(decrypt(password))
  if (isValidPassword) {
    // 密码验证通过，放行，前往注册
    next()
  } else {
    responseResult.status = -100
    responseResult.message = '注册失败，原因：无效的密码，其长度应为8~18位字符，可包含数字、字母、.和下划线'
    response.send(responseResult)
  }
}

/**
 * 查询用户名是否存在（登录流程第一个中间件）
 * @param {object} request 
 * @param {object} response 
 * @param {function} next 
 */
async function queryUsernameExist (request, response, next) {
  const { username } = request.body
  const { responseResult } = request
  responseResult.operation = '登录'
  await retrieveUsername(username)
    .then(res => {
      if (res.length === 0) {
        responseResult.status = 106
        responseResult.message = '登录失败，原因：该帐号不存在'
        response.send(responseResult)
      } else {
        next()
      }
    })
}

/**
 * 检查密码是否正确（登录流程第二个中间件）
 * @param {object} request 
 * @param {object} response 
 * @param {object} next 
 */
async function checkPasswordIsCorrect (request, response, next) {
  const { username, password } = request.body
  const { responseResult } = request
  await queryUser(username, password)
    .then(res => {
      if (res.length === 0) {
        responseResult.status = 107
        responseResult.message = '登录失败，原因：密码错误'
        response.send(responseResult)
      } else {
        if (res[0].status === 1) {
          request.queryUserResult = res[0]
          next()
        } else {
          responseResult.status = 108
          responseResult.message = '登录失败，原因：该帐户已封禁'
          response.send(responseResult)
        }
      }
    })
}

// register
module.exports.checkUserNameIsRegistered = checkUserNameIsRegistered
module.exports.verifyUsername = verifyUsername
module.exports.verifyPassword = verifyPassword

// login
module.exports.queryUsernameExist = queryUsernameExist
module.exports.checkPasswordIsCorrect = checkPasswordIsCorrect