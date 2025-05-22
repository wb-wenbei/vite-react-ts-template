import React, { useMemo } from 'react'
import ControlTable, { type DataItem as TableDataItem } from './components/ControlTable'
import style from './index.module.less'
import {
  CONSUME_DATA_LIST,
  ONLINE_DATA_IN_EXTRA_LIST,
  ONLINE_DATA_OTHER_LIST,
  ONLINE_DATA_OUT_LIST,
  type DataItem,
} from '@/constants'
import useSystemStore from '@/stores/system'
import { getDeiviceLatestValueByKey } from '@/utils'

const App: React.FC = () => {
  const { deviceList } = useSystemStore()

  const getItem = (deviceList: Device[], item: DataItem) => {
    const { value, device } = getDeiviceLatestValueByKey(deviceList, item.key)

    return {
      key: item.key,
      metric: item.title,
      manual: false,
      manualInput: false,
      value: value,
      valueInput: value,
      unit: item.unit,
      entityId: device?.id?.id,
    } as TableDataItem
  }

  const inList = useMemo(() => {
    return ONLINE_DATA_IN_EXTRA_LIST.map((item) => getItem(deviceList, item))
  }, [deviceList])

  const outList = useMemo(() => {
    return ONLINE_DATA_OUT_LIST.map((item) => getItem(deviceList, item))
  }, [deviceList])

  const otherList = useMemo(() => {
    return ONLINE_DATA_OTHER_LIST.map((item) => getItem(deviceList, item))
  }, [deviceList])

  const consumeList = useMemo(() => {
    return CONSUME_DATA_LIST.map((item) => getItem(deviceList, item))
  }, [deviceList])

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
