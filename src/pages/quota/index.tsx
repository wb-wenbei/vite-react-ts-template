import React, { useMemo } from 'react'
import ControlTable from './components/ControlTable'
import style from './index.module.less'
import { CONSUME_DATA_LIST, ONLINE_DATA_IN_EXTRA_LIST, ONLINE_DATA_OTHER_LIST, ONLINE_DATA_OUT_LIST } from '@/constants'

const App: React.FC = () => {
  const inList = useMemo(() => {
    return ONLINE_DATA_IN_EXTRA_LIST.map((item) => ({
      key: item.key,
      metric: item.title,
      manual: false,
      manualInput: false,
      value: item.value,
      valueInput: item.value,
      unit: item.unit,
    }))
  }, [])

  const outList = useMemo(() => {
    return ONLINE_DATA_OUT_LIST.map((item) => ({
      key: item.key,
      metric: item.title,
      manual: false,
      manualInput: false,
      value: item.value,
      valueInput: item.value,
      unit: item.unit,
    }))
  }, [])

  const otherList = useMemo(() => {
    return ONLINE_DATA_OTHER_LIST.map((item) => ({
      key: item.key,
      metric: item.title,
      manual: false,
      manualInput: false,
      value: item.value,
      valueInput: item.value,
      unit: item.unit,
    }))
  }, [])

  const consumeList = useMemo(() => {
    return CONSUME_DATA_LIST.map((item) => ({
      key: item.key,
      metric: item.title,
      manual: false,
      manualInput: false,
      value: item.value,
      valueInput: item.value,
      unit: item.unit,
    }))
  }, [])

  return (
    <div className={style.quota}>
      <div className={style.row}>
        <ControlTable data={inList} />
        <ControlTable data={outList} />
      </div>
      <div className={style.row}>
        <ControlTable data={otherList} />
        <ControlTable data={consumeList} />
      </div>
    </div>
  )
}

export default App
