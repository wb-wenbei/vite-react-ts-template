import React, { useEffect, useMemo, useState } from 'react'
import { Segmented, DatePicker } from 'antd'
import type { GetProp } from 'antd'
import WaterQuality from './components/WaterQuality'
import RunData from './components/RunData'
import Energy from './components/Energy'
import style from './index.module.less'
import dayjs from 'dayjs'

const { RangePicker } = DatePicker

const startFormat = {
  小时: 'YYYY-MM-DD HH:00:00',
  日: 'YYYY-MM-DD 00:00:00',
  月: 'YYYY-MM-01 00:00:00',
}

const getEndFormat = (time: string) => {
  const day = dayjs(time).endOf('month').date()

  return {
    小时: 'YYYY-MM-DD HH:59:59',
    日: 'YYYY-MM-DD 23:59:59',
    月: `YYYY-MM-${day} 23:59:59`,
  }
}

const App: React.FC = () => {
  const [current, setCurrent] = useState('出水水质')
  const [timeRange, setTimeRange] = useState<string[]>([])
  const [timeType, setTimeType] = useState('日')

  const currentTimeRange = useMemo(() => {
    const timeStartFormat = startFormat[timeType as keyof typeof startFormat]
    const timeEndFormat = getEndFormat(timeRange[1])[timeType as keyof typeof getEndFormat]

    const start = dayjs(timeRange[0]).format(timeStartFormat)
    const end = dayjs(timeRange[1]).format(timeEndFormat)

    console.log('currentTimeRange', start, end)

    return [start, end]
  }, [timeRange, timeType])

  const onDateChange = (dates: dayjs.Dayjs[]) => {
    const timeFormat = startFormat[timeType as keyof typeof startFormat]
    const start = dates[0]?.format(timeFormat)
    const end = dates[1]?.format(timeFormat)
    setTimeRange([start, end])
  }

  useEffect(() => {
    if (timeRange.length) return

    const timeFormat = startFormat[timeType as keyof typeof startFormat]
    const start = dayjs(Date.now() - 24 * 60 * 60 * 1000).format(timeFormat)
    const end = dayjs().format(timeFormat)

    setTimeRange([start, end])
  }, [timeType, timeRange])

  return (
    <div className={style.analysis}>
      <div className={style.header}>
        <Segmented<string>
          value={current}
          options={['出水水质', '生化区能耗', '运行数据']}
          onChange={(value) => setCurrent(value)}
        />
        <div className={style.actions}>
          {timeRange.length > 0 && (
            <RangePicker
              value={[dayjs(timeRange[0]), dayjs(timeRange[1])]}
              picker={timeType === '月' ? 'month' : undefined}
              showTime={timeType === '小时'}
              format={timeType === '小时' ? 'YYYY-MM-DD HH' : undefined}
              allowClear={false}
              onChange={onDateChange as GetProp<typeof RangePicker, 'onChange'>}
            />
          )}

          <Segmented<string> value={timeType} options={['小时', '日', '月']} onChange={(value) => setTimeType(value)} />
        </div>
      </div>
      {current === '出水水质' && <WaterQuality timeRange={currentTimeRange} />}
      {current === '生化区能耗' && <Energy />}
      {current === '运行数据' && <RunData />}
    </div>
  )
}

export default App
