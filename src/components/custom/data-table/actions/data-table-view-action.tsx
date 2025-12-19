import { Eye } from 'lucide-react'
import { DataTableActionButton } from './data-table-action-button'

interface DataTableViewActionProps {
  onView: () => void
  disabled?: boolean
  tooltip?: string
}

export function DataTableViewAction({
  onView,
  disabled = false,
  tooltip = 'Visualizar',
}: DataTableViewActionProps) {
  return (
    <DataTableActionButton
      icon={Eye}
      tooltip={tooltip}
      onClick={onView}
      disabled={disabled}
      className='text-emerald-500 hover:text-emerald-500 dark:text-emerald-600 dark:hover:text-emerald-600'
    />
  )
}
