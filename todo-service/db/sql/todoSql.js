// 添加待办事项
module.exports.sqlAddTodo = `
  INSERT INTO todo 
  (user_id, todo_id, todo_title, todo_checked, todo_status, todo_deadline, todo_group_id, create_time)
  VALUES(?, ?, ?, ?, ?, ?, ?, ?)
`

// 创建新的待办事项
module.exports.sqlCreateTodo = `
  INSERT INTO todo
  (user_id, todo_id, todo_title, todo_checked, todo_status, todo_deadline, todo_group_id, todo_matrix_id, todo_tag_id, create_time)
  VALUES(?,?,?,?,?,?,?,?,?,?)
`

// 将待办事项移入回收站
module.exports.sqlMoveTodoInBin = `
  UPDATE todo
  SET todo_status = -1
  WHERE user_id = ? AND todo_id = ?
`

// 删除待办事项（在回收站中删除）
module.exports.sqlDeleteTodo = `
  DELETE FROM todo
  WHERE user_id = ? AND todo_id = ? AND todo_status = -1
`

// 切换待办事项完成状态
module.exports.sqlToggleTodoCompletionStatus = `
  UPDATE todo
  SET 
    todo_checked = ?,
    finish_time = ?
  WHERE user_id = ? AND todo_id = ? AND todo_status = 1
`


// 恢复待办事项（在回收站操作）
module.exports.sqlRegainTodo = `
  UPDATE todo
  SET todo_status = 1
  WHERE user_id = ? AND todo_id = ? AND todo_status = -1
`

// 保存待办事项详情
module.exports.sqlSaveTodoDetail = `
  UPDATE todo
  SET todo_content = ?
  WHERE user_id = ? AND todo_id = ?
`

// 获取待办事项详情
module.exports.sqlGetTodoDetail = `
  SELECT 
    todo_content as todoContent
  FROM todo
  WHERE user_id = ? AND todo_id =?
`

// 修改待办事项标题
module.exports.sqlUpdateTodoTitle = `
  UPDATE todo
  SET todo_title = ?
  WHERE user_id = ? AND todo_id = ?
`

// 删除全部待办事项（在回收站操作） 
module.exports.sqlDeleteAllTodo = `
DELETE
FROM todo
WHERE user_id = ? AND todo_status = -1
`

// 编辑
module.exports.sqlEdit = `
UPDATE todo
SET
  todo_title = ?,
  todo_deadline = ?,
  todo_group_id = ?,
  todo_tag_id = ?,
  todo_matrix_id = ?
WHERE
  user_id = ?
  AND todo_id = ?
`

// 获取全部待办事项，正常，todo_status = 1
module.exports.sqlGetAllTodo = `
SELECT
  t.todo_id as todoId,
  t.todo_title as todoTitle,
  t.todo_checked as todoChecked,
  t.todo_status as todoStatus,
  t.todo_deadline as todoDeadline,
  t.todo_group_id as groupId,
  t.todo_matrix_id as matrixId,
  t.todo_tag_id as tagId,
  t.create_time as createTime,
  t.finish_time as finishTime,
  tg.group_name as groupName,
  tm.matrix_name as matrixName,
  tm.matrix_priority as priority,
  tt.tag_name as tagName
FROM todo as t
LEFT OUTER JOIN todo_group as tg
ON t.todo_group_id = tg.group_id
LEFT OUTER JOIN todo_matrix as tm
ON t.todo_matrix_id = tm.matrix_id
LEFT OUTER JOIN todo_tag as tt
ON t.todo_tag_id = tt.tag_id
WHERE 
  t.user_id = ?
  AND t.todo_status = 1
GROUP BY 
  createTime DESC,
  todoId DESC
`

// 获取收集箱待办事项，正常, todo_status = 1
module.exports.sqlGetCollectTodo = `
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
  And t.todo_group_id = ? 
  AND t.todo_tag_id = tt.tag_id
WHERE t.todo_status = 1
GROUP BY 
  createTime DESC,
  todoId DESC
`

// 获取所有完成的待办事项，正常，todo_status = 1
module.exports.sqlGetCompletedTodo = `
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
  t.todo_tag_id = tt.tag_id
WHERE 
  t.user_id = ?
  AND t.todo_status = 1 
  AND t.todo_checked = 1
GROUP BY 
  createTime DESC,
  todoId DESC
`

// 获取所有回收站的待办事项，回收站，todo_status = -1
module.exports.sqlGetBinTodo = `
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
WHERE t.todo_status = -1
GROUP BY 
  createTime DESC,
  todoId DESC
`

// 根据分组获取待办事项
module.exports.sqlGetGroupTodo = `
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
WHERE t.todo_status = 1 AND t.todo_group_id = ?
GROUP BY 
  createTime DESC,
  todoId DESC
`

// 根据标签获取待办事项
module.exports.sqlGetTagTodo = `
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
	t.todo_tag_id = tt.tag_id
WHERE
  t.user_id = ?
  AND t.todo_status = 1 
  AND t.todo_tag_id = ?
GROUP BY 
  createTime DESC,
  todoId DESC
`



// 根据日期获取待办事项  yyyy-mm-dd
module.exports.sqlGetTodoByDate = `
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
WHERE t.todo_status = 1 AND t.todo_deadline = ?
GROUP BY 
  createTime DESC,
  todoId DESC
`

// 根据日期范围获取待办事项
module.exports.sqlGetTodoByDateRange = `
SELECT
  t.todo_id as todoId,
  t.todo_title as todoTitle,
  t.todo_checked as todoChecked,
  t.todo_status as todoStatus,
  t.todo_deadline as todoDeadline,
  t.todo_group_id as groupId,
  t.todo_matrix_id as matrixId,
  t.todo_tag_id as tagId,
  t.create_time as createTime,
  t.finish_time as finishTime,
  tg.group_name as groupName,
  tm.matrix_name as matrixName,
  tm.matrix_priority as priority,
  tt.tag_name as tagName
FROM todo as t
LEFT OUTER JOIN todo_group as tg
ON t.todo_group_id = tg.group_id
LEFT OUTER JOIN todo_matrix as tm
ON t.todo_matrix_id = tm.matrix_id
LEFT OUTER JOIN todo_tag as tt
ON t.todo_tag_id = tt.tag_id
WHERE 
  t.user_id = ? 
  AND todo_checked = 0
  AND todo_status = 1 
  AND (todo_deadline BETWEEN ? AND ?)
GROUP BY 
  todo_deadline DESC,
  todo_id DESC
`
