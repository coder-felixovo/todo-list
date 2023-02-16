/* 统计 */

// 查询任务总数
module.exports.sqlGetTodoSum = `
  SELECT COUNT(todo_id) as todoSum
  FROM todo
  WHERE user_id = ? AND todo_status = 1
`

// 查询已完成的任务总数
module.exports.sqlGetFinishedTodoSum = `
  SELECT COUNT(todo_id) as finishedTodoSum
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
module.exports.sqlGetTodayDoneTodoCount = `
  SELECT COUNT(todo_id) as todayDoneTodoCount
  FROM todo
  WHERE 
	  user_id = ? AND 
	  todo_checked = 1 AND 
	  todo_status = 1 AND 
	  DATE(finish_time) = ?
`

// 获取今日总专注时长
module.exports.sqlGetTodayFocus = `
  SELECT SUM(focus_time) as todayFocus
  FROM todo_focus
  WHERE DATE(create_time) = ?
`

// 获取以今天为准，最近七天完成任务数（前3天后3天，没有补0）
module.exports.sqlLatestSevenDays = `
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
