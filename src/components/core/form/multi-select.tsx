import { FormControl, FormItem, FormMessage } from '@/components/ui/form';
import { MultiSelect } from '@/components/ui/multi-select';

import CormFormLabel from './label';
import type { FormMultiSelectProps } from './types';

const FormMultiSelect: React.FC<FormMultiSelectProps> = ({
  field,
  label,
  placeholder = 'Select an option',
  optional = false,
  options,
  isDisabled = false,
  disableLabel,
  subLabel,
  required,
  info,
}) => {
  return (
    <FormItem className='w-full space-y-1.5'>
      {!disableLabel && (
        <CormFormLabel
          label={label}
          subLabel={subLabel}
          optional={optional}
          required={required}
          info={info}
        />
      )}
      <FormControl>
        <MultiSelect
          disabled={isDisabled}
          options={options as any}
          onValueChange={field.onChange}
          defaultValue={field.value}
          placeholder={placeholder}
          variant='default'
          maxCount={3}
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  );
};

export default FormMultiSelect;
