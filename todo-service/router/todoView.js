const express = require('express')
const router = express.Router()

const {
  getTodoMonthHandler, getTodoInWeekViewHandler, getTodoInDayViewHandler
} = require('../handler/todoView')



router.get('/month_todo', getTodoMonthHandler)
router.get('/week_todo', getTodoInWeekViewHandler)
router.get('/day_todo', getTodoInDayViewHandler)

module.exports = router