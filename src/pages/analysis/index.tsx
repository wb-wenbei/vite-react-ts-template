import React from 'react'
import { Segmented, DatePicker } from 'antd'
import type { GetProp } from 'antd'
import WaterQuality from './components/WaterQuality'
import RunData from './components/RunData'
import Energy from './components/Energy'
import style from './index.module.less'

const { RangePicker } = DatePicker

const App: React.FC = () => {
  const [current, setCurrent] = React.useState('出水水质')
  const [timeType, setTimeType] = React.useState('小时')

  const onDateChange: GetProp<typeof RangePicker, 'onChange'> = (dates) => {
    console.log(dates)
  }

  return (
    <div className={style.analysis}>
      <div className={style.header}>
        <Segmented<string>
          value={current}
          options={['出水水质', '生化区能耗', '运行数据']}
          onChange={(value) => setCurrent(value)}
        />
        <div className={style.actions}>
          <RangePicker
            picker={timeType === '月' ? 'month' : undefined}
            showTime={timeType === '小时'}
            format={timeType === '小时' ? 'YYYY-MM-DD HH' : undefined}
            onChange={onDateChange}
          />
          <Segmented<string> value={timeType} options={['小时', '日', '月']} onChange={(value) => setTimeType(value)} />
        </div>
      </div>
      {current === '出水水质' && <WaterQuality />}
      {current === '生化区能耗' && <Energy />}
      {current === '运行数据' && <RunData />}
    </div>
  )
}

export default App
