import { useFormContext } from 'react-hook-form';
import { useHookFormMask } from 'use-mask-input';

import { FormControl } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { cn } from '@/lib/utils';

import FormItemWrapper from './form-item-wrapper';
import { type FormInputMaskProps } from './types';

const FormInputMusk: React.FC<FormInputMaskProps> = ({
  field,
  label,
  subLabel,
  optional = false,
  className,
  icon,
  disableLabel,
  required,
  info,
  disabled,
  placeholder = 'Mask Input',
  mask = 'AA-9999',
  maskOptions = {
    placeholder: '_',
    showMaskOnHover: false,
  },
}) => {
  const { register } = useFormContext();
  const registerWithMask = useHookFormMask(register);

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
        <Input
          type='text'
          className={cn(className, 'min-w-28')}
          icon={icon}
          disabled={disabled}
          placeholder={placeholder}
          {...registerWithMask(field.name, mask, {
            required: true,
            ...maskOptions,
          })}
        />
      </FormControl>
    </FormItemWrapper>
  );
};

export default FormInputMusk;
