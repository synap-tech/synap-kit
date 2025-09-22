import { flexRender } from '@tanstack/react-table';

import useTable from '@/hooks/useTable';

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
import { TableToolbar } from './_components/toolbar';
import { getCommonPinningStyles } from './_helpers/getCommonPinningStyle';

function DataTable({ children }: { children?: React.ReactNode }) {
  const { table, isLoading, isEntry, childrenInsideTable } = useTable();

  return (
    <div className='flex h-fit flex-col px-5 py-4 bg-white rounded-md'>
      <TableToolbar />
      <div
        className={cn(
          'relative max-h-fit flex-1 overflow-auto border rounded-md'
        )}
      >
        <TableComponent>
          <TableHeader className='sticky left-0 right-0 top-0 z-20'>
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
                        }),
                      }}
                      className='py-2  first:pl-6 text-left '
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
          <TableBody className='divide-y-[1px] divide-border'>
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
                        }),
                      }}
                      className='first:pl-6  truncate'
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
              <TableRow>
                <TableCell
                  colSpan={table.getAllColumns().length}
                  className='h-24 text-center'
                >
                  No results.
                </TableCell>
              </TableRow>
            )}

            {children && childrenInsideTable === true && (
              <TableRow>
             
                  {children}
                
              </TableRow>
            )}
          </TableBody>
        </TableComponent>
      </div>
      {children && childrenInsideTable === false && (
        <div className='mt-4'>{children}</div>
      )}
      <TablePagination />
    </div>
  );
}

export default DataTable;
