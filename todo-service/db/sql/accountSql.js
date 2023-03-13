// 查询用户名
module.exports.sqlQueryUsername = `
  SELECT username FROM account WHERE username = ?
`

// 查询用户
module.exports.sqlQueryUser = `
SELECT 
  userid, 
  token,
  status,
  create_time as createTime,
  nickname,
  contact,
  email,
  avatar
FROM account 
WHERE username = ? AND password = ?
`

// 注册
module.exports.sqlRegister = `
  INSERT INTO account 
  (userid, username, password, password2, status, create_time) 
  VALUES (?,?,?,?, ?, ?)
`

// 更新token
module.exports.sqlUpdateToken = `
UPDATE account 
SET token = ? 
WHERE userid = ?
`
