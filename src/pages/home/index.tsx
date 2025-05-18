import React, { useEffect, useState } from 'react'
import style from './index.module.less'
import { getCustomerDevices, getDeviceAttributes, getLatestDeviceTimeseries } from '@/apis'
import useUserStore from '@/stores/user'
import useSystemStore from '@/stores/system'
import Model from './components/Model'
import RunEfficiency from './components/RunEfficiency'
import OnlineData from './components/OnlineData'
import ControlAdvice from './components/ControlAdvice'
import ScreenControl from './components/ScreenControl'

let loading = false

const App: React.FC = () => {
  const { customerId } = useUserStore()
  const [devices, setDevices] = useState<Device[]>([])
  const { setDeviceList } = useSystemStore()

  useEffect(() => {
    if (loading) return
    loading = true

    const loadDevices = (customerId?: string) => {
      if (!customerId) return

      getCustomerDevices({ page: 0, pageSize: 50, customerId: customerId }).then((res) => {
        loading = false
        setDevices(res.data)
        setDeviceList(res.data)
        console.log('设备列表', res.data)

        res.data.forEach((device) => {
          loadAttributes(device.id?.id)
          loadTimeseries(device.id?.id)
        })
      })
    }

    const loadAttributes = (deviceId?: string) => {
      if (!deviceId) return

      getDeviceAttributes(deviceId).then((res) => {
        setDevices((prev) => {
          const current = [...prev]
          const device = current.find((item) => item.id?.id === deviceId)

          if (device) device.attributeList = res

          return current
        })
      })
    }

    const loadTimeseries = (deviceId?: string) => {
      if (!deviceId) return

      getLatestDeviceTimeseries(deviceId).then((res) => {
        setDevices((prev) => {
          const current = [...prev]
          const device = current.find((item) => item.id?.id === deviceId)

          if (device) device.latestTimeserie = res

          return current
        })
      })
    }

    loadDevices(customerId)
  }, [customerId, setDeviceList])

  useEffect(() => {
    setDeviceList(devices)
    console.log('设备列表更新', devices)
  }, [devices, setDeviceList])

  return (
    <div className={style.home}>
      <RunEfficiency />
      <OnlineData />
      <Model />
      <ControlAdvice />
      <ScreenControl />
    </div>
  )
}

export default App
