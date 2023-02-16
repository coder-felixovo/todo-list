const express = require('express')
const router = express.Router()

const { queryUsernameHandler, verifyUsernameHandler, loginHandler, registerHandler } = require('../handler/account.js')

router.use((req, res, next) => {
  if (req.path === '/register' || req.path === '/verify_username') {
    queryUsernameHandler(req, res, next)
  } else {
    next()
  }
})

router.get('/verify_username', verifyUsernameHandler)
router.post('/login', loginHandler)
router.post('/register', registerHandler)

module.exports = router
