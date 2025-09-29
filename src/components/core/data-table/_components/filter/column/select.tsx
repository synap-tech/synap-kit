import { useMemo } from 'react';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import type { IFilterProps } from '../../../types';

function SelectFilter<TData, TValue>({ column }: IFilterProps<TData, TValue>) {
  // Memoize the select options to prevent unnecessary re-renders
  const selectOptions = useMemo(
    () => [
      { value: '', label: 'All' },
      { value: 1, label: 'Success' },
      { value: 0, label: 'Canceled' },
    ],
    []
  );

  return (
    <Select onValueChange={(e) => column.setFilterValue(e)}>
      <SelectTrigger className='w-[180px]'>
        <SelectValue placeholder='All' />
      </SelectTrigger>
      <SelectContent>
        {selectOptions.map((option) => (
          <SelectItem key={option.value} value={String(option.value)}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default SelectFilter;
