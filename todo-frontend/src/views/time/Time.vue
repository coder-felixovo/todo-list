/* 任务专注页面 */
<template>
  <div class="time-page">
    <!-- 左边计时区域 -->
    <div class="left el-col-14">
      <div class="flex flex-col h-full">
        <h1 class="title">任务专注</h1>
        <div class="flex flex-col">
          <!-- 选择专注任务区域 -->
          <div class="todo-selection">
            <p
              class="select-todo-btn"
              @click="openTodoSelection"
            >{{focusTodoTitle}} <i class="el-icon-arrow-right"></i></p>
            <div
              class="todo-container"
              v-show="showTodoSelection"
            >
              <el-select
                placeholder="请选择"
                v-model="f_todoId"
                clearable
                @change="showTodoSelection = false"
              >
                <el-option
                  v-for="item in todoList"
                  :key="item.todoId"
                  :label="item.todoTitle"
                  :value="item.todoId"
                >
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="circle relative flex justify-center items-center">
            <span
              class="count-down color-primary fw-500 opacity-90"
              style="font-size: 45px;"
              @click="showTimeInput = true"
            >{{focusTimeText}}</span>
            <div
              v-if="showTimeInput"
              class="input-wrap flex flex-col"
            >
              <input
                type="number"
                min="0"
                max="180"
                v-model="minutes"
              >
              <div class="flex">
                <el-button
                  class="time-cancel"
                  @click="showTimeInput = false"
                >取消</el-button>
                <el-button
                  class="time-sure"
                  @click="sureFocusTime"
                >确定</el-button>
              </div>
            </div>
          </div>
          <el-button
            class="start-btn"
            @click="startFocusTask"
          >{{startBtnText}}</el-button>
          <el-button
            v-if="isStart || isStop"
            class="end-btn"
            @click="endFocusTask"
          >结束</el-button>
        </div>
      </div>
    </div>
    <!-- 右边记录区域 -->
    <div class="right el-col-10">
      <div class="flex flex-col h-full">
        <!-- 概览区域 -->
        <div class="overview">
          <p class="tiny-title">概览</p>
          <div class="container">
            <div class="unit">
              <p class="fs-12px">今日专注数</p>
              <p class="fs-20px fw-600">{{todayFocusNums}}</p>
            </div>
            <div class="unit">
              <p class="fs-12px">今日专注时长</p>
              <p class="fs-20px fw-600">{{todayFocusTimeText}}</p>
            </div>
            <div class="unit">
              <p class="fs-12px">总计专注记录</p>
              <p class="fs-20px fw-600">{{totalFocusNums}}</p>
            </div>
            <div class="unit">
              <p class="fs-12px">总计专注时长</p>
              <p class="fs-20px fw-600">{{totalFocusTimeText}}</p>
            </div>
          </div>
        </div>
        <!-- 记录区域 -->
        <div class="record">
          <div class="head flex items-center justify-between">
            <p class="tiny-title">专注记录</p>
            <i
              class="el-icon-plus"
              @click="openAddRecordDialog"
            ></i>
          </div>
          <div
            class="record-list"
            @contextmenu.prevent="openMenu"
          >
            <div
              class="record-item"
              :focus-id="item.focusId"
              v-for="item in focusRecordList"
              :key="item.focusId"
            >
              <p class="record-title"><i class="el-icon-eleme fs-14px color-main mr-5px"></i>{{item.todoTitle}}</p>
              <p class="record-time"><i class="el-icon-timer mr-5px"></i>{{handleFocusTimeText(item.focusTime)}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 添加专注记录对话框 -->
    <el-dialog
      class="add-record-dialog"
      :visible="showAddRecordDialog"
      title="添加任务专注记录"
      width="360px"
      :modal="false"
      :show-close="false"
    >
      <div class="flex flex-col">
        <div class="input-item flex items-center">
          <div class="tiny-label">专注任务</div>
          <div class="flex-auto">
            <el-select
              v-model="r_todoId"
              placeholder="选择任务"
            >
              <el-option
                v-for="item in todoList"
                :key="item.todoId"
                :label="item.todoTitle"
                :value="item.todoId"
              >
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="input-item flex items-center">
          <div class="tiny-label">开始时间</div>
          <div class="flex-auto">
            <el-date-picker
              v-model="r_startTime"
              type="datetime"
              placeholder="开始时间"
              clearable
              @focus="showAddRecordTips = false"
            ></el-date-picker>
          </div>
        </div>
        <div class="input-item flex items-center">
          <div class="tiny-label">结束时间</div>
          <div class="flex-auto">
            <el-date-picker
              v-model="r_endTime"
              type="datetime"
              placeholder="结束时间"
              clearable
              @focus="showAddRecordTips = false"
            ></el-date-picker>
          </div>
        </div>
        <div class="input-item flex">
          <div class="tiny-label">专注笔记</div>
          <div class="flex-auto">
            <el-input
              v-model="r_note"
              type="textarea"
              placeholder="记录你的想法"
            ></el-input>
          </div>
        </div>
      </div>
      <div
        class="color-error fs-14px"
        v-show="showAddRecordTips"
      >
        <span>{{addRecordTips}}</span>
      </div>
      <div slot="footer">
        <el-button @click="showAddRecordDialog = false">取 消</el-button>
        <el-button
          type="primary"
          @click="addRecord"
        >确 定</el-button>
      </div>
    </el-dialog>
    <!-- 菜单 -->
    <div
      class="focus-menu"
      ref="focusMenu"
      v-show="isShowMenu"
      @click="clickMenu"
    >
      <ul>
        <li
          class="menu-item"
          tag="detail"
        >查看详情</li>
      </ul>
    </div>
    <!-- 专注记录详情 -->
    <div
      class="focus-detail"
      v-if="isShowDetail"
    >
      <div class="clearfix">
        <span class="fl fs-22px">专注详情</span>
        <i
          class="el-icon-close fr"
          @click="closeDetail"
        ></i>
      </div>
      <div class="item"><span>事项标题：{{focusDetail.todoTitle}}</span></div>
      <div class="item"><span>创建时间：{{focusDetail.createTime}}</span></div>
      <div class="item"><span>开始时间：{{focusDetail.startTime}}</span></div>
      <div class="item"><span>结束时间：{{focusDetail.endTime}}</span></div>
      <div class="item"><span>专注时长：{{focusDetail.focusTime}}</span></div>
      <div class="clearfix">
        <el-button
          class="fr"
          type="text"
          disabled
        >删除</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import {
  reqTodoCanFocus, reqAddFocusRecord, reqGetFocusRecord, reqFocusStat, reqFocusDetail
} from '@/assets/js/request/timeRequest'
import { showMessage } from '@/assets/js/public/publicFunction.js'
import { TodoFocusRecord, convertTimeToText } from './time.js'
export default {
  name: 'timer-view-comp',
  data () {
    return {
      showTodoSelection: false,
      showTimeInput: false,
      showAddRecordDialog: false,
      showAddRecordTips: false,
      isStart: false,
      isStop: false,
      minutes: 0, // 用户选择的专注时间，单位分钟
      leftSeconds: 0,
      f_startTime: null, // 日期对象
      f_todoId: '',
      timer: null,
      todayFocusNums: 0,
      todayFocusTime: 0,
      totalFocusNums: 0,
      totalFocusTime: 0,
      todoList: [],
      focusRecordList: [],
      r_todoId: null,
      r_startTime: null,
      r_endTime: null,
      r_note: '',
      addRecordTips: '请选择开始时间和结束时间',
      isShowMenu: false,
      isShowDetail: false,
      focusDetail: {
        todoId: '',
        focusId: '',
        todoTitle: '',
        createTime: '',
        startTime: '',
        endTime: '',
        focusTime: ''
      },
      clickFocusId: null
    }
  },

  methods: {
    async getFocusStat () {
      // 获取专注数据统计
      await reqFocusStat(this)
        .then((res) => {
          if (res.status === 5004) {
            const { todayFocusNums, todayFocusTime, totalFocusNums, totalFocusTime } = res.data
            this.todayFocusNums = todayFocusNums
            this.todayFocusTime = todayFocusTime
            this.totalFocusNums = totalFocusNums
            this.totalFocusTime = totalFocusTime
          }
        })
    },
    async getTodo () {
      await reqTodoCanFocus(this)
        .then(res => {
          if (res.status === 5001) {
            this.todoList = res.data.todoData
          }
        })
    },
    async addRecord () {
      /* 添加任务专注记录 */
      if (!this.r_startTime || !this.r_endTime) {
        // 如果未选择开始时间和结束时间，显示相应的提示信息
        this.showAddRecordTips = true
        return
      }
      this.showAddRecordDialog = false
      const todoTitle = this.todoList.find(element => this.r_todoId === element.todoId).todoTitle
      // 准备请求参数
      const requestParam = {
        todoId: this.r_todoId,
        todoTitle,
        startTime: this.r_startTime,
        endTime: this.r_endTime,
        note: this.r_note
      }
      await reqAddFocusRecord(this, requestParam)
        .then((res) => {
          if (res.status === 5002) {
            this.focusRecordList.unshift(new TodoFocusRecord(res.data))
          }
        })
    },
    async getFocusRecord () {
      await reqGetFocusRecord(this)
        .then((res) => {
          if (res.status === 5003) {
            this.focusRecordList = res.data.focusRecordData
          }
        })
    },
    async getFocusDetail () {
      const requestParams = { focusId: this.clickFocusId }
      await reqFocusDetail(this, requestParams)
        .then(res => {
          if (res.status === 5005) {
            const { focusId, todoId, createTime, startTime, endTime, focusTime, todoTitle } = res.data
            this.focusDetail.focusId = focusId
            this.focusDetail.todoId = todoId
            this.focusDetail.todoTitle = todoTitle
            this.focusDetail.createTime = createTime
            this.focusDetail.startTime = startTime
            this.focusDetail.endTime = endTime
            this.focusDetail.focusTime = (focusTime / 60).toFixed(1) + 'min'
            this.isShowDetail = true
          }
        })
    },
    /* 交互逻辑 */
    countDown () {
      // 倒计时计时器
      return setInterval(() => {
        this.leftSeconds -= 1
        if (this.leftSeconds === 0) {
          this.isStart = false
          this.isStop = false
          this.countDownEnd()
          clearInterval(this.timer)
        }
      }, 1000)
    },
    countDownEnd () {
      // 倒计时结束
      const todoTitle = this.todoList.find(element => this.f_todoId === element.todoId).todoTitle
      const requestParams = {
        todoId: this.f_todoId,
        todoTitle,
        startTime: this.f_startTime,
        endTime: new Date().toString(),
        focusTime: this.minutes * 60,
        note: this.r_note
      }
      reqAddFocusRecord(this, requestParams)
        .then((res) => {
          if (res.status === 5002) {
            this.focusRecordList.unshift(new TodoFocusRecord(res.data))
            this.f_todoId = ''
            this.todayFocusNums += 1
            this.totalFocusNums += 1
            this.todayFocusTime += this.minutes * 60
            this.totalFocusTime += this.minutes * 60
          }
        })
    },
    startFocusTask () {
      if (!this.isStart && !this.isStop) {
        if (this.leftSeconds > 0) {
          // 未开始 => 开始
          this.isStart = true
          this.f_startTime = new Date().toString()
          this.timer = this.countDown()
        } else {
          showMessage(this, '请选择专注时长', 'info', 800)
        }
        return
      }
      if (this.isStart) {
        // 开始 => 暂停
        clearInterval(this.timer)
        this.isStop = true
        this.isStart = false
        return
      }
      if (this.isStop) {
        // 暂停 => 开始
        this.timer = this.countDown()
        this.isStart = true
        this.isStop = false
      }
    },
    endFocusTask () {
      clearInterval(this.timer)
      this.$msgbox({
        title: '结束',
        type: 'info',
        message: '是否提前结束专注？',
        showClose: true,
        showCancelButton: true,
        cancelButtonText: '取消',
        confirmButtonText: '确定'
      })
        .then(async () => {
          // 确定结束专注
          let todoId, todoTitle, focusTime
          this.isStart = false
          this.isStop = false
          this.r_todoId = ''
          focusTime = this.minutes * 60 - this.leftSeconds
          this.minutes = 0
          this.leftSeconds = 0
          todoTitle = this.todoList.find(element => this.f_todoId === element.todoId).todoTitle
          const requestParams = {
            startTime: this.f_startTime,
            endTime: new Date().toString(),
            focusTime,
            todoId: this.f_todoId,
            todoTitle
          }
          await reqAddFocusRecord(this, requestParams)
            .then(res => {
              if (res.status === 5002) {
                this.focusRecordList.unshift(new TodoFocusRecord(res.data))
                this.todayFocusNums += 1
                this.todayFocusTime += focusTime
                this.totalFocusNums += 1
                this.totalFocusTime += focusTime
              }
            })
        })
        .catch(() => {
          // 取消结束专注
          this.timer = setInterval(() => {
            this.leftSeconds -= 1
          }, 1000)
        })
    },
    sureFocusTime () {
      // 输入专注时间，点击确认
      this.showTimeInput = false
      this.leftSeconds = this.minutes * 60
    },
    openTodoSelection () {
      this.showTodoSelection = true
      window.addEventListener('click', this.closeTodoSelection)
    },
    closeTodoSelection () {
      const todoSelectionDOM = event.composedPath().find(element => element._prevClass === 'todo-selection')
      if (!todoSelectionDOM) {
        this.showTodoSelection = false
        window.removeEventListener('click', this.closeTodoSelection)
      }
    },
    openAddRecordDialog () {
      // 打开“添加任务专注记录”对话框
      this.showAddRecordDialog = true
    },

    handleFocusTimeText (time) {
      return convertTimeToText(time)
    },
    openMenu () {
      const focusId = event.composedPath().find(element => element._prevClass.includes('record-item')).attributes['focus-id'].value
      this.clickFocusId = focusId
      const clientX = event.clientX
      const clientY = event.clientY
      if (!this.isShowMenu) {
        this.isShowMenu = true
        window.addEventListener('click', this.closeMenu)
      }
      this.$nextTick(() => {
        const menuDOM = this.$refs.focusMenu
        menuDOM.style.left = clientX - 65 + 'px'
        menuDOM.style.top = clientY + 'px'
      })
    },
    closeMenu() {
      const click = event.composedPath().find(element => {
        if (element._prevClass) {
          if (element._prevClass.includes('focus-menu')) {
            return element
          } else {
            return undefined
          }
        } else {
          return undefined
        }
      })
      if (!click) {
        this.isShowMenu = false
      }
      window.removeEventListener('click', this.closeMenu)
    },
    clickMenu() {
      const menuItem = event.composedPath().find(element => element._prevClass.includes('menu-item'))
      const { value: tag } = menuItem.attributes.tag
      if (tag === 'detail') {
        this.getFocusDetail()
        this.isShowMenu = false
      }
    },
    closeDetail () {
      this.isShowDetail = false
    }
  },

  computed: {
    startBtnText () {
      if (!this.isStart && !this.isStop) {
        return '开始专注'
      }
      if (this.isStart && !this.isStop) {
        return '暂停专注'
      }
      return '继续专注'
    },

    focusTimeText () {
      if (this.leftSeconds !== 0) {
        let minutes = Math.floor(this.leftSeconds / 60)
        let seconds = this.leftSeconds % 60
        minutes = minutes < 10 ? '0' + minutes : minutes
        seconds = seconds < 10 ? '0' + seconds : seconds
        return minutes + ':' + seconds
      } else {
        return '00:00'
      }
    },

    todayFocusTimeText () {
      return convertTimeToText(this.todayFocusTime)
    },

    totalFocusTimeText () {
      return convertTimeToText(this.totalFocusTime)
    },

    focusTodoTitle () {
      if (this.f_todoId) {
        return this.todoList.find(element => this.f_todoId === element.todoId).todoTitle
      } else {
        return '选择任务'
      }
    }
  },

  watch: {
    leftSeconds () {
      if (this.leftSeconds === 0) {
        clearInterval(this.timer)
        this.isStart = false
        this.isStop = false
      }
    }
  },

  created () {
    this.getTodo()
    this.getFocusRecord()
    this.getFocusStat()
  },

  mounted () {
  },

  beforeDestroy () {
    clearInterval(this.timer)
  }
}
</script>

<style lang="less" scoped>
@import url("./time.less");
</style>
