import { ChevronDownCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface DataTableExpandActionProps {
  onToggle: () => void
  isExpanded: boolean
  disabled?: boolean
  tooltip?: string
}

export function DataTableExpandAction({
  onToggle,
  isExpanded,
  disabled = false,
  tooltip = 'Expandir',
}: DataTableExpandActionProps) {
  return (
    <Button
      variant='ghost'
      size='icon'
      className='h-8 w-8 text-primary hover:text-primary'
      onClick={onToggle}
      disabled={disabled}
      tooltip={tooltip}
    >
      <ChevronDownCircle
        className={cn('h-4 w-4 transition-transform duration-200', isExpanded && 'rotate-180')}
      />
    </Button>
  )
}
