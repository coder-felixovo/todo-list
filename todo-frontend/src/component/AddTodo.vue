<template>
  <el-input
    ref="addTodoInputRef"
    :placeholder="placeholder"
    prefix-icon="el-icon-edit"
    v-model="todoTitle"
    @keydown.enter.native="addTodo"
  >
    <div
      slot="suffix"
      class="flex h-full"
    >
      <div
        class="icon-box flex items-center h-full"
        style="width: 170px;"
      >
        <i
          class="el-input__icon el-icon-date"
          :class="{'color-main': activeDateColor}"
          @click.stop="openDatetimePicker"
        ></i>
        <span
          :class="{'color-main': activeDateColor}"
          style="width:150px;"
          @click.stop="openDatetimePicker"
        >{{todoDeadline}}</span>
      </div>
      <div class="icon-box flex justify-center items-center h-full">
        <i
          class="el-input__icon el-icon-s-home"
          :class="{'color-main': activeGroupColor}"
          @click.stop="openGroupPicker"
        ></i>
        <span
          :class="{'color-main': activeGroupColor}"
          @click.stop="openGroupPicker"
        >
          {{todoGroupName}}
        </span>
      </div>
    </div>
  </el-input>
</template>

<script>
import { showMessage } from '@/assets/js/public/publicFunction'
import { Todo } from '@/assets/js/public/class'
import { createTodoRequest } from '@/assets/js/request/todoRequest'

export default {
  name: 'add-todo-comp',

  data () {
    return {
      placeholder: '请输入标题，然后按Enter键确认添加',
      todoTitle: '',
      todoDeadline: '',
      todoGroupId: '',
      todoGroupName: ''
    }
  },

  methods: {
    async addTodo () {
      if (!this.todoTitle) {
        showMessage(this, '标题不能为空', 'info', 800)
        return
      }
      const requestParams = new Todo({
        todoTitle: this.todoTitle,
        todoDeadline: this.todoDeadline,
        groupId: this.todoGroupId,
        groupName: this.groupName
      })
      const newTodo = await createTodoRequest({ context: this, requestParams })
      // 清理
      this.todoTitle = ''
      this.todoDeadline = ''
      this.todoGroupId = ''
      this.todoGroupName = ''
      this.$refs.addTodoInputRef.blur()
      // 更新视图，发送至TodoList.vue
      this.$bus.$emit('bus-new-todo', newTodo)
    },

    openDatetimePicker () {
      if (!this.$store.state.isShowDatetimePicker) {
        this.$store.commit('toggleDatetimePicker')
        window.addEventListener('click', this.closeDatetimePicker)
      }
    },

    closeDatetimePicker () {
      if (this.$store.state.isShowDatetimePicker) {
        this.$store.commit('toggleDatetimePicker')
        window.removeEventListener('click', this.closeDatetimePicker)
      }
    },

    openGroupPicker () {
      if (!this.$store.state.isShowGroupPicker) {
        window.addEventListener('click', this.closeGroupPicker)
      }
      this.$store.commit('toggleGroupPicker')
    },

    closeGroupPicker () {
      if (this.$store.state.isShowGroupPicker) {
        this.$store.commit('toggleGroupPicker')
      }
      window.removeEventListener('click', this.closeGroupPicker)
    },

    setTodoDeadline (busData) {
      this.todoDeadline = busData
    },

    setSelectedGroup (busData) {
      const { groupId, groupName } = busData
      this.todoGroupId = groupId
      this.todoGroupName = groupName
      // this.$store.commit('setAddTodoInGroup', busData)
    }
  },

  created () {
  },

  mounted () {
    // 来自DateTimePicker.vue
    this.$bus.$off('bus-datetime').$on('bus-datetime', this.setTodoDeadline)
    // 来自GroupPicker.vue
    this.$bus.$off('bus-select-group').$on('bus-select-group', this.setSelectedGroup)
  },

  computed: {
    activeGroupColor () {
      return !!this.todoGroupName
    },
    activeDateColor () {
      return !!this.todoDeadline
    }
  },

  watch: {
  }
}
</script>

<style lang="less" scoped>
@import "@/assets/css/comp/addTodo.less";
</style>

/*
      <div class="icon-box flex justify-center items-center h-full">
        <i
          class="el-input__icon el-icon-alarm-clock"
          :class="{'color-main': activeTimeColor}"
          @click.stop="openTimePicker"
        ></i>
        <span
          class="time-text"
          :class="{'color-main': activeTimeColor}"
          @click.stop="openTimePicker"
        >{{todoTime}}</span>
      </div>
 */
