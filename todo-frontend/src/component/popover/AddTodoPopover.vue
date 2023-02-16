<template>
  <el-popover
    trigger="manual"
    placement="top"
    width="300"
    v-model="visible"
  >
    <div class="flex flex-col w-full">
      <h1 class="mb-10px color-primary fs-22px fw-500">添加待办事项</h1>
      <!-- 标题输入框 -->
      <div class="mb-10px">
        <span class="ipt-desc">标题</span>
        <div class="input-box">
          <el-input
            ref="titleInputRef"
            v-model="ipt_title"
            prefix-icon="el-icon-edit"
          ></el-input>
        </div>
      </div>
      <!-- 日期时间选择 -->
      <div class="mb-10px">
        <span class="ipt-desc">日期</span>
        <div class="input-box">
          <el-date-picker
            v-model="ipt_deadline"
            type="datetime"
            placeholder="选择日期时间"
          >
          </el-date-picker>
        </div>
      </div>
      <!-- 分组选择 -->
      <div class="mb-10px">
        <span class="ipt-desc">分组</span>
        <div class="input-box">
          <el-select
            v-model="ipt_groupId"
            @visible-change="isShowTips = false"
            placeholder="请选择"
          >
            <el-option
              v-for="item in groupList"
              :key="item.groupId"
              :label="item.groupName"
              :value="item.groupId"
            >
            </el-option>
          </el-select>
        </div>
      </div>
      <!-- 标签选择 -->
      <div class="mb-10px">
        <span class="ipt-desc">标签</span>
        <div class="input-box">
          <el-select
            v-model="ipt_tagId"
            placeholder="请选择"
          >
            <el-option
              v-for="item in tagList"
              :key="item.tagId"
              :label="item.tagName"
              :value="item.tagId"
            >
            </el-option>
          </el-select>
        </div>
      </div>
      <!-- 四象限选择 -->
      <div class="mb-10px">
        <span class="ipt-desc">四象限</span>
        <div class="input-box">
          <el-select
            v-model="ipt_matrixId"
            placeholder="请选择"
          >
            <el-option
              v-for="item in matrixList"
              :key="item.matrixId"
              :label="item.matrixName"
              :value="item.matrixId"
            >
            </el-option>
          </el-select>
        </div>
      </div>
      <!-- 取消、确定 -->
      <div style="text-align: right; margin: 0">
        <el-button
          size="mini"
          type="text"
          @click="cancel"
        >取消</el-button>
        <el-button
          type="primary"
          size="mini"
          @click="sure"
        >确定</el-button>
      </div>
    </div>
  </el-popover>
</template>

<script>
import { apiEdit } from '@/assets/js/public/api'
import { Todo } from '@/assets/js/public/class'
import { createTodoRequest } from '@/assets/js/request/todoRequest.js'
import {
  handleCreateTodo, handleToggleTodoChecked
} from '@/assets/js/views/matrix'
export default {
  name: 'todo-popover-comp',

  data () {
    return {
      visible: true,
      isShowTips: false,
      ipt_title: '',
      ipt_deadline: null, // Date Object
      ipt_groupId: '',
      ipt_tagId: '',
      ipt_matrixId: '',
      operatedTodoId: ''
    }
  },

  methods: {
    setDataInCreated () {
      // 在created从vuex中拿到要编辑的todo数据，在<input>显示
      const { todoId, todoTitle, todoDeadline, groupId, tagId, matrixId } = this.$store.state.operatedTodo
      this.operatedTodoId = todoId
      this.ipt_title = todoTitle
      this.ipt_deadline = new Date(todoDeadline)
      this.ipt_groupId = groupId
      this.ipt_tagId = tagId
      this.ipt_matrixId = matrixId
    },
    cancel () {
      this.visible = false
      this.$store.commit('toggleAddTodoPopover')
    },
    async sure () {
      if (!this.ipt_title) {
        this.$refs.titleInputRef.focus()
        return
      }
      const requestParams = new Todo({
        todoTitle: this.ipt_title,
        todoDeadline: this.ipt_deadline,
        groupId: this.ipt_groupId,
        tagId: this.ipt_tagId,
        matrixId: this.ipt_matrixId
      })
      this.visible = false
      this.$store.commit('toggleAddTodoPopover')
      if (this.$store.state.addOrEditFlag === 'add') {
        const result = await createTodoRequest({ context: this, requestParams })
        handleCreateTodo({ context: this, todo: result })
      } else {
        this.updateTodo(requestParams)
      }
    },
    updateTodo (requestParams) {
      this.$request.post(apiEdit, requestParams)
        .then(res => {
          if (res.status === 1010) {
            console.log(res)
          }
        })
    }
  },

  created () {
    if (this.$store.state.addOrEditFlag === 'edit') {
      this.setDataInCreated()
    }
  },

  computed: {
    groupList () {
      return this.$store.state.groupList
    },
    tagList () {
      return this.$store.state.tagList
    },
    matrixList () {
      return this.$store.state.matrixList
    }
  },

  mounted () {}
}
</script>

<style lang="less" scoped>
@import "@/assets/css/popover/addTodoPopover.less";
</style>
