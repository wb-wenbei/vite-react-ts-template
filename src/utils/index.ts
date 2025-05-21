import type { DataItem } from '@/constants'
import { string } from 'three/tsl'

// 根据设备类型types获取设备选项列表
export function getOptionsByDeviceTypes(deviceList: Device[], types: string[]) {
  return deviceList
    .filter((device) => device.type && types.includes(device.type))
    .map((device) => {
      const unit = device.attributeList?.find((item) => item.key === 'unit')?.value || ''

      const latestTimeserie = device.latestTimeserie || ({} as DeviceTimeserie)
      const value = latestTimeserie[device.type as string]?.value

      return {
        key: device.type,
        title: device.name,
        unit,
        value,
      } as OptionItem
    })
}

// 根据设备类型types获取设备选项列表
export function updateOptionsValues(deviceList: Device[], options: DataItem[]) {
  return options.map((option) => {
    const device = deviceList.find((device) => device.type === option.key)
    if (device) {
      const latestTimeserie = device.latestTimeserie || ({} as DeviceTimeserie)
      const value = latestTimeserie[device.type as string]?.value || '--'
      return {
        ...option,
        value,
      }
    }
    return option
  })
}

export function getLatestDeviceTimeserieByKey(key: string, data: DeviceTimeserie = {}) {
  if (!key || !data || !data[key] || !data[key].length) return ''

  const value = data[key][0].value

  switch (key) {
    case 'SludgeScreeningTime': {
      const { StartTime, StopTime } = (JSON.parse(value as string)[0] || {}) as { StartTime: number; StopTime: number }
      return ((StopTime - StartTime) / (1000 * 60)).toFixed(2)
    }

    default:
      return value
  }
}
