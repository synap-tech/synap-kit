import { type ClassNamesConfig } from 'react-select';

import { cn } from '@/lib/utils';

export const classNames = (
  extraControlClassName?: string,
  isToolbar: boolean = false
): ClassNamesConfig => ({
  container: () =>
    cn(
      'w-full h-fit border border-border bg-input/30 rounded',
      isToolbar && 'bg-transparent'
    ),
  control: ({ isFocused, isDisabled }) =>
    cn(
      'w-full h-9 !min-h-auto  px-3 py-2 text-sm text-foreground !m-0',
      isFocused && 'outline outline-2 outline-offset-2 outline-secondary',
      isDisabled &&
        'cursor-not-allowed border-destructive/50 !from-destructive/5 !to-destructive/5 text-destructive',
      isToolbar && 'h-8 py-0 !min-h-0',
      extraControlClassName
    ),
  placeholder: () => 'text-muted-foreground text-sm',
  input: () => 'grow',
  singleValue: () => 'grow',
  multiValue: () => 'border border-input px-2 rounded bg-base-200',
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
