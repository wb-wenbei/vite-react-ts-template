import { useCallback, useEffect, useRef } from 'react'
import * as echarts from 'echarts'

export type OptionType = echarts.EChartsOption

type Props = {
  option?: OptionType
  noMerge?: boolean
}

const Chart: React.FC<Props> = ({ option, noMerge = true }) => {
  const chartRef = useRef<HTMLDivElement>(null)
  const chartInstance = useRef<echarts.ECharts | null>(null) // 用于存储实例

  // 初始化
  const init = () => {
    if (chartInstance.current) return

    if (chartRef.current) {
      chartInstance.current = echarts.init(chartRef.current)
      chartInstance.current.on('datazoom', () => {})
    }
  }

  // 更新配置项
  const updateOption = useCallback(
    (opt?: OptionType) => {
      if (!chartInstance.current || !opt) return

      chartInstance.current.setOption(opt, noMerge)
    },
    [noMerge]
  )

  useEffect(() => {
    updateOption(option)
  }, [option, updateOption])

  useEffect(() => {
    init()
    updateOption(option)

    return () => {
      if (chartInstance.current) {
        chartInstance.current.dispose()
        chartInstance.current = null
      }
    }
  }, [])

  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      chartInstance.current?.resize()
    })

    if (chartRef.current) {
      resizeObserver.observe(chartRef.current)
    }

    return () => {
      resizeObserver.disconnect()
    }
  }, [chartRef])

  return <div ref={chartRef} style={{ width: '100%', height: '100%', flex: 1 }}></div>
}

export default Chart
