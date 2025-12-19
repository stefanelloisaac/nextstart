export function pluralize(count: number, singular: string, plural: string): string {
  return count === 1 ? singular : plural
}

export function formatSearchResultsText(
  totalRows: number,
  searchTerm: string,
): {
  count: number
  text: string
  searchTerm: string
} {
  return {
    count: totalRows,
    text: pluralize(totalRows, 'resultado', 'resultados'),
    searchTerm,
  }
}

export function formatEmptyStateText(hasFilter: boolean): string {
  return hasFilter ? 'Nenhum resultado encontrado para sua busca.' : 'Nenhum item encontrado.'
}
