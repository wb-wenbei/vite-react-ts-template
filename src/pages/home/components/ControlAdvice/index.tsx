import React, { useEffect, useMemo, useState } from 'react'
import Card from '@/components/Card'
import style from './index.module.less'
import { ADVICES_DATA_LIST } from '@/constants'
import { getControlAdviceInfo } from '@/apis'
import { getLatestDeviceTimeserieByKey } from '@/utils'

const ControlAdvice: React.FC = () => {
  const [info, setInfo] = useState<DeviceTimeserie>({})

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
      getControlAdviceInfo().then((res) => {
        setInfo(res)

        console.log('控制建议信息', res)
      })
    }

    loadData()
  }, [])

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
