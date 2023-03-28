const uuid = require('node-uuid/uuid')
const db = require('../db/config.js')
const { dbFocusDetail } = require('../db/operation/focusDb')
const {
	sqlGetTodoInFocus, sqlAddFocusRecord, sqlGetFocusRecord,
	sqlTodayFocusStat, sqlTotalFocusStat
} = require('../db/sql/focusSql')
const { generateDatetime, formatDateObject } = require('../util/time')

function dbTodayFocusStat (userid, date) {
	return new Promise((resolve, reject) => {
		const sqlParams = [userid, date]
		db.query(sqlTodayFocusStat, sqlParams, (error, results) => {
			error ? reject(error) : resolve(results)
		})
	})
}

function dbTotalFocusStat (userid) {
	return new Promise((resolve, reject) => {
		db.query(sqlTotalFocusStat, userid, (error, results) => {
			error ? reject(error) : resolve(results)
		})
	})
}

/**
 * 获取可专注的任务列表
 * @param {Object} request
 * @param {Object} response
 */
module.exports.getTodoInFocusHandler = async function (request, response) {
	const { userid } = request.auth
	const { responseResult } = request
	db.query(sqlGetTodoInFocus, userid, (error, results) => {
		if (error) {
			responseResult.status = -1
			responseResult.message = '服务器跑路了'
			return response.send(responseResult)
		}
		responseResult.status = 5001
		responseResult.data.todoData = results
		response.send(responseResult)
	})
}

/**
 * 添加专注记录
 * @param {Object} request
 * @param {Object} response
 */
module.exports.addFocusRecordHandler = async function (request, response) {
	const { userid } = request.auth
	const { todoId, todoTitle, startTime, endTime, note, focusTime } = request.body
	const { responseResult } = request
	let _focusTime
	if (focusTime && typeof focusTime === 'number' && !Number.isNaN(focusTime)) {
		_focusTime = focusTime
	} else {
		const _start = Math.floor(new Date(startTime).getTime() / 1000)
		const _end = Math.floor(new Date(endTime).getTime() / 1000)
		_focusTime = _end - _start
	}
	const focusId = uuid().split('-').join('').slice(0, 15)
	const createTime = generateDatetime()
	const _startTime = formatDateObject(new Date(startTime))
	const _endTime = formatDateObject(new Date(endTime))
	const sqlParams = [userid, focusId, todoId, _focusTime, createTime, _startTime, _endTime, note]
	db.query(sqlAddFocusRecord, sqlParams, (error, resutls) => {
		if (error) {
			responseResult.status = -1
			responseResult.message = '服务器跑路了'
			return response.send(responseResult)
		}
		if (resutls.affectedRows === 1) {
			responseResult.status = 5002
			responseResult.data = {
				focusId,
				todoId,
				todoTitle,
				focusTime: _focusTime,
				createTime,
				note,
			}
			response.send(responseResult)
		}
	})
}

/**
 * 获取任务专注记录
 * @param {Object} request
 * @param {Object} response
 */
module.exports.getFocusRecordHandler = function (request, response) {
	const { userid } = request.auth
	const { responseResult } = request
	db.query(sqlGetFocusRecord, userid, (error, results) => {
		if (error) {
			responseResult.status = -1
			responseResult.message = '服务器跑路了'
			return response.send(responseResult)
		}
		responseResult.status = 5003
		responseResult.data.focusRecordData = results
		response.send(responseResult)
	})
}

module.exports.focusStatHandler = function (request, response) {
	const { userid } = request.auth
	const { responseResult } = request
	responseResult.operation = '获取专注统计数据'
	const dateObj = new Date()
	const date = dateObj.getFullYear() + '-' + (dateObj.getMonth() + 1) + '-' + dateObj.getDate()
	const p1 = dbTodayFocusStat(userid, date)
	const p2 = dbTotalFocusStat(userid)
	Promise.all([p1, p2]).
		then((res) => {
			const responseData = {}
			res.forEach(item => {
				Object.assign(responseData, item[0])
			})
			responseResult.status = 5004
			responseResult.data = responseData
			response.send(responseResult)
		})
		.catch((err) => {
			responseResult.status = -5004
			responseResult.message = '获取失败'
			response.send(responseResult)
		})
}

module.exports.focusDetailHandler = async function (request, response) {
	const { userid } = request.auth
	const { responseResult } = request
	const { focusId } = request.query
	responseResult.operation = '获取专注详情'
	const queryResult = await dbFocusDetail(userid, focusId)
	if (queryResult instanceof Error) {
		responseResult.status = -1
		responseResult.message = '服务器跑路了'
		response.send(responseResult)
	} else {
		responseResult.status = 5005
		responseResult.message = '成功'
		responseResult.data = queryResult[0]
		response.send(responseResult)
	}
}



