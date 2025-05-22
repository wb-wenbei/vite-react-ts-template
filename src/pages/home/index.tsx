import React, { useEffect } from 'react'
import style from './index.module.less'
import useSystemStore from '@/stores/system'
import Model from './components/Model'
import RunEfficiency from './components/RunEfficiency'
import OnlineData from './components/OnlineData'
import ControlAdvice from './components/ControlAdvice'
import ScreenControl from './components/ScreenControl'

const App: React.FC = () => {
  const { updateDeviceInfo } = useSystemStore()

  useEffect(() => {
    updateDeviceInfo()
  }, [updateDeviceInfo])

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
