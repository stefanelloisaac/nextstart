'use client'

import { useState, useTransition, useRef, useEffect, useEffectEvent } from 'react'
import { Search, X } from 'lucide-react'
import { Input } from '@/components/ui/input'

interface DataTableSearchProps {
  placeholder?: string
  onSearchChange: (value: string) => void
  onClear?: () => void
  disabled?: boolean
  value?: string
}

export function DataTableSearch({
  placeholder = 'Localizar',
  onSearchChange,
  onClear,
  disabled = false,
  value: externalValue,
}: DataTableSearchProps) {
  const [value, setValue] = useState('')
  const [, startTransition] = useTransition()
  const inputRef = useRef<HTMLInputElement>(null)

  // Sincroniza o estado interno quando o valor externo muda
  const update = useEffectEvent((val: string) => {
    setValue(val)
  })

  useEffect(() => {
    if (externalValue !== undefined) {
      update(externalValue)
    }
  }, [externalValue])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setValue(newValue)

    startTransition(() => {
      onSearchChange(newValue)
    })
  }

  const handleClear = () => {
    setValue('')
    startTransition(() => {
      onSearchChange('')
    })
    onClear?.()
    inputRef.current?.focus()
  }

  return (
    <div className='relative'>
      <Search className='absolute top-2.5 left-2 h-4 w-4 text-muted-foreground' />
      <Input
        ref={inputRef}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        disabled={disabled}
        className='border border-border pr-8 pl-8'
      />
      {value && (
        <button
          onClick={handleClear}
          className='absolute top-2.5 right-2 h-4 w-4 text-muted-foreground hover:text-foreground'
          disabled={disabled}
        >
          <X className='h-4 w-4' />
        </button>
      )}
    </div>
  )
}
