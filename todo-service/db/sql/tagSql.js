/* 标签 */

// 搜索用户指定标签名
module.exports.sqlGetGivenTagName = `
  SELECT tag_name as tagName
  FROM todo_tag
  WHERE user_id = ? AND tag_name = ?
`

// 创建标签
module.exports.sqlAddTag = `
  INSERT INTO todo_tag(user_id, tag_id, tag_name, create_time) 
  VALUES(?, ?, ?, ?)
`

// 获取标签
module.exports.sqlGetTag = `
SELECT 
  tag_id as tagId,
  tag_name as tagName 
FROM todo_tag 
WHERE user_id = ? 
GROUP BY
  create_time DESC,
  tagId DESC
`

// 删除标签
module.exports.sqlDeleteTag = `
  DELETE FROM todo_tag
  WHERE user_id = ? AND tag_id = ?
`

// 修改标签名称
module.exports.sqlUpdateTagName = `
  UPDATE todo_tag
  SET tag_name = ?
  WHERE user_id = ? AND tag_id = ?
`