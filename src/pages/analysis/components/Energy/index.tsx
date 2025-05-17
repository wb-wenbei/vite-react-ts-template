import React from 'react'
import ChartCard from '@/components/ChartCard'
import style from './index.module.less'

type Props = { data?: unknown }

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

const Energy: React.FC<Props> = (props) => {
  const { data } = props
  console.log('WaterQuality', data)
  return (
    <div className={style.content}>
      <ChartCard option={options} />
      <ChartCard option={options} />
      <ChartCard option={options} />
    </div>
  )
}

export default Energy
