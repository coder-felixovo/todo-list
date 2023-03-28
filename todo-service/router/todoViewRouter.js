const express = require('express')
const router = express.Router()

const {
  getTodoMonthHandler, getTodoInWeekView, getTodoInDayViewHandler
} = require('../handler/todoView')



router.get('/month_todo', getTodoMonthHandler)
router.get('/week_todo', getTodoInWeekView)
router.get('/day_todo', getTodoInDayViewHandler)

module.exports = router