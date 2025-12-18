import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface User {
  id: string
  name: string
  email: string
}

interface StoreState {
  count: number
  increment: () => void
  decrement: () => void
  reset: () => void

  user: User | null
  setUser: (user: User | null) => void
  clearUser: () => void

  theme: 'light' | 'dark' | 'system'
  setTheme: (theme: 'light' | 'dark' | 'system') => void

  isLoading: boolean
  setLoading: (isLoading: boolean) => void
}

export const useStore = create<StoreState>()(
  persist(
    (set) => ({
      count: 0,
      increment: () => set((state) => ({ count: state.count + 1 })),
      decrement: () => set((state) => ({ count: state.count - 1 })),
      reset: () => set({ count: 0 }),

      user: null,
      setUser: (user) => set({ user }),
      clearUser: () => set({ user: null }),

      theme: 'system',
      setTheme: (theme) => set({ theme }),

      isLoading: false,
      setLoading: (isLoading) => set({ isLoading }),
    }),
    {
      name: 'app-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        theme: state.theme,
        user: state.user,
      }),
    },
  ),
)
