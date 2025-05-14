import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface SystemStore {
  companyInfo?: CompanyInfo
  setCompanyInfo: (companyInfo: CompanyInfo) => void
}

// Only persist these keys
const persistKeys: string[] = ['companyInfo']

const useSystemStore = create<SystemStore>()(
  persist(
    (set) => ({
      companyInfo: undefined,
      setCompanyInfo: (companyInfo: CompanyInfo) => {
        set({ companyInfo })
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
