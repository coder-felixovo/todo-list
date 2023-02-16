/* 标签 路由 */
const express = require('express')
const router = express.Router()

const { verifyTagName } = require('../middleware/tagMw.js')
const { addTagHandler, getTagHandler, deleteTagHandler, updateTagNameHandler } = require('../handler/tagHandler.js')

router.use('/add_tag', verifyTagName)
router.use('/update_tag_name', verifyTagName)

router.post('/add_tag', addTagHandler)
router.get('/get_tag', getTagHandler)
router.post('/delete_tag', deleteTagHandler)
router.post('/update_tag_name', updateTagNameHandler)

module.exports = router