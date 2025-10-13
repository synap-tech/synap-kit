import { useCallback } from 'react';

import { toast } from 'sonner';

import useTable from '@/hooks/useTable';

import { Button } from '@/components/ui/button';

import TableColumnFilter from './column';

const PinnedColumns = () => {
  const { pinnedColumns, resetPinnedColumns, table } = useTable();

  const resetColumnFilters = useCallback(
    () => table.resetColumnFilters(),
    [table]
  );

  if (!pinnedColumns || pinnedColumns.length === 0) return null;

  const columns = table
    .getAllFlatColumns()
    .filter((column) => column.columnDef.meta?.disableFullFilter !== true)
    .filter((column) => pinnedColumns.includes(column.id));

  return (
    <div className='bg-card mt-4 space-y-4 rounded border px-4 pb-3 pt-2'>
      <div className='flex flex-wrap gap-2 lg:gap-4'>
        {columns.map((column, index) => (
          <TableColumnFilter key={index} column={column} showLabel />
        ))}
      </div>

      <Button
        onClick={() => {
          resetPinnedColumns();
          resetColumnFilters();
          toast.warning('Filters have been cleared', {
            position: 'bottom-right',
          });
        }}
        size={'sm'}
        variant={'destructive'}
      >
        Clear Filters
      </Button>
    </div>
  );
};

export default PinnedColumns;
