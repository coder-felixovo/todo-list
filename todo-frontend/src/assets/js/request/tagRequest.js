import { apiGetTag } from '@/assets/js/api/tagAPI'

/**
 * 请求：获取标签
 * @param {Vue} context
 */
export async function reqGetTag (context) {
  return new Promise((resolve, reject) => {
    context.$request.get(apiGetTag)
      .then(res => resolve(res))
      .catch(err => reject(err))
  })
}
