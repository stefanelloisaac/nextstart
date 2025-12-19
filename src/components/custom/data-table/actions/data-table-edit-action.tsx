import { Pencil } from 'lucide-react'
import { DataTableActionButton } from './data-table-action-button'

interface DataTableEditActionProps {
  onEdit: () => void
  disabled?: boolean
  tooltip?: string
}

export function DataTableEditAction({
  onEdit,
  disabled = false,
  tooltip = 'Editar',
}: DataTableEditActionProps) {
  return (
    <DataTableActionButton
      icon={Pencil}
      tooltip={tooltip}
      onClick={onEdit}
      disabled={disabled}
      className='text-orange-500 hover:text-orange-500 dark:text-orange-600 dark:hover:text-orange-600'
    />
  )
}
