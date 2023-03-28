<template>
  <div class="statistics-page">
    <div class="outer overflow-hidden flex flex-col h-full m-center">
      <div
        class="head flex items-center justify-between pl-30px mt-20px mb-20px"
        style="height:40px; padding-right: 38px"
      >
        <h1 class="fs-26px fw-500">统计</h1>
        <el-button
          type="primary"
          @click="backToMainPage"
        >返回主页</el-button>
      </div>
      <div class="overflow-hidden h-full">
        <div
          class="inner-scroll pb-10px"
          :class="{'overflow-hidden': !isShowScroll, 'overflow-auto': isShowScroll}"
          style="height: 600px;"
          @mouseenter="isShowScroll = true"
          @mouseleave="isShowScroll = false"
        >
          <div class="statistics flex flex-col pl-30px pr-30px">
            <div
              class="total pl-20px pr-20px"
              style="height: 80px"
            >
              <h2 class="fs-22px fw-500 pt-10px">总计</h2>
              <ul class="flex justify-start items-center">
                <li class="mr-20px">
                  <span class="color-primary fw-600">{{todoNums}}</span>
                  <span class="ml-10px color-primary opacity-80">任务</span>
                </li>
                <li class="mr-20px">
                  <span class="color-primary fw-600">{{doneTodoNums}}</span>
                  <span class="ml-10px color-primary opacity-80">已完成</span>
                </li>
                <li class="mr-20px">
                  <span class="color-primary fw-600">{{joinDays}}</span>
                  <span class="ml-10px color-primary opacity-80">使用天数</span>
                </li>
              </ul>
            </div>
            <div
              class="today flex flex-col pl-20px pr-20px mt-20px"
              style="height: 130px"
            >
              <h2 class="fs-22px fw-500 pt-10px">今日</h2>
              <div class="flex justify-around pl-10px pr-10px">
                <div>
                  <p class="color-main text-center fs-26px">{{todayDoneTodoNums}}</p>
                  <p class="mt-5px color-grey fs-16px fw-400 text-center">已完成</p>
                </div>
                <div>
                  <p class="color-main text-center fs-26px">{{todayFocusHours}}h{{todayFocusMinute}}min</p>
                  <p class="mt-5px color-grey fs-16px fw-400 text-center">专注时长</p>
                </div>
              </div>
            </div>
            <!-- 折线图：近七日完成情况 -->
            <div class="linechart-box pl-20px pr-20px mt-20px">
              <h2 class="fs-22px fw-500 pt-10px">任务</h2>
              <div
                id="linechart"
                style="width: 850px; height:400px;"
              ></div>
            </div>
            <!-- 饼状图：按标签类别统计 -->
            <div class="piechart-box pl-20px pr-20px mt-20px">
              <h2 class="fs-22px fw-500 pt-10px">标签</h2>
              <div
                id="piechart"
                style="width: 850px; height:400px;"
              ></div>
            </div>
            <!-- 柱状图：专注时间统计 -->
            <div class="his-box pl-20px pr-20px mt-20px">
              <h2 class="fs-22px fw-500 pt-10px">专注</h2>
              <div
                id="histogram"
                style="width: 850px; height: 400px;"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts/core'
import { LineChart, PieChart, BarChart } from 'echarts/charts'
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  LegendComponent
} from 'echarts/components'
// 标签自动布局、全局过渡动画等特性
import { LabelLayout, UniversalTransition } from 'echarts/features'
// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
import { CanvasRenderer } from 'echarts/renderers'

import {
  apiGetTotalStat, apiGetTodayStat, apiGetLineSevenStat, apiTagDoneNums, apiSevenFocusTime
} from '@/assets/js/api/api.js'
import {
  createLineChartOption, createLatestSevenArray, createPieChartOption, createHistogramOption
} from './statistics.js'

echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  LineChart,
  LabelLayout,
  UniversalTransition,
  CanvasRenderer,
  LegendComponent,
  PieChart,
  BarChart
])
export default {
  name: 'statistics-view-comp',

  data () {
    return {
      isShowScroll: false,
      todoNums: 0,
      doneTodoNums: 0,
      joinDays: 0,
      todayDoneTodoNums: 0,
      todayFocusTime: 0,
      todayFocusTimeText: '',
      todayFocusHours: '0',
      todayFocusMinute: '0',
      lineChartOption: null,
      pieChartOption: null,
      histogramOption: null
    }
  },

  methods: {
    backToMainPage () {
      this.$router.push('/a/all/todo')
    },

    async reqGetTotalStat () {
      this.$request.get(apiGetTotalStat)
        .then(res => {
          if (res.status === 701) {
            if (res.data) {
              const { totalTodoNums, totalDoneTodoNums, joinDays } = res.data
              this.todoNums = totalTodoNums
              this.doneTodoNums = totalDoneTodoNums
              this.joinDays = joinDays
            }
          }
        })
    },

    async reqGetTodayStat () {
      this.$request.get(apiGetTodayStat)
        .then(res => {
          if (res.status === 702) {
            const { todayDoneTodoNums, todayFocusTime } = res.data
            this.todayDoneTodoNums = todayDoneTodoNums || 0
            this.todayFocusTime = todayFocusTime || 0
            this.todayFocusTimeText = this.focusTime === 0 ? '0h0min' : this.handleFocusTimeText(this.focusTime)
          }
        })
    },

    handleFocusTimeText (time = 0) {
      if (!typeof time === 'numer' || !Number.isNaN(time)) return
      let leftSeconds
      if (time < 60) {
        return time + 's'
      } else if (time < 3600) {
        const minutes = Math.floor(time / 60)
        leftSeconds = time - minutes * 60
        return leftSeconds === 0 ? minutes + 'min' : minutes + 'min' + leftSeconds + 's'
      } else {
        const hours = Math.floor(time / 3600)
        leftSeconds = time - hours * 3600
        if (leftSeconds === 0) {
          return hours + 'h'
        }
        const minutes = Math.floor(leftSeconds / 60)
        leftSeconds = leftSeconds - minutes * 60
        if (leftSeconds === 0) {
          return hours + 'h' + minutes + 'min'
        } else {
          return hours + 'h' + minutes + 'min' + leftSeconds + 's'
        }
      }
    },

    async reqGetLatestSevenDays () {
      this.$request.get(apiGetLineSevenStat)
        .then(res => {
          if (res.status === 703) {
            if (res.data) {
              const { title, dataList } = res.data
              const latestSevenList = createLatestSevenArray()
              const option = createLineChartOption()
              option.title.text = title
              dataList.forEach((element) => {
                latestSevenList.forEach((item, index) => {
                  if (element.date === item.date) {
                    latestSevenList[index].value = element.number
                  }
                })
              })
              latestSevenList.forEach(element => {
                option.xAxis.data.push(element.date)
                option.series[0].data.push(element.value)
              })
              this.lineChartOption = option
              this.$nextTick(() => {
                const myLineChart = echarts.init(document.getElementById('linechart'))
                myLineChart.setOption(this.lineChartOption)
              })
            }
          }
        })
    },

    async reqTagDoneNums () {
      this.$request.get(apiTagDoneNums)
        .then(res => {
          if (res.status === 704) {
            const { title, data } = res.data
            const pieOption = createPieChartOption()
            pieOption.title.text = title
            data.forEach(element => {
              pieOption.series[0].data.push({ name: element.tagName || '无类别', value: element.doneTodoNums })
            })
            this.pieChartOption = pieOption
            this.$nextTick(() => {
              const myLineChart = echarts.init(document.getElementById('piechart'))
              myLineChart.setOption(this.pieChartOption)
            })
          }
        })
    },

    async reqSevenFocusTime () {
      this.$request.get(apiSevenFocusTime)
        .then(res => {
          if (res.status === 705) {
            console.log(res)
            const { title, list } = res.data
            const hisOption = createHistogramOption()
            const latestSevenList = createLatestSevenArray()
            hisOption.xAxis.data = []
            hisOption.series[0].data = []
            hisOption.title.text = title
            list.forEach(element => {
              latestSevenList.forEach((item, index) => {
                if (element.day === item.date) {
                  latestSevenList[index].value = (element.focusTime / 60).toFixed(1)
                }
              })
            })
            latestSevenList.forEach(element => {
              hisOption.xAxis.data.push(element.date)
              hisOption.series[0].data.push(element.value)
            })
            this.histogramOption = hisOption
            this.$nextTick(() => {
              const myLineChart = echarts.init(document.getElementById('histogram'))
              myLineChart.setOption(this.histogramOption)
            })
          }
        })
    }
  },

  created () {
    this.reqGetTotalStat()
    this.reqGetTodayStat()
    this.reqGetLatestSevenDays()
    this.reqTagDoneNums()
    this.reqSevenFocusTime()
  },

  mounted () {
  }
}
</script>

<style lang="less" scoped>
@import "./statistics.less";
</style>
