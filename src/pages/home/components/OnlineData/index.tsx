import React, { useMemo } from 'react'
import Card from '@/components/Card'
import { ONLINE_DATA_LIST } from '@/constants'
import style from './index.module.less'
import useSystemStore from '@/stores/system'
import { updateOptionsValues } from '@/utils'

const OnlineData: React.FC = () => {
  const { deviceList } = useSystemStore()

  const dataList = useMemo(() => {
    return ONLINE_DATA_LIST.map((options) => {
      return updateOptionsValues(deviceList, options)
    })
  }, [deviceList])

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
