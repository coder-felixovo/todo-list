/* 事项接口 */
export const apiGetAllTodo = '/api/get_all_todo'
export const apiCreateTodo = '/api/new_todo'
export const apiToggleTodoChecked = '/api/toggle_todo_checked'
export const apiMoveBin = '/api/move_bin'
export const apiDeleteTodo = '/api/del_todo'
export const apiRegainTodo = '/api/regain_todo'

/* 任务专注相关接口 */
export const apiTodoInFocus = '/api/todo_in_focus' // 获取可专注的事项
export const apiAddFocusRecord = '/api/add_focus_record' // 添加专注记录
export const apiGetFocusRecord = '/api/get_focus_record' // 获取专注记录
export const apiFocusStat = '/api/focus_stat' // 获取专注数据统计
export const apiFocusDetail = '/api/focus_detail' // 获取专注时长详情

/* 视图页面相关接口 */
export const apiGetMonthTodo = '/api/month_todo'

/* 数据统计相关接口 */
export const apiGetTotalStat = '/api/total_stat'
export const apiGetTodayStat = '/api/today_stat'
export const apiGetLineSevenStat = '/api/line_seven_stat'
export const apiTagDoneNums = '/api/tag_done_nums'
export const apiSevenFocusTime = '/api/seven_focus_time'
