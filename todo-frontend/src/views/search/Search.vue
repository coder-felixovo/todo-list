<template>
  <div class="search-page clearfix">
    <div class="h-full el-col el-col-12 left">
      <h1 class="title">搜索结果</h1>
      <!-- 分组结果 -->
      <div
        class="group-result"
        v-if="!isEmptyGroup"
      >
        <div class="group-head">
          <span>分组</span>
        </div>
        <div
          v-for="item in searchGroup"
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
      >
        <div class="todo-head"><span>待办事项</span></div>
        <div
          v-for="item in searchTodo"
          :key="item.todoId"
          class="todo-item"
        >
          <span>{{item.todoTitle}}</span>
        </div>
      </div>
    </div>
    <div class="h-full el-col el-col-12 right"></div>
  </div>
</template>

<script>
import TodoItem from '@/component/TodoItem'
import { showMessage } from '@/assets/js/public/publicFunction'
export default {
  name: 'search-view-comp',

  // components: { TodoItem },

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
