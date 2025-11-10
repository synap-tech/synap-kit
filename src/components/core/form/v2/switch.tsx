import { Switch } from '@/components/ui/switch';

import { FormBase } from './_helper/form-base';
import type { FormSwitch } from './types';

const FormSwitch: FormSwitch = ({
  fieldProps,
  disabled,
  className,
  ...props
}) => {
  return (
    <FormBase {...props} horizontal controlFirst>
      {({ onChange, value, ...field }) => (
        <Switch
          {...field}
          {...fieldProps}
          disabled={disabled}
          className={className}
          checked={value}
          onCheckedChange={onChange}
        />
      )}
    </FormBase>
  );
};

export default FormSwitch;
