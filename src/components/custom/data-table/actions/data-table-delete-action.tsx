import { Trash2 } from 'lucide-react'
import { DataTableActionButton } from './data-table-action-button'

interface DataTableDeleteActionProps {
  onDelete: () => void
  disabled?: boolean
  tooltip?: string
}

export function DataTableDeleteAction({
  onDelete,
  disabled = false,
  tooltip = 'Excluir',
}: DataTableDeleteActionProps) {
  return (
    <DataTableActionButton
      icon={Trash2}
      tooltip={tooltip}
      onClick={onDelete}
      disabled={disabled}
      className='text-red-500 hover:text-red-500 dark:text-red-600 dark:hover:text-red-600'
    />
  )
}
