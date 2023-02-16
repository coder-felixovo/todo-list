// 创建待办事项分组
module.exports.sqlAddGroup = `
  INSERT INTO todo_group
  (user_id, group_id, group_name, group_icon, create_time)
  VALUES(?, ?, ?, ?,?)
`

// 获取用户创建的待办事项分组”
module.exports.sqlGetGroup = `
SELECT 
  group_id as groupId, 
  group_name as groupName, 
  group_icon as groupIcon, 
  create_time as createTime
FROM todo_group
WHERE user_id = ? 
GROUP BY 
  createTime DESC,
  groupId  DESC
`

// 修改分组名称
module.exports.sqlUpdateGroupName = `
UPDATE todo_group
SET group_name = ?
WHERE user_id = ? AND group_id = ?
`

// 删除分组
module.exports.sqlDeleteGroup = `
DELETE FROM todo_group
WHERE user_id = ? AND group_id = ?
`

// 删除分组时，将待办事项对应的分组id设置为空
module.exports.sqlSetTodoGroupIdNull = `
UPDATE todo
SET todo_group_id = ''
WHERE user_id = ? AND todo_group_id = ?
`