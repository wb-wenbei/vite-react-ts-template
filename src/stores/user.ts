import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { StateStorage } from 'zustand/middleware'

interface UserStore {
  userInfo?: User
  setUserInfo: (userInfo: User) => void
  token: string
  setToken: (token: string) => void
  customerId: string
  setCustomerId: (customerId: string) => void
  clear: () => void
}

// Only persist these keys
const persistKeys: string[] = ['userInfo', 'token', 'customerId']

// 自定义存储实现
const createCustomStorage = (): StateStorage => ({
  getItem: async (name: string) => {
    const remember = localStorage.getItem('remember') === 'true'

    if (remember) return localStorage.getItem(name)

    return sessionStorage.getItem(name)
  },
  setItem: (name: string, value: string) => {
    const remember = localStorage.getItem('remember') === 'true'

    if (remember) {
      localStorage.setItem(name, value)
      sessionStorage.removeItem(name)
    } else {
      sessionStorage.setItem(name, value)
      localStorage.removeItem(name)
    }
  },
  removeItem: (name: string) => {
    localStorage.removeItem(name)
    sessionStorage.removeItem(name)
  },
})

const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      userInfo: undefined,
      setUserInfo: (userInfo: User) => {
        set({ userInfo })
      },
      token: '',
      setToken: (token: string) => {
        set({ token })
      },
      customerId: '',
      setCustomerId: (customerId: string) => {
        set({ customerId })
      },
      clear: () => {
        set({ userInfo: undefined, token: '', customerId: '' })
      },
    }),
    {
      name: 'user',
      partialize: (state) => {
        return Object.fromEntries(Object.entries(state).filter(([key]) => persistKeys.includes(key)))
      },
      storage: createJSONStorage(() => createCustomStorage()),
    }
  )
)

export default useUserStore
