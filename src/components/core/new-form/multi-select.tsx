import { MultiSelect } from '@/components/ui/multi-select';

import { FormBase } from './_helper/form-base';
import type { FormMultiSelect } from './types';

const FormMultiSelect: FormMultiSelect = ({
  options,
  disabled,
  placeholder = 'Select an option',
  ...props
}) => {
  return (
    <FormBase {...props}>
      {(field) => (
        <MultiSelect
          disabled={disabled}
          options={options as any}
          onValueChange={field.onChange}
          defaultValue={field.value}
          placeholder={placeholder}
          variant='default'
          maxCount={3}
        />
      )}
    </FormBase>
  );
};

export default FormMultiSelect;
