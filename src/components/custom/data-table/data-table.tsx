'use client'

import { Table, TableBody, TableCell, TableHeader, TableRow } from '@/components/ui/table'
import {
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
  getExpandedRowModel,
  ExpandedState,
  SortingState,
  getSortedRowModel,
  getPaginationRowModel,
  ColumnDef,
} from '@tanstack/react-table'
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  X,
  RefreshCw,
  Loader,
  ChevronsDown,
  ChevronsUp,
} from 'lucide-react'
import { useRef, useState, useCallback, useMemo, useEffect } from 'react'
import { useVirtualizer } from '@tanstack/react-virtual'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { DataTableSearch } from './subcomponents/data-table-search'
import { DataTableHeaderCell } from './subcomponents/data-table-header-cell'
import { DataTableRow } from './subcomponents/data-table-row'
import { DataTableSubRow } from './subcomponents/data-table-subrow'
import { createInitialSortingState, createSortingFns } from './utils/sorting'
import { generateRowId } from './utils/rows'
import { formatEmptyStateText, pluralize } from './utils/text-helpers'
import { getSublevelOrderColor } from './configs/sublevels'
import { DataTableProps } from '@/types/data-table.types'
import { cn } from '@/lib/utils'

export function DataTable<TData, TValue>({
  columns,
  data,
  search,
  ui = {},
  sorting: sortingConfig = {},
  row,
  pagination: paginationConfig = {},
  actions = {},
}: DataTableProps<TData, TValue>) {
  // Desestruturação das props
  const {
    height = 'h-[calc(100vh-9rem)]',
    showToolbar = true,
    compact = { enabled: false, loading: false },
  } = ui

  const { enabled: enableSorting = true, initial: initialSort } = sortingConfig
  const { pageSize = 20 } = paginationConfig
  const { refresh: onRefresh } = actions

  const getRowId = row?.id
  const expandableConfig = row?.expandable
  const mode = expandableConfig?.mode ?? 'render'
  const isSublevelsMode = mode === 'sublevels'

  const renderFn =
    expandableConfig && expandableConfig.mode === 'render' ? expandableConfig.render : undefined
  const sublevels =
    expandableConfig && expandableConfig.mode === 'sublevels'
      ? expandableConfig.sublevels
      : undefined
  const badgeConfig =
    expandableConfig && expandableConfig.mode === 'sublevels' ? expandableConfig.badge : undefined

  // Refs
  const tableContainerRef = useRef<HTMLDivElement>(null)
  const hasExpandableRowsRef = useRef<Set<any>>(new Set())
  const tableRef = useRef<any>(null)
  const tableBodyRef = useRef<HTMLTableSectionElement>(null)

  // Estado: Filtro
  const [globalFilter, setGlobalFilter] = useState('')

  const handleSetFilterValue = useCallback((value: string) => {
    setGlobalFilter(value)
  }, [])

  const handleClearFilter = useCallback(() => {
    setGlobalFilter('')
  }, [])

  // Reset página quando o filtro muda
  useEffect(() => {
    if (!isSublevelsMode) {
      setPagination((prev) => ({ ...prev, pageIndex: 0 }))
    }
  }, [globalFilter, isSublevelsMode])

  // Estado: Ordenação
  const [sorting, setSorting] = useState<SortingState>(createInitialSortingState(initialSort))

  const sortingFns = useMemo(() => createSortingFns(), [])

  // Estado: Paginação (disabled for sublevels mode)
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: compact.enabled ? 20 : pageSize,
  })

  // Estado: Expansão de linhas
  const [expanded, setExpanded] = useState<ExpandedState>({})

  const handleExpandedChange = useCallback(
    (updater: any) => {
      setExpanded((prev) => {
        const next = typeof updater === 'function' ? updater(prev) : updater

        if (isSublevelsMode) {
          return next
        } else {
          const newExpandedId = Object.entries(next).find(
            ([id, isExpanded]) => isExpanded && !prev[id as keyof ExpandedState],
          )?.[0]

          return newExpandedId ? { [newExpandedId]: true } : next
        }
      })
    },
    [isSublevelsMode],
  )

  // auto-expand quando filtra em modo sublevels
  useMemo(() => {
    if (!isSublevelsMode || !globalFilter || !tableRef.current) return

    const expandAllRows = () => {
      const allRowIds: ExpandedState = {}

      const collectRowIds = (rows: any[]) => {
        rows.forEach((row) => {
          allRowIds[row.id] = true
          if (row.subRows && row.subRows.length > 0) {
            collectRowIds(row.subRows)
          }
        })
      }

      collectRowIds(tableRef.current.getCoreRowModel().rows)
      setExpanded(allRowIds)
    }

    expandAllRows()
  }, [globalFilter, isSublevelsMode])

  useMemo(() => {
    if (!isSublevelsMode || globalFilter) return
    setExpanded({})
  }, [globalFilter, isSublevelsMode])

  const adaptedColumns = useMemo(() => {
    if (!isSublevelsMode) return columns

    const expandColumn: ColumnDef<TData> = {
      id: 'expand',
      size: 40,
      maxSize: 40,
      minSize: 40,
      enableHiding: false,
      enablePinning: true,
      header: ({ table }: { table: any }) => {
        const hasExpandableRows = hasExpandableRowsRef.current.size > 0
        if (!hasExpandableRows) return <div className='w-[40px]' />

        const isAllExpanded = table.getIsAllRowsExpanded()

        const handleToggleAll = () => {
          if (!tableRef.current) return
          table.toggleAllRowsExpanded()
        }

        return (
          <div className='flex h-full w-full items-center justify-center'>
            <button
              onClick={handleToggleAll}
              className='hover:bg-table-row-hover rounded p-1 transition-colors'
            >
              {isAllExpanded ? (
                <ChevronsUp className='h-4 w-4' />
              ) : (
                <ChevronsDown className='h-4 w-4' />
              )}
            </button>
          </div>
        )
      },
      cell: () => null,
    }

    return [expandColumn, ...columns]
  }, [isSublevelsMode, columns])

  // Row ID - Memoizado corretamente
  const rowIdFn = useMemo(() => {
    return (row: TData) => generateRowId(row, getRowId, adaptedColumns)
  }, [getRowId, adaptedColumns])

  // Estado da tabela
  const tableState = useMemo(
    () => ({
      globalFilter,
      expanded,
      sorting,
      ...(!isSublevelsMode && { pagination }),
    }),
    [globalFilter, expanded, sorting, pagination, isSublevelsMode],
  )

  // Instância da tabela
  const table = useReactTable({
    data,
    columns: adaptedColumns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getSortedRowModel: getSortedRowModel(),
    ...(!isSublevelsMode && { getPaginationRowModel: getPaginationRowModel() }),
    getRowId: rowIdFn,
    state: tableState,
    ...(!isSublevelsMode && { onPaginationChange: setPagination }),
    onSortingChange: setSorting,
    enableSorting: enableSorting,
    enableMultiSort: enableSorting,
    onExpandedChange: handleExpandedChange,
    sortingFns: sortingFns,
    manualPagination: false,
    manualFiltering: false,
    manualSorting: false,
    autoResetPageIndex: false,
    filterFromLeafRows: true,
    maxLeafRowFilterDepth: 10,
    ...(isSublevelsMode &&
      sublevels && {
        getSubRows: sublevels,
      }),
  })

  tableRef.current = table

  useMemo(() => {
    if (!isSublevelsMode || !sublevels) return

    hasExpandableRowsRef.current.clear()

    const checkExpandable = (rows: TData[]) => {
      rows.forEach((row) => {
        const subRows = sublevels(row)
        if (subRows && subRows.length > 0) {
          hasExpandableRowsRef.current.add(row)
          checkExpandable(subRows)
        }
      })
    }

    checkExpandable(data)
  }, [data, isSublevelsMode, sublevels])

  // Dados da tabela
  const allRows = isSublevelsMode
    ? table.getFilteredRowModel().rows.filter((row) => row.depth === 0)
    : table.getPaginationRowModel().rows

  const rows = allRows

  const flattenedRows = useMemo(() => {
    if (!isSublevelsMode) return []

    const flattened: Array<{
      row: any
      depth: number
      hasSubRows: boolean
    }> = []

    const flattenRow = (row: any, depth: number = 0) => {
      const hasSubRows = (row.subRows?.length || 0) > 0
      flattened.push({ row, depth, hasSubRows })

      if (row.getIsExpanded() && hasSubRows) {
        row.subRows.forEach((subRow: any) => flattenRow(subRow, depth + 1))
      }
    }

    rows.forEach((row) => flattenRow(row, 0))
    return flattened
  }, [isSublevelsMode, rows])

  const levelCounts = useMemo(() => {
    if (!isSublevelsMode) return {}

    const counts: Record<number, number> = {}
    const countByDepth = (rows: any[], depth: number = 0) => {
      rows.forEach((row) => {
        counts[depth] = (counts[depth] || 0) + 1
        if (row.subRows && row.subRows.length > 0) {
          countByDepth(row.subRows, depth + 1)
        }
      })
    }

    countByDepth(table.getFilteredRowModel().rows.filter((row) => row.depth === 0))
    return counts
  }, [isSublevelsMode, table])

  const rowVirtualizer = useVirtualizer({
    count: isSublevelsMode ? flattenedRows.length : 0,
    getScrollElement: () => tableContainerRef.current,
    estimateSize: () => 41,
    overscan: 10,
    enabled: isSublevelsMode,
  })

  // Paginação
  const currentPage = table.getState().pagination.pageIndex + 1
  const totalPages = table.getPageCount()
  const totalRows = table.getFilteredRowModel().rows.length

  return (
    <div
      className={`flex w-full flex-col ${height} border-table-border bg-table-body dark:bg-table-body relative rounded-lg border shadow-sm`}
    >
      {compact.enabled && compact.loading && (
        <div className='bg-table-body dark:bg-table-body absolute inset-0 z-30 flex items-center justify-center rounded-lg'>
          <Loader className='h-8 w-8 animate-spin text-primary' />
        </div>
      )}
      {!compact.loading && (
        <div className='bg-table-body/50 dark:bg-table-body/50 absolute inset-0 z-30 flex items-center justify-center rounded-lg backdrop-blur-sm'>
          <div className='bg-table-header border-table-border flex flex-col items-center gap-2 rounded-lg border px-6 py-4 shadow-lg'>
            <Loader className='h-6 w-6 animate-spin text-primary' />
            <span className='mt-2 text-sm text-muted-foreground'>Atualizando dados</span>
          </div>
        </div>
      )}
      {!compact.enabled && (
        <div className='border-table-border bg-table-header dark:bg-table-header rounded-t-lg border-b p-4'>
          <div className='flex items-center justify-between gap-4'>
            <div className='flex flex-1 items-center gap-4'>
              <div className='max-w-md flex-1'>
                <DataTableSearch
                  placeholder={search.placeholder || 'Localizar'}
                  value={globalFilter}
                  onSearchChange={handleSetFilterValue}
                  onClear={handleClearFilter}
                />
              </div>

              {globalFilter && (
                <div className='bg-table-body border-table-border max-w-md rounded-md border px-3 py-2 text-sm text-muted-foreground shadow-sm'>
                  <span className='font-medium'>{totalRows}</span>{' '}
                  {pluralize(totalRows, 'resultado', 'resultados')} para{' '}
                  <span className='inline-block max-w-[200px] truncate align-bottom font-semibold text-foreground'>
                    &quot;{globalFilter}&quot;
                  </span>
                </div>
              )}
            </div>

            {showToolbar && (
              <div className='flex items-center gap-2'>
                {onRefresh && (
                  <Button
                    onClick={onRefresh}
                    variant='outline'
                    size='sm'
                    className='bg-table-body border-table-border hover:bg-table-row-hover h-10 px-3 shadow-sm'
                  >
                    <RefreshCw className='mr-2 h-4 w-4' />
                    Atualizar
                  </Button>
                )}
              </div>
            )}

            {(totalRows > 1 || data.length > 1) && (
              <div className='bg-table-body border-table-border ml-2 rounded-md border px-3 py-2 text-sm text-muted-foreground shadow-sm'>
                {isSublevelsMode
                  ? `${rows.length} ${pluralize(rows.length, 'item', 'itens')}`
                  : `${rows.length} de ${data.length} itens`}
              </div>
            )}
          </div>
        </div>
      )}

      <div
        ref={tableContainerRef}
        className={cn(
          'bg-table-empty-space dark:bg-table-empty-space min-h-0 min-w-0 flex-1',
          isSublevelsMode ? 'overflow-auto' : 'flex flex-col overflow-scroll',
          compact.enabled && 'rounded-t-lg',
        )}
        style={{ scrollbarWidth: 'thin' }}
      >
        <Table className='w-full max-w-full min-w-0'>
          <TableHeader className='bg-table-header dark:bg-table-header sticky top-0 z-10'>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className='border-table-border border-b hover:bg-transparent'
              >
                {headerGroup.headers.map((header) => (
                  <DataTableHeaderCell key={header.id} header={header} compact={compact.enabled} />
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody
            ref={tableBodyRef}
            className='[&_tr:last-child]:border-table-border [&_tr:last-child]:border-b'
          >
            {rows.length > 0 ? (
              isSublevelsMode ? (
                <tr>
                  <td colSpan={adaptedColumns.length} style={{ padding: 0, border: 0 }}>
                    <div
                      style={{
                        height: `${rowVirtualizer.getTotalSize()}px`,
                        position: 'relative',
                      }}
                    >
                      {rowVirtualizer.getVirtualItems().map((virtualRow) => {
                        const { row, depth, hasSubRows } = flattenedRows[virtualRow.index]
                        return (
                          <div
                            key={row.id}
                            style={{
                              position: 'absolute',
                              top: 0,
                              left: 0,
                              width: '100%',
                              height: `${virtualRow.size}px`,
                              transform: `translateY(${virtualRow.start}px)`,
                            }}
                          >
                            <table
                              className='w-full border-collapse'
                              style={{ tableLayout: 'fixed' }}
                            >
                              <tbody>
                                <DataTableSubRow
                                  row={row}
                                  depth={depth}
                                  hasSubRows={hasSubRows}
                                  onToggleExpand={() => row.toggleExpanded()}
                                  badge={badgeConfig}
                                />
                              </tbody>
                            </table>
                          </div>
                        )
                      })}
                    </div>
                  </td>
                </tr>
              ) : (
                rows.map((row) => (
                  <DataTableRow
                    key={row.id}
                    row={row}
                    expandable={renderFn ? { render: renderFn } : undefined}
                    columnsLength={adaptedColumns.length}
                  />
                ))
              )
            ) : (
              <TableRow>
                <TableCell
                  colSpan={adaptedColumns.length}
                  className='bg-table-body border-table-border py-12 text-center'
                >
                  <div className='flex flex-col items-center justify-center gap-2'>
                    <div className='bg-table-header/50 border-table-border rounded-lg border p-6'>
                      <p className='mb-2 text-sm font-normal text-muted-foreground'>
                        {formatEmptyStateText(!!globalFilter)}
                      </p>
                      {globalFilter && (
                        <Button
                          onClick={handleClearFilter}
                          variant='outline'
                          size='sm'
                          className='mt-2'
                        >
                          <X className='mr-2 h-4 w-4' />
                          Limpar busca
                        </Button>
                      )}
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div
        className={`flex items-center ${
          compact.enabled ? 'justify-between' : 'justify-between'
        } gap-4 ${
          compact.enabled ? 'p-2' : 'p-3'
        } border-table-border bg-table-header dark:bg-table-header flex-shrink-0 rounded-b-lg border-t`}
      >
        {isSublevelsMode ? (
          <div className='flex w-full items-center justify-between'>
            <div className='flex items-center gap-4'>
              {Object.entries(levelCounts).map(([depth, count]) => {
                const depthNum = parseInt(depth)
                return (
                  <div
                    key={depth}
                    className='bg-table-body border-table-border flex items-center gap-2 rounded-md border px-3 py-1.5'
                  >
                    <div
                      className={`h-2.5 w-2.5 rounded-full ${getSublevelOrderColor(depthNum)}`}
                    />
                    <span className='text-xs text-muted-foreground'>Nível {depthNum}</span>
                    <span className='text-sm font-semibold text-foreground'>{count}</span>
                  </div>
                )
              })}
            </div>
            <div className='bg-table-body border-table-border flex items-center gap-2 rounded-md border px-3 py-1.5'>
              <span className='text-xs text-muted-foreground'>Total:</span>
              <span className='text-sm font-semibold text-foreground'>
                {Object.values(levelCounts).reduce((sum, count) => sum + count, 0)}
              </span>
            </div>
          </div>
        ) : (
          <>
            {compact.enabled ? (
              <div className='text-xs text-muted-foreground'>
                {rows.length} de {data.length} itens
              </div>
            ) : (
              <div className='flex items-center gap-4'>
                <div className='flex items-center gap-2'>
                  <span className='text-sm text-muted-foreground'>Mostrar</span>
                  <Select
                    value={`${table.getState().pagination.pageSize}`}
                    onValueChange={(value) => {
                      table.setPageSize(Number(value))
                    }}
                  >
                    <SelectTrigger className='bg-table-body border-table-border h-8 w-16 text-sm'>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent side='top'>
                      {[10, 20, 30, 50, 100].map((size) => (
                        <SelectItem key={size} value={`${size}`}>
                          {size}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <span className='text-sm text-muted-foreground'>por página</span>
                </div>
              </div>
            )}

            <div className={`flex items-center ${compact.enabled ? 'gap-2' : 'gap-4'}`}>
              <div className={`${compact.enabled ? 'text-xs' : 'text-sm'} text-muted-foreground`}>
                Página {currentPage} de {totalPages}
              </div>

              <div className='flex items-center gap-1'>
                <Button
                  variant='outline'
                  size='sm'
                  onClick={() => table.setPageIndex(0)}
                  disabled={!table.getCanPreviousPage()}
                  className={`${
                    compact.enabled ? 'h-7 w-7' : 'h-8 w-8'
                  } bg-table-body border-table-border p-0`}
                >
                  <ChevronsLeft className={`${compact.enabled ? 'h-3 w-3' : 'h-4 w-4'}`} />
                </Button>
                <Button
                  variant='outline'
                  size='sm'
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                  className={`${
                    compact.enabled ? 'h-7 w-7' : 'h-8 w-8'
                  } bg-table-body border-table-border p-0`}
                >
                  <ChevronLeft className={`${compact.enabled ? 'h-3 w-3' : 'h-4 w-4'}`} />
                </Button>
                <Button
                  variant='outline'
                  size='sm'
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                  className={`${
                    compact.enabled ? 'h-7 w-7' : 'h-8 w-8'
                  } bg-table-body border-table-border p-0`}
                >
                  <ChevronRight className={`${compact.enabled ? 'h-3 w-3' : 'h-4 w-4'}`} />
                </Button>
                <Button
                  variant='outline'
                  size='sm'
                  onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                  disabled={!table.getCanNextPage()}
                  className={`${
                    compact.enabled ? 'h-7 w-7' : 'h-8 w-8'
                  } bg-table-body border-table-border p-0`}
                >
                  <ChevronsRight className={`${compact.enabled ? 'h-3 w-3' : 'h-4 w-4'}`} />
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
