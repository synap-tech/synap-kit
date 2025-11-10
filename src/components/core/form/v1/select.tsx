import { FormControl } from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';

import FormItemWrapper from './form-item-wrapper';
import type { FormSelectProps } from './types';

const FormSelect: React.FC<FormSelectProps> = ({
  field,
  label,
  placeholder = 'Select an option',
  optional = false,
  options,
  isDisabled = false,
  disableLabel,
  valueType = 'string',
  isLoading = false,
  onValueChange,
  required,
  info,
  subLabel,
}) => {
  return (
    <FormItemWrapper
      label={label}
      disableLabel={disableLabel}
      subLabel={subLabel}
      optional={optional}
      required={required}
      info={info}
    >
      <FormControl>
        {isLoading ? (
          <Skeleton className='bg-gradient h-10 w-full rounded border border-input' />
        ) : (
          <Select
            onValueChange={(value) => {
              if (valueType === 'number') {
                field.onChange(Number(value));
                onValueChange?.(value);
              } else {
                field.onChange(value);
                onValueChange?.(value);
              }
            }}
            defaultValue={field.value}
            disabled={isDisabled}
            {...field}
            value={field?.value?.toString()}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {options.map((option) => (
                <SelectItem
                  key={option.value}
                  value={option?.value?.toString()}
                >
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </FormControl>
    </FormItemWrapper>
  );
};

export default FormSelect;
