const express = require('express')
const router = express.Router()

// 导入相应逻辑处理模块
const {getUserInfoHandler, updateNicknameHandler, updateContactHandler, updateEmailHandler} = require('../handler/userinfo')

router.get('/get_user_info', getUserInfoHandler)
router.post('/update_nickname', updateNicknameHandler)
router.post('/update_contact', updateContactHandler)
router.post('/update_email', updateEmailHandler)

module.exports = router