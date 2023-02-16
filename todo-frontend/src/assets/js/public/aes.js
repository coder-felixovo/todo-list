import { AES, enc, mode, pad } from 'crypto-js'

// 加密密钥必须为16的整数倍
const secretKey = 'cBssbHB3ZA==HKXT'

// 加密
export function encrypt (pwd) {
  const encryption = AES.encrypt(pwd, enc.Utf8.parse(secretKey), {
    mode: mode.ECB,
    padding: pad.Pkcs7
  })
  return encryption.toString()
}

// 解密
export function decrypt (encryption) {
  const decryption = AES.decrypt(encryption, enc.Utf8.parse(secretKey), {
    mode: mode.ECB,
    padding: pad.Pkcs7
  })
  return decryption.toString(enc.Utf8)
}
