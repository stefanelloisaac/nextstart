import { Plus } from 'lucide-react'
import { DataTableActionButton } from './data-table-action-button'

interface DataTableCreateActionProps {
  onCreate: () => void
  disabled?: boolean
  tooltip?: string
}

export function DataTableCreateAction({
  onCreate,
  disabled = false,
  tooltip = 'Adicionar',
}: DataTableCreateActionProps) {
  return (
    <DataTableActionButton
      icon={Plus}
      tooltip={tooltip}
      onClick={onCreate}
      disabled={disabled}
      className='text-green-500 hover:text-green-500 dark:text-green-600 dark:hover:text-green-600'
    />
  )
}
