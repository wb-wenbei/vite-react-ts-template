import React, { useEffect, useMemo, useState } from 'react'
import Card from '@/components/Card'
import style from './index.module.less'
import { ADVICES_DATA_LIST, CONTROL_ADVICE } from '@/constants'
import { getLatestDeviceTimeseries } from '@/apis'
import { getLatestDeviceTimeserieByKey } from '@/utils'
import useSystemStore from '@/stores/system'

const ControlAdvice: React.FC = () => {
  const [info, setInfo] = useState<DeviceTimeserie>({})
  const { deviceList } = useSystemStore()

  const dataList = useMemo(() => {
    return ADVICES_DATA_LIST.map((item) => {
      const value = getLatestDeviceTimeserieByKey(item.key, info)
      return {
        ...item,
        value: value,
      }
    })
  }, [info])

  useEffect(() => {
    const loadData = () => {
      const deivce = deviceList.find((item) => item.type === CONTROL_ADVICE.key)
      const entityId = deivce?.id?.id
      if (!entityId) return
      getLatestDeviceTimeseries(entityId).then((res) => {
        setInfo(res)
      })
    }

    loadData()
  }, [deviceList])

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
