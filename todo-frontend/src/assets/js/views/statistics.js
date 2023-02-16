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
        data: [],
        type: 'line',
        smooth: false
      }
    ],
    tooltip: {
      show: true
    }
  }
  return lineChartOption
}

// 饼图配置
export const pieChartOption = {
  tooltip: {
    trigger: 'item'
  },
  legend: {
    top: '5%',
    left: 0,
    orient: 'vertical'
  },
  series: [
    {
      name: 'Access From',
      type: 'pie',
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
          fontSize: 24,
          fontWeight: 500
        }
      },
      labelLine: {
        show: false
      },
      data: [
        { value: 1048, name: 'Search Engine' },
        { value: 735, name: 'Direct' },
        { value: 580, name: 'Email' },
        { value: 484, name: 'Union Ads' },
        { value: 300, name: 'Video Ads' }
      ]
    }
  ]
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
