import { flexRender } from '@tanstack/react-table';

import useTable from '@/hooks/useTable';
import useTheme from '@/hooks/useTheme';

import {
  TableBody,
  TableCell,
  Table as TableComponent,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { cn } from '@/lib/utils';

import { TableColumnHeader } from './_components/column-header';
import { TablePagination } from './_components/pagination';
import TableSkeleton from './_components/skeleton';
import TableWrapper from './_components/table-wrapper';
import { TableToolbar } from './_components/toolbar';
import { getCommonPinningStyles } from './_helpers/getCommonPinningStyle';

function DataTable({ children }: { children?: React.ReactNode }) {
  const { theme } = useTheme();
  const { table, isLoading, childrenInsideTable, extraHeader } = useTable();

  return (
    <TableWrapper>
      <TableToolbar />
      {extraHeader && extraHeader}
      <div className={cn('flex-1 flex flex-col  overflow-auto scrollbar')}>
        <TableComponent>
          <TableHeader className='w-full sticky left-0 right-0 top-0 z-20'>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const content = header.column.columnDef.header;
                  return (
                    <TableHead
                      key={header.id}
                      colSpan={header.colSpan}
                      style={{
                        ...getCommonPinningStyles({
                          column: header.column,
                          isHeader: true,
                          theme,
                        }),
                      }}
                      className='py-2  first:pl-6 text-left !bg-background '
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            typeof content === 'string' ? (
                              <TableColumnHeader column={header.column} />
                            ) : (
                              content
                            ),
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className='divide-y-[1px] divide-border w-full'>
            {isLoading ? (
              <TableSkeleton colSpan={table.getAllColumns().length} />
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                  className=''
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      style={{
                        ...getCommonPinningStyles({
                          column: cell.column,
                          theme,
                        }),
                      }}
                      className={cn(
                        'first:pl-6 break-words text-wrap',
                        cell.column.getIsPinned() && 'bg-card  border-b'
                      )}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow className='w-full'>
                <TableCell
                  colSpan={table.getAllColumns().length}
                  className='h-24 text-center w-full'
                >
                  No results.
                </TableCell>
              </TableRow>
            )}

            {children && childrenInsideTable === true && (
              <TableRow>{children}</TableRow>
            )}
          </TableBody>
        </TableComponent>

        {children && childrenInsideTable === false ? (
          <div className='mt-4'>{children}</div>
        ) : (
          children
        )}

        <TablePagination />
      </div>
    </TableWrapper>
  );
}

export default DataTable;
