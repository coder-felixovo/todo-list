const db = require('../config')
const {
	sqlGetTotalTodoNums, sqlGetTotalDoneTodoNums, sqlGetAccountCreateTime,
	sqlGetTodayDoneTodoNums, sqlGetTodayFocusTime,
	sqlGetSevenDoneTodoNums, sqlGetDoneTodoNumsOfTag
} = require('../sql/statisticsSql')

// 获取总任务数量
module.exports.dbGetTotalTodoNums = async function (userid) {
	return new Promise((resolve, reject) => {
		db.query(sqlGetTotalTodoNums, userid, (error, results) => {
			error ? reject(error) : resolve(results)
		})
	})
}

// 获取总完成任务数量
module.exports.dbGetTotalDoneTodoNums = async function (userid) {
	return new Promise((resolve, reject) => {
		db.query(sqlGetTotalDoneTodoNums, userid, (error, results) => {
			error ? reject(error) : resolve(results)
		})
	})
}

// 获取账户创建时间
module.exports.dbGetAccountCreateTime = async function (userid) {
	return new Promise((resolve, reject) => {
		db.query(sqlGetAccountCreateTime, userid, (error, results) => {
			error ? reject(error) : resolve(results)
		})
	})
}

// 获取今天完成任务数量
module.exports.dbGetTodayDoneTodoNums = async function (userid, date) {
	return new Promise((resolve, reject) => {
		const sqlParams = [userid, date]
		db.query(sqlGetTodayDoneTodoNums, sqlParams, (error, results) => {
			error ? reject(error) : resolve(results)
		})
	})
}

// 获取今天任务专注时长
module.exports.dbGetTodayFocusTime = async function (userid, date) {
	return new Promise((resolve, reject) => {
		const sqlParams = [userid, date]
		db.query(sqlGetTodayFocusTime, sqlParams, (error, resutls) => {
			error ? reject(error) : resolve(resutls)
		})
	})
}

// 获取最近7天完成任务数
module.exports.dbGetSevenDoneTodoNums = async function (userid) {
	return new Promise((resolve, reject) => {
		db.query(sqlGetSevenDoneTodoNums, userid, (error, results) => {
			error ? reject(error) : resolve(results)
		})
	})
}

// 获取不同标签下完成的任务数
module.exports.dbGetDoneTodoNumsOfTag = async function (userid) {
	return new Promise((resolve, reject) => {
		db.query(sqlGetDoneTodoNumsOfTag, userid, (error, results) => {
			error ? reject(error) : resolve(results)
		})
	})
}