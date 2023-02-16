<template>
  <div
    class="todo-item-menu"
    @click="searchMenuFunction"
  >
    <template v-if="this.$route.path.includes('trash')">
      <div
        v-for="item in todoItemMenuInTrashList"
        class="menu-item"
        :key="item.id"
        :sign="item.id"
      >
        <i :class="item.icon"></i>
        <span slot="title">{{item.name}}</span>
      </div>
    </template>
    <template v-else>
      <div
        v-for="item in todoItemMenuList"
        class="menu-item"
        :key="item.id"
        :sign="item.id"
      >
        <i :class="item.icon"></i>
        <span slot="title">{{item.name}}</span>
      </div>
    </template>

  </div>
</template>

<script>
import { moveTodoBinRequest, deleteTodoRequest, regainTodoRequest } from '@/assets/js/request/todoRequest'
import { showMessage } from '@/assets/js/public/publicFunction.js'
const todoItemMenuData = [
  { id: 'edit', name: '编辑', icon: 'el-icon-edit', functionName: 'openTodoEditor' },
  { id: 'delete', name: '删除', icon: 'el-icon-delete', functionName: 'moveTodoBin' }
]
const todoItemMenuInTrashData = [
  { id: 'recover', name: '恢复', icon: 'el-icon-refresh', functionName: 'regainTodo' },
  { id: 'del-ful', name: '彻底删除', icon: 'el-icon-delete', functionName: 'deleteTodo' }
]

export default {
  name: 'todo-item-menu-comp',

  data () {
    return {
      todoItemMenuList: todoItemMenuData,
      todoItemMenuInTrashList: todoItemMenuInTrashData
    }
  },

  methods: {
    searchMenuFunction () {
      const menuList = this.$route.path.includes('trash') ? this.todoItemMenuInTrashList : this.todoItemMenuList
      // 找到点击的菜单项
      const clickMenuItemDOM = event.composedPath().find(item => {
        return menuList.some((element) => {
          return item.className.includes('menu-item')
        })
      })
      if (clickMenuItemDOM) {
        // 匹配相应的处理函数
        const sign = clickMenuItemDOM.attributes.sign.value
        const menu = menuList.find(element => sign === element.id)
        if (menu && typeof this[menu.functionName] === 'function') {
          this[menu.functionName]()
        } else {
          showMessage(this, '该功能暂未上线', 'info', 700)
        }
      }
    },
    setOperatedTodo (busData) {
      this.operatedTodo = busData
    },
    openTodoEditor () {
      this.$store.commit('toggleAddTodoPopover')
    },
    async moveTodoBin () {
      const { todoId, todoChecked } = this.$store.state.operatedTodo
      const requestParams = { todoId }
      await moveTodoBinRequest({ context: this, requestParams })
        .then(res => {
          if (res.status === 1002) {
            // 发送至TodoList.vue
            this.$bus.$emit('bus-move-bin', { todoId, todoChecked })
          }
        })
    },
    async deleteTodo () {
      const { todoId, todoChecked, todoTitle } = this.$store.state.operatedTodo
      const requestParams = { todoId, todoChecked, todoTitle }
      await deleteTodoRequest({ context: this, requestParams })
        .then(res => {
          if (res.status === 1003) {
            // 发送至TodoList.vue
            this.$bus.$emit('bus-delete-todo', { todoId, todoChecked })
            showMessage(this, '删除成功', 'success', 700)
          }
        })
    },
    async regainTodo () {
      const { todoId, todoChecked } = this.$store.state.operatedTodo
      const requestParams = { todoId, todoChecked }
      await regainTodoRequest({ context: this, requestParams })
        .then(res => {
          if (res.status === 1005) {
            // 发送至TodoList.vue
            this.$bus.$emit('bus-regain-todo', { todoId, todoChecked })
          }
        })
    }
  },

  created () {
  },

  mounted () {
  }
}
</script>

<style lang="less" scoped>
.todo-item-menu {
  z-index: 1000;
  position: absolute;
  width: 130px;
  padding: 10px;
  border-radius: 6px;
  background-color: #fff;
  box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.1), 1px -1px 1px rgba(0, 0, 0, 0.1),
    -1px 1px 1px rgba(0, 0, 0, 0.1), -1px -1px 1px rgba(0, 0, 0, 0.1);
  .menu-item {
    margin-bottom: 8px;
    span {
      padding-left: 6px;
    }
  }
  .menu-item:hover {
    border-radius: 6px;
    background-color: rgb(236, 245, 255);
    cursor: pointer;
  }
}
</style>
