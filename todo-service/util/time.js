/* 获取今天的日期 yyyy-mm-dd */
module.exports.getTodayDate = () => {
  const dateObj = new Date()
  const year = dateObj.getFullYear()
  const month = dateObj.getMonth() + 1
  const date = dateObj.getDate()
  return `${year}-${month}-${date}`
}


module.exports.generateDatetime = () => {
  const dateObj = new Date()
  const year = dateObj.getFullYear()
  const month = dateObj.getMonth() + 1 < 10 ? '0' + (dateObj.getMonth() + 1) : dateObj.getMonth() + 1
  const date = dateObj.getDate() < 10 ? '0' + dateObj.getDate() : dateObj.getDate()
  const hours = dateObj.getHours() < 10 ? '0' + dateObj.getHours() : dateObj.getHours()
  const minutes = dateObj.getMinutes() < 10 ? '0' + dateObj.getMinutes() : dateObj.getMinutes()
  const seconds = dateObj.getSeconds() < 10 ? '0' + dateObj.getSeconds() : dateObj.getMinutes()
  return year + '-' + month + '-' + date + ' ' + hours + ':' + minutes + ':' + seconds
}

// 将日期对象格式化成：2023-02-15 00:00:00 这样的格式
module.exports.formatDateObject = function (dateObj) {
  if (!(dateObj && typeof dateObj === 'object')) {
    return
  }
  const year = dateObj.getFullYear()
  const month = dateObj.getMonth() + 1 < 10 ? '0' + (dateObj.getMonth() + 1) : dateObj.getMonth() + 1
  const date = dateObj.getDate() < 10 ? '0' + dateObj.getDate() : dateObj.getDate()
  const hours = dateObj.getHours() < 10 ? '0' + dateObj.getHours() : dateObj.getHours()
  const minutes = dateObj.getMinutes() < 10 ? '0' + dateObj.getMinutes() : dateObj.getMinutes()
  const seconds = dateObj.getSeconds() < 10 ? '0' + dateObj.getSeconds() : dateObj.getMinutes()
  return year + '-' + month + '-' + date + ' ' + hours + ':' + minutes + ':' + seconds
}