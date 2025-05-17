import React, { useMemo } from 'react'
import Card from '@/components/Card'
import style from './index.module.less'
import { RUN_DATA_LIST } from '@/constants'

type Props = {
  data?: unknown
}

const types = ['success', 'warning', 'info', 'error']

const RunEfficiency: React.FC<Props> = (props) => {
  const { data } = props

  const dataList = useMemo(() => {
    console.log('data', data)
    return RUN_DATA_LIST.map((item) => {
      // const value = data?.[item.key] ?? item.value
      return {
        ...item,
        // value,
      }
    })
  }, [data])

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
