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
                  <span class="color-primary fw-600">{{todoSum}}</span>
                  <span class="ml-10px color-primary opacity-80">任务</span>
                </li>
                <li class="mr-20px">
                  <span class="color-primary fw-600">{{finishedTodoSum}}</span>
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
                  <p class="color-main text-center fs-26px">{{todayDoneTodoCount}}</p>
                  <p class="mt-5px color-grey fs-16px fw-400 text-center">已完成</p>
                </div>
                <div>
                  <p class="color-main text-center fs-26px">{{todayFocusHours}}h{{todayFocusMinute}}min</p>
                  <p class="mt-5px color-grey fs-16px fw-400 text-center">专注时长</p>
                </div>
              </div>
            </div>
            <div class="linechart-box pl-20px pr-20px mt-20px">
              <h2 class="fs-22px fw-500 pt-10px">任务</h2>
              <div
                id="linechart"
                style="width: 850px; height:300px;"
              ></div>
            </div>
            <div class="piechart-box pl-20px pr-20px mt-20px">
              <h2 class="fs-22px fw-500 pt-10px">标签</h2>
              <div
                id="piechart"
                style="width: 850px; height:300px;"
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
import { LineChart, PieChart } from 'echarts/charts'
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

import { apiGetTotal, apiGetToday, apiLatestSevenDays } from '@/assets/js/api/statisticsAPI.js'
import { createLineChartOption, createLatestSevenArray, pieChartOption } from '@/assets/js/views/statistics.js'

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
  PieChart
])
export default {
  name: 'statistics-view-comp',

  data () {
    return {
      isShowScroll: false,
      todoSum: 0,
      finishedTodoSum: 0,
      joinDays: 0,
      todayDoneTodoCount: 0,
      todayFocusHours: '',
      todayFocusMinute: '',
      lineChartOption: null,
      pieChartOption: pieChartOption
    }
  },

  methods: {
    backToMainPage () {
      this.$router.push('/a/collect/todo')
    },

    getTotal () {
      this.$request.get(apiGetTotal)
        .then(res => {
          if (res.status === 701) {
            if (res.data) {
              const { todoSum, finishedTodoSum, joinDays } = res.data
              this.todoSum = todoSum
              this.finishedTodoSum = finishedTodoSum
              this.joinDays = joinDays
            }
          }
        })
    },

    getToday () {
      this.$request.get(apiGetToday)
        .then(res => {
          if (res.status === 702) {
            const { todayDoneTodoCount, todayFocusHours, todayFocusMinute } = res.data
            this.todayDoneTodoCount = todayDoneTodoCount
            this.todayFocusHours = todayFocusHours
            this.todayFocusMinute = todayFocusMinute
          }
        })
    },

    getLatestSevenDays () {
      this.$request.get(apiLatestSevenDays)
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
                    latestSevenList[index].number = element.number
                  }
                })
              })
              latestSevenList.forEach(element => {
                option.xAxis.data.push(element.date)
                option.series[0].data.push(element.number)
              })
              this.lineChartOption = option
              this.$nextTick(() => {
                const myLineChart = echarts.init(document.getElementById('linechart'))
                myLineChart.setOption(this.lineChartOption)
              })
            }
          }
        })
    }
  },

  created () {
    this.getTotal()
    this.getToday()
    this.getLatestSevenDays()
  },

  mounted () {
    const myLineChart = echarts.init(document.getElementById('piechart'))
    myLineChart.setOption(this.pieChartOption)
  }
}
</script>

<style lang="less" scoped>
@import "@/assets/css/views/statistics.less";
</style>
