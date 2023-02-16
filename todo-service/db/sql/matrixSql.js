// 获取四象限
module.exports.sqlGetMatrix = `
SELECT 
  matrix_id as matrixId, 
  matrix_name as matrixName,
  matrix_priority as priority
FROM todo_matrix
WHERE user_id = ?
GROUP BY matrix_priority ASC
`

// 获取四象限的待办事项
module.exports.sqlGetMatrixTodo = `
SELECT
  t.todo_id as todoId,
  t.todo_title as todoTitle,
  t.todo_checked as todoChecked,
  t.todo_status as todoStatus,
  t.todo_deadline as todoDeadline,
  t.todo_group_id as groupId,
  t.todo_tag_id as tagId,
  t.todo_matrix_id as matrixId,
  t.create_time as createTime,
  t.finish_time as doneTime,
  tt.tag_name as tagName
FROM todo as t
LEFT OUTER JOIN todo_tag as tt
ON
  t.user_id = ?
  AND t.todo_tag_id = tt.tag_id
WHERE 
  t.todo_status = 1
  AND t.todo_checked = 0
  AND todo_matrix_id != ''
GROUP BY 
  createTime DESC,
  todoId DESC
`