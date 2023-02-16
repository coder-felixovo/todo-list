/* 搜索路由 */
const express = require('express')
const router = express.Router()

const { checkSearchContent } = require('../middleware/searchMw')

const { search } = require('../handler/searchHandler')

router.use('/search', checkSearchContent)

router.get('/search', search)

module.exports = router