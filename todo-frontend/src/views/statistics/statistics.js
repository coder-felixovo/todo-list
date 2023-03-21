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
      name: '',
      type: 'category',
      data: []
    },
    yAxis: {
      name: '',
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

function LatestSeven () {
  const object = {
    date: '',
    number: 0
  }
  return object
}
// 生成"最近七天"需要的对象结构
export function createLatestSevenArray () {
  const dateObj = new Date()
  const year = dateObj.getFullYear()
  let month = dateObj.getMonth() + 1
  month = month < 10 ? '0' + month : month
  let date = dateObj.getDate() - 3
  const resultArray = []
  for (let i = 1; i <= 7; i++) {
    const obj = new LatestSeven()
    const tempDate = date < 10 ? '0' + date : date
    obj.date = year + '-' + month + '-' + tempDate
    resultArray.push(obj)
    date++
  }
  return resultArray
}
