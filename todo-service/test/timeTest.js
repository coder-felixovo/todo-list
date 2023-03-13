const { encrypt, decrypt } = require('../util/encrypt')
const res = encrypt('dsadsadsadsadsasadsadsadsadsa')
console.log(res)
console.log(decrypt(res))
