import React, { useState } from 'react'
import Card from '@/components/Card'
import style from './index.module.less'
import { InputNumber, Radio, Segmented, Space } from 'antd'
import SvgIcon from '@/components/Icon'
import { RUN_STATUS_OPTIONS } from '@/constants'

type Props = { data?: unknown }

const ScreenControl: React.FC<Props> = (props) => {
  const { data } = props
  const [mode, setMode] = useState('auto')
  const [manualStatus, setManualStatus] = useState('open')
  console.log('筛分控制', data)

  const modeOptions = [
    {
      label: (
        <Space>
          <SvgIcon name="auto" />
          <span>自动模式</span>
        </Space>
      ),
      value: 'auto',
    },
    {
      label: (
        <Space>
          <SvgIcon name="manual" />
          <span>手动模式</span>
        </Space>
      ),
      value: 'manual',
    },
  ]

  const toggleMode = (e: string) => {
    setMode(e)
  }

  const toggleStatus = (e: string) => {
    setManualStatus(e)
  }

  return (
    <Card title="筛分控制">
      <div className={style.control}>
        <div className={style.mode}>
          <div className={style.title}>控制模式</div>
          <Radio.Group
            value={mode}
            block
            optionType="button"
            buttonStyle="solid"
            options={modeOptions}
            onChange={(e) => toggleMode(e.target.value)}
          />
        </div>

        <div className={`${style.auto} ${mode === 'auto' ? style.active : ''}`}>
          <div className={style.title}>自动控制{mode === 'auto' ? '已' : '未'}启动</div>
          <div className={style.item}>
            <div>今日开启时长</div>
            <div className={style.itemValue}>30 min</div>
          </div>
          <div className={style.item}>
            <div>今日开启时间</div>
            <div className={style.itemValue}>12:00:00</div>
          </div>
        </div>
        <div className={`${style.manual} ${mode === 'manual' ? style.active : ''}`}>
          <div className={style.title}>手动控制{mode === 'manual' ? '已' : '未'}启动</div>
          <div className={style.item}>
            <div>设备状态</div>
            <Segmented
              value={manualStatus}
              disabled={mode !== 'manual'}
              options={RUN_STATUS_OPTIONS}
              onChange={toggleStatus}
            />
          </div>
          <div className={style.item}>
            <Space>
              运行
              <InputNumber disabled={mode !== 'manual' || manualStatus !== 'open'} size="small" />
              小时后自动关闭
            </Space>
          </div>
        </div>
      </div>
    </Card>
  )
}

export default ScreenControl
