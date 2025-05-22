import React, { useEffect, useMemo, useState } from 'react'
import ChartCard from '@/components/ChartCard'
import style from './index.module.less'
import { ONLINE_DATA_OUT_LIST } from '@/constants'
import useSystemStore from '@/stores/system'
import { getDeviceTimeseries } from '@/apis'

type Props = {
  timeRange: string[]
}

const WaterQuality: React.FC<Props> = ({ timeRange }) => {
  const { deviceList } = useSystemStore()
  const [xAxisData, setXAxisData] = useState<number[]>([])
  const [yAxisData, setYAxisData] = useState<number[]>([])

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
            data: xAxisData || ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          },
          yAxis: {
            name: item.unit,
            type: 'value',
          },
          series: [
            {
              data: yAxisData || [820, 932, 901, 934, 1290, 1330, 1320],
              type: 'line',
              smooth: true,
            },
          ],
        } as echarts.EChartsOption,
      }
    })
  }, [xAxisData, yAxisData])

  useEffect(() => {
    const loadData = (timeRange: string[]) => {
      ONLINE_DATA_OUT_LIST.forEach((item) => {
        const device = deviceList.find((device) => device.type === item.key)

        if (device?.id?.id && device.type) {
          const startTs = new Date(timeRange[0]).getTime()
          const endTs = new Date(timeRange[1]).getTime()
          getDeviceTimeseries(device.id.id, { keys: device.type, startTs, endTs }).then((res) => {
            const list = res?.value || []
            const xAxisData = list.map((item) => item.ts)
            setXAxisData(xAxisData)
            const yAxisData = list.map((item) => item.value as number)
            setYAxisData(yAxisData)
          })
        }
      })
    }

    loadData(timeRange)
  }, [timeRange, deviceList])

  return (
    <div className={style.content}>
      {chartList.map((item) => {
        return <ChartCard key={item.key} title={item.title} option={item.options} />
      })}
    </div>
  )
}

export default WaterQuality
