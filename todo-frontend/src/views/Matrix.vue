<template>
  <div class="flex flex-col h-full matrix-bg-color">
    <div class="flex items-center justify-between pl-16px">
      <h1 class="pt-20px pb-20px color-grey fs-24px fw-500">四象限</h1>
      <el-button
        type="text"
        @click.native="openAddTodoPopover"
      >添加待办事项</el-button>
    </div>
    <div class="overflow-hidden relative flex flex-col flex-auto h-full">
      <div
        class="container"
        @click="checkTodo"
      >
        <div
          class="matrix flex flex-col h-full rounded-8px bg-white"
          v-for="e in matrixList"
          :key="e.matrixId"
        >
          <div class="head flex flex-none justify-between items-center">
            <div class="overflow-hidden flex flex-auto items-center">
              <h3
                class="ml-10px fs-13px fw-500"
                :class="{'color-error': e.priority === 1, 'color-warn': e.priority === 2, 'color-main': e.priority === 3, 'color-success': e.priority === 4}"
              >{{e.matrixName}}</h3>
            </div>
          </div>
          <div>
            <div
              v-for="item in matrixTodoList"
              :key="item.todoId"
            >
              <template v-if="item.matrixId === e.matrixId">
                <TodoItem :todoProp="item" />
              </template>
            </div>
          </div>
        </div>
        <!-- <div class="matrix1 flex flex-col h-full rounded-8px bg-white">
          <div class="head flex flex-none justify-between items-center">
            <div class="overflow-hidden flex flex-auto items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-1-circle color-error"
                viewBox="0 0 16 16"
              >
                <path d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8Zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0ZM9.283 4.002V12H7.971V5.338h-.065L6.072 6.656V5.385l1.899-1.383h1.312Z" />
              </svg>
              <h3 class="ml-10px color-error fs-13px fw-500">{{matrixList[0].matrixName}}</h3>
            </div>
          </div>
        </div>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import { apiGetMatrixTodo } from '@/assets/js/public/api.js'
import { toggleTodoCheckedRequest } from '@/assets/js/request/todoRequest.js'
import TodoItem from '@/component/TodoItem'
const defaultMatrixData = [
  { matrixName: '重要且紧急' },
  { matrixName: '重要不紧急' },
  { matrixName: '不重要但紧急' },
  { matrixName: '不重要不紧急' }
]

export default {
  name: 'matrix-view-comp',

  components: { TodoItem },

  data () {
    return {
      matrixList: null,
      matrixTodoList: []
    }
  },

  methods: {
    openAddTodoPopover () {
      this.$store.commit('setTodoPopoverMode', 'add')
      this.$store.commit('toggleAddTodoPopover')
      this.$store.commit('setTempVueContext', this)
    },
    async checkTodo () {
      const clickDOM = event.composedPath().find(element => element.__vue__)
      if (!clickDOM) {
        console.error('无法检测到TodoItem.vue实例')
        return
      }
      const todo = clickDOM.__vue__.todo
      const { todoId, todoChecked } = todo
      const targetChecked = todoChecked === 0 ? 1 : 0
      const requestParams = {
        todoId,
        originalChecked: todoChecked,
        targetChecked
      }
      {
        const { todoId, originalChecked, nowChecked } = await toggleTodoCheckedRequest({ context: this, requestParams })
        const index = this.matrixTodoList.findIndex(element => todoId === element.todoId)
        index === -1 ? console.error('完成待办事项出错') : this.matrixTodoList.splice(index, 1)
      }
    },
    async getMatrixTodo () {
      this.$request.get(apiGetMatrixTodo)
        .then(res => {
          if (res.status === 602) {
            const { matrixTodoData } = res.data
            this.matrixTodoList = matrixTodoData || []
          }
        })
    }
  },

  created () {
    const matrixList = this.$store.state.matrixList
    this.matrixList = matrixList || defaultMatrixData
    this.getMatrixTodo()
  },

  computed: {
    matrixData () {
      return this.$store.state.matrixList
    }
  },

  watch: {
    matrixData () {
      this.matrixList = this.matrixData
    }
  }
}
</script>

<style lang="less" scoped>
@import "@/assets/css/views/matrix.less";
</style>
