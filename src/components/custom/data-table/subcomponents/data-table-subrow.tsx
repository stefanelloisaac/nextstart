'use client'

import { flexRender, Row } from '@tanstack/react-table'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { getSublevelClasses, getSublevelBadge } from '../configs/sublevels'
import { TableCell, TableRow } from '@/components/ui/table'
import { cn } from '@/lib/utils'

interface DataTableSubRowProps<TData> {
  row: Row<TData>
  depth: number
  hasSubRows: boolean
  onToggleExpand: () => void
  badge?: {
    enable: boolean
    field?: string
    length?: number
  }
}

export function DataTableSubRow<TData>({
  row,
  depth,
  hasSubRows,
  onToggleExpand,
  badge: badgeConfig,
}: DataTableSubRowProps<TData>) {
  const isExpanded = row.getIsExpanded()
  const sublevelClasses = getSublevelClasses(depth)
  const badge = getSublevelBadge(depth)

  const enableBadges = badgeConfig?.enable ?? false
  const badgeField = badgeConfig?.field ?? 'orderId'
  const badgePadLength = badgeConfig?.length

  const getBadgeContent = () => {
    const value = (row.original as any)[badgeField]
    if (value === undefined || value === null) return badge?.label

    const stringValue = String(value)
    if (badgePadLength && !isNaN(Number(value))) {
      return stringValue.padStart(badgePadLength, '0')
    }
    return stringValue
  }

  return (
    <TableRow
      className={cn(
        'border-table-border hover:bg-table-row-hover border-b transition-colors',
        sublevelClasses,
      )}
      data-depth={depth}
      data-badge-color={badge?.lineColor}
    >
      {row.getVisibleCells().map((cell, index) => {
        const columnDef = cell.column.columnDef
        const columnSize = columnDef.size
        const width = columnSize ? `${columnSize}px` : undefined
        const minWidth = columnDef.minSize ? `${columnDef.minSize}px` : undefined
        const maxWidth = columnDef.maxSize ? `${columnDef.maxSize}px` : undefined

        const isFirstColumn = index === 0
        const isExpandColumn = cell.column.id === 'expand'
        const isFirstDataColumn = index === 1

        return (
          <TableCell
            key={cell.id}
            className={cn(
              'border-table-border border-r px-3 py-1 text-foreground last:border-r-0',
              isFirstDataColumn ? 'overflow-hidden' : 'truncate',
            )}
            style={{
              width,
              minWidth,
              maxWidth,
            }}
          >
            {isFirstColumn && isExpandColumn ? (
              hasSubRows ? (
                <div className='flex items-center justify-center'>
                  <button
                    onClick={onToggleExpand}
                    className='hover:bg-table-row-hover rounded p-1 transition-colors'
                  >
                    {isExpanded ? (
                      <ChevronUp className='h-4 w-4' />
                    ) : (
                      <ChevronDown className='h-4 w-4' />
                    )}
                  </button>
                </div>
              ) : (
                <div className='w-[24px]' />
              )
            ) : isFirstDataColumn ? (
              <div className='flex w-full items-center overflow-hidden'>
                {enableBadges && (
                  <>
                    <div className='shrink-0 text-[11px] font-semibold not-italic opacity-100'>
                      <span
                        className={cn(
                          'inline-flex min-w-[32px] items-center justify-center rounded-md px-2 py-0.5',
                          badge?.classes,
                        )}
                      >
                        {getBadgeContent()}
                      </span>
                    </div>
                    {depth > 0 ? (
                      <div className='mr-2 flex items-center'>
                        <div
                          className={cn('h-1 shrink-0', badge?.lineColor)}
                          style={{ width: `${depth * 40}px` }}
                        />
                        <div className={cn('h-2 w-2 shrink-0', badge?.lineColor)} />
                      </div>
                    ) : (
                      <div className='w-2' />
                    )}
                  </>
                )}
                <div className='min-w-0 flex-1 truncate'>
                  {flexRender(columnDef.cell, cell.getContext())}
                </div>
              </div>
            ) : (
              flexRender(columnDef.cell, cell.getContext())
            )}
          </TableCell>
        )
      })}
    </TableRow>
  )
}
