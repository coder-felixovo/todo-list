const express = require('express')
const router = express.Router()

const { preAddFocusRecord } = require('../middleware/focusMw')
const { getTodoInFocusHandler, addFocusRecordHandler, getFocusRecordHandler, focusStatHandler } = require('../handler/focusHandler')

router.use('/add_focus_record', preAddFocusRecord)

router.get('/todo_in_focus', getTodoInFocusHandler)
router.get('/get_focus_record', getFocusRecordHandler)
router.get('/focus_stat', focusStatHandler)

router.post('/add_focus_record', addFocusRecordHandler)

module.exports = router