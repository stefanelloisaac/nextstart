import { createContext } from 'react'

interface IBaseContext {
  data: { [key: string]: number }
}

export const BaseContext = createContext<IBaseContext | undefined>(undefined)
