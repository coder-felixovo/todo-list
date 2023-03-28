<template>
  <div class="tag-menu pt-10px pb-10px pl-10px pr-10px">
    <el-popover
      placement="right"
      trigger="manual"
      width="200"
      v-model="visibleUpdate"
      title="修改标签名称"
    >
      <el-input
        ref="tagNameInputRef"
        v-model="tagNameInput"
        placeholder="请输入修改的标签名称"
      ></el-input>
      <div style="text-align: right; margin: 0">
        <el-button
          type="text"
          @click="cancelUpdate"
        >取消</el-button>
        <el-button
          type="primary"
          size="mini"
          @click="sureUpdate"
        >确定</el-button>
      </div>
      <div
        class="menu-item flex items-center"
        @click.stop="visibleUpdate = true"
        slot="reference"
      >
        <i class="el-icon-edit"></i>
        <span class="ml-10px color-grey">修改标签名称</span>
      </div>
    </el-popover>
    <el-popover
      placement="right"
      trigger="manual"
      width="200"
      v-model="visibleDelete"
      title="你确定删除该标签吗？"
    >
      <p class="color-info fs-12px">提示：这不会删除该标签下的待办事项</p>
      <div style="text-align: right; margin: 0">
        <el-button
          type="text"
          @click="cancelDelete"
        >取消</el-button>
        <el-button
          type="primary"
          size="mini"
          @click="sureDelete"
        >确定</el-button>
      </div>
      <div
        class="menu-item flex items-center"
        @click.stop="visibleDelete = true"
        slot="reference"
      >
        <i class="el-icon-delete"></i>
        <span class="ml-10px color-grey">删除标签</span>
      </div>
    </el-popover>
  </div>
</template>

<script>
import { apiDeleteTag, apiUpdateTagName } from '@/assets/js/public/api.js'
export default {
  name: 'tag-menu-comp',

  data () {
    return {
      visibleUpdate: false,
      visibleDelete: false,
      tagNameInput: ''
    }
  },

  methods: {
    updateOnClick () {
      if (!this.visibleDelete) {
        this.visibleUpdate = !this.visibleUpdate
      }
    },

    cancelUpdate () {
      this.visibleUpdate = false
      this.$store.commit('toggleTagMenu')
    },

    sureUpdate () {
      if (!this.tagNameInput) {
        this.$refs.tagNameInputRef.focus()
        return
      }
      this.visibleUpdate = false
      this.$store.commit('toggleTagMenu')
      this.$request.post(apiUpdateTagName, {
        tagId: sessionStorage.getItem('tempTagId'),
        tagName: this.tagNameInput
      })
        .then(res => {
          if (res.status === 904) {
            if (res.data) {
              sessionStorage.removeItem('tempTagId')
              // 发送至Todo.vue
              this.$bus.$emit('bus-new-tagname', res.data)
            }
          }
        })
    },

    deleteOnClick () {
      if (!this.visibleUpdate) {
        this.visibleDelete = !this.visibleDelete
      }
    },

    cancelDelete () {
      this.visibleDelete = false
      this.$store.commit('toggleTagMenu')
    },

    sureDelete () {
      const tagId = sessionStorage.getItem('tempTagId')
      this.visibleDelete = false
      this.$store.commit('toggleTagMenu')
      this.$request.post(apiDeleteTag, {
        tagId
      })
        .then(res => {
          console.log(res)
          if (res.status === 903) {
            sessionStorage.removeItem('tempTagId')
            // 发送至Todo.vue
            this.$bus.$emit('bus-remove-tag', res.data.tagId)
          }
        })
    }
  }
}
</script>

<style lang="less" scoped>
@import "@/assets/css/comp/menu/tagMenu.less";
</style>
