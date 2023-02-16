
// 修改昵称
module.exports.updateNicknameSql = 'UPDATE user_info SET nickname = ? WHERE user_id = ?'
// 修改手机号码
module.exports.updateContactSql = 'UPDATE user_info SET contact = ? WHERE user_id = ?'
// 修改邮箱
module.exports.updateEmailSql = 'UPDATE user_info SET email = ? WHERE user_id = ?'