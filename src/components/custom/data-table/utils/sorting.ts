import { SortingFn, SortingState } from '@tanstack/react-table'

export interface InitialSort {
  key: string
  descending: boolean
}

export function createInitialSortingState(initialSort: InitialSort | undefined): SortingState {
  if (!initialSort) {
    return []
  }

  return [
    {
      id: initialSort.key,
      desc: initialSort.descending,
    },
  ]
}

export const autoSortingFn: SortingFn<any> = (rowA, rowB, columnId) => {
  const a = rowA.getValue(columnId)
  const b = rowB.getValue(columnId)

  const aValue = typeof a === 'string' ? a.trim() : a
  const bValue = typeof b === 'string' ? b.trim() : b

  if (aValue === bValue) return 0
  if (aValue == null) return 1
  if (bValue == null) return -1

  return aValue > bValue ? 1 : -1
}

export const createSortingFns = () => ({
  auto: autoSortingFn,
})
