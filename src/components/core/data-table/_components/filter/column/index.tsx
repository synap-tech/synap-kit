import type { Column } from '@tanstack/react-table';
import { Pin } from 'lucide-react';
import { toast } from 'sonner';

import useTable from '@/hooks/useTable';

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

import { cn } from '@/lib/utils';

import DateFilter from './date';
import NumberFilter from './number';
import SelectFilter from './select';
import StringFilter from './string';

// Define the props interface for the component
interface TableColumnFilterProps<T> {
  column: Column<T, unknown>;
  showLabel?: boolean;
}

// Define the component as a generic function to improve type inference
function TableColumnFilter<T>({
  column,
  showLabel = false,
}: TableColumnFilterProps<T>) {
  const { pinnedColumns, addPinnedColumn, removePinnedColumn } = useTable();
  const filterVariant = column.columnDef.meta?.filterVariant;

  // Render the appropriate filter component based on the filter variant
  const renderFilter = () => {
    switch (filterVariant) {
      case 'range':
        return <NumberFilter column={column} showLabel={showLabel} />;
      case 'select':
        return <SelectFilter column={column} showLabel={showLabel} />;
      case 'dateRange':
        return (
          <DateFilter
            datePickerClassName='border rounded-sm h-10'
            column={column}
            showLabel={showLabel}
          />
        );
      case 'text':
        return <StringFilter column={column} showLabel={showLabel} />;
      default:
        return <StringFilter column={column} showLabel={showLabel} />;
    }
  };

  const isPinned = pinnedColumns.includes(column.id);

  function handlePinning(id: string) {
    const isAlreadyPinned = pinnedColumns.some((filter) => filter === id);

    if (isAlreadyPinned) {
      removePinnedColumn(id);
      toast.warning(`${id} has been unpinned`, {
        position: 'bottom-right',
      });
    } else {
      addPinnedColumn(id);
      toast.success(`${id} has been pinned`, {
        position: 'bottom-right',
      });
    }
  }

  return (
    <div className={cn('flex flex-col gap-0.5 w-full md:w-auto')}>
      <div className='flex items-center justify-between gap-2'>
        {showLabel && (
          <Label id={column.id}>
            {typeof column.columnDef.header === 'string'
              ? column.columnDef.header
              : column.id?.split('_').join(' ')}
          </Label>
        )}

        <Button
          onClick={() => handlePinning(column.id)}
          className='size-8 rounded-full p-0'
          variant={isPinned ? 'ghost-destructive' : 'ghost'}
          size={'icon'}
        >
          <Pin
            fill={isPinned ? 'currentColor' : 'none'}
            className={cn(
              'size-4 transition-transform duration-100 ease-in',
              isPinned ? 'rotate-45 text-destructive' : 'text-muted-foreground'
            )}
          />
        </Button>
      </div>
      {renderFilter()}
    </div>
  );
}

export default TableColumnFilter;
