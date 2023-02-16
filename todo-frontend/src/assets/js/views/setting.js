import { showMsg } from '@/assets/js/public/publicFunction.js'
import { apiGetUserInfo, apiUpdateNickname, apiUpdateContact, apiUpdateEmail } from '@/assets/js/public/api.js'

/**
 * @description 获取用户信息
 * @param {*} context Account.vue实例
 */
export function getUserInfoHandler (context) {
  const _this = context
  _this.$request.get(apiGetUserInfo).then(res => {
    console.log(res)
  })
}

/* 修改昵称 */
// export function updateNicknameHandler (context) {
//   const _this = context
//   if (!_this.nickname.isEdit) {
//     _this.nickname.isEdit = true
//   } else {
//     const data = {
//       nickname: _this.nickname.value
//     }
//     _this.$request.post(apiUpdateNickname, data).then((res) => {
//       if (res.status === updateNicknameSuccess) {
//         showMsg(_this, 'success', res.msg)
//         _this.nickname.isEdit = false
//       }
//     }).catch((err) => {
//       console.log(err)
//     })
//   }
// }
/* 取消修改昵称 */
// export function cancelUpdateNicknameHandler (context) {
//   const _this = context
//   try {
//     if (_this.nickname.isEdit) {
//       showMsg(_this, 'info', '取消修改昵称')
//       _this.nickname.isEdit = false
//     }
//   } catch (error) {
//     console.error('cancelUpdateNicknameHandler函数内部出现了错误，原因：' + error.message)
//   }
// }
/* 修改手机号码 */
// export function updateContactHandler (context) {
//   const _this = context
//   if (!_this.contact.isEdit) {
//     _this.contact.isEdit = true
//   } else {
//     const data = {
//       contact: _this.contact.value
//     }
//     _this.$request.post(apiUpdateContact, data).then((value) => {
//       if (value.status === updateContactSuccess) {
//         showMsg(_this, 'success', value.msg)
//         _this.contact.isEdit = false
//       }
//     }).catch((err) => {
//       console.log(err)
//     })
//   }
// }
/* 取消修改手机号码 */
// export function cancelUpdateContactHandler (context) {
//   const _this = context
//   try {
//     if (_this.contact.isEdit) {
//       showMsg(_this, 'info', '取消修改手机号码')
//       _this.contact.isEdit = false
//     }
//   } catch (error) {
//     console.error('cancelUpdateContactHandler函数内出现错误，原因: ' + error.message)
//   }
// }
/* 修改邮箱 */
// export function updateEmailHandler (context) {
//   const _this = context
//   try {
//     if (!_this.email.isEdit) {
//       _this.email.isEdit = true
//     } else {
//       const data = {
//         email: _this.email.value
//       }
//       _this.$request.post(apiUpdateEmail, data).then((value) => {
//         if (value.status === updateEmailSuccess) {
//           showMsg(_this, 'success', value.msg)
//           _this.email.isEdit = false
//         }
//       })
//     }
//   } catch (error) {
//     console.error('updateEmailHandler内出现错误，原因：' + error.message)
//   }
// }
/* 取消修改邮箱 */
// export function cancelUpdateEmailHandler (context) {
//   const _this = context
//   try {
//     if (_this.email.isEdit) {
//       showMsg(_this, 'info', '取消修改邮箱')
//       _this.email.isEdit = false
//     }
//   } catch (error) {
//     console.error('cancelUpdateEmailHandler函数内出现错误，原因：' + error.message)
//   }
// }
