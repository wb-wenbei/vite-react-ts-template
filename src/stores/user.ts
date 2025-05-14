import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface UserStore {
  userInfo?: User
  setUserInfo: (userInfo: User) => void
  token: string
  setToken: (token: string) => void
  clear: () => void
}

// Only persist these keys
const persistKeys: string[] = ['userInfo', 'token']

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
      clear: () => {
        set({ userInfo: undefined, token: '' })
      },
    }),
    {
      name: 'user',
      partialize: (state) => Object.fromEntries(Object.entries(state).filter(([key]) => persistKeys.includes(key))),
      storage: createJSONStorage(() => localStorage),
    }
  )
)

export default useUserStore
