import { TableRow } from '@/components/ui/table'
import { DataTableBodyCell } from './data-table-body-cell'

export function DataTableRow({
  row,
  expandable,
  columnsLength,
}: {
  row: any
  expandable?: {
    render: (props: { row: any }) => React.ReactNode
  }
  columnsLength: number
}) {
  const isExpanded = row.getIsExpanded()

  return (
    <>
      <TableRow className='border-table-border bg-table-body hover:bg-table-row-hover border-b transition-colors'>
        {row.getVisibleCells().map((cell: any) => (
          <DataTableBodyCell key={cell.id} cell={cell} isExpanded={isExpanded} />
        ))}
      </TableRow>
      {row.getIsExpanded() && expandable && (
        <tr>
          <td
            colSpan={columnsLength}
            className='bg-table-row-hover border-table-border'
            style={{ contain: 'strict' }}
          >
            <div className='border-table-border border-b px-3 py-2' key={`expanded-${row.id}`}>
              {expandable.render({ row })}
            </div>
          </td>
        </tr>
      )}
    </>
  )
}
