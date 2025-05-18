import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface SystemStore {
  companyInfo?: CompanyInfo
  setCompanyInfo: (companyInfo: CompanyInfo) => void
  deviceList: Device[]
  setDeviceList: (device: Device[]) => void
}

// Only persist these keys
const persistKeys: string[] = ['companyInfo', 'device']

const useSystemStore = create<SystemStore>()(
  persist(
    (set) => ({
      companyInfo: undefined,
      setCompanyInfo: (companyInfo: CompanyInfo) => {
        set({ companyInfo })
      },
      deviceList: [],
      setDeviceList: (deviceList: Device[]) => {
        set({ deviceList })
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
