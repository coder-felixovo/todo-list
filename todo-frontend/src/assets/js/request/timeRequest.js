import {
  apiTodoInFocus, apiAddFocusRecord, apiGetFocusRecord, apiFocusStat, apiFocusDetail
} from '@/assets/js/api/api'

/**
 * 请求：获取可专注的事项
 * @param {Vue} context
 * @returns
 */
export async function reqTodoCanFocus (context) {
  return new Promise((resolve, reject) => {
    context.$request.get(apiTodoInFocus)
      .then(res => resolve(res))
      .catch(err => reject(err))
  })
}

/**
 * 请求：添加专注记录
 * @param {Vue} context
 * @param {object} requestParam
 * @returns
 */
export async function reqAddFocusRecord (context, requestParam) {
  return new Promise((resolve, reject) => {
    context.$request.post(apiAddFocusRecord, requestParam)
      .then(res => resolve(res))
      .catch(err => reject(err))
  })
}

/**
 * 请求：获取专注记录
 * @param {Vue} context
 * @returns
 */
export async function reqGetFocusRecord (context) {
  return new Promise((resolve, reject) => {
    context.$request.get(apiGetFocusRecord)
      .then(res => resolve(res))
      .catch(err => reject(err))
  })
}

/**
 * 请求：获取专注数据统计
 * @param {Vue} context
 * @returns
 */
export async function reqFocusStat (context) {
  return new Promise((resolve, reject) => {
    context.$request.get(apiFocusStat)
      .then(res => resolve(res))
      .catch(err => reject(err))
  })
}

/**
   * 请求：获取专注时长详情
   * @param {Vue} context
   * @param {object} requestParams
   * @returns
   */
export async function reqFocusDetail (context, requestParams) {
  return new Promise((resolve, reject) => {
    context.$request.get(apiFocusDetail, requestParams)
      .then(res => resolve(res))
      .catch(err => reject(err))
  })
}
