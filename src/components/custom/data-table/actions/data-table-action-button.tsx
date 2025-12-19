import { LucideIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface DataTableActionButtonProps {
  icon: LucideIcon
  tooltip: string
  onClick: () => void
  disabled?: boolean
  className?: string
}

export function DataTableActionButton({
  icon: Icon,
  tooltip,
  onClick,
  disabled = false,
  className,
}: DataTableActionButtonProps) {
  return (
    <Button
      variant='ghost'
      size='icon'
      className={cn('h-8 w-8', disabled && 'text-muted-foreground/40', !disabled && className)}
      onClick={onClick}
      disabled={disabled}
      tooltip={tooltip}
    >
      <Icon className='h-4 w-4' />
    </Button>
  )
}
