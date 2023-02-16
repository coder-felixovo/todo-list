/* 判断变量的值是否为undefined、null、空字符串三者之一 */
export function isEmpty (value) {
  return value === undefined || value === null || value === ''
}

/**
 * @description 消息提示。对elementui的消息提示进行封装。
 * @param {*} context Vue实例
 * @param {*} msg 消息文本
 * @param {*} type 消息类型：success、info、error、warn
 * @param {*} duration 一定时间后关闭消息显示，单位ms
 */
export function showMessage (context, msg, type, duration) {
  const _this = context
  _this.$message({
    message: msg,
    type: type || 'info',
    duration: duration || 1500
  })
}

// 判断是否为闰年
export function isLeapYear (year) {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0
}

// 防抖
export function debounce (func, delay = 1000) {
  let timer = null
  return function () {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      func.apply(this, arguments)
    }, delay)
  }
}

/* Router */
// 获取当前路由的path
export function getRoutePath (context) {
  return context.$route.path
}

/* Vuex */
// 获取state
export function getStateInVuex ({ context, propName }) {
  return context.$store.state[propName]
}
