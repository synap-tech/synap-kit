import { FormControl } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';

import { cn } from '@/lib/utils';

import FormItemWrapper from './form-item-wrapper';
import type { FormTextareaProps } from './types';

const FormTextarea: React.FC<FormTextareaProps> = ({
  field,
  label,
  placeholder = 'Write here',
  disabled = false,
  optional = false,
  className,
  disableLabel,
  subLabel,
  required,
  info,
}) => {
  return (
    <FormItemWrapper
      label={label}
      subLabel={subLabel}
      disableLabel={disableLabel}
      optional={optional}
      required={required}
      info={info}
    >
      <FormControl>
        <Textarea
          className={cn(className)}
          disabled={disabled}
          placeholder={placeholder}
          {...field}
          value={field.value === null ? '' : field.value}
        />
      </FormControl>
    </FormItemWrapper>
  );
};

export default FormTextarea;
