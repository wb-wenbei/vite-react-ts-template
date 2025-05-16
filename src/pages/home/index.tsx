import React from 'react'
// import ThreeModel from '@/components/ThreeModel'
import Card from '@/components/Card'
import ChartCard from '@/components/ChartCard'
import * as echarts from 'echarts'

const App: React.FC = () => {
  const options = {
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'line',
        smooth: true,
      },
    ],
  } as echarts.EChartsOption

  return (
    <div>
      <Card title="测试卡片"></Card>
      <div style={{ height: 400 }}>
        <ChartCard option={options} />
      </div>
    </div>
  )
}

export default App
