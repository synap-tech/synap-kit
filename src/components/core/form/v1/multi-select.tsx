import { FormControl } from '@/components/ui/form';
import { MultiSelect } from '@/components/ui/multi-select';

import FormItemWrapper from './form-item-wrapper';
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
    <FormItemWrapper
      label={label}
      disableLabel={disableLabel}
      subLabel={subLabel}
      optional={optional}
      required={required}
      info={info}
    >
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
    </FormItemWrapper>
  );
};

export default FormMultiSelect;
