<template>
  <div class="add-tag-dialog">
    <div class="head">
      <span class="color-primary f-16 fw-700">添加新的标签</span>
    </div>
    <el-input
      placeholder="请输入标签名称"
      v-model="tagName"
      @focus="inputOnFocus"
      @blur="inputOnBlur"
    >
      <i
        slot="prefix"
        class="el-input__icon el-icon-collection-tag"
      ></i>
    </el-input>
    <div
      class="mt-10px fs-14px color-error opacity-80"
      v-show="showInputTips"
    >
      <span>{{inputTips}}</span>
    </div>
    <div class="mt-20px">
      <el-button
        type="primary"
        class="fr sure"
        @click="sure"
      >确定</el-button>
      <el-button
        type="primary"
        class="fr cancel"
        @click="cancel"
      >取消</el-button>
    </div>
  </div>
</template>

<script>
import { showMessage } from '@/assets/js/public/publicFunction.js'
import { apiAddTag } from '@/assets/js/public/api.js'
export default {
  name: 'add-group-dialog',
  data () {
    return {
      tagName: '',
      showInputTips: false,
      inputTips: '请输入标签名称'
    }
  },
  methods: {
    cancel () {
      this.$store.commit('toggleAddTagDialog')
    },

    inputOnFocus () {
      if (this.showInputTips) {
        this.showInputTips = false
      }
    },

    inputOnBlur () {
      if (!this.tagName) {
        this.inputTips = '请输入标签名称'
        this.showInputTips = true
        return
      }
      if (this.tagName.length > 12) {
        this.inputTips = '标签名称不应超过12个字符'
        this.showInputTips = true
      }
    },

    sure () {
      this.inputOnBlur()
      if (this.tagName && this.tagName.length <= 12) {
        const requestData = {
          tagName: this.tagName
        }
        this.$request.post(apiAddTag, requestData)
          .then((res) => {
            if (res.status === 901) {
              if (res.data) {
                this.$store.commit('toggleAddTagDialog')
                // 发送至Todo.vue
                this.$bus.$emit('bus-new-tag', res.data.newTag)
              }
            }
          })
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import "@/assets/css/comp/dialog/addTagDialog.less";
</style>
