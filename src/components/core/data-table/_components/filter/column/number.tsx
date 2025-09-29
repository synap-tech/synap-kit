import { useMemo } from 'react';

import DebouncedInput from '@/components/ui/debounce-input';

import type { IFilterProps } from '../../../types';

function NumberFilter<TData, TValue>({ column }: IFilterProps<TData, TValue>) {
  const columnFilterValue = column.getFilterValue();

  const sortedUniqueValues: number[] = useMemo(
    () => Array.from(column.getFacetedUniqueValues().keys()).sort(),
    [column]
  );

  return (
    <div className='flex space-x-2'>
      <DebouncedInput
        type='number'
        value={(columnFilterValue as [number, number])?.[0] ?? ''}
        onChange={(value) =>
          column.setFilterValue((old: [number, number]) => [value, old?.[1]])
        }
        placeholder={`Min (${Math.min(...sortedUniqueValues)})`}
        className='flex-1 rounded border'
      />
      <DebouncedInput
        type='number'
        value={(columnFilterValue as [number, number])?.[1] ?? ''}
        onChange={(value) =>
          column.setFilterValue((old: [number, number]) => [old?.[0], value])
        }
        placeholder={`Max (${Math.max(...sortedUniqueValues)})`}
        className='flex-1 rounded border'
      />
    </div>
  );
}

export default NumberFilter;
