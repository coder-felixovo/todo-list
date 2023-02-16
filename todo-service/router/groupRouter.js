const express = require('express')
const router = express.Router()

const { prevUpdateGroupName, prevDeleteGroup } = require('../middleware/groupMw.js')
const {
  getGroupHandler, addGroupHandler, updateGroupNameHandler, deleteGroupHandler
} = require('../handler/groupHandler.js')

router.use('/new_group_name', prevUpdateGroupName)
router.use('/del_grou', prevDeleteGroup)

router.get('/get_group', getGroupHandler)
router.post('/add_group', addGroupHandler)
router.post('/new_group_name', updateGroupNameHandler)
router.post('/del_group', deleteGroupHandler)




module.exports = router