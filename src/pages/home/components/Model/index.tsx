import React from 'react'
import Card from '@/components/Card'
import ThreeModel from '@/components/ThreeModel'
import SvgIcon from '@/components/Icon'
import style from './index.module.less'
import useSystemStore from '@/stores/system'

const ControlAdvice: React.FC = () => {
  const { deviceInfo } = useSystemStore()
  const running = deviceInfo?.client.Running
  const time = deviceInfo?.client.UpTime

  return (
    <Card title="运行概览">
      <div className={style.container}>
        <div className={style.header}>
          <div>
            <SvgIcon name="running" />
            {running ? '设备正在运行' : '设备已停止'}
          </div>
          <div>
            今日已开启<span className={style.time}>{time || 0}</span>小时
          </div>
        </div>
        <div className={style.model}>
          <ThreeModel />
        </div>
      </div>
    </Card>
  )
}

export default ControlAdvice
