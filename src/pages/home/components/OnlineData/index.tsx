import React, { useMemo } from 'react'
import Card from '@/components/Card'
import { ONLINE_DATA_LIST } from '@/constants'
import style from './index.module.less'

type Props = {
  data?: unknown
}

const OnlineData: React.FC<Props> = (props) => {
  const { data } = props

  const dataList = useMemo(() => {
    console.log('data', data)
    return ONLINE_DATA_LIST
  }, [data])

  return (
    <Card title="在线数据">
      <div className={style.onlineData}>
        {dataList.map((item, index) => {
          return (
            <div key={index} className={style.card}>
              {item.map((subItem) => {
                return (
                  <div key={subItem.key} className={style.item}>
                    <div className={style.title}>{subItem.title}</div>
                    <div className={style.value}>{subItem.value}</div>
                    <div className={style.unit}>{subItem.unit}</div>
                  </div>
                )
              })}
            </div>
          )
        })}
      </div>
    </Card>
  )
}

export default OnlineData
