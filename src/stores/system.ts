import { getBrandInfo, getDeviceInfo } from '@/apis'
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface SystemStore {
  systemInfo?: SystemInfo
  updateSystemInfo: () => void
  deviceList: Device[]
  setDeviceList: (device: Device[]) => void
  deviceInfo?: DeviceInfo
  updateDeviceInfo: () => void
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
      setDeviceList: (deviceList: Device[]) => {
        set({ deviceList })
      },
      deviceInfo: undefined,
      updateDeviceInfo: async () => {
        const deviceInfo = await getDeviceInfo()
        set({ deviceInfo })
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
