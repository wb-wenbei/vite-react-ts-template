import type { DataItem } from '@/constants'

// 根据设备类型types获取设备选项列表
export function getOptionsByDeviceTypes(deviceList: Device[], types: string[]) {
  return deviceList
    .filter((device) => device.type && types.includes(device.type))
    .map((device) => {
      const unit = device.attributeList?.find((item) => item.key === 'unit')?.value || ''

      const latestTimeserie = device.latestTimeserie || ({} as DeviceTimeserie)
      const valueList = latestTimeserie[device.type as string] || []
      const value = valueList[0]?.value || '--'

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
      const valueList = latestTimeserie[device.type as string] || []
      const value = valueList[0]?.value || '--'
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

export const getTimesToNow = (time?: number, type = 'day') => {
  if (!time) return ''

  const now = new Date().getTime()
  const diff = now - Number(time)

  switch (type) {
    case 'day':
      return Math.floor(diff / (1000 * 60 * 60 * 24)).toFixed(0)
    case 'hour':
      return Math.floor(diff / (1000 * 60 * 60)).toFixed(1)
    case 'minute':
      return Math.floor(diff / (1000 * 60)).toFixed(1)
    default:
      return Math.floor(diff / 1000).toFixed(1)
  }
}

export const getDeiviceLatestValueByKey = (deviceList: Device[], key: string) => {
  const device = deviceList.find((device) => device.type === key)

  const valueList = (device?.latestTimeserie || {})[key]

  const value = valueList?.[0]?.value || ''

  return { device, value }
}
