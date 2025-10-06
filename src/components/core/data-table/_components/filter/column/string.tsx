import { useMemo } from 'react';

import DebouncedInput from '@/components/ui/debounce-input';

import type { IFilterProps } from '../../../types';

function StringFilter<TData, TValue>({ column }: IFilterProps<TData, TValue>) {
  const columnFilterValue = column.getFilterValue();

  const sortedUniqueValues = useMemo(
    () => Array.from(column.getFacetedUniqueValues().keys()).sort(),
    [column]
  );

  return (
    <div>
      <datalist id={column.id + 'list'}>
        {sortedUniqueValues.slice(0, 10).map((value, index) => (
          <option
            key={
              value !== null && value !== undefined ? value : `option-${index}`
            }
            value={value}
          />
        ))}
      </datalist>
      <DebouncedInput
        className='w-full rounded-toolbar border'
        onChange={(value) => column.setFilterValue(value)}
        placeholder={`Search...`}
        type='text'
        list={column.id + 'list'}
        value={(columnFilterValue ?? '') as string}
      />
    </div>
  );
}

export default StringFilter;
