'use client'

import { BaseContext } from '@/contexts/base-context'
import { use } from 'react'

export const useBase = () => {
  const context = use(BaseContext)

  if (context === undefined) {
    throw new Error('useBase must be used within a BaseProvider')
  }

  return context
}
