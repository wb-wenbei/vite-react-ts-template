import React, { useMemo } from 'react'
import ChartCard from '@/components/ChartCard'
import style from './index.module.less'
import { ONLINE_DATA_OUT_LIST } from '@/constants'

type Props = {
  timeRange: string[]
}

const WaterQuality: React.FC<Props> = ({ timeRange }) => {
  console.log('WaterQuality', timeRange)
  const chartList = useMemo(() => {
    return ONLINE_DATA_OUT_LIST.map((item) => {
      return {
        key: item.key,
        title: item.title,
        unit: item.unit,
        options: {
          tooltip: {
            trigger: 'axis',
          },
          grid: {
            top: '40',
            left: '20',
            right: '20',
            bottom: '20',
            containLabel: true,
          },
          xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          },
          yAxis: {
            name: item.unit,
            type: 'value',
          },
          series: [
            {
              data: [820, 932, 901, 934, 1290, 1330, 1320],
              type: 'line',
              smooth: true,
            },
          ],
        } as echarts.EChartsOption,
      }
    })
  }, [])

  return (
    <div className={style.content}>
      {chartList.map((item) => {
        return <ChartCard key={item.key} title={item.title} option={item.options} />
      })}
    </div>
  )
}

export default WaterQuality
