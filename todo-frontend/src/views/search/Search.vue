<template>
  <div class="search-page clearfix">
    <div class="h-full el-col el-col-12 left">
      <h1 class="title">搜索结果</h1>
      <!-- 未搜索到结果 -->
      <div v-if="isEmptyGroup && isEmptyTag && isEmptyTodo">
        <span class="fs-28px opacity-70">没有搜索到结果</span>
      </div>
      <!-- 分组结果 -->
      <div
        class="group-result"
        v-if="!isEmptyGroup"
        @click="toGroupPage"
      >
        <div class="group-head">
          <span>分组</span>
        </div>
        <div
          v-for="item in searchGroup"
          :group-id="item.groupId"
          :key="item.groupId"
          class="group-item"
        >
          <span>{{item.groupName}}</span>
        </div>
      </div>
      <!-- 标签结果 -->
      <div
        class="tag-result"
        @click="toTagPage"
        v-if="!isEmptyTag"
      >
        <div class="tag-head"><span>标签</span></div>
        <div
          v-for="item in searchTag"
          :tag-id="item.tagId"
          :key="item.tagId"
          class="tag-item"
        >
          <span>{{item.tagName}}</span>
        </div>
      </div>
      <!-- 待办事项结果 -->
      <div
        class="todo-result"
        v-if="!isEmptyTodo"
        @click="todoClickEvent"
      >
        <div class="todo-head"><span>待办事项</span></div>
        <TodoItem
          v-for="item in searchTodo"
          :key="item.todoId"
          :todoProp="item"
        />
      </div>
    </div>
    <div class="h-full el-col el-col-12 right">
      <TextEditor />
    </div>
  </div>
</template>

<script>
import TodoItem from '@/component/TodoItem'
import TextEditor from '@/component/TextEditor'
import { showMessage } from '@/assets/js/public/publicFunction'
import { toggleTodoCheckedRequest } from '@/assets/js/request/todoRequest'
export default {
  name: 'search-view-comp',

  components: { TodoItem, TextEditor },

  data () {
    return {
    }
  },

  methods: {
    toTagPage () {
      const item = event.composedPath().find(element => element._prevClass === 'tag-item')
      if (!item) return
      const tagId = item.attributes['tag-id'].value
      console.log(tagId)
      if (!tagId) {
        showMessage(this, '参数错误', 'info', 800)
      } else {
        this.$router.push(`/a/${tagId}/tag/todo`)
      }
    },
    toGroupPage () {
      const item = event.composedPath().find(element => element._prevClass === 'group-item')
      if (!item) return
      const groupId = item.attributes['group-id'].value
      console.log(groupId)
      if (!groupId) {
        showMessage(this, '参数错误', 'info', 800)
      } else {
        this.$router.push(`/a/${groupId}/todo`)
      }
    },
    async todoClickEvent () {
      let isClickSquare = false // 是否点击了勾选框
      let todo = null // 点击的待办事项
      let flag = false // true退出some循环
      event.composedPath().some(element => {
        if (!flag) {
          if (element._prevClass) {
            if (!isClickSquare) {
              isClickSquare = element._prevClass.includes('bi-check-square') || element._prevClass.includes('bi-square')
            }
            if (element._prevClass.includes('todo-item')) {
              todo = element.__vue__.todo
              flag = true
            }
          }
          return false
        } else {
          return true
        }
      })
      if (todo) {
        if (isClickSquare) {
          // 切换事项完成状态
          const { todoId, todoChecked } = todo
          const reqParam = {
            todoId,
            originalChecked: todoChecked,
            targetChecked: todoChecked === 0 ? 1 : 0
          }
          console.log(reqParam)
          const result = await toggleTodoCheckedRequest({ context: this, requestParams: reqParam })
          const { nowChecked } = result
          todo.todoChecked = nowChecked
        } else {
          // 请求事项详情
          this.$store.commit('setOperatedTodo', todo)
        }
      }
    }
  },

  computed: {
    searchGroup () {
      return this.$store.state.searchGroup || []
    },
    searchTag () {
      return this.$store.state.searchTag || []
    },
    searchTodo () {
      return this.$store.state.searchTodo || []
    },
    isEmptyGroup () {
      return this.searchGroup.length === 0
    },
    isEmptyTag () {
      return this.searchTag.length === 0
    },
    isEmptyTodo () {
      return this.searchTodo.length === 0
    }
  },

  created () {
  },

  mounted () {
  }

}
</script>

<style lang="less" scoped>
@import "./index.less";
</style>
