'use client'

import { BaseContext } from '@/contexts/base-context'

export const BaseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const data = {}

  return <BaseContext.Provider value={{ data }}>{children}</BaseContext.Provider>
}
