import {
  getBrandInfo,
  getCustomerDevices,
  getDeviceAttributes,
  getDeviceInfo,
  getLatestDeviceTimeseries,
  getRunEfficiencyInfo,
} from '@/apis'
import { SLUDEG_SIEVE } from '@/constants'
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface SystemStore {
  systemInfo?: SystemInfo // 系统名称/背景图信息
  updateSystemInfo: () => void
  deviceList: Device[] // 设备列表及实时数据信息
  updateDeviceList: (customerId?: string) => void
  deviceInfo?: DeviceInfo // 设备运行状态信息
  updateDeviceInfo: () => void
  runEfficiencyInfo: InfoItem[]
  updateRunEfficiencyInfo: () => void
}

// Only persist these keys
const persistKeys: string[] = ['systemInfo', 'deviceList', 'deviceInfo']

const useSystemStore = create<SystemStore>()(
  persist(
    (set) => ({
      systemInfo: undefined,
      updateSystemInfo: async () => {
        const res = (await getBrandInfo()) || []
        let icon_url = res.find((item) => item.key === 'icon_url')?.value
        let company_name = res.find((item) => item.key === 'company_name')?.value
        let background_image_url = res.find((item) => item.key === 'background_image_url')?.value

        if (icon_url === 'undefined') icon_url = ''
        if (company_name === 'undefined') company_name = ''
        if (background_image_url === 'undefined') background_image_url = ''

        set({ systemInfo: { icon_url, company_name, background_image_url } as SystemInfo })
      },
      deviceList: [],
      updateDeviceList: (customerId?: string) => {
        const loadDevices = (customerId?: string) => {
          if (!customerId) return

          getCustomerDevices({ page: 0, pageSize: 50, customerId: customerId }).then((res) => {
            const deviceList = res.data || []
            console.log('设备列表', deviceList)
            set({ deviceList: [...deviceList] })

            res.data.forEach((device) => {
              loadAttributes(device, deviceList)
              loadTimeseries(device, deviceList)
            })
          })
        }

        const loadAttributes = (device: Device, deviceList: Device[]) => {
          if (!device.id?.id) return

          getDeviceAttributes(device.id.id).then((res) => {
            device.attributeList = res
            set({ deviceList: [...deviceList] })

            if (device.type === SLUDEG_SIEVE.key) {
              const info = res.reduce(
                (acc, { key, value }) => {
                  return { ...acc, [key]: value }
                },
                { deviceId: device.id?.id } as DeviceInfo
              )

              set((state) => {
                return { deviceInfo: { ...state.deviceInfo, ...info } }
              })
            }
          })
        }

        const loadTimeseries = (device: Device, deviceList: Device[]) => {
          if (!device.id?.id) return

          getLatestDeviceTimeseries(device.id.id).then((res) => {
            device.latestTimeserie = res
            set({ deviceList: [...deviceList] })
          })
        }

        loadDevices(customerId)
      },
      deviceInfo: undefined,
      updateDeviceInfo: async () => {
        const deviceInfo = await getDeviceInfo()
        set({ deviceInfo })
      },
      runEfficiencyInfo: [],
      updateRunEfficiencyInfo: async () => {
        const res = await getRunEfficiencyInfo()
        set({ runEfficiencyInfo: res || [] })
      },
    }),
    {
      name: 'system',
      partialize: (state) => Object.fromEntries(Object.entries(state).filter(([key]) => persistKeys.includes(key))),
      storage: createJSONStorage(() => localStorage),
    }
  )
)

export default useSystemStore
