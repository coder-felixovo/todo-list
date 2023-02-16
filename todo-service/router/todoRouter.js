const express = require('express')
const router = express.Router()

const {
  prevAddTodo, prevMoveTodoInBin, prevDeleteTodo, prevToggleTodoCompletionStatus, prevRegainTodo,
  prevSaveTodoDetail, prevGetTodoDetail, prevUpdateTodoTitle, prevEdit, prevGetTagTodo, prevCreateNewTodo
} = require('../middleware/todoMw')

const {
  addTodoHandler, moveTodoInBinHandler, deleteTodoHandler, toggleTodoCompletionStatusHandler, regainTodoHandler,
  saveTodoDetailHandler, getTodoDetailHandler, updateTodoTitleHandler, getAllTodoHandler, getCollectTodoHandler,
  getTodayTodoHandler, getGroupTodoHandler, getCompletedTodoHandler, getBinTodoHandler, getTomorrowTodoHandler,
  getMonthTodoHandler, deleteAllTodoHandler, edit, getTagTodoHandler, createTodoHandler
} = require('../handler/todoHandler.js')

router.use('/add_todo', prevAddTodo)
router.use('/move_bin', prevMoveTodoInBin)
router.use('/del_todo', prevDeleteTodo)
router.use('/toggle_todo_checked', prevToggleTodoCompletionStatus)
router.use('/regain_todo', prevRegainTodo)
router.use('/save_todo_detail', prevSaveTodoDetail)
router.use('/get_todo_detail', prevGetTodoDetail)
router.use('/update_todo_title', prevUpdateTodoTitle)
router.use('/edit', prevEdit)
router.use('/get_tag_todo', prevGetTagTodo)
router.use('/new_todo', prevCreateNewTodo)


router.post('/add_todo', addTodoHandler)
router.post('/move_bin', moveTodoInBinHandler)
router.post('/del_todo', deleteTodoHandler)
router.post('/toggle_todo_checked', toggleTodoCompletionStatusHandler)
router.post('/regain_todo', regainTodoHandler)
router.post('/save_todo_detail', saveTodoDetailHandler)
router.get('/get_todo_detail', getTodoDetailHandler)
router.post('/update_todo_title', updateTodoTitleHandler)
router.post('/delete_all_todo', deleteAllTodoHandler)
router.post('/edit', edit)
router.post('/new_todo', createTodoHandler)

router.get('/get_all_todo', getAllTodoHandler)
router.get('/get_collect_todo', getCollectTodoHandler)
router.get('/get_today_todo', getTodayTodoHandler)
router.get('/get_tomorrow_todo', getTomorrowTodoHandler)
router.get('/get_completed_todo', getCompletedTodoHandler)
router.get('/get_bin_todo', getBinTodoHandler)
router.get('/get_group_todo', getGroupTodoHandler)
router.get('/get_tag_todo', getTagTodoHandler)
router.get('/get_month_todo', getMonthTodoHandler)


module.exports = router
