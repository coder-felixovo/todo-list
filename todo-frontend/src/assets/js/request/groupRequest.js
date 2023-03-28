import { apiGetGroup, apiUpdateGroupName, apiDeleteGroup } from '@/assets/js/api/groupAPI.js'

/**
 * 请求：获取分组
 * @param {Vue} context
 * @returns
 */
export async function reqGetGroup (context) {
  return new Promise((resolve, reject) => {
    context.$request.get(apiGetGroup)
      .then(res => resolve(res))
      .catch(err => reject(err))
  })
}

export async function updateGroupNameRequest ({ context, requestParams }) {
  context.$request.post(apiUpdateGroupName, requestParams)
    .then(res => {
      if (res.status === 1033) {
        const { groupId, newGroupName } = res.data
        context.$store.commit('updateGroupName', { groupId, newGroupName })
      }
    })
}

export function deleteGroupRequest ({ context, requestParams }) {
  context.$request.post(apiDeleteGroup, requestParams)
    .then(res => {
      if (res.status === 1034) {
        const { deletedGroupId, deletedGroupName } = res.data
        context.$store.commit('deleteGroup', { deletedGroupId })
      }
    })
}
