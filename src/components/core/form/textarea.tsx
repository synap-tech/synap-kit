import { FormControl, FormItem, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';

import { cn } from '@/lib/utils';

import CormFormLabel from './label';
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
        <Textarea
          className={cn(className, 'min-w-48')}
          disabled={disabled}
          placeholder={placeholder}
          {...field}
          value={field.value === null ? '' : field.value}
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  );
};

export default FormTextarea;
