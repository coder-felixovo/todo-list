module.exports.sqlSearch = `
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
  t.finish_time as finishTime,
  tt.tag_name as tagName,
  tg.group_name as groupName,
  tm.matrix_name as matrixName,
  tm.matrix_priority as priority
FROM todo as t
LEFT OUTER JOIN todo_tag as tt
ON t.todo_tag_id = tt.tag_id
LEFT OUTER JOIN todo_group as tg
ON t.todo_group_id = tg.group_id
LEFT OUTER JOIN todo_matrix as tm
ON t.todo_matrix_id = tm.matrix_id
WHERE
  t.user_id = ?
  AND todo_title like ?
GROUP BY 
  createTime DESC,
  todoChecked ASC,
  todoId DESC
`

// 搜索分组
module.exports.sqlSearchGroup = `
SELECT
	group_id as groupId,
	group_name as groupName,
	group_icon as groupIcon
FROM
	todo_group
WHERE
	user_id = ?
	AND group_name like ?
`

// 搜索标签
module.exports.sqlSearchTag = `
SELECT
	tag_id as tagId,
	tag_name as tagName,
	tag_icon as tagIcon
FROM 
	todo_tag
WHERE
	user_id = ?
	AND tag_name like ?
`