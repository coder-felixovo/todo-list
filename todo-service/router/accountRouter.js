const express = require('express')
const router = express.Router()

const {
  checkUserNameIsRegistered, verifyUsername, verifyPassword,
  queryUsernameExist, checkPasswordIsCorrect
} = require('../middleware/accountMw')
const { register, login, checkUsernameIsUsable } = require('../handler/accountHandler')

const registerMwList = [checkUserNameIsRegistered, verifyUsername, verifyPassword]
router.use('/register', registerMwList)
const loginMwList = [queryUsernameExist, checkPasswordIsCorrect]
router.use('/login', loginMwList)

router.get('/usable_username', checkUsernameIsUsable)
router.post('/register', register)
router.post('/login', login)


module.exports = router
