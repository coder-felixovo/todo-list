const crypto = require('crypto-js')
const AES = crypto.AES
const enc = crypto.enc
const mode = crypto.mode
const pad = crypto.pad

const aesKey = 'cBssbHB3ZA==HKXT'

// 加密
const encrypt = function (password) {
  const encryption = AES.encrypt(password, enc.Utf8.parse(aesKey), {
    mode: mode.ECB,
    padding: pad.Pkcs7,
  })
  return encryption.toString()
}
// 解密
const decrypt = function (encryption) {
  const decryption = AES.decrypt(encryption, enc.Utf8.parse(aesKey), {
    mode: mode.ECB,
    padding: pad.Pkcs7,
  })
  return decryption.toString(enc.Utf8)
}
module.exports.encrypt = encrypt
module.exports.decrypt = decrypt
