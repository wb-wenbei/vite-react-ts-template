import React, { useEffect, useMemo, useState } from 'react'
import ChartCard from '@/components/ChartCard'
import style from './index.module.less'
import { CHART_RUN_DATA_LIST } from '@/constants'
import useSystemStore from '@/stores/system'
import { getDeviceTimeseries } from '@/apis'

type Props = {
  timeRange: string[]
}

const WaterQuality: React.FC<Props> = ({ timeRange }) => {
  const { deviceTypeIdMap } = useSystemStore()
  const [loading, setLoading] = useState<Record<string, boolean>>({})
  const [xAxisDataMap, setXAxisDataMap] = useState<Record<string, string[]>>({})
  const [yAxisDataMap, setYAxisDataMap] = useState<Record<string, number[]>>({})

  const chartList = useMemo(() => {
    return CHART_RUN_DATA_LIST.map((item) => {
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
            data: xAxisDataMap[item.key] || [],
          },
          yAxis: {
            name: item.unit,
            type: 'value',
          },
          series: [
            {
              data: yAxisDataMap[item.key] || [],
              type: 'line',
              smooth: true,
            },
          ],
        } as echarts.EChartsOption,
      }
    })
  }, [xAxisDataMap, yAxisDataMap])

  useEffect(() => {
    const loadData = (timeRange: string[]) => {
      CHART_RUN_DATA_LIST.forEach((item) => {
        const deviceType = item.key
        const deviceId = deviceTypeIdMap[item.key] || ''

        if (deviceId && deviceType) {
          const startTs = new Date(timeRange[0]).getTime()
          const endTs = new Date(timeRange[1]).getTime()
          setLoading((prev) => ({ ...prev, [deviceType]: true }))
          getDeviceTimeseries(deviceId, { keys: deviceType, startTs, endTs })
            .then((res) => {
              const list = res[deviceType] || res.value || []
              const xAxisData = list.map((item) => new Date(item.ts).toLocaleString())
              setXAxisDataMap((prev) => {
                return {
                  ...prev,
                  [deviceType]: xAxisData,
                }
              })
              const yAxisData = list.map((item) => item.value as number)
              setYAxisDataMap((prev) => {
                return {
                  ...prev,
                  [deviceType]: yAxisData,
                }
              })
            })
            .finally(() => setLoading((prev) => ({ ...prev, [deviceType]: false })))
        }
      })
    }

    loadData(timeRange)
  }, [timeRange, deviceTypeIdMap])

  return (
    <div className={style.content}>
      {chartList.map((item) => {
        return <ChartCard key={item.key} loading={loading[item.key]} title={item.title} option={item.options} />
      })}
    </div>
  )
}

export default WaterQuality
