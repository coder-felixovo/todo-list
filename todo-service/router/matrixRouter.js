const express = require('express')
const router = express.Router()

const {
  getMatrixHandler, getMatrixTodo
} = require('../handler/todoMatirx')

router.get('/get_matrix', getMatrixHandler)
router.get('/get_matrix_todo', getMatrixTodo)

module.exports = router