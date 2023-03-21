/* 统计 */

// 查询任务总数
module.exports.sqlGetTotalTodoNums = `
  SELECT COUNT(todo_id) as totalTodoNums
  FROM todo
  WHERE user_id = ? AND todo_status = 1
`

// 查询已完成的任务总数
module.exports.sqlGetTotalDoneTodoNums = `
  SELECT COUNT(todo_id) as totalDoneTodoNums
  FROM todo
  WHERE user_id = ? AND todo_checked = 1 AND todo_status = 1
`

// 查询帐号创建时间
module.exports.sqlGetAccountCreateTime = `
  SELECT create_time as accountCreateTime
  FROM account 
  WHERE userid = ?
`

// 获取今日完成的任务数量
module.exports.sqlGetTodayDoneTodoNums = `
  SELECT COUNT(todo_id) as todayDoneTodoNums
  FROM todo
  WHERE 
	  user_id = ? AND 
	  todo_checked = 1 AND 
	  todo_status = 1 AND 
	  DATE(finish_time) = ?
`

// 获取今日任务专注时长
module.exports.sqlGetTodayFocusTime = `
SELECT SUM(focus_time) as todayFocusTime
FROM todo_focus
WHERE 
  user_id = ?
  AND DATE(create_time) = ?
`

// 获取以今天为准，最近七天完成任务数
module.exports.sqlGetSevenDoneTodoNums = `
SELECT
DATE_FORMAT(finish_time, '%Y-%m-%d') as date,
  COUNT(todo_id) as number
FROM todo
WHERE
  user_id = ?
  AND DATE(finish_time) >= DATE_SUB(CURRENT_DATE, INTERVAL 3 day)
	AND DATE(finish_time) <= DATE_ADD(CURDATE(), INTERVAL 3 day)
GROUP BY date
ORDER BY date ASC
`

// 获取不同标签下完成的任务数
module.exports.sqlGetDoneTodoNumsOfTag = `
SELECT
	tt.tag_id as tagId,
	tt.tag_name as tagName,
	COUNT(t.todo_id) as doneTodoNums
FROM
	todo as t
LEFT OUTER JOIN 
	todo_tag as tt
ON 
	t.todo_tag_id = tt.tag_id
WHERE
	t.user_id = ?
	AND t.todo_checked = 1
	AND t.todo_status = 1
GROUP BY
	tt.tag_id
`
