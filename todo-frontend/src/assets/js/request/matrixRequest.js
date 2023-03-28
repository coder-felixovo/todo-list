import { apiGetMatrix } from '@/assets/js/public/api.js'

/**
 * 请求：获取四象限
 * @param {Vue} context
 */
export async function reqGetMatrix (context) {
  return new Promise((resolve, reject) => {
    context.$request.get(apiGetMatrix)
      .then(res => resolve(res))
      .catch(err => reject(err))
  })
}
