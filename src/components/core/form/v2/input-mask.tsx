import { useFormContext } from 'react-hook-form';
import { useHookFormMask } from 'use-mask-input';

import { Input } from '@/components/ui/input';

import { cn } from '@/lib/utils';

import { FormBase } from './_helper/form-base';
import type { FormInputMask } from './types';

const FormInputMask: FormInputMask = ({
  fieldProps,
  disabled,
  className,
  mask = 'AA-9999',
  maskOptions = {
    placeholder: '_',
    showMaskOnHover: false,
  },
  ...props
}) => {
  const { register } = useFormContext();
  const registerWithMask = useHookFormMask(register);

  return (
    <FormBase {...props}>
      {(field) => (
        <Input
          {...field}
          {...fieldProps}
          type='text'
          disabled={disabled}
          className={cn(className, 'min-w-28')}
          {...registerWithMask(field.name, mask, {
            required: true,
            ...maskOptions,
          })}
        />
      )}
    </FormBase>
  );
};

export default FormInputMask;
