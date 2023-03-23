<template>
  <div class="search-dialog">
    <div class="clearfix">
      <i
        class="el-icon-close fr"
        @click="closeSearchDialog"
      ></i>
    </div>
    <div
      class="flex items-center"
      style="padding-bottom: 6px;"
      :class="[isFocus ? 'border-bottom-focus' : 'border-bottom']"
    >
      <i
        class="el-icon-search fs-18px"
        :class="[isFocus ? 'color-main' : 'color-grey']"
      ></i>
      <el-input
        v-model="str"
        :clearable="true"
        @focus="isFocus = true"
        @input="inputChange"
        @keydown.native.enter="toSearchResultPage"
      ></el-input>
    </div>
    <!-- 查询结果 -->
    <div class="result mt-10px">
      <!-- 未搜索显示 -->
      <div
        v-if="emptyTodo && emptyGroup && emptyTag"
        class="no-search"
      >
        <div>
          <i class="el-icon-search mr-10px"></i>
          <span>搜索待办事项、分组、标签</span>
        </div>
      </div>
      <!-- 分组 -->
      <div v-if="!emptyGroup">
        <div class="title-box">
          <span>分组</span>
        </div>
        <div
          v-for="item in groupList"
          :key="item.groupId"
        >
          {{item.groupName}}
        </div>
      </div>
      <!-- 标签 -->
      <div v-if="!emptyTag">
        <div class="title-box">
          <span>标签</span>
        </div>
        <div
          v-for="item in tagList"
          :key="item.tagId"
        >
          {{item.tagName}}
        </div>
      </div>
      <!-- 待办事项 -->
      <div v-if="!emptyTodo">
        <div class="title-box">
          <span>待办事项</span>
        </div>
        <div
          v-for="item in todoList"
          :key="item.todoId"
        >
          {{item.todoTitle}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { debounce } from '@/assets/js/public/publicFunction'
export default {
  name: 'search-dialog',
  data () {
    return {
      isTrue: true,
      isFalse: false,
      isFocus: false,
      str: '',
      groupList: [],
      tagList: [],
      todoList: []
    }
  },
  methods: {
    closeSearchDialog () {
      this.$store.commit('toggleSearchDialog')
    },
    inputChange () {
    },
    async reqSearch () {
      this.$request.get('/api/search', {
        str: this.str
      })
        .then(res => {
          if (res.status === 100) {
            const { groupList, tagList, todoList } = res.data
            this.groupList = groupList
            this.tagList = tagList
            this.todoList = todoList
          }
        })
    },
    toSearchResultPage () {
      const data = {
        searchGroupResult: this.groupList,
        searchTagResult: this.tagList,
        searchTodoResult: this.todoList
      }
      this.$store.commit('setSearchResult', data)
      this.$store.commit('toggleSearchDialog')
      if (this.$route.path === '/d/search') return
      this.$router.push('/d/search')
    }
  },
  computed: {
    emptyTodo () {
      return this.todoList.length === 0
    },
    emptyGroup () {
      return this.groupList.length === 0
    },
    emptyTag () {
      return this.tagList.length === 0
    }
  },
  created () {
    this.inputChange = debounce(this.reqSearch, 600)
  }
}
</script>

<style lang="less" scoped>
@import url("./index.less");
</style>
