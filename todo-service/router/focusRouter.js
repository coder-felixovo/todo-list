const express = require('express')
const router = express.Router()

const { preAddFocusRecord } = require('../middleware/focusMw')
const {
  getTodoInFocusHandler, addFocusRecordHandler, getFocusRecordHandler, focusStatHandler,
  focusDetailHandler
} = require('../handler/focusHandler')

router.use('/add_focus_record', preAddFocusRecord)

router.get('/todo_in_focus', getTodoInFocusHandler)
router.get('/get_focus_record', getFocusRecordHandler)
router.get('/focus_stat', focusStatHandler)
router.get('/focus_detail', focusDetailHandler)

router.post('/add_focus_record', addFocusRecordHandler)

module.exports = router