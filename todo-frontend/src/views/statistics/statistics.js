// 生成折线图配置
export function createLineChartOption () {
  const lineChartOption = {
    title: {
      show: true,
      text: '',
      textAlign: 'center',
      left: 'center',
      textStyle: {
        color: '#333',
        fontSize: 20,
        fontWeight: 500
      },
      subtext: '2023',
      subtextStyle: {
        fontSize: 16,
        fontWeight: 300
      }
    },
    xAxis: {
      name: '日期',
      type: 'category',
      data: []
    },
    yAxis: {
      name: '完成数量',
      type: 'value'
    },
    series: [
      {
        type: 'line',
        data: [],
        smooth: false
      }
    ],
    tooltip: {
      formatter: '日期：{b} <br />完成：{c}'
    }
  }
  return lineChartOption
}

// 饼图配置
export function createPieChartOption () {
  const pieChartOption = {
    title: {
      show: true,
      text: '按标签类别统计任务完成情况',
      textAlign: 'center',
      left: '400',
      textStyle: {
        color: '#333',
        fontSize: 20,
        fontWeight: 500
      },
      subtext: '2023',
      subtextStyle: {
        fontSize: 16,
        fontWeight: 300
      }
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      top: '60',
      left: 0,
      orient: 'vertical'
    },
    series: [
      {
        type: 'pie',
        top: '60',
        left: 'center',
        width: '300',
        height: '300',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 20,
            fontWeight: 300
          }
        },
        data: [],
        tooltip: {
          formatter: '标签：{b}<br />完成：{c}<br />占比：{d}%'
        }
      }
    ]
  }
  return pieChartOption
}

// 柱状图配置
export function createHistogramOption () {
  const histogramOption = {
    title: {
      show: true,
      text: '柱状图示例',
      textAlign: 'center',
      left: 'center',
      textStyle: {
        color: '#333',
        fontSize: 20,
        fontWeight: 500
      },
      subtext: '2023',
      subtextStyle: {
        fontSize: 16,
        fontWeight: 300
      }
    },
    xAxis: {
      type: 'category',
      name: '日期',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value',
      alignTicks: true,
      name: '时长/分钟',
      nameLocation: 'end'
    },
    series: [
      {
        data: [120, 200, 150, 80, 70, 110, 130],
        type: 'bar',
        showBackground: true,
        backgroundStyle: {
          color: 'rgba(180, 180, 180, 0.2)'
        },
        tooltip: {
          formatter: '专注时长：{c} 分钟'
        }
      }
    ],
    tooltip: {
      show: true
    }
  }
  return histogramOption
}

class LatestSeven {
  constructor() {
    this.date = ''
    this.value = 0
  }
}
// 生成"最近七天"需要的对象结构
export function createLatestSevenArray () {
  // 获取今天日期，设置为0时0分0秒0毫秒，再转换为毫秒数
  const todayObj = new Date()
  const year = todayObj.getFullYear()
  let month = todayObj.getMonth() + 1
  let date = todayObj.getDate()
  month = month < 10 ? '0' + month : month
  date = date < 10 ? '0' + date : date
  todayObj.setHours(0)
  todayObj.setMinutes(0)
  todayObj.setSeconds(0)
  todayObj.setMilliseconds(0)
  const todayTime = todayObj.getTime()
  const resultArray = []
  // 前3天
  for (let i = 0, j = 3; i < 3; i++, j--) {
    const obj = new LatestSeven()
    const dateObj = new Date(todayTime - j * 24 * 60 * 60 * 1000)
    const year = dateObj.getFullYear()
    let month = dateObj.getMonth() + 1
    month = month < 10 ? '0' + month : month
    let date = dateObj.getDate()
    date = date < 10 ? '0' + date : date
    obj.date = year + '-' + month + '-' + date
    resultArray.push(obj)
  }
  const _today = new LatestSeven()
  _today.date = year + '-' + month + '-' + date
  resultArray.push(_today)
  // 后3天
  for (let i = 0, j = 1; i < 3; i++, j++) {
    const obj = new LatestSeven()
    const dateObj = new Date(todayTime + j * 24 * 60 * 60 * 1000)
    const year = dateObj.getFullYear()
    let month = dateObj.getMonth() + 1
    month = month < 10 ? '0' + month : month
    let date = dateObj.getDate()
    date = date < 10 ? '0' + date : date
    obj.date = year + '-' + month + '-' + date
    resultArray.push(obj)
  }
  return resultArray
}
