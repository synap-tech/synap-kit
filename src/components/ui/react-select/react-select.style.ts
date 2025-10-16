import { type ClassNamesConfig } from 'react-select';

import { cn } from '@/lib/utils';

export const classNames = (
  extraControlClassName?: string,
  isToolbar: boolean = false
): ClassNamesConfig => ({
  container: ({ isMulti }) =>
    cn(
      'w-full h-fit border border-border bg-input/30 rounded',
      isToolbar && 'bg-transparent',
      isMulti && '!h-auto sb-red'
    ),
  control: ({ isFocused, isDisabled, isMulti }) =>
    cn(
      'w-full h-9 !min-h-auto  px-3 py-2 text-sm text-foreground !m-0 rounded',
      isFocused && 'ring-2 ring-ring ring-offset-0 ring-offset-transparent',
      isDisabled &&
        'cursor-not-allowed border-destructive/50 !from-destructive/5 !to-destructive/5 text-destructive',
      isToolbar && 'h-8 py-0 !min-h-0',
      isMulti && 'flex  gap-0.5 !h-auto w-full',
      extraControlClassName
    ),
  placeholder: () => 'text-muted-foreground text-sm',
  input: () => 'grow',
  singleValue: () => 'grow',
  multiValue: () => 'border border-input px-2 rounded bg-white dark:bg-black',
  valueContainer: () => 'flex flex-wrap gap-2',
  menu: () =>
    'bg-popover text-popover-foreground overflow-hidden  rounded shadow-2xl text-sm border border-input p-1 ',
  option: ({ isFocused, isSelected }) =>
    cn(
      'rounded px-3 py-1.5 text-sm text-foreground',
      isFocused && 'bg-background',
      isSelected && 'before:mr-1 before:content-["✔"]'
    ),
  noOptionsMessage: () =>
    'text-destructive text-sm p-2 bg-destructive/5 border border-destructive/20 rounded',
});
