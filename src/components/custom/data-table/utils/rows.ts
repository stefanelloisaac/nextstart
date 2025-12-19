import { ColumnDef } from '@tanstack/react-table'

export function generateRowId<TData>(
  row: TData,
  getRowId: ((row: TData) => string) | undefined,
  columns: ColumnDef<TData, any>[],
): string {
  if (getRowId) {
    return getRowId(row)
  }

  if ((row as any).id) {
    return String((row as any).id)
  }

  const firstThreeColumns = columns.slice(0, 3).map((col: any) => col.accessorKey || col.id || '')

  return firstThreeColumns
    .map((key: string) => (row as any)[key])
    .filter(Boolean)
    .join('-')
}
