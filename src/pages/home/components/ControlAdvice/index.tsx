import React, { useMemo } from 'react'
import Card from '@/components/Card'
import style from './index.module.less'
import { ADVICES_DATA_LIST, CONTROL_ADVICE } from '@/constants'
import { getLatestDeviceTimeserieByKey } from '@/utils'
import useSystemStore from '@/stores/system'

const ControlAdvice: React.FC = () => {
  const { deviceList } = useSystemStore()

  const info = useMemo(() => {
    const device = deviceList.find((item) => item.type === CONTROL_ADVICE.key)
    if (!device) return {}
    return device.latestTimeserie || {}
  }, [deviceList])

  const dataList = useMemo(() => {
    return ADVICES_DATA_LIST.map((item) => {
      const value = getLatestDeviceTimeserieByKey(item.key, info)
      return {
        ...item,
        value: value,
      }
    })
  }, [info])

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
