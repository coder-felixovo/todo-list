import http from './http.js'

export default {
  post (url, data) {
    return new Promise((resolve, reject) => {
      http({
        method: 'post',
        url: url,
        data: data
      }).then(res => {
        resolve(res.data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  get (url, data) {
    return new Promise((resolve, reject) => {
      http({
        method: 'get',
        url: url,
        params: data
      }).then(res => {
        if (res) {
          resolve(res.data)
        } else {
          resolve('No response')
        }
      }).catch(error => {
        reject(error)
      })
    })
  }
}
