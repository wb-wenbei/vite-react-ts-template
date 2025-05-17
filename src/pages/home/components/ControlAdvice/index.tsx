import React, { useMemo } from 'react'
import Card from '@/components/Card'
import style from './index.module.less'
import { ADVICES_DATA_LIST } from '@/constants'

type Props = { data?: unknown }

const ControlAdvice: React.FC<Props> = (props) => {
  const { data } = props

  const dataList = useMemo(() => {
    console.log('data', data)
    return ADVICES_DATA_LIST
  }, [data])

  return (
    <Card title="控制建议">
      <div className={style.advice}>
        {dataList.map((item) => {
          return (
            <div key={item.key} className={style.item}>
              <div className={style.title}>{item.title}</div>
              <div className={style.value}>{item.value}</div>
              <div className={style.unit}>{item.unit}</div>
            </div>
          )
        })}
      </div>
    </Card>
  )
}

export default ControlAdvice
