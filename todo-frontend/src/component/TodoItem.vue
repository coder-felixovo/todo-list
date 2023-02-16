/* 待办事项组件 */
<template>
  <div
    class="todo-item overflow-hidden flex color-primary "
    :class="{'opacity-40': isChecked}"
    style="width: 90%; height: 40px;"
  >
    <div class="flex-1 flex items-center">
      <!-- 小方框图标 -->
      <template v-if="todo.todoChecked === 0">
        <div class="uncheck">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            fill="currentColor"
            class="bi bi-square"
            viewBox="0 0 16 16"
          >
            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
          </svg>
        </div>
      </template>
      <!-- 小方框带勾图标 -->
      <template v-else>
        <div class="check">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            fill="currentColor"
            class="bi bi-check-square"
            viewBox="0 0 16 16"
          >
            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
            <path d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.235.235 0 0 1 .02-.022z" />
          </svg>
        </div>
      </template>
      <div class="title ml-10px w-full text-overflow"><span
          class="inline-block text-overflow"
          style="width: 180px;"
        >{{todo.todoTitle}}</span></div>
    </div>
    <div class="flex-1 flex items-center">
      <!-- 分组显示区 -->
      <div
        class="group"
        style="width: 100px;"
      >
        <div
          class="flex items-center color-info"
          v-if="todo.groupName"
        >
          <i class="el-icon-folder"></i>
          <span class="ml-10px fs-14px text-overflow">{{todo.groupName}}</span>
        </div>
      </div>
      <!-- 标签显示区 -->
      <div
        class="tag ml-20px"
        style="width: 100px;"
      >
        <div
          class="flex items-center color-info"
          v-if="todo.tagName"
        >
          <i class="el-icon-paperclip"></i>
          <span class="ml-10px fs-14px text-overflow">{{todo.tagName}}</span>
        </div>
      </div>
      <!-- 日期显示区 -->
      <div
        class="datetime ml-30px"
        style="width: 130px;"
      >
        <div
          :class="{'color-main': isUnchecked, 'color-error': isOverdeadline && isUnchecked}"
          v-if="todo.todoDeadline"
        >
          <span class="pl-5 text-overflow">{{deadlineText}}</span>
        </div>
      </div>
      <!-- 更多图标显示区 -->
      <!--       <div class="menu-icon ml-10px mr-10px opacity-40">
        <i class="el-icon-more"></i>
      </div> -->
    </div>
  </div>
</template>

<script>
export default {
  props: ['todoProp'],

  name: 'todo-item-comp',

  data () {
    return {
      todo: this.todoProp
    }
  },

  computed: {
    isChecked () {
      return this.todo.todoChecked === 1
    },
    isUnchecked () {
      return this.todo.todoChecked === 0
    },
    isOverdeadline () {
      const deadlineDateObj = new Date(this.todo.todoDeadline)
      const now = new Date()
      if (deadlineDateObj.getFullYear() < now.getFullYear()) {
        return true
      } else {
        if (deadlineDateObj.getMonth() < now.getMonth()) {
          return true
        } else {
          if (deadlineDateObj.getDate() < now.getDate()) {
            return true
          } else {
            return false
          }
        }
      }
    },
    deadlineText () {
      const deadlineDateObj = new Date(this.todo.todoDeadline)
      const now = new Date()
      const deadlineYear = deadlineDateObj.getFullYear()
      const deadlineMonth = deadlineDateObj.getMonth() + 1
      const deadlineDate = deadlineDateObj.getDate()
      const nowYear = now.getFullYear()
      const nowMonth = now.getMonth() + 1
      const nowDate = now.getDate()
      const isSameYear = deadlineYear === nowYear
      const isSameMonth = deadlineMonth === nowMonth
      const isSameDay = deadlineDate === nowDate
      const isLastDay = deadlineDate === nowDate - 1
      const isNextDay = deadlineDate === nowDate + 1
      const isHoutian = deadlineDate === nowDate + 2
      if (isSameYear) {
        if (isSameMonth) {
          if (isLastDay) {
            return '昨天'
          } else if (isSameDay) {
            return '今天'
          } else if (isNextDay) {
            return '明天'
          } else if (isHoutian) {
            return '后天'
          } else {
            return deadlineMonth + '月' + deadlineDate + '日'
          }
        } else {
          return deadlineMonth + '月' + deadlineDate + '日'
        }
      } else {
        return deadlineYear + '年' + deadlineDate + '月' + deadlineDate + '日'
      }
    }
  }
}
</script>

<style lang="less" scoped>
i:hover,
svg:hover {
  cursor: pointer;
}
.todo-item:hover {
  background-color: rgb(236, 241, 255);
}
</style>
