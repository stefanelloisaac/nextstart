import { TableHead } from '@/components/ui/table'
import { flexRender } from '@tanstack/react-table'
import { ChevronDownSquare, ChevronUpSquare } from 'lucide-react'

export function DataTableHeaderCell({ header, compact }: { header: any; compact: boolean }) {
  const columnSize = header.column.columnDef.size
  const width = columnSize ? `${columnSize}px` : undefined
  const minWidth = header.column.columnDef.minSize
    ? `${header.column.columnDef.minSize}px`
    : undefined
  const maxWidth = header.column.columnDef.maxSize
    ? `${header.column.columnDef.maxSize}px`
    : undefined

  return (
    <TableHead
      className={`${
        compact ? 'h-[45px]' : 'h-9'
      } border-table-border bg-table-header dark:bg-table-header border-r px-3 text-sm font-semibold tracking-tight text-foreground last:border-r-0 ${
        header.column.getCanSort() ? 'hover:bg-table-border/20 cursor-pointer select-none' : ''
      }`}
      style={{
        width,
        minWidth,
        maxWidth,
      }}
      onClick={header.column.getToggleSortingHandler()}
    >
      <div className='flex items-center gap-2'>
        {flexRender(header.column.columnDef.header, header.getContext())}
        {header.column.getCanSort() && (
          <div className='ml-auto'>
            {{
              asc: <ChevronUpSquare className='h-4 w-4' />,
              desc: <ChevronDownSquare className='h-4 w-4' />,
            }[header.column.getIsSorted() as string] ?? <div className='h-4 w-4' />}
          </div>
        )}
      </div>
    </TableHead>
  )
}
