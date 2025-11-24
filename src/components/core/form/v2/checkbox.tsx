import { Checkbox } from '@/components/ui/checkbox';

import { FormBase } from './_helper/form-base';
import type { FormCheckbox } from './types';

const FormCheckbox: FormCheckbox = ({
  fieldProps,
  disabled,
  className,
  ...props
}) => {
  return (
    <FormBase {...props} horizontal controlFirst>
      {({ onChange, value, ...field }) => (
        <Checkbox
          {...field}
          {...fieldProps}
          disabled={disabled}
          className={className}
          checked={value}
          onCheckedChange={(e) => {
            onChange(e);
            fieldProps?.onCheckedChange?.(e);
          }}
        />
      )}
    </FormBase>
  );
};

export default FormCheckbox;
