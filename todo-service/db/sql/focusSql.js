// 查询可专注的任务
module.exports.sqlGetTodoInFocus = `
	SELECT
		todo_id as todoId,
		todo_title as todoTitle
	FROM 
		todo
	WHERE 
		user_id = ?
		AND todo_checked = 0
`

// 添加任务专注记录
module.exports.sqlAddFocusRecord = `
  INSERT INTO todo_focus
	(user_id, focus_id, todo_id, focus_time, create_time, start_time, end_time, note)
  VALUES(?, ?, ?, ?, ?, ?, ?, ?)
`

// 查询任务专注记录
module.exports.sqlGetFocusRecord = `
SELECT
	tf.focus_id as focusId,
	tf.todo_id as todoId,
	tf.focus_time as focusTime,
	tf.create_time as createTime,
	tf.note,
	t.todo_title as todoTitle
FROM
	todo_focus as tf
LEFT OUTER JOIN todo as t
ON t.todo_id = tf.todo_id
WHERE
	tf.user_id = ?
GROUP BY
	tf.create_time DESC
`

// 查询今日专注数和专注时长
module.exports.sqlTodayFocusStat = `
SELECT
	COUNT(focus_id) as todayFocusNums,
	SUM(focus_time) as todayFocusTime
FROM
	todo_focus
WHERE
	user_id = ?
	AND DATE(create_time) = ?
`

// 查询总专注数和总专注时长
module.exports.sqlTotalFocusStat = `
SELECT
	COUNT(focus_id) as totalFocusNums,
	SUM(focus_time) as totalFocusTime
FROM
	todo_focus
WHERE
	user_id = ?
`

// Sql：获取专注详情
module.exports.sqlFocusDetail = `
SELECT
	f.focus_id as focusId,
	f.todo_id as todoId,
	f.create_time as createTime,
	f.start_time as startTime,
	f.end_time as endTime,
	f.focus_time as focusTime,
	t.todo_title as todoTitle
FROM
	todo_focus as f
LEFT JOIN todo as t
ON f.todo_id = t.todo_id
WHERE
	f.user_id = ?
	AND f.focus_id = ?
`