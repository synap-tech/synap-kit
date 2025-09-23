import { SlidersHorizontal, X } from 'lucide-react';

import useTable from '@/hooks/useTable';

import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

import TableColumnFilter from './column';

const TableAllFilter = () => {
  const { table } = useTable();

  const filteredColumns = table
    .getAllFlatColumns()
    .filter((column) => column.columnDef.meta?.disableFullFilter !== true);

  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          aria-label='Filters All Columns'
          variant='ghost'
          size='toolbar-sm'
        >
          <SlidersHorizontal className='size-4' />
          Filters
        </Button>
      </SheetTrigger>
      <SheetContent className='flex flex-col gap-0 p-0 h-screen overflow-hidden '>
        <SheetHeader className='border-b px-3 py-2 lg:px-4 lg:py-3'>
          <SheetTitle className='flex items-center gap-2'>
            <SlidersHorizontal className='size-4' /> All Filters
          </SheetTitle>
          <SheetDescription className='sr-only'>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </SheetDescription>
        </SheetHeader>

        <div className='flex-1 overflow-hidden pt-3 pb-2'>
          <ScrollArea className='mt-0 h-full px-3 lg:px-4 '>
            <div className='flex flex-col gap-4 px-1'>
              {filteredColumns.length > 0 &&
                filteredColumns.map((column) => (
                  <TableColumnFilter
                    key={column.id}
                    showLabel
                    column={column}
                  />
                ))}
            </div>
          </ScrollArea>
        </div>

        <SheetFooter className='justify-start px-3 lg:px-4'>
          {isFiltered && (
            <Button
              variant='outline-destructive'
              size='sm'
              onClick={() => table.resetColumnFilters()}
            >
              Reset
              <X className='size-4' />
            </Button>
          )}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default TableAllFilter;
