// 将日期对象格式化成：2023-02-15 00:00:00 这样的格式
export function formatDateObject (dateObj) {
  if (dateObj && typeof dateObj === 'object') {
    const year = dateObj.getFullYear()
    const month = dateObj.getMonth() + 1 < 10 ? '0' + (dateObj.getMonth() + 1) : dateObj.getMonth() + 1
    const date = dateObj.getDate() < 10 ? '0' + dateObj.getDate() : dateObj.getDate()
    const hours = dateObj.getHours() < 10 ? '0' + dateObj.getHours() : dateObj.getHours()
    const minutes = dateObj.getMinutes() < 10 ? '0' + dateObj.getMinutes() : dateObj.getMinutes()
    const seconds = dateObj.getSeconds() < 10 ? '0' + dateObj.getSeconds() : dateObj.getMinutes()
    return year + '-' + month + '-' + date + ' ' + hours + ':' + minutes + ':' + seconds
  }
}

export const dayNameInWeek = [
  { id: 'Mon', name: '星期一' },
  { id: 'Tue', name: '星期二' },
  { id: 'Wed', name: '星期三' },
  { id: 'Thu', name: '星期四' },
  { id: 'Fri', name: '星期五' },
  { id: 'Sat', name: '星期六' },
  { id: 'Sun', name: '星期天' }
]

export function getDaysInEveryMonthArray () {
  return [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
}

export function DateObjectInCalendar () {
  this.id = 0
  this.date = ''
  this.day = 1
  this.isLastMonth = false
  this.isNextMonth = false
  this.class = ''
}

/* 判断是否为闰年 */
export function isLeapYear (year) {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0
}

/**
 * @description 更新日历（6行7列共42天）
 * @param {context} context 表示Vue实例
 * @param {year} year 4位数字年份
 * @param {month} month 数字0-11（0表示一月）
 * @returns Array
 */
export function updateCalendar () {
  const { year, month, todo } = arguments[0]
  const daysInMonth = getDaysInEveryMonthArray() // 每个月含有多少天
  const _isLeapYear = isLeapYear(year) // 是否为闰年
  daysInMonth[1] = _isLeapYear ? 29 : 28
  const dateObj = new Date(year, month)
  const firstDayOfMonth = dateObj.getDay() // 该月份第一天是星期几
  const days = daysInMonth[month] // 该月份有多少天
  const resultArray = []
  let lastYear
  let nextYear
  let id = 0
  let daysInLastMonth
  let daysInNextMonth
  let lastIsDec
  let nextIsJan
  let leftDaysInLastMonth
  let leftDaysInNextMonth
  // 上个月
  if (month === 0) {
    lastYear = year - 1
    daysInLastMonth = daysInMonth[11]
    lastIsDec = true
  } else {
    lastIsDec = false
    daysInLastMonth = daysInMonth[month - 1]
  }
  // 下个月
  if (month === 11) {
    nextYear = year + 1
    daysInNextMonth = daysInMonth[0]
    nextIsJan = true
  } else {
    daysInNextMonth = daysInMonth[month + 1]
    nextIsJan = false
  }
  // 上个月和下个月需要补充的天数
  if (firstDayOfMonth === 0) {
    // 星期天
    leftDaysInLastMonth = 6
    leftDaysInNextMonth = 42 - leftDaysInLastMonth - days
  } else {
    leftDaysInLastMonth = firstDayOfMonth - 1
    leftDaysInNextMonth = 42 - leftDaysInLastMonth - days
  }
  // 添加上个月补充天数
  if (month === 0) {
    for (let i = 0; i < leftDaysInLastMonth; i++) {
      const obj = new DateObjectInCalendar()
      obj.id = id++
      obj.day = daysInLastMonth
      obj.date = lastYear + '-' + 12 + '-' + daysInLastMonth
      obj.isLastMonth = true
      daysInLastMonth--
      resultArray.unshift(obj)
    }
  } else {
    for (let i = 0; i < leftDaysInLastMonth; i++) {
      const _month = month < 10 ? '0' + month : month
      const obj = new DateObjectInCalendar()
      obj.id = id++
      obj.day = daysInLastMonth
      obj.date = year + '-' + _month + '-' + daysInLastMonth
      obj.isLastMonth = true
      daysInLastMonth--
      resultArray.unshift(obj)
    }
  }
  // 添加本月天数
  for (let i = 1; i <= days; i++) {
    const _month = (month + 1) < 10 ? '0' + (month + 1) : (month + 1)
    const _day = i < 10 ? '0' + i : i
    const obj = new DateObjectInCalendar()
    obj.id = id++
    obj.date = year + '-' + _month + '-' + _day
    obj.day = i
    resultArray.push(obj)
  }
  // 补充下个月的日期
  if (month === 11) {
    for (let i = 1; i <= leftDaysInNextMonth; i++) {
      const _day = i < 10 ? '0' + i : i
      const obj = new DateObjectInCalendar()
      obj.id = id++
      obj.date = nextYear + '-' + '01' + '-' + _day
      obj.day = i
      obj.isNextMonth = true
      resultArray.push(obj)
    }
  } else {
    for (let i = 1; i <= leftDaysInNextMonth; i++) {
      const _month = (month + 2) < 10 ? '0' + (month + 2) : (month + 2)
      const _day = i < 10 ? '0' + i : i
      const obj = new DateObjectInCalendar()
      obj.id = id++
      obj.date = year + '-' + _month + '-' + _day
      obj.day = i
      obj.isNextMonth = true
      resultArray.push(obj)
    }
  }
  return resultArray
}
