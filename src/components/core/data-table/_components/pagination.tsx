import { ChevronLeft, ChevronRight } from 'lucide-react';

import useTable from '@/hooks/useTable';

import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import PaginateButtons from '../_helpers/paginate-buttons';

export function TablePagination() {
  const { table, enableRowSelection } = useTable();

  return (
    <div className='sticky bottom-0 left-0 right-0 z-50 bg-card'>
      <div className='flex w-full items-center justify-between overflow-hidden pt-3'>
        {enableRowSelection === true ? (
          <div className='flex-1 text-sm text-muted-foreground'>
            {table.getFilteredSelectedRowModel().rows.length} of{' '}
            {table.getFilteredRowModel().rows.length} row(s) selected.
          </div>
        ) : null}
        <div className='w-full  flex flex-col-reverse lg:flex-row flex-1 lg:items-center  justify-between gap-2 lg:gap-8'>
          <div className='flex items-center gap-2  sticky right-0 top-0'>
            <p className='text-sm font-medium text-base-400 hidden lg:block'>
              Showing
            </p>
            <Select
              value={`${table.getState().pagination.pageSize}`}
              onValueChange={(value) => {
                table.setPageSize(Number(value));
              }}
            >
              <SelectTrigger
                aria-label='Rows per page'
                className='h-8 w-[70px]'
              >
                <SelectValue
                  placeholder={table.getState().pagination.pageSize}
                />
              </SelectTrigger>
              <SelectContent side='top'>
                {[10, 50, 100].map((pageSize) => (
                  <SelectItem key={pageSize} value={`${pageSize}`}>
                    {pageSize}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <p className='text-sm font-medium text-base-400'>
              of {table.getFilteredRowModel().rows.length}
            </p>
          </div>

          <div className='flex-1  w-full  overflow-auto scrollbar flex items-center lg:justify-center gap-1'>
            <Button
              aria-label='Go to previous page'
              variant='ghost'
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <ChevronLeft className='h-4 w-4' />
              <span>Previous</span>
            </Button>
            <PaginateButtons
              onChange={(index) => {
                table.setPageIndex(index);
              }}
              currentPage={table.getState().pagination.pageIndex}
              totalPages={table.getPageCount()}
            />

            <Button
              aria-label='Go to next page'
              variant='ghost'
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <span>Next</span>
              <ChevronRight className='h-4 w-4' />
            </Button>
          </div>

          <div></div>
        </div>
      </div>
    </div>
  );
}
