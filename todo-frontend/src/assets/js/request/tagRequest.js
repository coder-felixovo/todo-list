/* tag request */
import { apiGetTag } from '@/assets/js/api/tagAPI'

// 获取标签
export function getTagRequest ({ context }) {
  context.$request.get(apiGetTag)
    .then((res) => {
      if (res.status === 902) {
        context.$store.commit('setTagList', res.data.tagList)
      }
    })
}
