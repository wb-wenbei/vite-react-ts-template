import React, { useEffect, useMemo, useState } from 'react'
import Card from '@/components/Card'
import style from './index.module.less'
import { RUN_DATA_LIST } from '@/constants'
import { getRunEfficiencyInfo } from '@/apis'
import { getTimesToNow } from '@/utils'

const types = ['success', 'warning', 'info', 'error']

const RunEfficiency: React.FC = () => {
  const [data, setData] = useState<InfoItem[]>([])

  const dataList = useMemo(() => {
    return RUN_DATA_LIST.map((item) => {
      const infoItem = data.find((i) => i.key === item.key)

      if (!infoItem) return { ...item, value: '--' }

      let value = infoItem?.value
      // 系统上线时间是一个时间戳，转换为距当前时间的天数
      if (item.key === 'up_time') value = getTimesToNow(value as number) as string
      return { ...item, value }
    })
  }, [data])

  useEffect(() => {
    const loadData = () => {
      getRunEfficiencyInfo().then((res) => {
        setData(res || {})
      })
    }

    loadData()
  }, [])

  return (
    <Card title="运行能效分析">
      <div className={style.analysis}>
        {dataList.map((item, index) => (
          <div key={item.key} className={`${style.countCard} ${style[types[index]]}`}>
            <div className={style.content}>
              <span className={style.value}>{item.value}</span>
              <span>{item.unit}</span>
            </div>
            <div className={style.title}>{item.title}</div>
          </div>
        ))}
      </div>
    </Card>
  )
}

export default RunEfficiency
