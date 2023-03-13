<template>
  <div class="search-page clearfix">
    <div class="h-full el-col el-col-12">
      <el-input
        v-model="searchContent"
        placeholder="请输入搜索内容"
        @change="searchOnChange"
      ></el-input>
      <div class="search-result-container">
        <TodoItem
          v-for="item in searchResultList"
          :key="item.todoId"
          :todoProp="item"
        />
      </div>
    </div>
    <div class="h-full el-col el-col-12">2</div>
  </div>
</template>

<script>
import { debounce } from '@/assets/js/public/publicFunction'
import TodoItem from '@/component/TodoItem'
export default {
  name: 'search-view-comp',

  components: { TodoItem },

  data () {
    return {
      searchContent: '',
      searchResultList: []
    }
  },

  methods: {
    searchOnChange () {},
    async searchRequest () {
      this.$request.get('/api/search', {
        str: this.searchContent
      })
        .then(res => {
          if (res.status === 100) {
            this.searchResultList = res.data.searchData
          }
        })
    }
  },

  mounted () {
    this.searchOnChange = debounce(this.searchRequest, 600)
  }
}
</script>

<style lang="less" scoped>
@import "./search.less";
</style>
