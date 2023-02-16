const express = require('express')
const expressJWT = require('express-jwt')
const cors = require('cors')

const accountRouter = require('./router/accountRouter')
const groupRouter = require('./router/groupRouter')
const matrixRouter = require('./router/matrixRouter')
const searchRouter = require('./router/searchRouter')
const statisticsRouter = require('./router/statisticsRouter')
const tagRouter = require('./router/tagRouter')
const todoRouter = require('./router/todoRouter')
const todoViewRouter = require('./router/todoView')
const userinfoRouter = require('./router/userinfo')

const { jwtSecret } = require('./handler/secret')
const { ServerResponseResult } = require('./util/result')

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

const unlessPath = ['/login', '/register', '/verify_username']

app.use(
  expressJWT
    .expressjwt({
      secret: jwtSecret,
      algorithms: ['HS256'],
    })
    .unless({
      path: unlessPath,
    })
)

app.use((request, response, next) => {
  if (unlessPath.includes(request.path)) {
    next()
  } else {
    const { userid } = request.auth
    const responseResult = new ServerResponseResult()
    if (userid) {
      request.responseResult = responseResult
      next()
    } else {
      responseResult.operation = '验证用户身份'
      responseResult.status = -998
      responseResult.message = '不通过，原因：缺少用户id'
      return response.send(responseResult)
    }
  }
})

app.use(accountRouter)
app.use(groupRouter)
app.use(matrixRouter)
app.use(searchRouter)
app.use(statisticsRouter)
app.use(tagRouter)
app.use(todoRouter)
app.use(todoViewRouter)
app.use(userinfoRouter)

app.use((error, request, response, next) => {
  const responseResult = new ServerResponseResult()
  if (error.name === 'UnauthorizedError') {
    responseResult.status = -999
    responseResult.operation = '验证用户身份'
    responseResult.message = '不通过，原因：无效的token'
    return response.send(responseResult)
  }
  if (error instanceof Error) {
    console.log(error.message)
  }
})

app.listen(8080, () => {
  console.log('Server started, running at http://localhost:8080')
})
