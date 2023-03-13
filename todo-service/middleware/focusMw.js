module.exports.preAddFocusRecord = function (request, response, next) {
  const { startTime, endTime, focusTime } = request.body
  const { responseResult } = request
	responseResult.opeartion = '添加新的任务专注记录'
  if (startTime && endTime) {
		const _start = new Date(startTime).getTime()
		const _end = new Date(endTime).getTime()
		if (typeof _start === 'number' && typeof _end === 'number' && !Number.isNaN(_start) && !Number.isNaN(_end)) {
			next()
		} else {
			responseResult.message = '添加失败，缺少参数值'
		}
  } else {
    responseResult.message = '添加失败，缺少参数'
    response.send(responseResult)
  }
}