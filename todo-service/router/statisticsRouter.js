const express = require('express')
const router = express.Router()

/* tj: statistics */
const {
  getTjTotalHandler, getTjTodayHandler, getLatestSevenDays
} = require('../handler/statisticsHandler')

router.get('/tj_total', getTjTotalHandler)
router.get('/tj_today', getTjTodayHandler)
router.get('/latest_seven_days', getLatestSevenDays)

module.exports = router