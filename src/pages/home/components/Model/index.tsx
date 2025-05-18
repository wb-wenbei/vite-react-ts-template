import React from 'react'
import Card from '@/components/Card'
import ThreeModel from '@/components/ThreeModel'
import SvgIcon from '@/components/Icon'
import style from './index.module.less'

const ControlAdvice: React.FC = () => {
  return (
    <Card title="运行概览">
      <div className={style.container}>
        <div className={style.header}>
          <div>
            <SvgIcon name="running" />
            设备正在运行
          </div>
          <div>
            今日已开启<span className={style.time}>2.3</span>小时
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
