import { useRef } from 'react'
import { flexRender } from '@tanstack/react-table'
import { TableCell } from '@/components/ui/table'

export function DataTableBodyCell({ cell, isExpanded }: { cell: any; isExpanded: boolean }) {
  const ref = useRef<HTMLTableCellElement>(null)

  const handleMouseEnter = () => {
    const el = ref.current
    if (el && el.scrollWidth > el.clientWidth) {
      el.setAttribute('title', el.textContent ?? '')
    } else if (el) {
      el.removeAttribute('title')
    }
  }

  const columnSize = cell.column.columnDef.size
  const width = columnSize ? `${columnSize}px` : undefined
  const minWidth = cell.column.columnDef.minSize ? `${cell.column.columnDef.minSize}px` : undefined
  const maxWidth = cell.column.columnDef.maxSize ? `${cell.column.columnDef.maxSize}px` : undefined

  return (
    <TableCell
      ref={ref}
      onMouseEnter={handleMouseEnter}
      className='border-table-border truncate border-r px-3 py-1 text-sm text-foreground last:border-r-0'
      style={{
        width,
        minWidth,
        maxWidth,
      }}
      data-expanded={isExpanded}
    >
      {flexRender(cell.column.columnDef.cell, cell.getContext())}
    </TableCell>
  )
}
