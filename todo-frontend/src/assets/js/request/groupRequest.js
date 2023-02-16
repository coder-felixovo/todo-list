/* 分组 请求 */
import { apiGetGroup, apiUpdateGroupName, apiDeleteGroup } from '@/assets/js/api/groupAPI.js'

export function getGroupRequest ({ context }) {
  context.$request.get(apiGetGroup)
    .then((res) => {
      if (res.status === 1032) {
        const { groupData } = res.data
        context.$store.commit('setGroupList', groupData)
      }
    })
}

export function updateGroupNameRequest ({ context, requestParams }) {
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
