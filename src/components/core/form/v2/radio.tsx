import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

import { cn } from '@/lib/utils';

import { FormBase } from './_helper/form-base';
import type { FormRadio } from './types';

const FormRadio: FormRadio = ({
  fieldProps,
  options,
  disabled,
  className,
  ...props
}) => {
  return (
    <FormBase {...props}>
      {(field) => (
        <RadioGroup
          disabled={disabled}
          onValueChange={fieldProps?.onValueChange ?? field.onChange}
          value={fieldProps?.value ?? field.value}
          className={cn('flex gap-x-4', className)}
        >
          {options.map((option) => (
            <div className='flex items-center gap-3'>
              <RadioGroupItem
                value={String(option.value)}
                id={`${option.value}`}
              />
              <Label htmlFor={`${option.value}`}>{option.label}</Label>
            </div>
          ))}
        </RadioGroup>
      )}
    </FormBase>
  );
};

export default FormRadio;
