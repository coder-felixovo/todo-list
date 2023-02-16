<template>
  <div class="text-editor flex flex-col h-full">
    <div class="flex items-center">
      <el-input
        ref="todoTitleInputRef"
        v-model="todoTitle"
        prefix-icon="el-icon-edit"
        @change="updateTodoTitle"
      ></el-input>
    </div>
    <quill-editor
      class="h-full"
      v-model="content"
      @blur="editorOnBlur"
      @change="editorOnChange"
    ></quill-editor>
  </div>
</template>
<script>
import { quillEditor } from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { apiSaveTodoDetail, apiGetTodoDetail, apiUpdateTodoTitle } from '@/assets/js/public/api.js'
import { showMessage, debounce } from '@/assets/js/public/publicFunction.js'
export default {
  name: 'text-editor-comp',
  components: { quillEditor },
  data () {
    return {
      content: '',
      isAllowSave: false,
      todoTitle: ''
    }
  },
  methods: {
    editorOnBlur () {
      this.saveTodoDetail()
    },

    editorOnChange () {
    },

    getTodoDetail () {
      const { todoId } = this.todo
      this.$request.get(apiGetTodoDetail, {
        todoId
      })
        .then(res => {
          if (res.status === 1007) {
            if (res.data) {
              this.content = res.data.todoContent
            }
          }
        })
    },

    saveTodoDetail () {
      if (!this.isAllowSave) {
        this.isAllowSave = true
        return
      }
      const { todoId } = this.todo
      this.$request.post(apiSaveTodoDetail, {
        todoId,
        todoContent: this.content
      })
        .then(res => {
          if (res.status !== 1006) {
            showMessage(this, '保存错误', 'error', 600)
          }
        })
    },

    updateTodoTitle () {
      const requestParams = {
        todoId: this.todo.todoId,
        todoChecked: this.todo.todoChecked,
        newTodoTitle: this.todoTitle
      }
      this.$request.post(apiUpdateTodoTitle, requestParams)
        .then(res => {
          if (res.status === 1008) {
            this.$refs.todoTitleInputRef.blur()
            // 发送至TodoList.vue
            this.$bus.$emit('bus-update-todo-title', requestParams)
          }
        })
    }
  },

  created () {
  },

  mounted () {
    this.editorOnChange = debounce(this.saveTodoDetail, 800)
  },

  computed: {
    todo () {
      return this.$store.state.operatedTodo
    }
  },

  watch: {
    todo () {
      this.isAllowSave = false
      this.todoTitle = this.todo.todoTitle
      this.getTodoDetail()
    },
    todoTitle () {

    }
  }
}
</script>

<style lang="less" scoped>
.ql-container {
  height: 100%;
}
</style>
