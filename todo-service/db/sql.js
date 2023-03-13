/* 账户 */
// 获取用户信息
module.exports.getUserInfoSql = `
  SELECT username, nickname, contact, email, avatar 
  FROM account
  WHERE userid = ?
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
  AND todo_status = 1 
  AND todo_deadline BETWEEN ? AND ?
GROUP BY 
  todo_deadline DESC,
  todo_id DESC
`

/* 分组 */

// 创建默认待办事项分组
module.exports.createDefaultGroup = `
  INSERT INTO todo_group
  (user_id, group_id, group_name, group_icon, create_time)
  VALUES (?, ?, ?, ?, ?)
`












