import { Row, ColumnDef, ExpandedState, SortingState } from '@tanstack/react-table'
import { ReactElement } from 'react'

export interface PaginationState {
  pageIndex: number
  pageSize: number
}

export interface UIConfig {
  height?: string
  showToolbar?: boolean
  compact?: {
    enabled: boolean
    loading?: boolean
  }
}

export interface SearchConfig {
  key: string
  placeholder?: string
}

export interface SortingConfig {
  enabled?: boolean
  initial?: {
    key: string
    descending: boolean
  }
}

export interface ExpandableConfigRender<TData> {
  mode: 'render'
  render: (props: { row: Row<TData> }) => ReactElement
}

export interface ExpandableConfigSublevels<TData> {
  mode: 'sublevels'
  sublevels: (parentRow: TData) => TData[]
  badge?: {
    enable: boolean
    field?: string
    length?: number
  }
}

export type ExpandableConfig<TData> =
  | ExpandableConfigRender<TData>
  | ExpandableConfigSublevels<TData>

export interface RowConfig<TData> {
  id?: (row: TData) => string
  expandable?: ExpandableConfig<TData>
}

export interface PaginationConfig {
  mode?: 'client' | 'server'
  pageSize?: number
  server?: {
    pageCount: number
    currentPage?: number
    onPageChange: (state: PaginationState) => void
  }
}

export interface ActionsConfig {
  refresh?: () => void
}

export interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  search: SearchConfig
  ui?: UIConfig
  sorting?: SortingConfig
  row?: RowConfig<TData>
  pagination?: PaginationConfig
  actions?: ActionsConfig
  queryKeys?: string[]
}

export interface DataTableState {
  globalFilter: string
  expanded: ExpandedState
  sorting: SortingState
}
