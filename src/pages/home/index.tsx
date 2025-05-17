import React, { useEffect } from 'react'
import ThreeModel from '@/components/ThreeModel'
import Card from '@/components/Card'
import style from './index.module.less'
import { getCustomerDevices, getDeviceAttributes, getLatestDeviceTimeseries } from '@/apis'
import useUserStore from '@/stores/user'
import useSystemStore from '@/stores/system'
import RunEfficiency from './components/RunEfficiency'
import OnlineData from './components/OnlineData'
import ControlAdvice from './components/ControlAdvice'
import ScreenControl from './components/ScreenControl'

const App: React.FC = () => {
  const { customerId } = useUserStore()
  const { setDevice } = useSystemStore()

  useEffect(() => {
    const loadDevices = (customerId?: string) => {
      if (!customerId) return

      getCustomerDevices({ page: 1, pageSize: 10, customerId: customerId }).then((res) => {
        const device = res.data[0]
        setDevice(device)

        loadAttributes(device?.id?.id)
      })
    }

    const loadAttributes = (deviceId?: string) => {
      if (!deviceId) return

      getDeviceAttributes(deviceId).then((res) => {
        console.log('设备属性', res)
      })

      getLatestDeviceTimeseries(deviceId).then((res) => {
        console.log('设备最新数据', res)
      })
    }

    loadDevices(customerId)
  }, [customerId, setDevice])

  return (
    <div className={style.home}>
      <RunEfficiency />
      <OnlineData />
      <Card title="运行概览">
        <ThreeModel />
      </Card>
      <ControlAdvice />
      <ScreenControl />
    </div>
  )
}

export default App
