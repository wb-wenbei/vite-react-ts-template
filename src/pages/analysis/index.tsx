import React from 'react'
import style from './index.module.less'
import { Segmented, DatePicker } from 'antd'
import type { GetProp } from 'antd'

const { RangePicker } = DatePicker

const App: React.FC = () => {
  const [current, setCurrent] = React.useState('AAAAA')
  const [timeType, setTimeType] = React.useState('小时')

  const onDateChange: GetProp<typeof RangePicker, 'onChange'> = (dates) => {
    console.log(dates)
  }

  return (
    <div className={style.analysis}>
      <div className={style.header}>
        <Segmented<string>
          value={current}
          options={['AAAAA', 'BBBBB', 'CCCCC']}
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
      <div className={style.content}></div>
    </div>
  )
}

export default App
