import { Textarea } from '@/components/ui/textarea';

import { FormBase } from './_helper/form-base';
import type { FormTextarea } from './types';

const FormTextarea: FormTextarea = ({
  fieldProps,
  className,
  disabled,
  ...props
}) => {
  return (
    <FormBase {...props}>
      {(field) => (
        <Textarea
          {...field}
          {...fieldProps}
          className={className}
          disabled={disabled}
        />
      )}
    </FormBase>
  );
};

export default FormTextarea;
