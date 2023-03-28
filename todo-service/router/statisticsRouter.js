const express = require('express')
const router = express.Router()

const {
  getTotalStatHandler, getTodayStatHandler, getLineSevenStatHandler,
  getPieDoneTodoNumsOfTag, getSevenFocusTime
} = require('../handler/statisticsHandler')

router.get('/total_stat', getTotalStatHandler)
router.get('/today_stat', getTodayStatHandler)
router.get('/line_seven_stat', getLineSevenStatHandler)
router.get('/tag_done_nums', getPieDoneTodoNumsOfTag)
router.get('/seven_focus_time', getSevenFocusTime)

module.exports = router