<template>
  <div class="pl-10px pr-10px h-full">
    <template v-if="isShowAddTodoInput">
      <AddTodo />
    </template>
    <template v-else-if="$route.path.includes('trash')">
      <div
        class="trash-head flex items-center justify-between"
        style="height:40px"
      >
        <h1 class="fs-24px fw-500">回收站</h1>
        <div class="delete-all">
          <i
            class="mr-20px fs-24px el-icon-delete"
            @click="openDeleteAllPopover"
          ></i>
          <el-popover
            trigger="manual"
            placement="bottom"
            width="180"
            v-model="visibleDeleteAllPopover"
          >
            <i
              class="el-icon-info color-error"
              style="margin-right: 5px;"
            ></i>
            <span class="fs-14px opacity-80">你是否要删除全部待办事项？</span>
            <span class="fs-14px opacity-80">这将不可恢复！</span>
            <div style="text-align: right; margin: 0">
              <el-button
                size="mini"
                type="text"
                @click="visibleDeleteAllPopover = false"
              >取消</el-button>
              <el-button
                type="primary"
                size="mini"
                @click="deleteAllTodoRequest"
              >确定</el-button>
            </div>
          </el-popover>
        </div>

      </div>
    </template>
    <template v-else-if="$route.path.includes('tag')">
      <h1 class="color-grey fs-24px fw-500"></h1>
    </template>
    <div
      class="todo-container relative h-full"
      @click="todoListClickEvent"
      @contextmenu.prevent="todoListRightClick"
    >
      <div
        class="no-data h-full"
        v-if="uncheckedTodoList.length === 0 && checkedTodoList.length === 0"
      >
        <div class="flex flex-1 justify-center items-center h-full">
          <span
            class="color-grey fs-14px"
            style="opacity: .4;"
          >没有任务</span>
        </div>
      </div>
      <div class="h-full flex flex-col">
        <!-- 如果当前路由为 /a/completed/todo 则隐藏 -->
        <!-- 未完成任务区域开始 -->
        <div
          class="unchecked-container flex flex-col overflow-hidden pt-10px pb-10px"
          style="height:50%"
          v-if="!$route.path.includes('completed')"
        >
          <div class="head flex items-center">
            <div @click.stop="toggleShowUncheckedTodo">
              <i
                class="el-icon-arrow-right"
                v-show="!isShowUnchecked"
              ></i>
              <i
                class="el-icon-arrow-down"
                v-show="isShowUnchecked"
              ></i>
            </div>
            <div>
              <span class="pl-5px color-primary fs-14px">未完成</span>
            </div>
          </div>
          <div
            class="inner-scroll"
            ref="uncheckedScrollRef"
            :class="{'overflow-auto': isShowUncheckedScroll}"
            @mouseenter="uncheckedMouseEnter"
            @mouseleave="uncheckedMouseLeave"
            @scroll="uncheckedOnScroll"
          >
            <ul
              class="unchecked-todo-list"
              v-show="isShowUnchecked"
            >
              <template v-if="uncheckedTodoList.length === 0">
                <div class="flex flex-col justify-center items-center h-full color-grey fs-14px opacity-50">
                  <span>暂无未完成的任务</span>
                  <span>快去添加一个吧!</span>
                </div>
              </template>
              <template v-else>
                <li
                  class="pl-10px"
                  v-for="e in uncheckedTodoList"
                  :key="e.todoId"
                >
                  <TodoItem :todoProp="e" />
                </li>
              </template>
            </ul>
            <div
              class="flex flex-1 justify-center items-center h-full"
              v-show="!isShowUnchecked"
            >
              <span class="color-primary fs-14px opacity-40">已折叠未完成任务</span>
            </div>
          </div>
        </div><!-- 未完成任务区域结束 -->
        <!-- 已完成任务区域开始 -->
        <div
          class="checked-container flex flex-col"
          style="height:50%"
        >
          <!-- 如果当前路由为 /a/completed/todo 显示 -->
          <template v-if="$route.path === '/a/completed/todo'">
            <h1 class="mt-10px mb-10px color-grey fs-24px fw-400">已完成</h1>
          </template>
          <template v-else>
            <div class="head flex items-center">
              <div @click.stop="toggleShowCheckedTodo">
                <i
                  class="el-icon-arrow-right"
                  v-show="!isShowChecked"
                ></i>
                <i
                  class="el-icon-arrow-down"
                  v-show="isShowChecked"
                ></i>
              </div>
              <div>
                <span class="pl-5px color-primary fs-14px">已完成</span>
              </div>
            </div>
          </template>
          <div
            class="inner-scroll"
            :class="{'overflow-auto': isShowCheckedScroll}"
            @mouseenter="isShowCheckedScroll = true"
            @mouseleave="isShowCheckedScroll = false"
          >
            <ul
              class="unchecked-todo-list h-full"
              v-show="isShowChecked"
            >
              <li
                class="pl-10px"
                v-for="e in checkedTodoList"
                :key="e.todoId"
              >
                <TodoItem :todoProp="e" />
              </li>
            </ul>
            <div
              class="flex flex-1 justify-center items-center h-full"
              v-show="!isShowChecked"
            >
              <span class="color-primary fs-14px opacity-40">已折叠完成任务</span>
            </div>
          </div>
        </div>
        <!-- 已完成任务区域结束 -->
      </div>
    </div>
  </div>
</template>

<script>
import { toggleTodoCheckedRequest } from '@/assets/js/request/todoRequest'
import {
  dispatchGetTodo
} from '@/assets/js/views/todoList.js'
import AddTodo from '@/component/AddTodo.vue'
import TodoItem from '@/component/TodoItem.vue'
import { showMessage } from '@/assets/js/public/publicFunction'
import { apiDeleteAllTodo } from '@/assets/js/api/todoAPI'

export default {
  name: 'todo-list-view-comp',

  components: { AddTodo, TodoItem },

  data () {
    return {
      uncheckedTodoList: [],
      checkedTodoList: [],
      isShowUnchecked: true,
      isShowUncheckedScroll: false,
      uncheckedScrollTop: 0,
      isShowChecked: true,
      isShowCheckedScroll: false,
      checkedScrollTop: 0,
      visibleDeleteAllPopover: false,
      tagTitle: ''
    }
  },

  methods: {
    getTodo () {
      dispatchGetTodo(this)
    },

    // 处理点击事件
    async todoListClickEvent () {
      // 1. 点击了勾选框改变了待办事项状态
      // 2. 查看待办事项详情
      const clickTagName = event.target.tagName
      const isClickSquare = clickTagName === 'svg'
      const operatedTodo = event.composedPath().find(element => element.__vue__).__vue__.todo
      if (operatedTodo) {
        this.$store.commit('setOperatedTodo', operatedTodo)
        if (isClickSquare) {
          // 如果当前路由是在回收站，就不执行
          if (this.$route.path.includes('trash')) {
            showMessage(this, '不能更换回收站中的待办事项的状态', 'info', 700)
            return
          }
          const { todoId, todoChecked } = operatedTodo
          const requestParams = {
            todoId,
            originalChecked: todoChecked,
            targetChecked: todoChecked === 0 ? 1 : 0
          }
          const result = await toggleTodoCheckedRequest({ context: this, requestParams })
          {
            const { todoId, originalChecked, nowChecked } = result
            if (originalChecked === 0) {
              const index = this.uncheckedTodoList.findIndex(element => todoId === element.todoId)
              const updatedTodo = this.uncheckedTodoList[index]
              this.uncheckedTodoList.splice(index, 1)
              updatedTodo.todoChecked = nowChecked
              this.checkedTodoList.unshift(updatedTodo)
            } else {
              const index = this.checkedTodoList.findIndex(element => todoId === element.todoId)
              const updatedTodo = this.checkedTodoList[index]
              this.checkedTodoList.splice(index, 1)
              updatedTodo.todoChecked = nowChecked
              this.uncheckedTodoList.unshift(updatedTodo)
            }
          }
          return
        }
        // 发送至Todo.vue
        this.$bus.$emit('bus-open-texteditor')
      }
    },

    // 处理右键点击事件
    todoListRightClick () {
      if (this.$store.state.isShowAddTodoPopover) {
        return
      }
      const operatedTodoDOM = event.composedPath().find(element => element.__vue__)
      if (operatedTodoDOM) {
        const operatedTodoVue = operatedTodoDOM.__vue__ // 右键点击TodoItem.vue实例
        this.$store.commit('setOperatedTodo', operatedTodoVue.todo)
        this.openTodoItemMenu()
      }
    },

    // 打开待办事项菜单
    openTodoItemMenu() {
      const clientX = event.clientX
      const clientY = event.clientY
      if (this.$store.state.isShowTodoItemMenu) {
        this.$store.commit('toggleTodoItemMenu')
      }
      this.$store.commit('toggleTodoItemMenu')
      this.$nextTick(() => {
        const todoItemMenuCom = document.getElementsByClassName('todo-item-menu')[0].__vue__
        if (todoItemMenuCom) {
          todoItemMenuCom.$el.style.left = clientX + 'px'
          todoItemMenuCom.$el.style.top = clientY + 'px'
          window.addEventListener('click', this.closeTodoItemMenu)
        }
      })
    },

    // 关闭待办事项菜单
    closeTodoItemMenu () {
      if (this.$store.state.isShowTodoItemMenu) {
        this.$store.commit('toggleTodoItemMenu')
      }
      window.removeEventListener('click', this.closeTodoItemMenu)
    },

    toggleShowUncheckedTodo () {
      this.isShowUnchecked = !this.isShowUnchecked
    },

    toggleShowCheckedTodo () {
      this.isShowChecked = !this.isShowChecked
    },

    // 将新创建的待办事项放进数组
    unshiftNewTodo (busData) {
      const { todoChecked, groupName, groupId } = busData
      const isAll = this.$route.path === '/a/all/todo'
      const isCollect = groupName === '收集箱' && this.$route.params.id === 'collect'
      const isSameGroup = groupId === this.$route.params.id
      const isUnshift = isAll || isCollect || isSameGroup
      if (isUnshift) {
        if (todoChecked === 0) {
          this.uncheckedTodoList.unshift(busData)
        } else {
          this.checkedTodoList.unshift(busData)
        }
      }
    },

    moveTodoBin (busData) {
      const { todoId, todoChecked } = busData
      const arr = todoChecked === 0 ? this.uncheckedTodoList : this.checkedTodoList
      const index = arr.findIndex(element => todoId === element.todoId)
      arr.splice(index, 1)
    },

    deleteTodo (busData) {
      const { todoId, todoChecked } = busData
      const arr = todoChecked === 0 ? this.uncheckedTodoList : this.checkedTodoList
      const index = arr.findIndex(element => todoId === element.todoId)
      arr.splice(index, 1)
    },

    regainTodo (busData) {
      const { todoId, todoChecked } = busData
      const arr = todoChecked === 0 ? this.uncheckedTodoList : this.checkedTodoList
      const index = arr.findIndex(element => todoId === element.todoId)
      arr.splice(index, 1)
    },

    updateTodoTitle (busData) {
      const { todoId, newTodoTitle, todoChecked } = busData
      const arr = todoChecked === 0 ? this.uncheckedTodoList : this.checkedTodoList
      const index = arr.findIndex(element => todoId === element.todoId)
      arr[index].todoTitle = newTodoTitle
    },

    openDeleteAllPopover () {
      this.visibleDeleteAllPopover = true
    },

    // 删除回收站中的全部待办事项
    deleteAllTodoRequest () {
      this.visibleDeleteAllPopover = false
      if (this.uncheckedTodoList.length === 0 && this.checkedTodoList.length === 0) {
        showMessage(this, '没有可删除的待办事项', 'info', 600)
      } else {
        this.$request.post(apiDeleteAllTodo)
          .then(res => {
            if (res.status === 1009) {
              this.uncheckedTodoList = []
              this.checkedTodoList = []
              showMessage(this, '全部删除成功', 'success', 700)
            }
          })
      }
    },

    uncheckedOnScroll () {
      this.uncheckedScrollTop = event.target.scrollTop
    },
    uncheckedMouseEnter() {
      this.isShowUncheckedScroll = true
      this.$refs.uncheckedScrollRef.scrollTop = this.uncheckedScrollTop
    },
    uncheckedMouseLeave () {
      this.isShowUncheckedScroll = false
      this.$refs.uncheckedScrollRef.scrollTop = this.uncheckedScrollTop
    }
  },

  created () {
    this.getTodo()
  },

  mounted () {
    // 来自AddTodo.vue
    this.$bus.$off('bus-new-todo').$on('bus-new-todo', this.unshiftNewTodo)
    // 来自TodoGroup
    this.$bus.$off('t-get-todo').$on('t-get-todo', this.getTodo)
    // 来自TodoItemMenu.vue
    this.$bus.$off('bus-move-bin').$on('bus-move-bin', this.moveTodoBin)
    this.$bus.$off('bus-delete-todo').$on('bus-delete-todo', this.deleteTodo)
    this.$bus.$off('bus-regain-todo').$on('bus-regain-todo', this.regainTodo)
    // 来自TextEditor.vue
    this.$bus.$off('bus-update-todo-title').$on('bus-update-todo-title', this.updateTodoTitle)
  },

  computed: {
    isShowAddTodoInput () {
      // 如果当前路由在 trash 或 completed，则不显示添加待办事项的输入框
      return !((this.$route.path.includes('trash') || this.$route.path.includes('completed') || this.$route.path.includes('tag')))
    }
  },

  watch: {
  }
}
</script>

<style lang="less" scoped>
@import "@/assets/css/views/todo/todoList.less";
</style>
