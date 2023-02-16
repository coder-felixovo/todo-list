import { apiGetMatrix, apiGetMatrixTodo } from '@/assets/js/public/api.js'

// 获取四象限
export function getMatrixRequest ({ context }) {
  // 在Main.vue发起请求
  const _this = context // Main.vue context
  _this.$request.get(apiGetMatrix)
    .then(res => {
      if (res.status === 601) {
        if (res.data) {
          _this.$store.commit('setMatrixList', res.data.matrixData)
        }
      }
    })
}

// 获取四象限的待办事项
export function getMatrixTodo ({ context }) {
  // 在Matrix.vue created发起请求
  const _this = context // Matrix.vue context
  if (!_this) {
    console.error('无法检测到Matrix.vue context')
    return
  }
  _this.$request.get(apiGetMatrixTodo)
    .then(res => {
      if (res.status === 602) {
        _this.matrixTodoList = res.data.matrixTodoData
      }
    })
}
