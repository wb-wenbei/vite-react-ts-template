import React, { useEffect, useMemo, useState } from 'react'
import Card from '@/components/Card'
import style from './index.module.less'
import { InputNumber, Radio, Segmented, Space } from 'antd'
import SvgIcon from '@/components/Icon'
import { CONTROL_ADVICE, RUN_STATUS_OPTIONS } from '@/constants'
import useSystemStore from '@/stores/system'
import { getLatestDeviceTimeserieByKey } from '@/utils'
import { saveDeviceAttributes } from '@/apis'

const ScreenControl: React.FC = () => {
  const [mode, setMode] = useState('auto')
  const [manualStatus, setManualStatus] = useState('open')
  const [timeClose, setTimeClose] = useState<number | null>()
  const { deviceInfo, deviceList } = useSystemStore()
  const time = deviceInfo?.client?.UpTime || deviceInfo?.UpTime

  const adviceTime = useMemo(() => {
    const device = deviceList.find((item) => item.type === CONTROL_ADVICE.key)

    if (!device) return ''

    return getLatestDeviceTimeserieByKey('SludgeScreeningTime', device.latestTimeserie || {})
  }, [deviceList])

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
    if (!deviceInfo?.deviceId) return

    setMode(e)

    const params: Record<string, unknown> = { auto_mode: e === 'auto' }

    if (e === 'auto') {
      params.manual_control = {
        SludgeScreeningTime: {
          StartTime: null,
          StopTime: null,
        },
      }
    }

    saveDeviceAttributes(deviceInfo.deviceId, params).catch(() => {
      setMode(e === 'auto' ? 'manual' : 'auto')
    })
  }

  const toggleStatus = (e: string) => {
    if (!deviceInfo?.deviceId) return

    setManualStatus(e)

    const params: DeviceInfo = {
      manual_control: {
        SludgeScreeningTime: {
          StartTime: null,
          StopTime: null,
        },
      },
    }

    if (e === 'open') params.manual_control!.SludgeScreeningTime.StartTime = Date.now()

    saveDeviceAttributes(deviceInfo.deviceId, params as Record<string, unknown>).catch(() => {
      setMode(e === 'auto' ? 'manual' : 'auto')
    })
  }

  const changeCloseTime = (e: number | null) => {
    if (!deviceInfo?.deviceId) return

    const lastValue = timeClose

    setTimeClose(e)

    const SludgeScreeningTime = { ...deviceInfo?.manual_control?.SludgeScreeningTime }
    if (!e) {
      SludgeScreeningTime.StopTime = null
    } else {
      SludgeScreeningTime.StopTime = Date.now() + e * 60 * 60 * 1000
    }

    saveDeviceAttributes(deviceInfo.deviceId, { manual_control: { SludgeScreeningTime } }).catch(() => {
      setTimeClose(lastValue)
    })
  }

  useEffect(() => {
    setMode(deviceInfo?.auto_mode ? 'auto' : 'manual')

    const StartTime = deviceInfo?.manual_control?.SludgeScreeningTime?.StartTime
    const StopTime = deviceInfo?.manual_control?.SludgeScreeningTime?.StopTime

    if (StartTime && Date.now() > StartTime) {
      setManualStatus('open')
      if (!StopTime) {
        setTimeClose(undefined)
      } else {
        const time = ((StopTime - Date.now()) / (1000 * 60 * 60)).toFixed(1)
        setTimeClose(+time)
      }
    } else {
      setManualStatus('close')
      setTimeClose(undefined)
    }
  }, [deviceInfo])

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
            <div>今日建议开启时长</div>
            <div className={style.itemValue}>{adviceTime} min</div>
          </div>
          <div className={style.item}>
            <div>今日开启时间</div>
            <div className={style.itemValue}>{time}小时</div>
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
              <InputNumber
                value={timeClose}
                disabled={mode !== 'manual' || manualStatus !== 'open'}
                size="small"
                onChange={changeCloseTime}
              />
              小时后自动关闭
            </Space>
          </div>
        </div>
      </div>
    </Card>
  )
}

export default ScreenControl
