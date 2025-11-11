import { useId } from 'react';

import type { IFormSelectOption } from '@/types';

import {
  Select,
  SelectContent,
  SelectItem,
  type SelectProps,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export interface SelectWithLabelProps extends SelectProps {
  label: string;
  placeholder?: string;
  options: Omit<IFormSelectOption, 'unit'>[];
}

const SelectWithLabel: React.FC<SelectWithLabelProps> = ({
  label,
  options,
  placeholder = 'Select an option',
  ...props
}) => {
  const id = useId();
  return (
    <div className='group relative w-full'>
      <label
        htmlFor={id}
        className='bg-ring rounded-md  text-primary-foreground  absolute -top-px left-2 z-10 block -translate-y-1/2 px-1.25 py-0.5 text-xs font-medium group-has-disabled:opacity-50 shadow-xs'
      >
        {label}
      </label>
      <Select {...props}>
        <SelectTrigger id={id} className=' w-full'>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={String(option.value)}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default SelectWithLabel;
